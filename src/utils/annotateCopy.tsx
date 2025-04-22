
import React from "react";
import { ISSUES } from "@/constants/compliance";
import { AlertTriangle, Info } from "lucide-react";

// Find phrases in preset copy and highlight them
export function annotateCopy(text: string) {
  let out: React.ReactNode[] = [];
  let working = text;
  let idx = 0;
  while (working.length > 0) {
    let found = null as null | {
      i: number;
      phrase: string;
      issue: typeof ISSUES[0];
    };
    let minI = -1;
    for (const issue of ISSUES) {
      const i = working.toLowerCase().indexOf(issue.phrase.toLowerCase());
      if (i !== -1 && (minI === -1 || i < minI)) {
        found = { i, phrase: working.substr(i, issue.phrase.length), issue };
        minI = i;
      }
    }
    if (found) {
      if (found.i > 0) {
        out.push(working.substr(0, found.i));
      }
      // Adjust highlight colors for Zoetis orange, yellow, blue
      out.push(
        <span
          key={idx}
          className={`inline-flex items-center group relative px-1 rounded font-semibold cursor-pointer transition
            ${
              found.issue.type === "legal"
                ? "bg-[#ffe8d4] text-[#ff671b] hover:bg-[#ffc099]"
                : found.issue.type === "clarity"
                ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-200"
                : "bg-blue-100 text-blue-700 hover:bg-blue-200"
            }
          `}
        >
          {found.phrase}
          <span className="absolute left-1/2 -translate-x-1/2 top-full mt-2 pointer-events-none z-10 opacity-0 group-hover:opacity-100 transition bg-white border border-gray-200 text-gray-900 text-xs rounded px-3 py-1 shadow w-56 text-center animate-fade-in">
            {found.issue.type === "legal" && (
              <AlertTriangle className="inline w-3 h-3 text-[#ff671b] mr-1" />
            )}
            {found.issue.type === "clarity" && (
              <Info className="inline w-3 h-3 text-yellow-700 mr-1" />
            )}
            <b className="capitalize">{found.issue.type}:</b> {found.issue.message}
          </span>
        </span>
      );
      idx++;
      working = working.substr(found.i + found.phrase.length);
    } else {
      out.push(working);
      break;
    }
  }
  return out;
}
