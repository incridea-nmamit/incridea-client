import { SPONSORS } from "~/constants/sponsors";
import { TEAM_MEMBERS } from "~/constants/team";
import { ASSETS } from "~/constants/assets";

const CONSTANT = {
  BASE_URL: "https://incridea.in" as const,
  NMAMIT_COLLEGE_ID: 1,
  PID_FORMAT: "INC25-" as const,
  TID_FORMAT: "T25-" as const,
  YEAR: 2025 as const,
  YEAR_SHORT: 25 as const,
  ASSETS: ASSETS,
  REG_AMOUNT_IN_INR: {
    INTERNAL: 350,
    EXTERNAL: 450,
    OTHER: 1000000000,
  },
  URL: {
    VIDEO: {
      THEME_REVEAL:
        "https://www.instagram.com/reel/DE2IY6FvbTm/?igsh=MTdsbnc1bjMyaXZuYw==",
    },
  },
  // TODO(Omkar): Needs updates
  DATE: {
    ROUND: {
      DEAFULT_START: new Date(2025, 2, 27, 9, 30),
    },
    ACCOMODATION: {
      CHECK_IN_TIME: new Date(2025, 2, 27, 9, 30),
      CHECK_OUT_TIME: new Date(2025, 3, 1, 22, 30),
    },
    INCRIDEA: {
      DAY1: new Date("2025-02-27T09:00:00"),
      DAY2: new Date("2025-02-28T09:00:00"),
      DAY3: new Date("2025-03-01T09:00:00"),
    },
  },
  PID: {
    PRONITE_USER: 669 as const,
    TECH_TEAM: [1, 2, 5, 7, 9, 17, 18, 28, 36, 37, 39, 120, 125, 126, 127, 131, 498, 897, 1095]
  },
  SPONSORS: SPONSORS,
  TEAM_MEMBERS: TEAM_MEMBERS,
};

export { CONSTANT };
