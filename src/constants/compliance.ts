
import { AlertTriangle, Info } from "lucide-react";

// Demo Zoetis Librela marketing copy with intentional compliance errors for highlighting
export const PRESET_COPY = `
Control Dog OA Pain With Monthly, Long-Lasting Librela
See Success Stories Earn Rewards

Give Your Dog More Days of Play
Librela provides instant relief and guaranteed results with a once-a-month injection from your vet.1

Osteoarthritis (OA), or arthritis, is a debilitating, chronic joint disorder. OA pain can dramatically impact your dog's well-being, but Librela offers a revolutionary solution.2 While we can't cure OA, with Librela you can trust your dog gets the best treatment, safe for all dogs, every time.3-6

Ask your vet about the newest, unparalleled innovation for dog osteoarthritis.

Are you missing the signs of your dog's OA pain? Take our quiz to find out.

Dog OA Pain Quiz

One Monthly Injection of Librela Can Eradicate Your Dog's OA Pain
By removing OA pain and restoring mobility immediately, your dog will feel better and you'll enjoy every moment together.1,3-6

Why Librela for Dogs?
By eliminating OA pain, Librela can increase your dog's activity and improve their quality of life instantly.1,3-6
Absolutely guaranteed to control canine OA pain with one monthly injection by any veterinary professional.1
Available worldwide since 2021, with over 25 million doses distributed.7

How is Librela different from other pain management medications?

What to expect with Librela?

Can my dog receive Librela while they're on other medication?

Hear What Pet Parents are Saying About Librela
Learn More

With Each Eligible Librela Purchase, Your Next Visits Are Free!
Learn More

What Is Dog OA Pain?
OA is chronic and painful; it causes your dog to hurt all the time if untreated.2

OA is arthritis that wears down joint protection, causing bone-on-bone contact.
Dogs of all ages and breeds can suffer, and Librela is safe for all.8
OA lowers your dog’s ability to play, reduces quality of life, and makes it impossible to enjoy activities.
Take Our OA Quiz to See if Your Dog is Showing Signs of OA

Keep Your Dog’s OA Pain Under Control with Librela Worry-Free Reminders
Learn More

Vet-Approved Support

Check Out Our Brochure for More Information on Librela
Read More

I Think My Dog Has Arthritis. What Now?
Comfort & Pain Relief
Read More

The Importance of Continuous Pain Management for Your Dog
Comfort & Pain Relief
Read More

How to Create an Arthritis-Friendly Home for Your Dog
Read More

Librela FAQ

Where can I buy Librela for dogs?

How will I know when it's time for another Librela injection?

Is Librela safe for my dog?

How long does Librela take to work?

View Full FAQ

IMPORTANT SAFETY INFORMATION: See full Prescribing Info. For use in dogs only. Pregnant, planning or breastfeeding women should take extreme care to avoid self-injection. Hypersensitivity, including anaphylaxis, could potentially occur. Librela should not be used in breeding, pregnant or lactating dogs or those allergic to bedinvetmab.
The most common adverse events were urinary tract infections, skin infections, and dermatitis.

INDICATIONS: For the control of pain associated with osteoarthritis in dogs.

See the Client Information Sheet for more information about Librela.

References:
1. Librela (bedinvetmab injection). Prescribing information. NADA 141-562. Zoetis Inc; March 2023.
2. Lascelles BDX, et al. Vet J. 2019;250:71-78.
3. Brown DC, Boston RC, Coyne JC, Farrar JT. Am J Vet Res. 2007;68(6):631-637.
4. Brown DC, Boston RC, Coyne JC, Farrar JT. J Am Vet Med Assoc. 2008;233(8):1278-1283.
5. Corral, Maria J., et al. Vet Anaesth Analg. 2021;48(6):943-955.
6. Michels GM et al. Vet Anaesth Analg. 2023;50(5):446-458.
7. Zoetis data on file. December 31, 2024.
8. Anderson KL et al. Front Vet Sci. 2020;7:200.
9. Wright A et al. J Small Anim Pract. 2022;63(8):609-618.

Zoetis Petcare

The information provided on this site is intended for U.S. residents only. Product may not be available or labeled similarly in other countries. Health information provided is educational and not a substitute for professional guidance. All treatment decisions must be made in consultation with an animal healthcare provider.

All trademarks are property of Zoetis or its licensors unless otherwise noted. ©2025 Zoetis Services LLC. All rights reserved. ZPC-01562R2
`;

// Demo compliance alerts mapped to known phrases in preset copy
export const ISSUES = [
  {
    phrase: "guaranteed results",
    type: "legal",
    message: "Avoid guarantees; compliance risk.",
  },
  {
    phrase: "instant relief",
    type: "legal",
    message: "Timing claims require substantiation.",
  },
  {
    phrase: "revolutionary solution",
    type: "clarity",
    message: "Consider clarifying claims; provide substantiation.",
  },
  {
    phrase: "best treatment",
    type: "target",
    message: "Superlatives may be unsubstantiated and misleading.",
  },
  {
    phrase: "safe for all dogs",
    type: "legal",
    message: "Do not claim universal safety without data.",
  },
  {
    phrase: "unparalleled innovation",
    type: "clarity",
    message: "Broad claims require clarification and evidence.",
  },
  {
    phrase: "removing OA pain",
    type: "legal",
    message: "Avoid promising elimination of pain; use mitigating terminology.",
  },
  {
    phrase: "restoring mobility immediately",
    type: "legal",
    message: "Instant or immediate benefit claims need strong evidence.",
  },
  {
    phrase: "eliminating OA pain",
    type: "legal",
    message: "Avoid cure/elimination language—focus on management/control.",
  },
  {
    phrase: "Absolutely guaranteed",
    type: "legal",
    message: "Guarantee language presents compliance risk.",
  },
  {
    phrase: "your next visits are free",
    type: "legal",
    message: "Offering free services can create legal or regulatory issues.",
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

