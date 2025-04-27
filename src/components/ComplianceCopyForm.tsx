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
          background: "#fff",
          borderRadius: "0.75rem",
          boxShadow: "0 0.5rem 1.5rem 0 rgba(0,0,0,0.05)",
          border: '1.5px solid #3b82f6',
        }}
      >
        <label
          htmlFor="copy"
          className="text-base font-semibold px-4 pt-4 pb-1 text-gray-600"
        >
          Copy to Check
        </label>
        <Textarea
          id="copy"
          className="resize-vertical w-full min-h-[180px] max-h-[600px] text-lg bg-transparent border-none focus:ring-0 focus:outline-none shadow-none placeholder:text-gray-300"
          value={value}
          onChange={e => onChange(e.target.value)}
          placeholder="Paste or write your Librela copy here…"
          disabled={disabled}
        />
      </div>
      <Button
        type="submit"
        size="lg"
        className="w-full max-w-xs bg-blue-500 text-white rounded-md text-base hover:bg-blue-600 transition"
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
