// Tax-Free Pension Application Stages (17 total)

export interface Stage {
  id: number;
  name: string;
  shortName: string;
  description: string;
}

export const STAGES: Stage[] = [
  {
    id: 1,
    name: "Submitted",
    shortName: "Submitted",
    description: "Your application has been submitted and is being processed.",
  },
  {
    id: 2,
    name: "Part 2 Sent",
    shortName: "Part 2 Sent",
    description: "Part 2 of the application has been sent to you.",
  },
  {
    id: 3,
    name: "Part 2 Completed",
    shortName: "Part 2 Done",
    description: "You have completed Part 2 of the application.",
  },
  {
    id: 4,
    name: "Medical Exam Booked",
    shortName: "Exam Booked",
    description: "Your medical examination has been scheduled.",
  },
  {
    id: 5,
    name: "Medical Exam Completed",
    shortName: "Exam Done",
    description: "Your medical examination has been completed.",
  },
  {
    id: 6,
    name: "Records Ordered",
    shortName: "Records Ordered",
    description: "Medical records have been requested.",
  },
  {
    id: 7,
    name: "Records Received",
    shortName: "Records Received",
    description: "Medical records have been received.",
  },
  {
    id: 8,
    name: "Procedure / Report Outstanding",
    shortName: "Report Pending",
    description: "Additional procedures or reports are pending.",
  },
  {
    id: 9,
    name: "Procedure / Report Completed",
    shortName: "Report Done",
    description: "All required procedures and reports are complete.",
  },
  {
    id: 10,
    name: "News To Deliver To Client",
    shortName: "News Ready",
    description: "We have an update to share with you.",
  },
  {
    id: 11,
    name: "Zoom Call Scheduled (Review)",
    shortName: "Review Call Set",
    description: "A Zoom call has been scheduled to review your application.",
  },
  {
    id: 12,
    name: "Zoom Call Completed (Review)",
    shortName: "Review Call Done",
    description: "The review Zoom call has been completed.",
  },
  {
    id: 13,
    name: "Paperwork Delivered",
    shortName: "Paperwork Sent",
    description: "Final paperwork has been delivered to you.",
  },
  {
    id: 14,
    name: "Zoom Call Scheduled (Signing)",
    shortName: "Sign Call Set",
    description: "A Zoom call has been scheduled for document signing.",
  },
  {
    id: 15,
    name: "Zoom Call Completed (Signing)",
    shortName: "Sign Call Done",
    description: "The signing Zoom call has been completed.",
  },
  {
    id: 16,
    name: "Paperwork Signed",
    shortName: "Signed",
    description: "All paperwork has been signed.",
  },
  {
    id: 17,
    name: "Tax-Free Pension In Force",
    shortName: "Complete",
    description: "Congratulations! Your Tax-Free Pension is now in force.",
  },
];

export const getStageById = (id: number): Stage | undefined => {
  return STAGES.find((stage) => stage.id === id);
};

export const getProgressPercentage = (currentStage: number): number => {
  return Math.round((currentStage / STAGES.length) * 100);
};

export const TOTAL_STAGES = STAGES.length;
