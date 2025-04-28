import React from "react";

export interface ComplianceIssue {
  phrase: string;
  type: string;
  message: string;
  explanation?: string;
}

interface ComplianceDetailsPanelProps {
  issue: ComplianceIssue;  
  onPrev?: () => void;
  onNext?: () => void;
  hasPrev?: boolean;
  hasNext?: boolean;
}

const ComplianceDetailsPanel: React.FC<ComplianceDetailsPanelProps> = ({ issue, onPrev, onNext, hasPrev, hasNext }) => {
  return (
    <aside className="w-80 p-4 bg-white rounded-lg shadow-md border border-gray-200 sticky top-8 h-[300px] flex flex-col">
      <h3 className="text-lg font-bold mb-2 text-blue-500 text-left">Compliance Details</h3>
      <div className="flex-1 overflow-y-auto mb-4 border-x border-gray-200 px-2">
        <div className="font-semibold text-gray-700 mb-1">{issue.type}</div>
        <div className="text-gray-800 mb-2">{issue.message}</div>
        {issue.explanation && (
          <div className="text-sm text-gray-500">{issue.explanation}</div>
        )}
      </div>
      <div className="flex gap-2 mt-4 justify-end">
        <button
          className="px-3 py-1 rounded bg-gray-100 text-gray-600 hover:bg-gray-200 disabled:opacity-50"
          onClick={onPrev}
          disabled={!hasPrev}
        >
          Previous
        </button>
        <button
          className="px-3 py-1 rounded bg-blue-500 text-white hover:bg-blue-600 disabled:opacity-50"
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
