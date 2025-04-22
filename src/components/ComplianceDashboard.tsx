
import React, { useState, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ComplianceCopyForm from "./ComplianceCopyForm";
import ComplianceLoading from "./ComplianceLoading";
import ComplianceResult from "./ComplianceResult";
import { getRandomWaitMessage, PRESET_COPY, ISSUES } from "@/constants/compliance";
import { annotateCopy } from "@/utils/annotateCopy";

// Find which issues are present in the current copy
function getFoundIssues(copy: string) {
  return ISSUES.filter((i) =>
    copy.toLowerCase().includes(i.phrase.toLowerCase())
  );
}

export function ComplianceDashboard() {
  const [step, setStep] = useState<"input" | "loading" | "result">("input");
  const [waitMsg, setWaitMsg] = useState(getRandomWaitMessage());
  const [copy, setCopy] = useState(PRESET_COPY.trim());
  const [result, setResult] = useState<React.ReactNode[] | null>(null);
  const timeoutRef = useRef<number | null>(null);

  function handleRunCheck() {
    setWaitMsg(getRandomWaitMessage());
    setStep("loading");
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = window.setTimeout(() => {
      setResult(annotateCopy(copy));
      setStep("result");
    }, 1800 + Math.random() * 700);
  }

  function handleReset() {
    setResult(null);
    setStep("input");
  }

  const foundIssues = getFoundIssues(copy);

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
              Paste or write Librela website copy below. Compliance risks will be highlighted.
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {step === "input" && (
            <ComplianceCopyForm
              value={copy}
              onChange={setCopy}
              onRunCheck={handleRunCheck}
              disabled={step === "loading"}
            />
          )}
          {step === "loading" && (
            <ComplianceLoading waitMsg={waitMsg} />
          )}
          {step === "result" && (
            <ComplianceResult
              foundIssues={foundIssues}
              result={result}
              onReset={handleReset}
            />
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

