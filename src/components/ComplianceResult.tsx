import React, { useRef, useLayoutEffect, useEffect } from "react";
import { Check, AlertTriangle } from "lucide-react";
import { ISSUES, PRESET_COPY } from "@/constants/compliance";
import { Button } from "@/components/ui/button";

type Props = {
  foundIssues: typeof ISSUES;
  result: React.ReactNode[] | null;
  onReset: () => void;
  selectedIssueIdx?: number;
};

interface HighlightSpanProps extends React.HTMLAttributes<HTMLSpanElement> {
  onClick: () => void;
}

const ComplianceResult: React.FC<Props> = ({ foundIssues, result, onReset, selectedIssueIdx }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Debug mount/update
  useEffect(() => {
    console.log('Component mounted/updated with props:', {
      foundIssues: foundIssues.length,
      hasResult: result !== null,
      selectedIssueIdx
    });
  });

  useLayoutEffect(() => {
    console.log('Scroll effect running with selectedIssueIdx:', selectedIssueIdx);
    
    // Skip if no index selected or invalid index
    if (typeof selectedIssueIdx !== "number" || selectedIssueIdx < 0) {
      console.log('Skipping scroll - no valid index');
      return;
    }

    // Ensure DOM is ready
    requestAnimationFrame(() => {
      if (!containerRef.current) {
        console.log('No container ref');
        return;
      }

      const container = containerRef.current;
      console.log('Container found:', {
        scrollTop: container.scrollTop,
        clientHeight: container.clientHeight,
        scrollHeight: container.scrollHeight
      });
      
      const targetId = `highlight-${selectedIssueIdx}`;
      console.log('Looking for element with ID:', targetId);
      const targetElement = document.getElementById(targetId);
      
      if (!targetElement) {
        console.log('Target element not found');
        return;
      }

      console.log('Target element found:', {
        offsetTop: targetElement.offsetTop,
        offsetHeight: targetElement.offsetHeight
      });

      // First scroll the element into view
      targetElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      
      // Calculate scroll position to keep highlight in view with context
      const elementTop = targetElement.offsetTop;
      const elementHeight = targetElement.offsetHeight;
      const containerHeight = container.clientHeight;
      const visibleAreaHeight = containerHeight * 0.7; // Use 70% of container height
      const scrollPosition = Math.max(
        0,
        elementTop - (visibleAreaHeight - elementHeight)
      );
      
      console.log('Calculated scroll position:', {
        elementTop,
        elementHeight,
        containerHeight,
        visibleAreaHeight,
        scrollPosition
      });
      
      container.scrollTo({
        top: scrollPosition,
        behavior: 'smooth'
      });
    });
  }, [selectedIssueIdx]);

  const resultWithHighlights = React.Children.map(result, (child, idx) => {
    if (
      React.isValidElement(child) &&
      child.type === "span" &&
      child.props.onClick
    ) {
      return React.cloneElement(child as React.ReactElement<HighlightSpanProps>, {
        style: { 
          ...((child as React.ReactElement<HighlightSpanProps>).props.style || {}),
          scrollMarginTop: '100px'
        }
      });
    }
    return child;
  });

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
      <div
        ref={containerRef}
        className="whitespace-pre-wrap text-lg bg-white rounded shadow-inner p-4 font-mono leading-relaxed max-h-[420px] overflow-y-auto border border-[#ff671b] scroll-smooth"
      >
        {resultWithHighlights}
      </div>
      <Button
        onClick={onReset}
        variant="outline"
        className="w-full mt-4 border-[#ff671b] text-[#ff671b] hover:bg-[#ff5ec]"
      >
        Check Again
      </Button>
    </div>
  );
};

export default ComplianceResult;
