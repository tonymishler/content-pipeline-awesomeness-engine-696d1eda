
import React from "react";
import { PRESET_COPY } from "@/constants/compliance";
import { Button } from "@/components/ui/button";

type Props = {
  onRunCheck: () => void;
};

const ComplianceCopyCard: React.FC<Props> = ({ onRunCheck }) => {
  return (
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
        onClick={onRunCheck}
      >
        Run Compliance Check
      </Button>
      <div className="flex flex-col gap-1 text-xs text-gray-400 pt-2">
        <span>
          Issues are highlighted below after running the check—hover for compliance tips.
        </span>
      </div>
    </div>
  );
};

export default ComplianceCopyCard;
