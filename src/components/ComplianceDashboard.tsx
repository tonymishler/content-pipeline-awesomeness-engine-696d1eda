import React, { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ComplianceCopyForm from "./ComplianceCopyForm";
import ComplianceLoading from "./ComplianceLoading";
import ComplianceResult from "./ComplianceResult";
import ComplianceDetailsPanel, { ComplianceIssue } from "./ComplianceDetailsPanel";
import { getRandomWaitMessage, PRESET_COPY } from "@/constants/compliance";
import { annotateCopy } from "@/utils/annotateCopy";
import { useComplianceAnalysis } from "@/hooks/useComplianceAnalysis";

// Find which issues are present in the current copy
function getFoundIssues(copy: string, issues: ComplianceIssue[]) {
  return issues.filter((i) =>
    copy.toLowerCase().includes(i.phrase.toLowerCase())
  );
}

export function ComplianceDashboard() {
  const [step, setStep] = useState<"input" | "loading" | "result">("input");
  const [waitMsg, setWaitMsg] = useState(getRandomWaitMessage());
  const [copy, setCopy] = useState(PRESET_COPY.trim());
  const [result, setResult] = useState<React.ReactNode[] | null>(null);
  const [selectedIssueIdx, setSelectedIssueIdx] = useState<number | null>(null);
  
  // Use our custom hook for compliance analysis
  const { analyzeContent, isLoading, error, issues } = useComplianceAnalysis();

  // Update the result when issues change
  useEffect(() => {
    if (step === "result" && issues.length > 0) {
      setResult(annotateCopy(copy, (issue, idx) => handleHighlightClick(issue), selectedIssueIdx, issues));
    }
  }, [issues, copy, step, selectedIssueIdx]);

  useEffect(() => {
    if (step === "loading" && !isLoading) {
      setStep("result");
    }
  }, [isLoading, step]);

  function handleRunCheck() {
    setWaitMsg(getRandomWaitMessage());
    setStep("loading");
    
    // Call the API to analyze the content
    analyzeContent(copy).then(() => {
      setStep("result");
    });
  }

  function handleReset() {
    setResult(null);
    setStep("input");
  }

  const foundIssues = getFoundIssues(copy, issues);
  const selectedIssue =
    selectedIssueIdx !== null && foundIssues[selectedIssueIdx]
      ? foundIssues[selectedIssueIdx]
      : null;

  // Handler for highlighting issues
  const handleHighlightClick = (issue: ComplianceIssue) => {
    const idx = foundIssues.findIndex((i) => i.phrase === issue.phrase);
    setSelectedIssueIdx(idx !== -1 ? idx : null);
  };

  const handlePrevIssue = () => {
    if (selectedIssueIdx !== null && selectedIssueIdx > 0) {
      setSelectedIssueIdx(selectedIssueIdx - 1);
    }
  };
  const handleNextIssue = () => {
    if (
      selectedIssueIdx !== null &&
      selectedIssueIdx < foundIssues.length - 1
    ) {
      setSelectedIssueIdx(selectedIssueIdx + 1);
    }
  };

  return (
    <div
      className="min-h-screen bg-gray-100 flex flex-col md:flex-row items-center justify-center py-12 w-full animate-fade-in"
      style={{ fontFamily: "Montserrat, Arial, Helvetica, sans-serif" }}
    >
      <div className="flex flex-col items-center w-full max-w-2xl md:sticky md:top-8">
        <Card className="w-full shadow-2xl border-0 rounded-2xl animate-scale-in p-2 bg-white">
          <CardHeader>
            <CardTitle className="flex flex-col items-center gap-2">
              <span
                className="text-[2.2rem] font-extrabold"
                style={{ color: "#3b82f6", letterSpacing: 0.5 }}
              >
                ComplyIQ
              </span>
              <span className="text-base text-gray-600">
                Paste or write copy below. Compliance risks will be highlighted.
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {step === "input" && (
              <ComplianceCopyForm
                value={copy}
                onChange={setCopy}
                onRunCheck={handleRunCheck}
                disabled={isLoading}
              />
            )}
            {step === "loading" && (
              <ComplianceLoading waitMsg={waitMsg} />
            )}
            {step === "result" && result && (
              <ComplianceResult
                foundIssues={foundIssues}
                result={result}
                onReset={handleReset}
                selectedIssueIdx={selectedIssueIdx ?? undefined}
              />
            )}
            {error && (
              <div className="mt-4 p-4 bg-red-50 text-red-700 rounded-md">
                <p className="font-semibold">Error:</p>
                <p>{error}</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {step === "result" && (
        <div className="md:ml-8 flex flex-col">
          <div className="text-sm mb-4">
            <div className="text-blue-500 font-semibold mb-2">How this demo works:</div>
            <div className="text-gray-700 mb-2">
              Compliance risks (legal, clarity, target) are highlighted on sample copy.
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-blue-500 rounded"></div>
                <span className="text-gray-600">Legal risk</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-yellow-200 rounded"></div>
                <span className="text-gray-600">Clarity warning</span>
              </div>
            </div>
            <div className="text-gray-600 mt-2">Click a highlight for explanation.</div>
          </div>
          {selectedIssue !== null && selectedIssue.message !== "" && (
            <ComplianceDetailsPanel
              issue={selectedIssue}
              onPrev={handlePrevIssue}
              onNext={handleNextIssue}
              hasPrev={selectedIssueIdx !== null && selectedIssueIdx > 0}
              hasNext={selectedIssueIdx !== null && selectedIssueIdx < foundIssues.length - 1}
            />
          )}
        </div>
      )}
    </div>
  );
}

export default ComplianceDashboard;
