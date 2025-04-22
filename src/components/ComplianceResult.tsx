
import React from "react";
import { Check, AlertTriangle } from "lucide-react";
import { ISSUES, PRESET_COPY } from "@/constants/compliance";
import { Button } from "@/components/ui/button";

type Props = {
  foundIssues: typeof ISSUES;
  result: React.ReactNode[] | null;
  onReset: () => void;
};

const ComplianceResult: React.FC<Props> = ({ foundIssues, result, onReset }) => {
  return (
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
        onClick={onReset}
        variant="outline"
        className="w-full mt-4 border-[#ff671b] text-[#ff671b] hover:bg-[#fff5ec]"
      >
        Check Again
      </Button>
    </div>
  );
};

export default ComplianceResult;
