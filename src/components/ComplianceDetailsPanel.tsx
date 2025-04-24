import React from "react";

export interface ComplianceIssue {
  phrase: string;
  type: string;
  message: string;
  explanation?: string;
}

interface ComplianceDetailsPanelProps {
  issue: ComplianceIssue | null;
  onPrev?: () => void;
  onNext?: () => void;
  hasPrev?: boolean;
  hasNext?: boolean;
}

const ComplianceDetailsPanel: React.FC<ComplianceDetailsPanelProps> = ({ issue, onPrev, onNext, hasPrev, hasNext }) => {
  return (
    <aside className="w-80 p-4 bg-white rounded-lg shadow-md border border-gray-200 sticky top-8 ml-8 min-h-[200px] flex flex-col">
      <h3 className="text-lg font-bold mb-2 text-[#ff671b]">Compliance Details</h3>
      {issue ? (
        <div>
          <div className="font-semibold text-gray-700 mb-1">{issue.type}</div>
          <div className="text-gray-800 mb-2">{issue.message}</div>
          {issue.explanation && (
            <div className="text-sm text-gray-500">{issue.explanation}</div>
          )}
        </div>
      ) : (
        <div className="text-gray-400 italic flex-1">Select a highlighted risk to see details here.</div>
      )}
      <div className="flex gap-2 mt-4 justify-end">
        <button
          className="px-3 py-1 rounded bg-gray-100 text-gray-600 hover:bg-gray-200 disabled:opacity-50"
          onClick={onPrev}
          disabled={!hasPrev}
        >
          Previous
        </button>
        <button
          className="px-3 py-1 rounded bg-[#ff671b] text-white hover:bg-[#da5900] disabled:opacity-50"
          onClick={onNext}
          disabled={!hasNext}
        >
          Next
        </button>
      </div>
    </aside>
  );
};

export default ComplianceDetailsPanel;
