import { ISSUES } from "@/constants/compliance";

// Define the structure for compliance issues returned by the API
export interface ComplianceIssue {
  phrase: string;
  type: "legal" | "clarity" | "target";
  message: string;
}

// Define the structure for the Gemini API response
interface GeminiResponse {
  candidates: Array<{
    content: {
      parts: Array<{
        text: string;
      }>;
    };
  }>;
}

export class ComplianceService {
  private apiKey: string;
  private apiEndpoint: string;

  constructor(apiKey: string, apiEndpoint: string = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent") {
    this.apiKey = apiKey;
    this.apiEndpoint = apiEndpoint;
  }

  /**
   * Analyzes content for compliance issues using the Gemini 2.0 Flash API
   * @param content The text content to analyze
   * @returns A promise that resolves to an array of compliance issues
   */
  async analyzeContent(content: string): Promise<ComplianceIssue[]> {
    try {
      const prompt = this.buildPrompt(content);
      
      const response = await fetch(`${this.apiEndpoint}?key=${this.apiKey}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: prompt
                }
              ]
            }
          ],
          generationConfig: {
            temperature: 0.2,
            topP: 0.8,
            topK: 40,
            maxOutputTokens: 1024,
          },
        }),
      });

      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }

      const data = await response.json() as GeminiResponse;
      
      // Parse the response to extract compliance issues
      return this.parseResponse(data);
    } catch (error) {
      console.error('Error analyzing content:', error);
      throw error;
    }
  }

  /**
   * Builds the prompt for the Gemini API
   * @param content The text content to analyze
   * @returns The formatted prompt
   */
  private buildPrompt(content: string): string {
    return `
You are a content compliance officer specializing in pet pharmaceuticals. Your job is to analyze marketing copy for potential compliance issues.

Please analyze the following content and identify any phrases that may present compliance risks. For each issue, provide:
1. The exact phrase that is problematic
2. The type of issue (legal, clarity, or target)
3. A brief explanation of why it's problematic

Format your response as a JSON array of objects with the following structure:
[
  {
    "phrase": "exact problematic phrase",
    "type": "legal|clarity|target",
    "message": "brief explanation of the issue"
  }
]

Only include issues that are actually present in the text. Do not make up issues.

Here is the content to analyze:

${content}
`;
  }

  /**
   * Parses the API response to extract compliance issues
   * @param response The API response
   * @returns An array of compliance issues
   */
  private parseResponse(response: GeminiResponse): ComplianceIssue[] {
    try {
      // Extract the text from the response
      const text = response.candidates[0].content.parts[0].text;
      
      // Find the JSON array in the response
      const jsonMatch = text.match(/\[\s*\{[\s\S]*\}\s*\]/);
      if (!jsonMatch) {
        console.error('Could not find JSON array in response');
        return [];
      }
      
      // Parse the JSON array
      const issues = JSON.parse(jsonMatch[0]) as ComplianceIssue[];
      
      // Validate the issues
      return issues.filter((issue) => 
        issue.phrase && 
        issue.type && 
        issue.message &&
        ['legal', 'clarity', 'target'].includes(issue.type)
      );
    } catch (error) {
      console.error('Error parsing API response:', error);
      return [];
    }
  }
} 