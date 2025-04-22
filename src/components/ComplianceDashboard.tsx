
import React, { useState, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { AlertTriangle, Check, Info } from "lucide-react";

// Demo compliance alerts (would come from API in real)
const ISSUES = [
  {
    phrase: "guaranteed results",
    type: "legal",
    message: "Avoid making guarantees; compliance risk.",
  },
  {
    phrase: "best treatment",
    type: "target",
    message: "Avoid superlatives; may not suit all audiences.",
  },
  {
    phrase: "revolutionary",
    type: "clarity",
    message: "Consider clarifying or providing evidence.",
  },
  {
    phrase: "unparalleled",
    type: "clarity",
    message: "Unsubstantiated claims can be problematic.",
  },
  {
    phrase: "safe for all animals",
    type: "legal",
    message: "Do not claim universal safety without data.",
  },
  {
    phrase: "instant results",
    type: "legal",
    message: "Timing claims require evidence.",
  },
];

const WAIT_MESSAGES = [
  "Making sure things are just right…",
  "Checking for snags in your copy…",
  "Hang tight, almost done!",
  "Running compliance checks…",
  "Reviewing for clarity and compliance…"
];

function getRandomWaitMessage() {
  return WAIT_MESSAGES[Math.floor(Math.random() * WAIT_MESSAGES.length)];
}

// Randomly inject highlights for demo
function annotateCopy(text: string) {
  // For demo, find all issue phrases (case-insensitive) in the text
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
      // Highlighted span with tooltip
      out.push(
        <span
          key={idx}
          className={`inline-flex items-center group relative px-1 rounded cursor-pointer transition
            ${
              found.issue.type === "legal"
                ? "bg-red-100 text-red-700 hover:bg-red-200"
                : found.issue.type === "clarity"
                ? "bg-yellow-100 text-yellow-700 hover:bg-yellow-200"
                : "bg-blue-100 text-blue-700 hover:bg-blue-200"
            }
          `}
        >
          {found.phrase}
          <span className="absolute left-1/2 -translate-x-1/2 top-full mt-2 pointer-events-none z-10 opacity-0 group-hover:opacity-100 transition
           bg-white border border-gray-200 text-gray-900 text-xs rounded px-3 py-1 shadow w-48 text-center animate-fade-in
           ">
            {found.issue.type === "legal" && (
              <AlertTriangle className="inline w-3 h-3 text-red-500 mr-1" />
            )}
            {found.issue.type === "clarity" && (
              <Info className="inline w-3 h-3 text-yellow-500 mr-1" />
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

export function ComplianceDashboard() {
  const [text, setText] = useState("");
  const [step, setStep] = useState<"input" | "loading" | "result">("input");
  const [waitMsg, setWaitMsg] = useState(WAIT_MESSAGES[0]);
  const [result, setResult] = useState<React.ReactNode[] | null>(null);
  const timeoutRef = useRef<number | null>(null);

  // Simulate compliance check with wait effect
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!text.trim()) return;
    setWaitMsg(getRandomWaitMessage());
    setStep("loading");
    // Simulate checking
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = window.setTimeout(() => {
      setResult(annotateCopy(text));
      setStep("result");
    }, 2200 + Math.random() * 800); // 2.2-3s random delay
  }

  function handleReset() {
    setText("");
    setResult(null);
    setStep("input");
  }

  // Check if there are any issues
  const foundIssues = text
    ? ISSUES.filter((i) =>
        text.toLowerCase().includes(i.phrase.toLowerCase())
      )
    : [];

  return (
    <div className="min-h-screen bg-gradient-to-tr from-purple-100 to-blue-50 flex flex-col items-center justify-center py-12 w-full animate-fade-in">
      <Card className="w-full max-w-xl shadow-xl border-0 rounded-2xl animate-scale-in p-2 bg-white/90">
        <CardHeader>
          <CardTitle className="flex flex-col items-center gap-2">
            <span className="text-3xl font-extrabold text-purple-800">Compliance Check</span>
            <span className="text-sm text-gray-600">
              Paste your draft below and see compliance highlights instantly.
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {step === "input" && (
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              <Textarea
                className="min-h-[120px] text-lg bg-gray-50 focus:bg-white transition"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Paste or write your copy here..."
                required
                maxLength={1800}
                autoFocus
              />
              <Button
                type="submit"
                size="lg"
                className="w-full bg-purple-600 text-white rounded-md hover:bg-purple-700 transition ease-in-out"
                disabled={!text.trim()}
              >
                Run Compliance Check
              </Button>
              <div className="flex flex-col gap-1 text-xs text-gray-400 pt-2">
                <span>
                  Demo: Issues will be highlighted—hover for compliance tips.
                </span>
              </div>
            </form>
          )}

          {step === "loading" && (
            <div className="flex flex-col items-center justify-center min-h-[180px] py-10 animate-fade-in">
              <svg
                className="animate-spin mb-4 text-purple-600"
                width="40"
                height="40"
                viewBox="0 0 50 50"
                fill="none"
              >
                <circle
                  cx="25"
                  cy="25"
                  r="20"
                  stroke="currentColor"
                  strokeWidth="5"
                  fill="none"
                  opacity="0.25"
                />
                <path
                  d="M45 25c0-11.046-8.954-20-20-20"
                  stroke="currentColor"
                  strokeWidth="5"
                  strokeLinecap="round"
                  className="opacity-70"
                />
              </svg>
              <span className="text-purple-700 font-medium text-lg">{waitMsg}</span>
            </div>
          )}

          {step === "result" && (
            <div className="animate-fade-in flex flex-col gap-3">
              <div className="bg-blue-50 border-l-4 border-blue-300 rounded px-4 py-2 text-sm mb-2">
                <b>Done! Compliance Check Complete.</b>
                <br />
                {foundIssues.length === 0 ? (
                  <span className="flex items-center gap-1 text-green-700 mt-1">
                    <Check className="inline h-4 w-4" /> No compliance flags found!
                  </span>
                ) : (
                  <span className="flex items-center gap-1 text-red-700 mt-1">
                    <AlertTriangle className="inline h-4 w-4" /> {foundIssues.length} issue{foundIssues.length > 1 && "s"} flagged
                  </span>
                )}
              </div>
              <div className="whitespace-pre-wrap text-lg bg-gray-50 rounded shadow-inner p-4 font-mono leading-relaxed">
                {result}
              </div>
              <Button
                onClick={handleReset}
                variant="outline"
                className="w-full mt-4"
              >
                Check Another Copy
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
      <div className="text-xs text-gray-500 max-w-lg mt-6 text-center">
        <span>
          <b>How this works:</b> This is a proof-of-concept. Paste your copy, run a check, and see highlights indicating potential legal, clarity, or target-audience issues.
          <br />
          <b>Why it matters:</b> Early QA in your content pipeline catches issues before legal—speeding review cycles and boosting team confidence.
        </span>
      </div>
    </div>
  );
}

export default ComplianceDashboard;
