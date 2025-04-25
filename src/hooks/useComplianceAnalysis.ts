import { useState, useCallback } from 'react';
import { ComplianceService, ComplianceIssue } from '@/utils/ComplianceService';

// Get the API key from environment variables
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY || '';
const complianceService = new ComplianceService(API_KEY);

export function useComplianceAnalysis() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [issues, setIssues] = useState<ComplianceIssue[]>([]);
  
  // Create a memoized instance of the ComplianceService
  
  // Function to analyze content
  const analyzeContent = useCallback(async (content: string) => {
    if (!API_KEY) {
      setError('API key is missing. Please set the VITE_GEMINI_API_KEY environment variable.');
      return;
    }
    
    setIsLoading(true);
    setError(null);
    
    try {
      const results = await complianceService.analyzeContent(content);
      setIssues(results);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
      console.error('Error analyzing content:', err);
    } finally {
      setIsLoading(false);
    }
  }, [complianceService]);
  
  return {
    analyzeContent,
    isLoading,
    error,
    issues
  };
} 