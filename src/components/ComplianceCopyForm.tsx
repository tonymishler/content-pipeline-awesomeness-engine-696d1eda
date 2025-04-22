
import React from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

type Props = {
  value: string;
  onChange: (v: string) => void;
  onRunCheck: () => void;
  disabled?: boolean;
};

const ComplianceCopyForm: React.FC<Props> = ({ value, onChange, onRunCheck, disabled }) => {
  return (
    <form
      className="flex flex-col gap-5 items-center w-full"
      onSubmit={e => {
        e.preventDefault();
        onRunCheck();
      }}
      style={{ fontFamily: "Montserrat, Arial, Helvetica, sans-serif" }}
    >
      <div
        className="w-full max-w-prose flex flex-col"
        style={{
          background: "#ffe8d4",
          borderRadius: "0.75rem",
          boxShadow: "0 0.5rem 1.5rem 0 rgba(0,0,0,0.05)",
        }}
      >
        <label
          htmlFor="copy"
          className="sr-only"
        >
          Librela Website Copy
        </label>
        <Textarea
          id="copy"
          className="w-full bg-transparent border-0 focus:ring-0 font-medium text-base resize-none text-[#403E43] px-4 py-4 rounded-t-lg min-h-[270px] max-h-[320px] overflow-y-auto"
          style={{
            maxHeight: 320,
            minHeight: 200,
            color: "#403E43",
            fontFamily: "Montserrat, Arial, Helvetica, sans-serif"
          }}
          value={value}
          onChange={e => onChange(e.target.value)}
          placeholder="Paste or write your Librela copy here…"
          disabled={disabled}
        />
      </div>
      <Button
        type="submit"
        size="lg"
        className="w-full max-w-xs bg-[#ff671b] text-white rounded-md text-base hover:bg-[#da5900] transition"
        disabled={disabled}
      >
        Run Compliance Check
      </Button>
      <div className="flex flex-col gap-1 text-xs text-gray-400 pt-1">
        <span>
          Issues will be highlighted after the check—hover for compliance tips.
        </span>
      </div>
    </form>
  );
};

export default ComplianceCopyForm;

