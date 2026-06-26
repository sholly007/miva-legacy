export const VALID_DEGREE_LEVELS = {
  BACHELORS: "Bachelor's (BSc/BA/BEng/LLB/etc.)",
  MASTERS: "Master's (MSc/MA/MBA/etc.)",
  PHD: "PhD",
  POSTGRAD_DIPLOMA: "Postgraduate Diploma"
} as const;

export type DegreeLevel = typeof VALID_DEGREE_LEVELS[keyof typeof VALID_DEGREE_LEVELS];

export const DEGREE_LEVEL_OPTIONS = [
  { value: VALID_DEGREE_LEVELS.BACHELORS, label: "Bachelor's" },
  { value: VALID_DEGREE_LEVELS.MASTERS, label: "Master's" },
  { value: VALID_DEGREE_LEVELS.PHD, label: "PhD" },
  { value: VALID_DEGREE_LEVELS.POSTGRAD_DIPLOMA, label: "Postgraduate Diploma" },
];
