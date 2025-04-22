
import React from "react";

type Props = {
  waitMsg: string;
};

const ComplianceLoading: React.FC<Props> = ({ waitMsg }) => {
  return (
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
  );
};

export default ComplianceLoading;
