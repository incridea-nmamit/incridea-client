import { ASSETS } from "~/constants/assets";

const CONSTANT = {
  BASE_URL: "https://incridea.in" as const,
  NMAMIT_COLLEGE_ID: 1,
  ROADIES_EVENT_ID: 27 as const,
  PID_FORMAT: "INC25-" as const,
  TID_FORMAT: "T25-" as const,
  YEAR: 2025 as const,
  YEAR_SHORT: 25 as const,
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
  DATE: {
    // FIXME: 0-index dates vs 1-index dates
    ROUND: {
      DEAFULT_START: new Date(2025, 1, 27, 9, 30),
    },
    ACCOMODATION: {
      CHECK_IN_TIME: new Date(2025, 1, 27, 9, 30),
      CHECK_OUT_TIME: new Date(2025, 2, 1, 22, 30),
    },
    INCRIDEA: {
      DAY1: new Date("2025-02-27T09:00:00"),
      DAY2: new Date("2025-02-28T09:00:00"),
      DAY3: new Date("2025-03-01T09:00:00"),
    },
  },
  PID: {
    PRONITE_USER: 669 as const,
    EASTER_PID: [36],
    // TODO(Omkar): Update following, reflects in the leaderboard
    TECH_TEAM: [1, 2, 5, 7, 9, 17, 18, 28, 36, 37, 39, 120, 125, 126, 127, 131, 498, 897, 1095],
    ACCOMMODATION_TEAM: [96, 768, 1652]
  },
  ASSETS: ASSETS,
};

export { CONSTANT };
