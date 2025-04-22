
import { AlertTriangle, Info } from "lucide-react";

// Zoetis preset marketing copy to be analyzed
export const PRESET_COPY = `
Zoetis UltraGuard™ offers instant results with guaranteed protection for all animals.
Our revolutionary solution is proven to be the best treatment for pet care.
Safe for all animals—veterinarian recommended.
Choose Zoetis UltraGuard™ for unparalleled peace of mind.
`;

// Demo compliance alerts mapped to known phrases in preset copy
export const ISSUES = [
  {
    phrase: "guaranteed protection",
    type: "legal",
    message: "Avoid guarantees; compliance risk.",
  },
  {
    phrase: "instant results",
    type: "legal",
    message: "Timing claims require evidence.",
  },
  {
    phrase: "best treatment",
    type: "target",
    message: "Avoid superlatives; may not suit all audiences.",
  },
  {
    phrase: "revolutionary",
    type: "clarity",
    message: "Consider clarifying or providing evidence.",
  },
  {
    phrase: "unparalleled",
    type: "clarity",
    message: "Unsubstantiated claims can be problematic.",
  },
  {
    phrase: "Safe for all animals",
    type: "legal",
    message: "Do not claim universal safety without data.",
  },
];

export const WAIT_MESSAGES = [
  "Making sure things are just right…",
  "Checking for snags in your copy…",
  "Hang tight, almost done!",
  "Running compliance checks…",
  "Reviewing for clarity and compliance…",
];

export function getRandomWaitMessage() {
  return WAIT_MESSAGES[Math.floor(Math.random() * WAIT_MESSAGES.length)];
}

