import React from "react";
import { ISSUES } from "@/constants/compliance";
import { AlertTriangle, Info } from "lucide-react";

// Find phrases in preset copy and highlight them
export function annotateCopy(
  text: string, 
  onSelectIssue?: (issue: typeof ISSUES[0], idx: number) => void, 
  selectedIdx?: number | null
) {
  const out: React.ReactNode[] = [];
  
  // Get the foundIssues in order they appear in ISSUES
  const foundIssues = ISSUES.filter(issue => 
    text.toLowerCase().includes(issue.phrase.toLowerCase())
  );
  
  // Find all matches for each issue, preserving foundIssues order
  type Match = { 
    start: number; 
    length: number; 
    issue: typeof ISSUES[0]; 
    foundIdx: number;
  };
  
  const allMatches: Match[] = [];
  foundIssues.forEach((issue, foundIdx) => {
    let pos = 0;
    while (true) {
      const i = text.toLowerCase().indexOf(issue.phrase.toLowerCase(), pos);
      if (i === -1) break;
      allMatches.push({ 
        start: i, 
        length: issue.phrase.length, 
        issue,
        foundIdx
      });
      pos = i + 1;
    }
  });
  
  // Sort matches by position in text
  allMatches.sort((a, b) => a.start - b.start);

  let lastPos = 0;
  for (const match of allMatches) {
    // Add text before match
    if (match.start > lastPos) {
      out.push(text.substring(lastPos, match.start));
    }
    
    // Add highlighted match
    const phrase = text.substr(match.start, match.length);
    out.push(
      React.createElement(
        'span',
        {
          key: `highlight-${match.foundIdx}-${match.start}`,
          id: `highlight-${match.foundIdx}`,
          className: `inline-flex items-center group relative px-1 rounded font-semibold cursor-pointer transition ` +
            (match.issue.type === "legal"
              ? "bg-[#ffe8d4] text-[#ff671b] hover:bg-[#ffc099]"
              : match.issue.type === "clarity"
              ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-200"
              : "bg-blue-100 text-blue-700 hover:bg-blue-200") +
            (selectedIdx === match.foundIdx ? ' ring-2 ring-[#ff671b] ring-offset-2' : ''),
          onClick: () => onSelectIssue && onSelectIssue(match.issue, match.foundIdx),
          style: { 
            padding: '2px 0'
          }
        },
        phrase
      )
    );
    lastPos = match.start + match.length;
  }

  // Add remaining text
  if (lastPos < text.length) {
    out.push(text.substring(lastPos));
  }

  return out;
}
