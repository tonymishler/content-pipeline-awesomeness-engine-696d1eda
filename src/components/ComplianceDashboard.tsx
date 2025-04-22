
import React, { useState, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Check, Info } from "lucide-react";

// Zoetis preset marketing copy to be analyzed
const PRESET_COPY = `
Zoetis UltraGuard™ offers instant results with guaranteed protection for all animals.
Our revolutionary solution is proven to be the best treatment for pet care.
Safe for all animals—veterinarian recommended.
Choose Zoetis UltraGuard™ for unparalleled peace of mind.
`;

// Demo compliance alerts mapped to known phrases in preset copy
const ISSUES = [
  {
    phrase: "guaranteed protection",
    type: "legal",
    message: "Avoid guarantees; compliance risk.",
  },
  {
    phrase: "instant results",
    type: "legal",
    message: "Timing claims require evidence.",
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
    phrase: "Safe for all animals",
    type: "legal",
    message: "Do not claim universal safety without data.",
  },
];

const WAIT_MESSAGES = [
  "Making sure things are just right…",
  "Checking for snags in your copy…",
  "Hang tight, almost done!",
  "Running compliance checks…",
  "Reviewing for clarity and compliance…",
];

function getRandomWaitMessage() {
  return WAIT_MESSAGES[Math.floor(Math.random() * WAIT_MESSAGES.length)];
}

// Find phrases in preset copy and highlight them
function annotateCopy(text: string) {
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
          <span className="absolute left-1/2 -translate-x-1/2 top-full mt-2 pointer-events-none z-10 opacity-0 group-hover:opacity-100 transition
           bg-white border border-gray-200 text-gray-900 text-xs rounded px-3 py-1 shadow w-56 text-center animate-fade-in
           ">
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

export function ComplianceDashboard() {
  const [step, setStep] = useState<"input" | "loading" | "result">("input");
  const [waitMsg, setWaitMsg] = useState(WAIT_MESSAGES[0]);
  const [result, setResult] = useState<React.ReactNode[] | null>(null);
  const timeoutRef = useRef<number | null>(null);

  function handleRunCheck() {
    setWaitMsg(getRandomWaitMessage());
    setStep("loading");
    // Simulate compliance check
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = window.setTimeout(() => {
      setResult(annotateCopy(PRESET_COPY.trim()));
      setStep("result");
    }, 1800 + Math.random() * 700); // 1.8-2.5s
  }

  function handleReset() {
    setResult(null);
    setStep("input");
  }

  // Find which issues are present
  const foundIssues = ISSUES.filter((i) =>
    PRESET_COPY.toLowerCase().includes(i.phrase.toLowerCase())
  );

  return (
    <div
      className="min-h-screen bg-white flex flex-col items-center justify-center py-12 w-full animate-fade-in"
      style={{ fontFamily: "Montserrat, Arial, Helvetica, sans-serif" }}
    >
      <Card className="w-full max-w-2xl shadow-2xl border-0 rounded-2xl animate-scale-in p-2 bg-white">
        <CardHeader>
          <CardTitle className="flex flex-col items-center gap-2">
            <span
              className="text-[2.2rem] font-extrabold"
              style={{ color: "#ff671b", letterSpacing: 0.5 }}
            >
              Compliance POC Demo
            </span>
            <span className="text-base text-gray-600">
              Sample Zoetis copy, highlighting flagged compliance risks.
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {step === "input" && (
            <div className="flex flex-col gap-5 items-center">
              <div className="bg-[#ffe8d4] p-4 rounded-lg font-semibold text-[#ff671b] text-center text-lg max-w-prose shadow">
                <span>
                  <b>Demo Copy:</b>
                  <br />
                  <span className="whitespace-pre-wrap block mt-1 text-gray-700 font-medium text-base" style={{ color: "#403E43" }}>
                    {PRESET_COPY}
                  </span>
                </span>
              </div>
              <Button
                type="button"
                size="lg"
                className="w-full max-w-xs bg-[#ff671b] text-white rounded-md text-base hover:bg-[#da5900] transition"
                onClick={handleRunCheck}
              >
                Run Compliance Check
              </Button>
              <div className="flex flex-col gap-1 text-xs text-gray-400 pt-2">
                <span>
                  Issues are highlighted below after running the check—hover for compliance tips.
                </span>
              </div>
            </div>
          )}

          {step === "loading" && (
            <div className="flex flex-col items-center justify-center min-h-[180px] py-10 animate-fade-in">
              <svg
                className="animate-spin mb-4"
                style={{ color: "#ff671b" }}
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
                  opacity="0.22"
                />
                <path
                  d="M45 25c0-11.046-8.954-20-20-20"
                  stroke="currentColor"
                  strokeWidth="5"
                  strokeLinecap="round"
                  className="opacity-80"
                />
              </svg>
              <span className="font-semibold text-[#ff671b] text-lg">{waitMsg}</span>
            </div>
          )}

          {step === "result" && (
            <div className="animate-fade-in flex flex-col gap-4">
              <div className="bg-[#ffe8d4] border-l-4 border-[#ff671b] rounded px-4 py-2 text-sm mb-2">
                <b className="text-[#ff671b]">Compliance Check Complete.</b>
                <br />
                {foundIssues.length === 0 ? (
                  <span className="flex items-center gap-1 text-green-700 mt-1">
                    <Check className="inline h-4 w-4" /> No compliance flags found!
                  </span>
                ) : (
                  <span className="flex items-center gap-1 text-[#ff671b] mt-1">
                    <AlertTriangle className="inline h-4 w-4" /> {foundIssues.length} issue
                    {foundIssues.length > 1 && "s"} flagged
                  </span>
                )}
              </div>
              <div className="whitespace-pre-wrap text-lg bg-gray-50 rounded shadow-inner p-4 font-mono leading-relaxed">
                {result}
              </div>
              <Button
                onClick={handleReset}
                variant="outline"
                className="w-full mt-4 border-[#ff671b] text-[#ff671b] hover:bg-[#fff5ec]"
              >
                Check Again
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
      <div className="text-xs text-[#ff671b] max-w-lg mt-8 text-center">
        <b>How this demo works:</b> Compliance risks (legal, clarity, target) are highlighted on sample copy. <br />
        <span className="text-gray-600">
          Orange = legal risk; Yellow = clarity warning; Hover for explanation.
        </span>
        <div className="mt-6 flex items-center justify-center">
          <img
            src="/lovable-uploads/85b0e3ba-813f-4d05-926c-6b58bd05ba15.png"
            alt="Zoetis brand animal images"
            className="rounded-full shadow w-28 h-28 object-cover border-4 border-[#ff671b] mx-2"
          />
          <img
            src="/lovable-uploads/e89bafd6-9317-4969-bb38-6d27ca888c8b.png"
            alt="Zoetis News Conference"
            className="rounded-lg shadow w-44 h-28 object-cover mx-2"
          />
        </div>
      </div>
    </div>
  );
}

export default ComplianceDashboard;

