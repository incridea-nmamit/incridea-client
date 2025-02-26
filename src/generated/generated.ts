import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTime: { input: Date; output: Date; }
};

export enum AccommodationBookingStatus {
  Cancelled = 'CANCELLED',
  Confirmed = 'CONFIRMED',
  Pending = 'PENDING'
}

export type AllSubmissions = {
  __typename?: 'AllSubmissions';
  isRight?: Maybe<Scalars['Boolean']['output']>;
  mcqAns?: Maybe<Scalars['String']['output']>;
  options?: Maybe<Array<Option>>;
  qId: Scalars['String']['output'];
  question: Scalars['String']['output'];
  userId: Scalars['String']['output'];
};

export type Avatar = {
  __typename?: 'Avatar';
  name: Scalars['String']['output'];
  url: Scalars['String']['output'];
};

export type Branch = {
  __typename?: 'Branch';
  branchReps: Array<BranchRep>;
  events: Array<Event>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
};

export type BranchRep = {
  __typename?: 'BranchRep';
  branchId: Scalars['ID']['output'];
  user: User;
  userId: Scalars['ID']['output'];
};

export type Card = {
  __typename?: 'Card';
  clue: Scalars['String']['output'];
  day: DayType;
  id: Scalars['ID']['output'];
  submissions: Array<Submission>;
};

export type ChampionshipPoint = {
  __typename?: 'ChampionshipPoint';
  bronzeCount: Counts;
  championshipPoints: Scalars['Int']['output'];
  coreCount: Scalars['Int']['output'];
  diamondCount: Counts;
  goldCount: Counts;
  id: Scalars['Int']['output'];
  isEligible: Scalars['Boolean']['output'];
  name: Scalars['String']['output'];
  nonTechCount: Scalars['Int']['output'];
  silverCount: Counts;
  techCount: Scalars['Int']['output'];
};

export type College = {
  __typename?: 'College';
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
};

export enum CollegeType {
  Engineering = 'ENGINEERING',
  NonEngineering = 'NON_ENGINEERING',
  Other = 'OTHER'
}

export type Comments = {
  __typename?: 'Comments';
  comment: Scalars['String']['output'];
  eventId: Scalars['ID']['output'];
  judge: Judge;
  round: Round;
  roundNo: Scalars['Int']['output'];
  team: Team;
  teamId: Scalars['ID']['output'];
};

export type CoreTeamMember = {
  __typename?: 'CoreTeamMember';
  committee: Scalars['String']['output'];
  designation: Scalars['String']['output'];
  email: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  imageUrl?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  phone: Scalars['String']['output'];
};

export type Counts = {
  __typename?: 'Counts';
  runner_up: Scalars['Int']['output'];
  second_runner_up: Scalars['Int']['output'];
  winner: Scalars['Int']['output'];
};

export type CreateCriteriaInput = {
  eventId: Scalars['ID']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  roundNo: Scalars['Int']['input'];
  type?: InputMaybe<CriteriaType>;
};

export type Criteria = {
  __typename?: 'Criteria';
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  type: CriteriaType;
};

export type CriteriaJuryView = {
  __typename?: 'CriteriaJuryView';
  criteriaId: Scalars['Int']['output'];
  criteriaName: Scalars['String']['output'];
  criteriaType: CriteriaType;
  score: Scalars['Float']['output'];
};

export enum CriteriaType {
  Number = 'NUMBER',
  Text = 'TEXT',
  Time = 'TIME'
}

export enum DayType {
  Day1 = 'Day1',
  Day2 = 'Day2',
  Day3 = 'Day3',
  Day4 = 'Day4'
}

export type Error = {
  __typename?: 'Error';
  message: Scalars['String']['output'];
};

export type Event = {
  __typename?: 'Event';
  branch: Branch;
  category: EventCategory;
  description?: Maybe<Scalars['String']['output']>;
  eventType: EventType;
  fees: Scalars['Int']['output'];
  id: Scalars['ID']['output'];
  image?: Maybe<Scalars['String']['output']>;
  maxTeamSize: Scalars['Int']['output'];
  maxTeams?: Maybe<Scalars['Int']['output']>;
  minTeamSize: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  organizers: Array<Organizer>;
  published: Scalars['Boolean']['output'];
  rounds: Array<Round>;
  teams: Array<Team>;
  venue?: Maybe<Scalars['String']['output']>;
  winner?: Maybe<Array<Winners>>;
};

export enum EventCategory {
  Core = 'CORE',
  NonTechnical = 'NON_TECHNICAL',
  Special = 'SPECIAL',
  Technical = 'TECHNICAL'
}

export type EventCreateInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  eventType?: InputMaybe<EventType>;
  name: Scalars['String']['input'];
  venue?: InputMaybe<Scalars['String']['input']>;
};

export type EventPaymentOrder = {
  __typename?: 'EventPaymentOrder';
  Team: Team;
  amount: Scalars['Int']['output'];
  id: Scalars['ID']['output'];
  orderId: Scalars['ID']['output'];
  status: Status;
};

export type EventRegistrationsCount = {
  __typename?: 'EventRegistrationsCount';
  externalRegistrations: Scalars['Int']['output'];
  internalRegistrations: Scalars['Int']['output'];
};

export type EventStatus = {
  __typename?: 'EventStatus';
  eventName: Scalars['String']['output'];
  status: Scalars['String']['output'];
};

export enum EventType {
  Individual = 'INDIVIDUAL',
  IndividualMultipleEntry = 'INDIVIDUAL_MULTIPLE_ENTRY',
  Team = 'TEAM',
  TeamMultipleEntry = 'TEAM_MULTIPLE_ENTRY'
}

export type EventUpdateInput = {
  category?: InputMaybe<EventCategory>;
  description?: InputMaybe<Scalars['String']['input']>;
  eventDate?: InputMaybe<Scalars['DateTime']['input']>;
  eventType?: InputMaybe<EventType>;
  fees?: InputMaybe<Scalars['Int']['input']>;
  image?: InputMaybe<Scalars['String']['input']>;
  maxTeamSize?: InputMaybe<Scalars['Int']['input']>;
  maxTeams?: InputMaybe<Scalars['Int']['input']>;
  minTeamSize?: InputMaybe<Scalars['Int']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  venue?: InputMaybe<Scalars['String']['input']>;
};

export enum Gender {
  Female = 'FEMALE',
  Male = 'MALE',
  Other = 'OTHER'
}

export type Hotel = {
  __typename?: 'Hotel';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  details?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  price: Scalars['Int']['output'];
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type Judge = {
  __typename?: 'Judge';
  round: Round;
  user: User;
};

export type JudgeJuryView = {
  __typename?: 'JudgeJuryView';
  criteria: Array<CriteriaJuryView>;
  judgeId: Scalars['Int']['output'];
  judgeName: Scalars['String']['output'];
};

export type Level = {
  __typename?: 'Level';
  id: Scalars['ID']['output'];
  point: Scalars['Int']['output'];
  xp: Array<Xp>;
};

export type Mutation = {
  __typename?: 'Mutation';
  addAccommodationRequest: MutationAddAccommodationRequestResult;
  addBranch: MutationAddBranchResult;
  addBranchRep: MutationAddBranchRepResult;
  addComment: MutationAddCommentResult;
  addLevel: MutationAddLevelResult;
  addOrganizer: MutationAddOrganizerResult;
  addScore: MutationAddScoreResult;
  addXP: MutationAddXpResult;
  changeSelectStatus: MutationChangeSelectStatusResult;
  completeRoadiesRound: MutationCompleteRoadiesRoundResult;
  completeRound: MutationCompleteRoundResult;
  confirmTeam: MutationConfirmTeamResult;
  createCard: MutationCreateCardResult;
  createCollege: MutationCreateCollegeResult;
  createCriteria: MutationCreateCriteriaResult;
  createEvent: MutationCreateEventResult;
  createHotel: MutationCreateHotelResult;
  createJudge: MutationCreateJudgeResult;
  createPaymentOrder: MutationCreatePaymentOrderResult;
  createQuestion: MutationCreateQuestionResult;
  createQuiz: MutationCreateQuizResult;
  createRound: MutationCreateRoundResult;
  createSubmission: MutationCreateSubmissionResult;
  createTeam: MutationCreateTeamResult;
  createWinner: MutationCreateWinnerResult;
  deleteCard: MutationDeleteCardResult;
  deleteCriteria: MutationDeleteCriteriaResult;
  deleteEvent: MutationDeleteEventResult;
  deleteHotel: MutationDeleteHotelResult;
  deleteJudge: MutationDeleteJudgeResult;
  deleteRound: MutationDeleteRoundResult;
  deleteTeam: MutationDeleteTeamResult;
  deleteWinner: MutationDeleteWinnerResult;
  endQuiz: MutationEndQuizResult;
  eventPaymentOrder: MutationEventPaymentOrderResult;
  joinTeam: MutationJoinTeamResult;
  leaveTeam: MutationLeaveTeamResult;
  login: MutationLoginResult;
  notifyParticipants: MutationNotifyParticipantsResult;
  organizerAddTeamMember: MutationOrganizerAddTeamMemberResult;
  organizerCreateTeam: MutationOrganizerCreateTeamResult;
  organizerDeleteTeam: MutationOrganizerDeleteTeamResult;
  organizerDeleteTeamMember: MutationOrganizerDeleteTeamMemberResult;
  organizerMarkAttendance: MutationOrganizerMarkAttendanceResult;
  organizerMarkAttendanceSolo: MutationOrganizerMarkAttendanceSoloResult;
  organizerRegisterSolo: MutationOrganizerRegisterSoloResult;
  promoteQuizParticipants: MutationPromoteQuizParticipantsResult;
  promoteToNextRound: MutationPromoteToNextRoundResult;
  publishEvent: MutationPublishEventResult;
  /** Refreshes the access token */
  refreshToken: MutationRefreshTokenResult;
  registerPronite: MutationRegisterProniteResult;
  registerSoloEvent: MutationRegisterSoloEventResult;
  removeBranchRep: MutationRemoveBranchRepResult;
  removeCollege: MutationRemoveCollegeResult;
  removeOrganizer: MutationRemoveOrganizerResult;
  removeTeamMember: MutationRemoveTeamMemberResult;
  resetPassword: MutationResetPasswordResult;
  sendEmailVerification: MutationSendEmailVerificationResult;
  sendPasswordResetEmail: MutationSendPasswordResetEmailResult;
  sendWinnerWhatsAppNotification: MutationSendWinnerWhatsAppNotificationResult;
  signUp: MutationSignUpResult;
  submitQuiz: MutationSubmitQuizResult;
  toggleRegistrationsOpen: MutationToggleRegistrationsOpenResult;
  updateCard: MutationUpdateCardResult;
  updateEvent: MutationUpdateEventResult;
  updateProfileImage: MutationUpdateProfileImageResult;
  updateQuiz: MutationUpdateQuizResult;
  updateQuizFlag: MutationUpdateQuizFlagResult;
  updateQuizStatus: MutationUpdateQuizStatusResult;
  updateStatus: MutationUpdateStatusResult;
  updateStoneVisibilities: MutationUpdateStoneVisibilitiesResult;
  useReferralCode: MutationUseReferralCodeResult;
  verifyEmail: MutationVerifyEmailResult;
};


export type MutationAddAccommodationRequestArgs = {
  IdCard: Scalars['String']['input'];
  checkIn: Scalars['DateTime']['input'];
  checkOut: Scalars['DateTime']['input'];
  gender: Scalars['String']['input'];
  hotelId: Scalars['Int']['input'];
};


export type MutationAddBranchArgs = {
  name: Scalars['String']['input'];
};


export type MutationAddBranchRepArgs = {
  branchId: Scalars['ID']['input'];
  userId: Scalars['ID']['input'];
};


export type MutationAddCommentArgs = {
  comment: Scalars['String']['input'];
  eventId: Scalars['Int']['input'];
  roundNo: Scalars['Int']['input'];
  teamId: Scalars['Int']['input'];
};


export type MutationAddLevelArgs = {
  point: Scalars['Int']['input'];
};


export type MutationAddOrganizerArgs = {
  eventId: Scalars['ID']['input'];
  userId: Scalars['ID']['input'];
};


export type MutationAddScoreArgs = {
  criteriaId: Scalars['Int']['input'];
  score: Scalars['String']['input'];
  teamId: Scalars['Int']['input'];
};


export type MutationAddXpArgs = {
  levelId: Scalars['ID']['input'];
};


export type MutationChangeSelectStatusArgs = {
  eventId: Scalars['ID']['input'];
  roundNo: Scalars['Int']['input'];
};


export type MutationCompleteRoadiesRoundArgs = {
  eventId: Scalars['ID']['input'];
  roundNo: Scalars['ID']['input'];
};


export type MutationCompleteRoundArgs = {
  eventId: Scalars['ID']['input'];
  roundNo: Scalars['Int']['input'];
};


export type MutationConfirmTeamArgs = {
  teamId: Scalars['ID']['input'];
};


export type MutationCreateCardArgs = {
  clue: Scalars['String']['input'];
  day: DayType;
};


export type MutationCreateCollegeArgs = {
  details?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
};


export type MutationCreateCriteriaArgs = {
  data: CreateCriteriaInput;
};


export type MutationCreateEventArgs = {
  data: EventCreateInput;
};


export type MutationCreateHotelArgs = {
  details: Scalars['String']['input'];
  name: Scalars['String']['input'];
  price: Scalars['Float']['input'];
};


export type MutationCreateJudgeArgs = {
  email: Scalars['String']['input'];
  eventId: Scalars['ID']['input'];
  name: Scalars['String']['input'];
  password: Scalars['String']['input'];
  roundNo: Scalars['Int']['input'];
};


export type MutationCreatePaymentOrderArgs = {
  type: OrderType;
};


export type MutationCreateQuestionArgs = {
  description?: InputMaybe<Scalars['String']['input']>;
  image?: InputMaybe<Scalars['String']['input']>;
  isCode?: InputMaybe<Scalars['Boolean']['input']>;
  options?: InputMaybe<Array<OptionsCreateInput2>>;
  question: Scalars['String']['input'];
  quizId: Scalars['String']['input'];
  type?: InputMaybe<Scalars['String']['input']>;
};


export type MutationCreateQuizArgs = {
  description?: InputMaybe<Scalars['String']['input']>;
  endTime: Scalars['String']['input'];
  eventId: Scalars['String']['input'];
  name: Scalars['String']['input'];
  overridePassword: Scalars['String']['input'];
  password: Scalars['String']['input'];
  points: Scalars['Int']['input'];
  qualifyNext: Scalars['Int']['input'];
  roundId: Scalars['String']['input'];
  startTime: Scalars['String']['input'];
};


export type MutationCreateRoundArgs = {
  date: Scalars['DateTime']['input'];
  eventId: Scalars['ID']['input'];
};


export type MutationCreateSubmissionArgs = {
  cardId: Scalars['Int']['input'];
  image: Scalars['String']['input'];
};


export type MutationCreateTeamArgs = {
  eventId: Scalars['ID']['input'];
  name: Scalars['String']['input'];
};


export type MutationCreateWinnerArgs = {
  eventId: Scalars['ID']['input'];
  teamId: Scalars['ID']['input'];
  type: WinnerType;
};


export type MutationDeleteCardArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteCriteriaArgs = {
  criteriaId: Scalars['ID']['input'];
  eventId: Scalars['ID']['input'];
  roundNo: Scalars['Int']['input'];
};


export type MutationDeleteEventArgs = {
  id: Scalars['Int']['input'];
};


export type MutationDeleteHotelArgs = {
  hotelId: Scalars['String']['input'];
};


export type MutationDeleteJudgeArgs = {
  eventId: Scalars['ID']['input'];
  roundNo: Scalars['Int']['input'];
  userId: Scalars['ID']['input'];
};


export type MutationDeleteRoundArgs = {
  eventId: Scalars['ID']['input'];
};


export type MutationDeleteTeamArgs = {
  teamId: Scalars['ID']['input'];
};


export type MutationDeleteWinnerArgs = {
  id: Scalars['ID']['input'];
};


export type MutationEndQuizArgs = {
  quizId: Scalars['String']['input'];
};


export type MutationEventPaymentOrderArgs = {
  teamId: Scalars['ID']['input'];
};


export type MutationJoinTeamArgs = {
  teamId: Scalars['ID']['input'];
};


export type MutationLeaveTeamArgs = {
  teamId: Scalars['ID']['input'];
};


export type MutationLoginArgs = {
  data: UserLoginInput;
};


export type MutationNotifyParticipantsArgs = {
  eventId: Scalars['ID']['input'];
  roundNo: Scalars['Int']['input'];
};


export type MutationOrganizerAddTeamMemberArgs = {
  teamId: Scalars['ID']['input'];
  userId: Scalars['ID']['input'];
};


export type MutationOrganizerCreateTeamArgs = {
  eventId: Scalars['ID']['input'];
  name: Scalars['String']['input'];
};


export type MutationOrganizerDeleteTeamArgs = {
  teamId: Scalars['ID']['input'];
};


export type MutationOrganizerDeleteTeamMemberArgs = {
  teamId: Scalars['ID']['input'];
  userId: Scalars['ID']['input'];
};


export type MutationOrganizerMarkAttendanceArgs = {
  attended?: Scalars['Boolean']['input'];
  teamId: Scalars['ID']['input'];
};


export type MutationOrganizerMarkAttendanceSoloArgs = {
  attended?: Scalars['Boolean']['input'];
  eventId: Scalars['ID']['input'];
  userId: Scalars['ID']['input'];
};


export type MutationOrganizerRegisterSoloArgs = {
  eventId: Scalars['ID']['input'];
  userId: Scalars['ID']['input'];
};


export type MutationPromoteQuizParticipantsArgs = {
  eventId: Scalars['Int']['input'];
  quizId: Scalars['String']['input'];
  roundId: Scalars['Int']['input'];
  teams: Array<Scalars['Int']['input']>;
};


export type MutationPromoteToNextRoundArgs = {
  roundNo: Scalars['ID']['input'];
  selected?: Scalars['Boolean']['input'];
  teamId: Scalars['ID']['input'];
};


export type MutationPublishEventArgs = {
  id: Scalars['ID']['input'];
  published: Scalars['Boolean']['input'];
};


export type MutationRefreshTokenArgs = {
  refreshToken: Scalars['String']['input'];
};


export type MutationRegisterProniteArgs = {
  userId?: InputMaybe<Scalars['ID']['input']>;
};


export type MutationRegisterSoloEventArgs = {
  eventId: Scalars['ID']['input'];
};


export type MutationRemoveBranchRepArgs = {
  branchId: Scalars['ID']['input'];
  userId: Scalars['ID']['input'];
};


export type MutationRemoveCollegeArgs = {
  id: Scalars['ID']['input'];
};


export type MutationRemoveOrganizerArgs = {
  eventId: Scalars['ID']['input'];
  userId: Scalars['ID']['input'];
};


export type MutationRemoveTeamMemberArgs = {
  teamId: Scalars['ID']['input'];
  userId: Scalars['ID']['input'];
};


export type MutationResetPasswordArgs = {
  password: Scalars['String']['input'];
  token: Scalars['String']['input'];
};


export type MutationSendEmailVerificationArgs = {
  email: Scalars['String']['input'];
};


export type MutationSendPasswordResetEmailArgs = {
  email: Scalars['String']['input'];
};


export type MutationSendWinnerWhatsAppNotificationArgs = {
  date: Scalars['String']['input'];
  eventId: Scalars['ID']['input'];
  fromTime: Scalars['String']['input'];
  location: Scalars['String']['input'];
  toTime: Scalars['String']['input'];
};


export type MutationSignUpArgs = {
  data: UserCreateInput;
};


export type MutationSubmitQuizArgs = {
  quizId: Scalars['String']['input'];
  selectedAnswers: Array<SelectedOptions>;
  teamId: Scalars['Int']['input'];
  timeTaken: Scalars['Float']['input'];
};


export type MutationUpdateCardArgs = {
  clue: Scalars['String']['input'];
  day: DayType;
  id: Scalars['ID']['input'];
};


export type MutationUpdateEventArgs = {
  data: EventUpdateInput;
  id: Scalars['ID']['input'];
};


export type MutationUpdateProfileImageArgs = {
  imageURL: Scalars['String']['input'];
};


export type MutationUpdateQuizArgs = {
  questions: Array<QuestionsCreateInput>;
  quizId: Scalars['String']['input'];
};


export type MutationUpdateQuizFlagArgs = {
  allowUser: Scalars['Boolean']['input'];
  flags: Scalars['Int']['input'];
  quizId: Scalars['String']['input'];
  teamId: Scalars['Int']['input'];
};


export type MutationUpdateQuizStatusArgs = {
  allowAttempts: Scalars['Boolean']['input'];
  quizId: Scalars['String']['input'];
};


export type MutationUpdateStatusArgs = {
  bookingId: Scalars['String']['input'];
  hotelId: Scalars['String']['input'];
  room: Scalars['String']['input'];
  status: Scalars['String']['input'];
};


export type MutationUpdateStoneVisibilitiesArgs = {
  stoneVisibilities: Scalars['String']['input'];
};


export type MutationUseReferralCodeArgs = {
  referralCode: Scalars['String']['input'];
};


export type MutationVerifyEmailArgs = {
  token: Scalars['String']['input'];
};

export type MutationAddAccommodationRequestResult = Error | MutationAddAccommodationRequestSuccess;

export type MutationAddAccommodationRequestSuccess = {
  __typename?: 'MutationAddAccommodationRequestSuccess';
  data: UserInHotel;
};

export type MutationAddBranchRepResult = Error | MutationAddBranchRepSuccess;

export type MutationAddBranchRepSuccess = {
  __typename?: 'MutationAddBranchRepSuccess';
  data: BranchRep;
};

export type MutationAddBranchResult = Error | MutationAddBranchSuccess;

export type MutationAddBranchSuccess = {
  __typename?: 'MutationAddBranchSuccess';
  data: Branch;
};

export type MutationAddCommentResult = Error | MutationAddCommentSuccess;

export type MutationAddCommentSuccess = {
  __typename?: 'MutationAddCommentSuccess';
  data: Comments;
};

export type MutationAddLevelResult = Error | MutationAddLevelSuccess;

export type MutationAddLevelSuccess = {
  __typename?: 'MutationAddLevelSuccess';
  data: Level;
};

export type MutationAddOrganizerResult = Error | MutationAddOrganizerSuccess;

export type MutationAddOrganizerSuccess = {
  __typename?: 'MutationAddOrganizerSuccess';
  data: Organizer;
};

export type MutationAddScoreResult = Error | MutationAddScoreSuccess;

export type MutationAddScoreSuccess = {
  __typename?: 'MutationAddScoreSuccess';
  data: Scores;
};

export type MutationAddXpResult = Error | MutationAddXpSuccess;

export type MutationAddXpSuccess = {
  __typename?: 'MutationAddXPSuccess';
  data: Xp;
};

export type MutationChangeSelectStatusResult = Error | MutationChangeSelectStatusSuccess;

export type MutationChangeSelectStatusSuccess = {
  __typename?: 'MutationChangeSelectStatusSuccess';
  data: Round;
};

export type MutationCompleteRoadiesRoundResult = Error | MutationCompleteRoadiesRoundSuccess;

export type MutationCompleteRoadiesRoundSuccess = {
  __typename?: 'MutationCompleteRoadiesRoundSuccess';
  data: Array<Team>;
};

export type MutationCompleteRoundResult = Error | MutationCompleteRoundSuccess;

export type MutationCompleteRoundSuccess = {
  __typename?: 'MutationCompleteRoundSuccess';
  data: Round;
};

export type MutationConfirmTeamResult = Error | MutationConfirmTeamSuccess;

export type MutationConfirmTeamSuccess = {
  __typename?: 'MutationConfirmTeamSuccess';
  data: Team;
};

export type MutationCreateCardResult = Error | MutationCreateCardSuccess;

export type MutationCreateCardSuccess = {
  __typename?: 'MutationCreateCardSuccess';
  data: Card;
};

export type MutationCreateCollegeResult = Error | MutationCreateCollegeSuccess;

export type MutationCreateCollegeSuccess = {
  __typename?: 'MutationCreateCollegeSuccess';
  data: College;
};

export type MutationCreateCriteriaResult = Error | MutationCreateCriteriaSuccess;

export type MutationCreateCriteriaSuccess = {
  __typename?: 'MutationCreateCriteriaSuccess';
  data: Criteria;
};

export type MutationCreateEventResult = Error | MutationCreateEventSuccess;

export type MutationCreateEventSuccess = {
  __typename?: 'MutationCreateEventSuccess';
  data: Event;
};

export type MutationCreateHotelResult = Error | MutationCreateHotelSuccess;

export type MutationCreateHotelSuccess = {
  __typename?: 'MutationCreateHotelSuccess';
  data: Hotel;
};

export type MutationCreateJudgeResult = Error | MutationCreateJudgeSuccess;

export type MutationCreateJudgeSuccess = {
  __typename?: 'MutationCreateJudgeSuccess';
  data: Judge;
};

export type MutationCreatePaymentOrderResult = Error | MutationCreatePaymentOrderSuccess;

export type MutationCreatePaymentOrderSuccess = {
  __typename?: 'MutationCreatePaymentOrderSuccess';
  data: PaymentOrder;
};

export type MutationCreateQuestionResult = Error | MutationCreateQuestionSuccess;

export type MutationCreateQuestionSuccess = {
  __typename?: 'MutationCreateQuestionSuccess';
  data: Question;
};

export type MutationCreateQuizResult = Error | MutationCreateQuizSuccess;

export type MutationCreateQuizSuccess = {
  __typename?: 'MutationCreateQuizSuccess';
  data: Quiz;
};

export type MutationCreateRoundResult = Error | MutationCreateRoundSuccess;

export type MutationCreateRoundSuccess = {
  __typename?: 'MutationCreateRoundSuccess';
  data: Round;
};

export type MutationCreateSubmissionResult = Error | MutationCreateSubmissionSuccess;

export type MutationCreateSubmissionSuccess = {
  __typename?: 'MutationCreateSubmissionSuccess';
  data: Submission;
};

export type MutationCreateTeamResult = Error | MutationCreateTeamSuccess;

export type MutationCreateTeamSuccess = {
  __typename?: 'MutationCreateTeamSuccess';
  data: Team;
};

export type MutationCreateWinnerResult = Error | MutationCreateWinnerSuccess;

export type MutationCreateWinnerSuccess = {
  __typename?: 'MutationCreateWinnerSuccess';
  data: Winners;
};

export type MutationDeleteCardResult = Error | MutationDeleteCardSuccess;

export type MutationDeleteCardSuccess = {
  __typename?: 'MutationDeleteCardSuccess';
  data: Card;
};

export type MutationDeleteCriteriaResult = Error | MutationDeleteCriteriaSuccess;

export type MutationDeleteCriteriaSuccess = {
  __typename?: 'MutationDeleteCriteriaSuccess';
  data: Criteria;
};

export type MutationDeleteEventResult = Error | MutationDeleteEventSuccess;

export type MutationDeleteEventSuccess = {
  __typename?: 'MutationDeleteEventSuccess';
  data: Scalars['String']['output'];
};

export type MutationDeleteHotelResult = Error | MutationDeleteHotelSuccess;

export type MutationDeleteHotelSuccess = {
  __typename?: 'MutationDeleteHotelSuccess';
  data: Hotel;
};

export type MutationDeleteJudgeResult = Error | MutationDeleteJudgeSuccess;

export type MutationDeleteJudgeSuccess = {
  __typename?: 'MutationDeleteJudgeSuccess';
  data: Judge;
};

export type MutationDeleteRoundResult = Error | MutationDeleteRoundSuccess;

export type MutationDeleteRoundSuccess = {
  __typename?: 'MutationDeleteRoundSuccess';
  data: Round;
};

export type MutationDeleteTeamResult = Error | MutationDeleteTeamSuccess;

export type MutationDeleteTeamSuccess = {
  __typename?: 'MutationDeleteTeamSuccess';
  data: Team;
};

export type MutationDeleteWinnerResult = Error | MutationDeleteWinnerSuccess;

export type MutationDeleteWinnerSuccess = {
  __typename?: 'MutationDeleteWinnerSuccess';
  data: Winners;
};

export type MutationEndQuizResult = Error | MutationEndQuizSuccess;

export type MutationEndQuizSuccess = {
  __typename?: 'MutationEndQuizSuccess';
  data: Quiz;
};

export type MutationEventPaymentOrderResult = Error | MutationEventPaymentOrderSuccess;

export type MutationEventPaymentOrderSuccess = {
  __typename?: 'MutationEventPaymentOrderSuccess';
  data: EventPaymentOrder;
};

export type MutationJoinTeamResult = Error | MutationJoinTeamSuccess;

export type MutationJoinTeamSuccess = {
  __typename?: 'MutationJoinTeamSuccess';
  data: TeamMember;
};

export type MutationLeaveTeamResult = Error | MutationLeaveTeamSuccess;

export type MutationLeaveTeamSuccess = {
  __typename?: 'MutationLeaveTeamSuccess';
  data: TeamMember;
};

export type MutationLoginResult = Error | MutationLoginSuccess;

export type MutationLoginSuccess = {
  __typename?: 'MutationLoginSuccess';
  data: UserLoginPayload;
};

export type MutationNotifyParticipantsResult = Error | MutationNotifyParticipantsSuccess;

export type MutationNotifyParticipantsSuccess = {
  __typename?: 'MutationNotifyParticipantsSuccess';
  data: Scalars['String']['output'];
};

export type MutationOrganizerAddTeamMemberResult = Error | MutationOrganizerAddTeamMemberSuccess;

export type MutationOrganizerAddTeamMemberSuccess = {
  __typename?: 'MutationOrganizerAddTeamMemberSuccess';
  data: TeamMember;
};

export type MutationOrganizerCreateTeamResult = Error | MutationOrganizerCreateTeamSuccess;

export type MutationOrganizerCreateTeamSuccess = {
  __typename?: 'MutationOrganizerCreateTeamSuccess';
  data: Team;
};

export type MutationOrganizerDeleteTeamMemberResult = Error | MutationOrganizerDeleteTeamMemberSuccess;

export type MutationOrganizerDeleteTeamMemberSuccess = {
  __typename?: 'MutationOrganizerDeleteTeamMemberSuccess';
  data: TeamMember;
};

export type MutationOrganizerDeleteTeamResult = Error | MutationOrganizerDeleteTeamSuccess;

export type MutationOrganizerDeleteTeamSuccess = {
  __typename?: 'MutationOrganizerDeleteTeamSuccess';
  data: Team;
};

export type MutationOrganizerMarkAttendanceResult = Error | MutationOrganizerMarkAttendanceSuccess;

export type MutationOrganizerMarkAttendanceSoloResult = Error | MutationOrganizerMarkAttendanceSoloSuccess;

export type MutationOrganizerMarkAttendanceSoloSuccess = {
  __typename?: 'MutationOrganizerMarkAttendanceSoloSuccess';
  data: Scalars['Int']['output'];
};

export type MutationOrganizerMarkAttendanceSuccess = {
  __typename?: 'MutationOrganizerMarkAttendanceSuccess';
  data: Team;
};

export type MutationOrganizerRegisterSoloResult = Error | MutationOrganizerRegisterSoloSuccess;

export type MutationOrganizerRegisterSoloSuccess = {
  __typename?: 'MutationOrganizerRegisterSoloSuccess';
  data: Team;
};

export type MutationPromoteQuizParticipantsResult = Error | MutationPromoteQuizParticipantsSuccess;

export type MutationPromoteQuizParticipantsSuccess = {
  __typename?: 'MutationPromoteQuizParticipantsSuccess';
  data: Quiz;
};

export type MutationPromoteToNextRoundResult = Error | MutationPromoteToNextRoundSuccess;

export type MutationPromoteToNextRoundSuccess = {
  __typename?: 'MutationPromoteToNextRoundSuccess';
  data: Team;
};

export type MutationPublishEventResult = Error | MutationPublishEventSuccess;

export type MutationPublishEventSuccess = {
  __typename?: 'MutationPublishEventSuccess';
  data: Scalars['String']['output'];
};

export type MutationRefreshTokenResult = Error | MutationRefreshTokenSuccess;

export type MutationRefreshTokenSuccess = {
  __typename?: 'MutationRefreshTokenSuccess';
  data: UserLoginPayload;
};

export type MutationRegisterProniteResult = Error | MutationRegisterProniteSuccess;

export type MutationRegisterProniteSuccess = {
  __typename?: 'MutationRegisterProniteSuccess';
  data: ProniteRegistration;
};

export type MutationRegisterSoloEventResult = Error | MutationRegisterSoloEventSuccess;

export type MutationRegisterSoloEventSuccess = {
  __typename?: 'MutationRegisterSoloEventSuccess';
  data: Team;
};

export type MutationRemoveBranchRepResult = Error | MutationRemoveBranchRepSuccess;

export type MutationRemoveBranchRepSuccess = {
  __typename?: 'MutationRemoveBranchRepSuccess';
  data: Scalars['String']['output'];
};

export type MutationRemoveCollegeResult = Error | MutationRemoveCollegeSuccess;

export type MutationRemoveCollegeSuccess = {
  __typename?: 'MutationRemoveCollegeSuccess';
  data: Scalars['String']['output'];
};

export type MutationRemoveOrganizerResult = Error | MutationRemoveOrganizerSuccess;

export type MutationRemoveOrganizerSuccess = {
  __typename?: 'MutationRemoveOrganizerSuccess';
  data: Scalars['String']['output'];
};

export type MutationRemoveTeamMemberResult = Error | MutationRemoveTeamMemberSuccess;

export type MutationRemoveTeamMemberSuccess = {
  __typename?: 'MutationRemoveTeamMemberSuccess';
  data: TeamMember;
};

export type MutationResetPasswordResult = Error | MutationResetPasswordSuccess;

export type MutationResetPasswordSuccess = {
  __typename?: 'MutationResetPasswordSuccess';
  data: User;
};

export type MutationSendEmailVerificationResult = Error | MutationSendEmailVerificationSuccess;

export type MutationSendEmailVerificationSuccess = {
  __typename?: 'MutationSendEmailVerificationSuccess';
  data: Scalars['String']['output'];
};

export type MutationSendPasswordResetEmailResult = Error | MutationSendPasswordResetEmailSuccess;

export type MutationSendPasswordResetEmailSuccess = {
  __typename?: 'MutationSendPasswordResetEmailSuccess';
  data: Scalars['String']['output'];
};

export type MutationSendWinnerWhatsAppNotificationResult = Error | MutationSendWinnerWhatsAppNotificationSuccess;

export type MutationSendWinnerWhatsAppNotificationSuccess = {
  __typename?: 'MutationSendWinnerWhatsAppNotificationSuccess';
  data: Scalars['String']['output'];
};

export type MutationSignUpResult = Error | MutationSignUpSuccess;

export type MutationSignUpSuccess = {
  __typename?: 'MutationSignUpSuccess';
  data: User;
};

export type MutationSubmitQuizResult = Error | MutationSubmitQuizSuccess;

export type MutationSubmitQuizSuccess = {
  __typename?: 'MutationSubmitQuizSuccess';
  data: QuizScore;
};

export type MutationToggleRegistrationsOpenResult = Error | MutationToggleRegistrationsOpenSuccess;

export type MutationToggleRegistrationsOpenSuccess = {
  __typename?: 'MutationToggleRegistrationsOpenSuccess';
  data: ServerSettings;
};

export type MutationUpdateCardResult = Error | MutationUpdateCardSuccess;

export type MutationUpdateCardSuccess = {
  __typename?: 'MutationUpdateCardSuccess';
  data: Card;
};

export type MutationUpdateEventResult = Error | MutationUpdateEventSuccess;

export type MutationUpdateEventSuccess = {
  __typename?: 'MutationUpdateEventSuccess';
  data: Event;
};

export type MutationUpdateProfileImageResult = Error | MutationUpdateProfileImageSuccess;

export type MutationUpdateProfileImageSuccess = {
  __typename?: 'MutationUpdateProfileImageSuccess';
  data: User;
};

export type MutationUpdateQuizFlagResult = Error | MutationUpdateQuizFlagSuccess;

export type MutationUpdateQuizFlagSuccess = {
  __typename?: 'MutationUpdateQuizFlagSuccess';
  data: QuizScore;
};

export type MutationUpdateQuizResult = Error | MutationUpdateQuizSuccess;

export type MutationUpdateQuizStatusResult = Error | MutationUpdateQuizStatusSuccess;

export type MutationUpdateQuizStatusSuccess = {
  __typename?: 'MutationUpdateQuizStatusSuccess';
  data: Quiz;
};

export type MutationUpdateQuizSuccess = {
  __typename?: 'MutationUpdateQuizSuccess';
  data: Quiz;
};

export type MutationUpdateStatusResult = Error | MutationUpdateStatusSuccess;

export type MutationUpdateStatusSuccess = {
  __typename?: 'MutationUpdateStatusSuccess';
  data: UserInHotel;
};

export type MutationUpdateStoneVisibilitiesResult = Error | MutationUpdateStoneVisibilitiesSuccess;

export type MutationUpdateStoneVisibilitiesSuccess = {
  __typename?: 'MutationUpdateStoneVisibilitiesSuccess';
  data: User;
};

export type MutationUseReferralCodeResult = Error | MutationUseReferralCodeSuccess;

export type MutationUseReferralCodeSuccess = {
  __typename?: 'MutationUseReferralCodeSuccess';
  data: User;
};

export type MutationVerifyEmailResult = Error | MutationVerifyEmailSuccess;

export type MutationVerifyEmailSuccess = {
  __typename?: 'MutationVerifyEmailSuccess';
  data: User;
};

export type Option = {
  __typename?: 'Option';
  answer: Scalars['String']['output'];
  id: Scalars['String']['output'];
};

export type Options = {
  __typename?: 'Options';
  QuizSubmissions: Array<QuizSubmission>;
  id: Scalars['ID']['output'];
  isAnswer: Scalars['Boolean']['output'];
  question: Question;
  questionId: Scalars['ID']['output'];
  value: Scalars['String']['output'];
};

export type OptionsCreateInput = {
  isAnswer: Scalars['Boolean']['input'];
  value: Scalars['String']['input'];
};

export type OptionsCreateInput2 = {
  isAnswer: Scalars['Boolean']['input'];
  value: Scalars['String']['input'];
};

export enum OrderType {
  EventRegistration = 'EVENT_REGISTRATION',
  FestRegistration = 'FEST_REGISTRATION'
}

export type Organizer = {
  __typename?: 'Organizer';
  eventId: Scalars['ID']['output'];
  user: User;
};

export type PageInfo = {
  __typename?: 'PageInfo';
  endCursor?: Maybe<Scalars['String']['output']>;
  hasNextPage: Scalars['Boolean']['output'];
  hasPreviousPage: Scalars['Boolean']['output'];
  startCursor?: Maybe<Scalars['String']['output']>;
};

export type PaymentOrder = {
  __typename?: 'PaymentOrder';
  amount: Scalars['Int']['output'];
  id: Scalars['ID']['output'];
  orderId: Scalars['ID']['output'];
  status: Status;
  user: User;
};

export enum PaymentType {
  EventRegistration = 'EVENT_REGISTRATION',
  FestRegistration = 'FEST_REGISTRATION'
}

export enum ProniteDay {
  Day1 = 'Day1',
  Day2 = 'Day2'
}

export type ProniteRegistration = {
  __typename?: 'ProniteRegistration';
  createdAt: Scalars['DateTime']['output'];
  proniteDay: ProniteDay;
  user: User;
  userId: Scalars['ID']['output'];
};

export type ProniteRegistrationCounts = {
  __typename?: 'ProniteRegistrationCounts';
  day1Count: Scalars['Int']['output'];
  day2Count: Scalars['Int']['output'];
};

export type Query = {
  __typename?: 'Query';
  accommodationRequestByDay: QueryAccommodationRequestByDayResult;
  accommodationRequestByHotel: QueryAccommodationRequestByHotelResult;
  accommodationRequests: QueryAccommodationRequestsResult;
  accommodationRequestsByUser: QueryAccommodationRequestsByUserResult;
  accommodationRequestsByUserId: QueryAccommodationRequestsByUserIdResult;
  allWinners: QueryAllWinnersResult;
  attemptQuiz: QueryAttemptQuizResult;
  colleges: QueryCollegesResult;
  completedEvents: QueryCompletedEventsResult;
  eventById: QueryEventByIdResult;
  eventByOrganizer: QueryEventByOrganizerResult;
  events: QueryEventsConnection;
  eventsByBranchRep: QueryEventsByBranchRepResult;
  getAllHotels: QueryGetAllHotelsResult;
  getAllQuizSubmissions: QueryGetAllQuizSubmissionsResult;
  getAllSubmissions: QueryGetAllSubmissionsResult;
  getAllquestions: QueryGetAllquestionsResult;
  getAvatars: Array<Avatar>;
  getBranch: QueryGetBranchResult;
  getBranches: QueryGetBranchesResult;
  getCards: QueryGetCardsResult;
  getChampionshipLeaderboard: QueryGetChampionshipLeaderboardResult;
  getComment: QueryGetCommentResult;
  getCoreTeamMembers: QueryGetCoreTeamMembersResult;
  getEventStatus: QueryGetEventStatusResult;
  getLevelXp: QueryGetLevelXpResult;
  getProniteRegistrations: ProniteRegistrationCounts;
  getQuizByEventRound: QueryGetQuizByEventRoundResult;
  getQuizById: QueryGetQuizByIdResult;
  getQuizFlag: QueryGetQuizFlagResult;
  getQuizScores: QueryGetQuizScoresResult;
  getRegistrationsOpen: QueryGetRegistrationsOpenResult;
  getRegistrationvsDate: QueryGetRegistrationvsDateResult;
  getRevenue: QueryGetRevenueResult;
  getRoundStatus: QueryGetRoundStatusResult;
  getScore: QueryGetScoreResult;
  getScoreSheetJuryView: QueryGetScoreSheetJuryViewResult;
  getSponsors: QueryGetSponsorsResult;
  getStoneVisibilities: QueryGetStoneVisibilitiesResult;
  getSubmissionByUser: QueryGetSubmissionByUserResult;
  getTechTeamMembers: QueryGetTechTeamMembersResult;
  getTotalRegistrations: QueryGetTotalRegistrationsResult;
  getTotalScores: QueryGetTotalScoresResult;
  getUserAccommodation?: Maybe<QueryGetUserAccommodationResult>;
  getUserLevelScore: QueryGetUserLevelScoreResult;
  getUserXp: QueryGetUserXpResult;
  getXpLeaderboard: QueryGetXpLeaderboardResult;
  judgeCountByJudge: QueryJudgeCountByJudgeResult;
  judgeGetTeamsByRound: QueryJudgeGetTeamsByRoundResult;
  me: QueryMeResult;
  myTeam: QueryMyTeamResult;
  publishedEvents: Array<Event>;
  registeredEvents: QueryRegisteredEventsResult;
  roundByJudge: QueryRoundByJudgeResult;
  rounds: QueryRoundsResult;
  roundsByEvent: QueryRoundsByEventResult;
  submissionsByUser: QuerySubmissionsByUserResult;
  teamDetails: QueryTeamDetailsResult;
  teamsByRound: QueryTeamsByRoundConnection;
  userById: QueryUserByIdResult;
  users: QueryUsersConnection;
  verifyQuizPassword: QueryVerifyQuizPasswordResult;
  winnersByEvent: QueryWinnersByEventResult;
};


export type QueryAccommodationRequestByDayArgs = {
  date: Scalars['DateTime']['input'];
};


export type QueryAccommodationRequestByHotelArgs = {
  name: Scalars['String']['input'];
};


export type QueryAccommodationRequestsByUserIdArgs = {
  userId: Scalars['ID']['input'];
};


export type QueryAttemptQuizArgs = {
  quizId: Scalars['ID']['input'];
};


export type QueryEventByIdArgs = {
  id: Scalars['ID']['input'];
};


export type QueryEventsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  contains?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryEventsByBranchRepArgs = {
  branchRepId: Scalars['ID']['input'];
};


export type QueryGetAllQuizSubmissionsArgs = {
  eventId: Scalars['String']['input'];
  quizId: Scalars['String']['input'];
};


export type QueryGetAllSubmissionsArgs = {
  day: DayType;
};


export type QueryGetAllquestionsArgs = {
  quizId: Scalars['String']['input'];
};


export type QueryGetBranchArgs = {
  id: Scalars['ID']['input'];
};


export type QueryGetCardsArgs = {
  day: DayType;
};


export type QueryGetCommentArgs = {
  eventId: Scalars['ID']['input'];
  roundNo: Scalars['Int']['input'];
  teamId: Scalars['ID']['input'];
};


export type QueryGetLevelXpArgs = {
  levelId: Scalars['ID']['input'];
};


export type QueryGetQuizByEventRoundArgs = {
  eventId: Scalars['Int']['input'];
  roundId: Scalars['Int']['input'];
};


export type QueryGetQuizByIdArgs = {
  quizId: Scalars['String']['input'];
};


export type QueryGetQuizFlagArgs = {
  quizId: Scalars['String']['input'];
  teamId: Scalars['Int']['input'];
};


export type QueryGetQuizScoresArgs = {
  quizId: Scalars['String']['input'];
};


export type QueryGetRegistrationvsDateArgs = {
  date?: InputMaybe<Scalars['DateTime']['input']>;
};


export type QueryGetRoundStatusArgs = {
  eventId: Scalars['ID']['input'];
  roundNo: Scalars['Int']['input'];
};


export type QueryGetScoreArgs = {
  criteriaId: Scalars['ID']['input'];
  roundNo: Scalars['Int']['input'];
  teamId: Scalars['ID']['input'];
};


export type QueryGetScoreSheetJuryViewArgs = {
  eventId: Scalars['ID']['input'];
  roundNo: Scalars['Int']['input'];
};


export type QueryGetSubmissionByUserArgs = {
  quizId: Scalars['String']['input'];
  teamId: Scalars['String']['input'];
};


export type QueryGetTotalRegistrationsArgs = {
  date?: InputMaybe<Scalars['DateTime']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryGetTotalScoresArgs = {
  eventId: Scalars['ID']['input'];
  roundNo: Scalars['Int']['input'];
};


export type QueryGetUserLevelScoreArgs = {
  levelId: Scalars['ID']['input'];
};


export type QueryJudgeGetTeamsByRoundArgs = {
  eventId: Scalars['Int']['input'];
  roundId: Scalars['Int']['input'];
};


export type QueryMyTeamArgs = {
  eventId: Scalars['ID']['input'];
};


export type QueryRoundsByEventArgs = {
  eventId: Scalars['ID']['input'];
};


export type QuerySubmissionsByUserArgs = {
  day: DayType;
};


export type QueryTeamDetailsArgs = {
  id: Scalars['ID']['input'];
};


export type QueryTeamsByRoundArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  contains?: InputMaybe<Scalars['String']['input']>;
  eventId: Scalars['ID']['input'];
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  roundNo: Scalars['Int']['input'];
};


export type QueryUserByIdArgs = {
  id: Scalars['ID']['input'];
};


export type QueryUsersArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  contains?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryVerifyQuizPasswordArgs = {
  password: Scalars['String']['input'];
  quizId: Scalars['String']['input'];
};


export type QueryWinnersByEventArgs = {
  eventId: Scalars['ID']['input'];
};

export type QueryAccommodationRequestByDayResult = Error | QueryAccommodationRequestByDaySuccess;

export type QueryAccommodationRequestByDaySuccess = {
  __typename?: 'QueryAccommodationRequestByDaySuccess';
  data: Array<UserInHotel>;
};

export type QueryAccommodationRequestByHotelResult = Error | QueryAccommodationRequestByHotelSuccess;

export type QueryAccommodationRequestByHotelSuccess = {
  __typename?: 'QueryAccommodationRequestByHotelSuccess';
  data: Array<UserInHotel>;
};

export type QueryAccommodationRequestsByUserIdResult = Error | QueryAccommodationRequestsByUserIdSuccess;

export type QueryAccommodationRequestsByUserIdSuccess = {
  __typename?: 'QueryAccommodationRequestsByUserIdSuccess';
  data: Array<UserInHotel>;
};

export type QueryAccommodationRequestsByUserResult = Error | QueryAccommodationRequestsByUserSuccess;

export type QueryAccommodationRequestsByUserSuccess = {
  __typename?: 'QueryAccommodationRequestsByUserSuccess';
  data: Array<UserInHotel>;
};

export type QueryAccommodationRequestsResult = Error | QueryAccommodationRequestsSuccess;

export type QueryAccommodationRequestsSuccess = {
  __typename?: 'QueryAccommodationRequestsSuccess';
  data: Array<UserInHotel>;
};

export type QueryAllWinnersResult = Error | QueryAllWinnersSuccess;

export type QueryAllWinnersSuccess = {
  __typename?: 'QueryAllWinnersSuccess';
  data: Array<Winners>;
};

export type QueryAttemptQuizResult = Error | QueryAttemptQuizSuccess;

export type QueryAttemptQuizSuccess = {
  __typename?: 'QueryAttemptQuizSuccess';
  data: Team;
};

export type QueryCollegesResult = Error | QueryCollegesSuccess;

export type QueryCollegesSuccess = {
  __typename?: 'QueryCollegesSuccess';
  data: Array<College>;
};

export type QueryCompletedEventsResult = Error | QueryCompletedEventsSuccess;

export type QueryCompletedEventsSuccess = {
  __typename?: 'QueryCompletedEventsSuccess';
  data: Array<Event>;
};

export type QueryEventByIdResult = Error | QueryEventByIdSuccess;

export type QueryEventByIdSuccess = {
  __typename?: 'QueryEventByIdSuccess';
  data: Event;
};

export type QueryEventByOrganizerResult = Error | QueryEventByOrganizerSuccess;

export type QueryEventByOrganizerSuccess = {
  __typename?: 'QueryEventByOrganizerSuccess';
  data: Array<Event>;
};

export type QueryEventsByBranchRepResult = Error | QueryEventsByBranchRepSuccess;

export type QueryEventsByBranchRepSuccess = {
  __typename?: 'QueryEventsByBranchRepSuccess';
  data: Array<Event>;
};

export type QueryEventsConnection = {
  __typename?: 'QueryEventsConnection';
  edges: Array<QueryEventsConnectionEdge>;
  pageInfo: PageInfo;
};

export type QueryEventsConnectionEdge = {
  __typename?: 'QueryEventsConnectionEdge';
  cursor: Scalars['String']['output'];
  node: Event;
};

export type QueryGetAllHotelsResult = Error | QueryGetAllHotelsSuccess;

export type QueryGetAllHotelsSuccess = {
  __typename?: 'QueryGetAllHotelsSuccess';
  data: Array<Hotel>;
};

export type QueryGetAllQuizSubmissionsResult = Error | QueryGetAllQuizSubmissionsSuccess;

export type QueryGetAllQuizSubmissionsSuccess = {
  __typename?: 'QueryGetAllQuizSubmissionsSuccess';
  data: Array<AllSubmissions>;
};

export type QueryGetAllSubmissionsResult = Error | QueryGetAllSubmissionsSuccess;

export type QueryGetAllSubmissionsSuccess = {
  __typename?: 'QueryGetAllSubmissionsSuccess';
  data: Array<Submission>;
};

export type QueryGetAllquestionsResult = Error | QueryGetAllquestionsSuccess;

export type QueryGetAllquestionsSuccess = {
  __typename?: 'QueryGetAllquestionsSuccess';
  data: Array<Question>;
};

export type QueryGetBranchResult = Error | QueryGetBranchSuccess;

export type QueryGetBranchSuccess = {
  __typename?: 'QueryGetBranchSuccess';
  data: Branch;
};

export type QueryGetBranchesResult = Error | QueryGetBranchesSuccess;

export type QueryGetBranchesSuccess = {
  __typename?: 'QueryGetBranchesSuccess';
  data: Array<Branch>;
};

export type QueryGetCardsResult = Error | QueryGetCardsSuccess;

export type QueryGetCardsSuccess = {
  __typename?: 'QueryGetCardsSuccess';
  data: Array<Card>;
};

export type QueryGetChampionshipLeaderboardResult = Error | QueryGetChampionshipLeaderboardSuccess;

export type QueryGetChampionshipLeaderboardSuccess = {
  __typename?: 'QueryGetChampionshipLeaderboardSuccess';
  data: Array<ChampionshipPoint>;
};

export type QueryGetCommentResult = Error | QueryGetCommentSuccess;

export type QueryGetCommentSuccess = {
  __typename?: 'QueryGetCommentSuccess';
  data: Comments;
};

export type QueryGetCoreTeamMembersResult = Error | QueryGetCoreTeamMembersSuccess;

export type QueryGetCoreTeamMembersSuccess = {
  __typename?: 'QueryGetCoreTeamMembersSuccess';
  data: Array<CoreTeamMember>;
};

export type QueryGetEventStatusResult = Error | QueryGetEventStatusSuccess;

export type QueryGetEventStatusSuccess = {
  __typename?: 'QueryGetEventStatusSuccess';
  data: Array<EventStatus>;
};

export type QueryGetLevelXpResult = Error | QueryGetLevelXpSuccess;

export type QueryGetLevelXpSuccess = {
  __typename?: 'QueryGetLevelXpSuccess';
  data: Level;
};

export type QueryGetQuizByEventRoundResult = Error | QueryGetQuizByEventRoundSuccess;

export type QueryGetQuizByEventRoundSuccess = {
  __typename?: 'QueryGetQuizByEventRoundSuccess';
  data: Quiz;
};

export type QueryGetQuizByIdResult = Error | QueryGetQuizByIdSuccess;

export type QueryGetQuizByIdSuccess = {
  __typename?: 'QueryGetQuizByIdSuccess';
  data: Quiz;
};

export type QueryGetQuizFlagResult = Error | QueryGetQuizFlagSuccess;

export type QueryGetQuizFlagSuccess = {
  __typename?: 'QueryGetQuizFlagSuccess';
  data: QuizScore;
};

export type QueryGetQuizScoresResult = Error | QueryGetQuizScoresSuccess;

export type QueryGetQuizScoresSuccess = {
  __typename?: 'QueryGetQuizScoresSuccess';
  data: Array<QuizScore>;
};

export type QueryGetRegistrationsOpenResult = Error | QueryGetRegistrationsOpenSuccess;

export type QueryGetRegistrationsOpenSuccess = {
  __typename?: 'QueryGetRegistrationsOpenSuccess';
  data: Scalars['Boolean']['output'];
};

export type QueryGetRegistrationvsDateResult = Error | QueryGetRegistrationvsDateSuccess;

export type QueryGetRegistrationvsDateSuccess = {
  __typename?: 'QueryGetRegistrationvsDateSuccess';
  data: Array<RegistrationVsDateObject>;
};

export type QueryGetRevenueResult = Error | QueryGetRevenueSuccess;

export type QueryGetRevenueSuccess = {
  __typename?: 'QueryGetRevenueSuccess';
  data: Scalars['Int']['output'];
};

export type QueryGetRoundStatusResult = Error | QueryGetRoundStatusSuccess;

export type QueryGetRoundStatusSuccess = {
  __typename?: 'QueryGetRoundStatusSuccess';
  data: Round;
};

export type QueryGetScoreResult = Error | QueryGetScoreSuccess;

export type QueryGetScoreSheetJuryViewResult = Error | QueryGetScoreSheetJuryViewSuccess;

export type QueryGetScoreSheetJuryViewSuccess = {
  __typename?: 'QueryGetScoreSheetJuryViewSuccess';
  data: Array<ScoreSheetJuryView>;
};

export type QueryGetScoreSuccess = {
  __typename?: 'QueryGetScoreSuccess';
  data: Scores;
};

export type QueryGetSponsorsResult = Error | QueryGetSponsorsSuccess;

export type QueryGetSponsorsSuccess = {
  __typename?: 'QueryGetSponsorsSuccess';
  data: Array<Sponsor>;
};

export type QueryGetStoneVisibilitiesResult = Error | QueryGetStoneVisibilitiesSuccess;

export type QueryGetStoneVisibilitiesSuccess = {
  __typename?: 'QueryGetStoneVisibilitiesSuccess';
  data: Scalars['String']['output'];
};

export type QueryGetSubmissionByUserResult = Error | QueryGetSubmissionByUserSuccess;

export type QueryGetSubmissionByUserSuccess = {
  __typename?: 'QueryGetSubmissionByUserSuccess';
  data: Array<AllSubmissions>;
};

export type QueryGetTechTeamMembersResult = Error | QueryGetTechTeamMembersSuccess;

export type QueryGetTechTeamMembersSuccess = {
  __typename?: 'QueryGetTechTeamMembersSuccess';
  data: Array<TechTeamMember>;
};

export type QueryGetTotalRegistrationsResult = Error | QueryGetTotalRegistrationsSuccess;

export type QueryGetTotalRegistrationsSuccess = {
  __typename?: 'QueryGetTotalRegistrationsSuccess';
  data: EventRegistrationsCount;
};

export type QueryGetTotalScoresResult = Error | QueryGetTotalScoresSuccess;

export type QueryGetTotalScoresSuccess = {
  __typename?: 'QueryGetTotalScoresSuccess';
  data: Array<TotalScores>;
};

export type QueryGetUserAccommodationResult = Error | QueryGetUserAccommodationSuccess;

export type QueryGetUserAccommodationSuccess = {
  __typename?: 'QueryGetUserAccommodationSuccess';
  data: UserInHotel;
};

export type QueryGetUserLevelScoreResult = Error | QueryGetUserLevelScoreSuccess;

export type QueryGetUserLevelScoreSuccess = {
  __typename?: 'QueryGetUserLevelScoreSuccess';
  data: Xp;
};

export type QueryGetUserXpResult = Error | QueryGetUserXpSuccess;

export type QueryGetUserXpSuccess = {
  __typename?: 'QueryGetUserXpSuccess';
  data: Array<Xp>;
};

export type QueryGetXpLeaderboardResult = Error | QueryGetXpLeaderboardSuccess;

export type QueryGetXpLeaderboardSuccess = {
  __typename?: 'QueryGetXpLeaderboardSuccess';
  data: Array<Xp>;
};

export type QueryJudgeCountByJudgeResult = Error | QueryJudgeCountByJudgeSuccess;

export type QueryJudgeCountByJudgeSuccess = {
  __typename?: 'QueryJudgeCountByJudgeSuccess';
  data: Scalars['Int']['output'];
};

export type QueryJudgeGetTeamsByRoundResult = Error | QueryJudgeGetTeamsByRoundSuccess;

export type QueryJudgeGetTeamsByRoundSuccess = {
  __typename?: 'QueryJudgeGetTeamsByRoundSuccess';
  data: Array<Team>;
};

export type QueryMeResult = Error | QueryMeSuccess;

export type QueryMeSuccess = {
  __typename?: 'QueryMeSuccess';
  data: User;
};

export type QueryMyTeamResult = Error | QueryMyTeamSuccess;

export type QueryMyTeamSuccess = {
  __typename?: 'QueryMyTeamSuccess';
  data: Team;
};

export type QueryRegisteredEventsResult = Error | QueryRegisteredEventsSuccess;

export type QueryRegisteredEventsSuccess = {
  __typename?: 'QueryRegisteredEventsSuccess';
  data: Array<Event>;
};

export type QueryRoundByJudgeResult = Error | QueryRoundByJudgeSuccess;

export type QueryRoundByJudgeSuccess = {
  __typename?: 'QueryRoundByJudgeSuccess';
  data: Round;
};

export type QueryRoundsByEventResult = Error | QueryRoundsByEventSuccess;

export type QueryRoundsByEventSuccess = {
  __typename?: 'QueryRoundsByEventSuccess';
  data: Array<Round>;
};

export type QueryRoundsResult = Error | QueryRoundsSuccess;

export type QueryRoundsSuccess = {
  __typename?: 'QueryRoundsSuccess';
  data: Array<Round>;
};

export type QuerySubmissionsByUserResult = Error | QuerySubmissionsByUserSuccess;

export type QuerySubmissionsByUserSuccess = {
  __typename?: 'QuerySubmissionsByUserSuccess';
  data: Array<Submission>;
};

export type QueryTeamDetailsResult = Error | QueryTeamDetailsSuccess;

export type QueryTeamDetailsSuccess = {
  __typename?: 'QueryTeamDetailsSuccess';
  data: Team;
};

export type QueryTeamsByRoundConnection = {
  __typename?: 'QueryTeamsByRoundConnection';
  edges: Array<QueryTeamsByRoundConnectionEdge>;
  pageInfo: PageInfo;
};

export type QueryTeamsByRoundConnectionEdge = {
  __typename?: 'QueryTeamsByRoundConnectionEdge';
  cursor: Scalars['String']['output'];
  node: Team;
};

export type QueryUserByIdResult = Error | QueryUserByIdSuccess;

export type QueryUserByIdSuccess = {
  __typename?: 'QueryUserByIdSuccess';
  data: User;
};

export type QueryUsersConnection = {
  __typename?: 'QueryUsersConnection';
  edges: Array<QueryUsersConnectionEdge>;
  pageInfo: PageInfo;
};

export type QueryUsersConnectionEdge = {
  __typename?: 'QueryUsersConnectionEdge';
  cursor: Scalars['String']['output'];
  node: User;
};

export type QueryVerifyQuizPasswordResult = Error | QueryVerifyQuizPasswordSuccess;

export type QueryVerifyQuizPasswordSuccess = {
  __typename?: 'QueryVerifyQuizPasswordSuccess';
  data: Quiz;
};

export type QueryWinnersByEventResult = Error | QueryWinnersByEventSuccess;

export type QueryWinnersByEventSuccess = {
  __typename?: 'QueryWinnersByEventSuccess';
  data: Array<Winners>;
};

export type Question = {
  __typename?: 'Question';
  createdAt: Scalars['DateTime']['output'];
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  image?: Maybe<Scalars['String']['output']>;
  isCode: Scalars['Boolean']['output'];
  options: Array<Options>;
  question: Scalars['String']['output'];
  quiz: Quiz;
  quizId: Scalars['ID']['output'];
};

export type QuestionsCreateInput = {
  createdAt?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  image?: InputMaybe<Scalars['String']['input']>;
  isCode?: InputMaybe<Scalars['Boolean']['input']>;
  mode?: InputMaybe<Scalars['String']['input']>;
  options?: InputMaybe<Array<OptionsCreateInput>>;
  question: Scalars['String']['input'];
};

export type Quiz = {
  __typename?: 'Quiz';
  allowAttempts: Scalars['Boolean']['output'];
  completed: Scalars['Boolean']['output'];
  description?: Maybe<Scalars['String']['output']>;
  endTime: Scalars['DateTime']['output'];
  eventId: Scalars['ID']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  overridePassword: Scalars['String']['output'];
  password: Scalars['String']['output'];
  points: Scalars['Int']['output'];
  qualifyNext: Scalars['Int']['output'];
  questions: Array<Question>;
  quizScores: Array<QuizScore>;
  round: Round;
  roundNo: Scalars['Int']['output'];
  startTime: Scalars['DateTime']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type QuizScore = {
  __typename?: 'QuizScore';
  allowUser: Scalars['Boolean']['output'];
  flags: Scalars['Int']['output'];
  id: Scalars['ID']['output'];
  quiz: Quiz;
  quizId: Scalars['String']['output'];
  score: Scalars['Int']['output'];
  team: Team;
  teamId: Scalars['Int']['output'];
  timeTaken: Scalars['Float']['output'];
};

export type QuizSubmission = {
  __typename?: 'QuizSubmission';
  OptionId: Scalars['ID']['output'];
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  options: Options;
  team: Team;
  teamId: Scalars['ID']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type RegistrationVsDateObject = {
  __typename?: 'RegistrationVSDateObject';
  date: Scalars['String']['output'];
  externalRegistrations: Scalars['Int']['output'];
  internalRegistrations: Scalars['Int']['output'];
};

export enum Role {
  Admin = 'ADMIN',
  BranchRep = 'BRANCH_REP',
  Judge = 'JUDGE',
  Jury = 'JURY',
  Organizer = 'ORGANIZER',
  Participant = 'PARTICIPANT',
  User = 'USER'
}

export type Round = {
  __typename?: 'Round';
  completed: Scalars['Boolean']['output'];
  criteria?: Maybe<Array<Criteria>>;
  date?: Maybe<Scalars['DateTime']['output']>;
  event: Event;
  eventId: Scalars['ID']['output'];
  judges: Array<Judge>;
  quiz?: Maybe<Quiz>;
  roundNo: Scalars['Int']['output'];
  selectStatus: Scalars['Boolean']['output'];
};

export type ScoreSheetJuryView = {
  __typename?: 'ScoreSheetJuryView';
  judges: Array<JudgeJuryView>;
  teamId: Scalars['Int']['output'];
  teamName: Scalars['String']['output'];
  teamScore: Scalars['Float']['output'];
};

export type Scores = {
  __typename?: 'Scores';
  criteria: Criteria;
  criteriaId: Scalars['ID']['output'];
  judge: Judge;
  score: Scalars['String']['output'];
  team: Team;
  teamId: Scalars['ID']['output'];
};

export type SelectedOptions = {
  id: Scalars['String']['input'];
  questionId: Scalars['String']['input'];
  value: Scalars['String']['input'];
};

export type ServerSettings = {
  __typename?: 'ServerSettings';
  registrationsOpen: Scalars['Boolean']['output'];
};

export type Sponsor = {
  __typename?: 'Sponsor';
  description: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  imageUrl?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  title: Scalars['String']['output'];
  websiteUrl?: Maybe<Scalars['String']['output']>;
};

export enum Status {
  Failed = 'FAILED',
  Pending = 'PENDING',
  Success = 'SUCCESS'
}

export type Submission = {
  __typename?: 'Submission';
  card: Card;
  cardId: Scalars['ID']['output'];
  image: Scalars['String']['output'];
  user: User;
  userId: Scalars['ID']['output'];
};

export type Team = {
  __typename?: 'Team';
  attended: Scalars['Boolean']['output'];
  confirmed: Scalars['Boolean']['output'];
  event: Event;
  id: Scalars['ID']['output'];
  leaderId?: Maybe<Scalars['Int']['output']>;
  members: Array<TeamMember>;
  name: Scalars['String']['output'];
  roundNo: Scalars['Int']['output'];
};

export type TeamMember = {
  __typename?: 'TeamMember';
  team: Team;
  user: User;
};

export type TechTeamMember = {
  __typename?: 'TechTeamMember';
  github?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  imageUrl?: Maybe<Scalars['String']['output']>;
  instagram?: Maybe<Scalars['String']['output']>;
  linkedin?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  quote: Scalars['String']['output'];
  role: Scalars['String']['output'];
};

export type TotalScores = {
  __typename?: 'TotalScores';
  criteriaType: Scalars['String']['output'];
  judgeScore: Scalars['Float']['output'];
  teamId: Scalars['Int']['output'];
  totalScore: Scalars['Float']['output'];
};

export type User = {
  __typename?: 'User';
  college?: Maybe<College>;
  createdAt: Scalars['DateTime']['output'];
  email: Scalars['String']['output'];
  hotel?: Maybe<UserInHotel>;
  id: Scalars['ID']['output'];
  isVerified: Scalars['Boolean']['output'];
  name: Scalars['String']['output'];
  phoneNumber?: Maybe<Scalars['String']['output']>;
  profileImage?: Maybe<Scalars['String']['output']>;
  role: Role;
  stoneVisibilities: Scalars['String']['output'];
  xp?: Maybe<Array<Xp>>;
};

export type UserCreateInput = {
  collegeId: Scalars['Int']['input'];
  email: Scalars['String']['input'];
  name: Scalars['String']['input'];
  password: Scalars['String']['input'];
  phoneNumber: Scalars['String']['input'];
  profileImage: Scalars['String']['input'];
};

export type UserInHotel = {
  __typename?: 'UserInHotel';
  IdCard?: Maybe<Scalars['String']['output']>;
  ac: Scalars['Boolean']['output'];
  checkIn?: Maybe<Scalars['DateTime']['output']>;
  checkOut?: Maybe<Scalars['DateTime']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  gender: Gender;
  hotel: Hotel;
  id: Scalars['ID']['output'];
  room?: Maybe<Scalars['String']['output']>;
  status: AccommodationBookingStatus;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  user: User;
};

export type UserLoginInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type UserLoginPayload = {
  __typename?: 'UserLoginPayload';
  accessToken: Scalars['String']['output'];
  refreshToken: Scalars['String']['output'];
};

export enum WinnerType {
  RunnerUp = 'RUNNER_UP',
  SecondRunnerUp = 'SECOND_RUNNER_UP',
  Winner = 'WINNER'
}

export type Winners = {
  __typename?: 'Winners';
  event: Event;
  id: Scalars['ID']['output'];
  team: Team;
  type: WinnerType;
};

export type Xp = {
  __typename?: 'XP';
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  level: Level;
  user: User;
};

export type AddAccommodationRequestMutationVariables = Exact<{
  checkInTime: Scalars['DateTime']['input'];
  checkOutTime: Scalars['DateTime']['input'];
  gender: Scalars['String']['input'];
  hotelId: Scalars['Int']['input'];
  id: Scalars['String']['input'];
}>;


export type AddAccommodationRequestMutation = { __typename?: 'Mutation', addAccommodationRequest: { __typename: 'Error', message: string } | { __typename: 'MutationAddAccommodationRequestSuccess', data: { __typename?: 'UserInHotel', checkIn?: Date | null, checkOut?: Date | null, gender: Gender, status: AccommodationBookingStatus, user: { __typename?: 'User', name: string, phoneNumber?: string | null } } } };

export type AddBranchMutationVariables = Exact<{
  name: Scalars['String']['input'];
}>;


export type AddBranchMutation = { __typename?: 'Mutation', addBranch: { __typename: 'Error', message: string } | { __typename: 'MutationAddBranchSuccess', data: { __typename?: 'Branch', id: string, name: string } } };

export type AddBranchRepMutationVariables = Exact<{
  branchId: Scalars['ID']['input'];
  userId: Scalars['ID']['input'];
}>;


export type AddBranchRepMutation = { __typename?: 'Mutation', addBranchRep: { __typename: 'Error', message: string } | { __typename: 'MutationAddBranchRepSuccess', data: { __typename?: 'BranchRep', branchId: string, userId: string } } };

export type AddCommentMutationVariables = Exact<{
  comment: Scalars['String']['input'];
  eventId: Scalars['Int']['input'];
  roundNo: Scalars['Int']['input'];
  teamId: Scalars['Int']['input'];
}>;


export type AddCommentMutation = { __typename?: 'Mutation', addComment: { __typename: 'Error', message: string } | { __typename: 'MutationAddCommentSuccess' } };

export type AddOrganizerMutationVariables = Exact<{
  eventId: Scalars['ID']['input'];
  userId: Scalars['ID']['input'];
}>;


export type AddOrganizerMutation = { __typename?: 'Mutation', addOrganizer: { __typename: 'Error', message: string } | { __typename: 'MutationAddOrganizerSuccess' } };

export type AddScoreMutationVariables = Exact<{
  criteriaId: Scalars['Int']['input'];
  score: Scalars['String']['input'];
  teamId: Scalars['Int']['input'];
}>;


export type AddScoreMutation = { __typename?: 'Mutation', addScore: { __typename: 'Error', message: string } | { __typename: 'MutationAddScoreSuccess' } };

export type AddXpMutationVariables = Exact<{
  levelId: Scalars['ID']['input'];
}>;


export type AddXpMutation = { __typename?: 'Mutation', addXP: { __typename: 'Error', message: string } | { __typename: 'MutationAddXPSuccess', data: { __typename?: 'XP', id: string, level: { __typename?: 'Level', id: string, point: number } } } };

export type ChangeSelectStatusMutationVariables = Exact<{
  eventId: Scalars['ID']['input'];
  roundNo: Scalars['Int']['input'];
}>;


export type ChangeSelectStatusMutation = { __typename?: 'Mutation', changeSelectStatus: { __typename: 'Error', message: string } | { __typename: 'MutationChangeSelectStatusSuccess', data: { __typename?: 'Round', selectStatus: boolean } } };

export type CompleteRoadiesRoundMutationVariables = Exact<{
  eventId: Scalars['ID']['input'];
  roundNo: Scalars['ID']['input'];
}>;


export type CompleteRoadiesRoundMutation = { __typename?: 'Mutation', completeRoadiesRound: { __typename: 'Error', message: string } | { __typename: 'MutationCompleteRoadiesRoundSuccess', data: Array<{ __typename?: 'Team', name: string, roundNo: number, leaderId?: number | null }> } };

export type CompleteRoundMutationVariables = Exact<{
  eventId: Scalars['ID']['input'];
  roundNo: Scalars['Int']['input'];
}>;


export type CompleteRoundMutation = { __typename?: 'Mutation', completeRound: { __typename: 'Error', message: string } | { __typename: 'MutationCompleteRoundSuccess' } };

export type ConfirmTeamMutationVariables = Exact<{
  teamId: Scalars['ID']['input'];
}>;


export type ConfirmTeamMutation = { __typename?: 'Mutation', confirmTeam: { __typename: 'Error', message: string } | { __typename: 'MutationConfirmTeamSuccess' } };

export type CreateCardMutationVariables = Exact<{
  clue: Scalars['String']['input'];
  day: DayType;
}>;


export type CreateCardMutation = { __typename?: 'Mutation', createCard: { __typename: 'Error' } | { __typename: 'MutationCreateCardSuccess' } };

export type CreateCollegeMutationVariables = Exact<{
  details: Scalars['String']['input'];
  name: Scalars['String']['input'];
}>;


export type CreateCollegeMutation = { __typename?: 'Mutation', createCollege: { __typename: 'Error', message: string } | { __typename: 'MutationCreateCollegeSuccess', data: { __typename?: 'College', id: string, name: string } } };

export type CreateCriteriaMutationVariables = Exact<{
  eventId: Scalars['ID']['input'];
  roundNo: Scalars['Int']['input'];
  name: Scalars['String']['input'];
  type: CriteriaType;
}>;


export type CreateCriteriaMutation = { __typename?: 'Mutation', createCriteria: { __typename: 'Error', message: string } | { __typename: 'MutationCreateCriteriaSuccess' } };

export type CreateEventMutationVariables = Exact<{
  eventType: EventType;
  name: Scalars['String']['input'];
}>;


export type CreateEventMutation = { __typename?: 'Mutation', createEvent: { __typename: 'Error', message: string } | { __typename: 'MutationCreateEventSuccess' } };

export type CreateHotelMutationVariables = Exact<{
  details: Scalars['String']['input'];
  name: Scalars['String']['input'];
  price: Scalars['Float']['input'];
}>;


export type CreateHotelMutation = { __typename?: 'Mutation', createHotel: { __typename: 'Error', message: string } | { __typename: 'MutationCreateHotelSuccess', data: { __typename?: 'Hotel', createdAt?: Date | null, details?: string | null, id: string, name: string, price: number, updatedAt?: Date | null } } };

export type CreateJudgeMutationVariables = Exact<{
  email: Scalars['String']['input'];
  eventId: Scalars['ID']['input'];
  name: Scalars['String']['input'];
  password: Scalars['String']['input'];
  roundNo: Scalars['Int']['input'];
}>;


export type CreateJudgeMutation = { __typename?: 'Mutation', createJudge: { __typename: 'Error', message: string } | { __typename: 'MutationCreateJudgeSuccess' } };

export type CreateQuizMutationVariables = Exact<{
  quizDescription?: InputMaybe<Scalars['String']['input']>;
  endTime?: InputMaybe<Scalars['String']['input']>;
  eventId?: InputMaybe<Scalars['String']['input']>;
  quizTitle?: InputMaybe<Scalars['String']['input']>;
  startTime?: InputMaybe<Scalars['String']['input']>;
  roundId?: InputMaybe<Scalars['String']['input']>;
  password?: InputMaybe<Scalars['String']['input']>;
  points?: InputMaybe<Scalars['Int']['input']>;
  qualifyNext?: InputMaybe<Scalars['Int']['input']>;
  overridePassword?: InputMaybe<Scalars['String']['input']>;
}>;


export type CreateQuizMutation = { __typename?: 'Mutation', createQuiz: { __typename: 'Error', message: string } | { __typename: 'MutationCreateQuizSuccess' } };

export type CreateRoundMutationVariables = Exact<{
  eventId: Scalars['ID']['input'];
  date: Scalars['DateTime']['input'];
}>;


export type CreateRoundMutation = { __typename?: 'Mutation', createRound: { __typename: 'Error', message: string } | { __typename: 'MutationCreateRoundSuccess', data: { __typename?: 'Round', eventId: string, roundNo: number } } };

export type CreateSubmissionMutationVariables = Exact<{
  cardId: Scalars['Int']['input'];
  image: Scalars['String']['input'];
}>;


export type CreateSubmissionMutation = { __typename?: 'Mutation', createSubmission: { __typename: 'Error' } | { __typename: 'MutationCreateSubmissionSuccess' } };

export type CreateTeamMutationVariables = Exact<{
  eventId: Scalars['ID']['input'];
  name: Scalars['String']['input'];
}>;


export type CreateTeamMutation = { __typename?: 'Mutation', createTeam: { __typename: 'Error', message: string } | { __typename: 'MutationCreateTeamSuccess', data: { __typename?: 'Team', name: string, id: string, confirmed: boolean, event: { __typename?: 'Event', id: string, name: string }, members: Array<{ __typename?: 'TeamMember', user: { __typename?: 'User', id: string, name: string } }> } } };

export type CreateWinnerMutationVariables = Exact<{
  eventId: Scalars['ID']['input'];
  teamId: Scalars['ID']['input'];
  type: WinnerType;
}>;


export type CreateWinnerMutation = { __typename?: 'Mutation', createWinner: { __typename: 'Error', message: string } | { __typename: 'MutationCreateWinnerSuccess' } };

export type DeleteCardMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type DeleteCardMutation = { __typename?: 'Mutation', deleteCard: { __typename: 'Error', message: string } | { __typename: 'MutationDeleteCardSuccess' } };

export type DeleteCriteriaMutationVariables = Exact<{
  criteriaId: Scalars['ID']['input'];
  eventId: Scalars['ID']['input'];
  roundNo: Scalars['Int']['input'];
}>;


export type DeleteCriteriaMutation = { __typename?: 'Mutation', deleteCriteria: { __typename: 'Error', message: string } | { __typename: 'MutationDeleteCriteriaSuccess' } };

export type DeleteEventMutationVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type DeleteEventMutation = { __typename?: 'Mutation', deleteEvent: { __typename: 'Error', message: string } | { __typename: 'MutationDeleteEventSuccess', data: string } };

export type DeleteHotelMutationVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type DeleteHotelMutation = { __typename?: 'Mutation', deleteHotel: { __typename: 'Error', message: string } | { __typename: 'MutationDeleteHotelSuccess', data: { __typename?: 'Hotel', details?: string | null, id: string, name: string, price: number } } };

export type DeleteJudgeMutationVariables = Exact<{
  eventId: Scalars['ID']['input'];
  roundNo: Scalars['Int']['input'];
  userId: Scalars['ID']['input'];
}>;


export type DeleteJudgeMutation = { __typename?: 'Mutation', deleteJudge: { __typename: 'Error', message: string } | { __typename: 'MutationDeleteJudgeSuccess' } };

export type DeleteRoundMutationVariables = Exact<{
  eventId: Scalars['ID']['input'];
}>;


export type DeleteRoundMutation = { __typename?: 'Mutation', deleteRound: { __typename: 'Error', message: string } | { __typename: 'MutationDeleteRoundSuccess', data: { __typename?: 'Round', eventId: string, roundNo: number } } };

export type DeleteTeamMutationVariables = Exact<{
  teamId: Scalars['ID']['input'];
}>;


export type DeleteTeamMutation = { __typename?: 'Mutation', deleteTeam: { __typename: 'Error', message: string } | { __typename: 'MutationDeleteTeamSuccess' } };

export type DeleteWinnerMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type DeleteWinnerMutation = { __typename?: 'Mutation', deleteWinner: { __typename: 'Error', message: string } | { __typename: 'MutationDeleteWinnerSuccess' } };

export type EmailVerificationMutationVariables = Exact<{
  email: Scalars['String']['input'];
}>;


export type EmailVerificationMutation = { __typename?: 'Mutation', sendEmailVerification: { __typename: 'Error', message: string } | { __typename: 'MutationSendEmailVerificationSuccess', data: string } };

export type EndQuizMutationVariables = Exact<{
  quizId?: InputMaybe<Scalars['String']['input']>;
}>;


export type EndQuizMutation = { __typename?: 'Mutation', endQuiz: { __typename: 'Error', message: string } | { __typename: 'MutationEndQuizSuccess' } };

export type EventPaymentOrderMutationVariables = Exact<{
  teamId: Scalars['ID']['input'];
}>;


export type EventPaymentOrderMutation = { __typename?: 'Mutation', eventPaymentOrder: { __typename: 'Error', message: string } | { __typename: 'MutationEventPaymentOrderSuccess', data: { __typename?: 'EventPaymentOrder', amount: number, id: string, orderId: string, status: Status, Team: { __typename?: 'Team', id: string, leaderId?: number | null, name: string, event: { __typename?: 'Event', name: string, image?: string | null } } } } };

export type FestRegPaymentOrderMutationVariables = Exact<{ [key: string]: never; }>;


export type FestRegPaymentOrderMutation = { __typename?: 'Mutation', createPaymentOrder: { __typename: 'Error', message: string } | { __typename: 'MutationCreatePaymentOrderSuccess', data: { __typename?: 'PaymentOrder', amount: number, orderId: string, status: Status, user: { __typename?: 'User', email: string, name: string } } } };

export type JoinTeamMutationVariables = Exact<{
  teamId: Scalars['ID']['input'];
}>;


export type JoinTeamMutation = { __typename?: 'Mutation', joinTeam: { __typename: 'Error', message: string } | { __typename: 'MutationJoinTeamSuccess', data: { __typename?: 'TeamMember', team: { __typename?: 'Team', id: string, name: string, confirmed: boolean, members: Array<{ __typename?: 'TeamMember', user: { __typename?: 'User', name: string, id: string } }>, event: { __typename?: 'Event', id: string, name: string, maxTeamSize: number, description?: string | null, eventType: EventType } } } } };

export type LeaveTeamMutationVariables = Exact<{
  teamId: Scalars['ID']['input'];
}>;


export type LeaveTeamMutation = { __typename?: 'Mutation', leaveTeam: { __typename: 'Error', message: string } | { __typename: 'MutationLeaveTeamSuccess' } };

export type NotifyParticipantsMutationVariables = Exact<{
  eventId: Scalars['ID']['input'];
  roundNo: Scalars['Int']['input'];
}>;


export type NotifyParticipantsMutation = { __typename?: 'Mutation', notifyParticipants: { __typename: 'Error', message: string } | { __typename: 'MutationNotifyParticipantsSuccess', data: string } };

export type OrganizerAddTeamMemberMutationVariables = Exact<{
  teamId: Scalars['ID']['input'];
  userId: Scalars['ID']['input'];
}>;


export type OrganizerAddTeamMemberMutation = { __typename?: 'Mutation', organizerAddTeamMember: { __typename: 'Error', message: string } | { __typename: 'MutationOrganizerAddTeamMemberSuccess', data: { __typename?: 'TeamMember', team: { __typename?: 'Team', id: string }, user: { __typename?: 'User', id: string } } } };

export type OrganizerCreateTeamMutationVariables = Exact<{
  eventId: Scalars['ID']['input'];
  name: Scalars['String']['input'];
}>;


export type OrganizerCreateTeamMutation = { __typename?: 'Mutation', organizerCreateTeam: { __typename: 'Error', message: string } | { __typename: 'MutationOrganizerCreateTeamSuccess', data: { __typename?: 'Team', id: string, name: string } } };

export type OrganizerDeleteTeamMutationVariables = Exact<{
  teamId: Scalars['ID']['input'];
}>;


export type OrganizerDeleteTeamMutation = { __typename?: 'Mutation', organizerDeleteTeam: { __typename: 'Error', message: string } | { __typename: 'MutationOrganizerDeleteTeamSuccess', data: { __typename?: 'Team', name: string, id: string } } };

export type OrganizerDeleteTeamMemberMutationVariables = Exact<{
  teamId: Scalars['ID']['input'];
  userId: Scalars['ID']['input'];
}>;


export type OrganizerDeleteTeamMemberMutation = { __typename?: 'Mutation', organizerDeleteTeamMember: { __typename: 'Error', message: string } | { __typename: 'MutationOrganizerDeleteTeamMemberSuccess', data: { __typename?: 'TeamMember', user: { __typename?: 'User', id: string }, team: { __typename?: 'Team', id: string } } } };

export type OrganizerMarkAttendanceMutationVariables = Exact<{
  attended: Scalars['Boolean']['input'];
  teamId: Scalars['ID']['input'];
}>;


export type OrganizerMarkAttendanceMutation = { __typename?: 'Mutation', organizerMarkAttendance: { __typename: 'Error', message: string } | { __typename: 'MutationOrganizerMarkAttendanceSuccess', data: { __typename?: 'Team', id: string, name: string } } };

export type OrganizerMarkAttendanceSoloMutationVariables = Exact<{
  eventId: Scalars['ID']['input'];
  userId: Scalars['ID']['input'];
  attended: Scalars['Boolean']['input'];
}>;


export type OrganizerMarkAttendanceSoloMutation = { __typename?: 'Mutation', organizerMarkAttendanceSolo: { __typename: 'Error', message: string } | { __typename: 'MutationOrganizerMarkAttendanceSoloSuccess', data: number } };

export type OrganizerRegisterSoloMutationVariables = Exact<{
  eventId: Scalars['ID']['input'];
  userId: Scalars['ID']['input'];
}>;


export type OrganizerRegisterSoloMutation = { __typename?: 'Mutation', organizerRegisterSolo: { __typename: 'Error', message: string } | { __typename: 'MutationOrganizerRegisterSoloSuccess', data: { __typename?: 'Team', attended: boolean, id: string, name: string } } };

export type PromoteQuizParticipantsMutationVariables = Exact<{
  eventId?: InputMaybe<Scalars['Int']['input']>;
  quizId?: InputMaybe<Scalars['String']['input']>;
  roundId?: InputMaybe<Scalars['Int']['input']>;
  teams?: InputMaybe<Array<Scalars['Int']['input']> | Scalars['Int']['input']>;
}>;


export type PromoteQuizParticipantsMutation = { __typename?: 'Mutation', promoteQuizParticipants: { __typename: 'Error', message: string } | { __typename: 'MutationPromoteQuizParticipantsSuccess' } };

export type PromoteToNextRoundMutationVariables = Exact<{
  roundNo: Scalars['ID']['input'];
  teamId: Scalars['ID']['input'];
  selected: Scalars['Boolean']['input'];
}>;


export type PromoteToNextRoundMutation = { __typename?: 'Mutation', promoteToNextRound: { __typename: 'Error', message: string } | { __typename: 'MutationPromoteToNextRoundSuccess' } };

export type PublishEventMutationVariables = Exact<{
  published: Scalars['Boolean']['input'];
  id: Scalars['ID']['input'];
}>;


export type PublishEventMutation = { __typename?: 'Mutation', publishEvent: { __typename: 'Error', message: string } | { __typename: 'MutationPublishEventSuccess', data: string } };

export type RefreshTokenMutationVariables = Exact<{
  refreshToken: Scalars['String']['input'];
}>;


export type RefreshTokenMutation = { __typename?: 'Mutation', refreshToken: { __typename: 'Error', message: string } | { __typename: 'MutationRefreshTokenSuccess', data: { __typename?: 'UserLoginPayload', accessToken: string, refreshToken: string } } };

export type RegisterProniteMutationVariables = Exact<{
  userId: Scalars['ID']['input'];
}>;


export type RegisterProniteMutation = { __typename?: 'Mutation', registerPronite: { __typename: 'Error', message: string } | { __typename: 'MutationRegisterProniteSuccess', data: { __typename?: 'ProniteRegistration', proniteDay: ProniteDay, user: { __typename?: 'User', email: string, id: string, name: string, phoneNumber?: string | null, role: Role, college?: { __typename?: 'College', name: string } | null } } } };

export type RegisterSoloEventMutationVariables = Exact<{
  eventId: Scalars['ID']['input'];
}>;


export type RegisterSoloEventMutation = { __typename?: 'Mutation', registerSoloEvent: { __typename: 'Error', message: string } | { __typename: 'MutationRegisterSoloEventSuccess', data: { __typename?: 'Team', id: string, name: string, confirmed: boolean, event: { __typename?: 'Event', id: string, eventType: EventType, name: string }, members: Array<{ __typename?: 'TeamMember', user: { __typename?: 'User', id: string, name: string } }> } } };

export type RemoveBranchRepMutationVariables = Exact<{
  userId: Scalars['ID']['input'];
  branchId: Scalars['ID']['input'];
}>;


export type RemoveBranchRepMutation = { __typename?: 'Mutation', removeBranchRep: { __typename: 'Error', message: string } | { __typename: 'MutationRemoveBranchRepSuccess', data: string } };

export type RemoveCollegeMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type RemoveCollegeMutation = { __typename?: 'Mutation', removeCollege: { __typename: 'Error', message: string } | { __typename: 'MutationRemoveCollegeSuccess', data: string } };

export type RemoveOrganizerMutationVariables = Exact<{
  eventId: Scalars['ID']['input'];
  userId: Scalars['ID']['input'];
}>;


export type RemoveOrganizerMutation = { __typename?: 'Mutation', removeOrganizer: { __typename: 'Error', message: string } | { __typename: 'MutationRemoveOrganizerSuccess', data: string } };

export type RemoveTeamMemberMutationVariables = Exact<{
  teamId: Scalars['ID']['input'];
  userId: Scalars['ID']['input'];
}>;


export type RemoveTeamMemberMutation = { __typename?: 'Mutation', removeTeamMember: { __typename: 'Error', message: string } | { __typename: 'MutationRemoveTeamMemberSuccess' } };

export type ResetPasswordMutationVariables = Exact<{
  password: Scalars['String']['input'];
  token: Scalars['String']['input'];
}>;


export type ResetPasswordMutation = { __typename?: 'Mutation', resetPassword: { __typename: 'Error', message: string } | { __typename: 'MutationResetPasswordSuccess' } };

export type ResetPasswordEmailMutationVariables = Exact<{
  email: Scalars['String']['input'];
}>;


export type ResetPasswordEmailMutation = { __typename?: 'Mutation', sendPasswordResetEmail: { __typename: 'Error', message: string } | { __typename: 'MutationSendPasswordResetEmailSuccess', data: string } };

export type SendWinnerWhatsAppNotificationMutationVariables = Exact<{
  eventId: Scalars['ID']['input'];
  location: Scalars['String']['input'];
  date: Scalars['String']['input'];
  fromTime: Scalars['String']['input'];
  toTime: Scalars['String']['input'];
}>;


export type SendWinnerWhatsAppNotificationMutation = { __typename?: 'Mutation', sendWinnerWhatsAppNotification: { __typename: 'Error', message: string } | { __typename: 'MutationSendWinnerWhatsAppNotificationSuccess', data: string } };

export type SignInMutationVariables = Exact<{
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
}>;


export type SignInMutation = { __typename?: 'Mutation', login: { __typename: 'Error', message: string } | { __typename: 'MutationLoginSuccess', data: { __typename?: 'UserLoginPayload', accessToken: string, refreshToken: string } } };

export type SignUpMutationVariables = Exact<{
  email: Scalars['String']['input'];
  name: Scalars['String']['input'];
  password: Scalars['String']['input'];
  collegeId: Scalars['Int']['input'];
  phoneNumber: Scalars['String']['input'];
}>;


export type SignUpMutation = { __typename?: 'Mutation', signUp: { __typename: 'Error', message: string } | { __typename: 'MutationSignUpSuccess' } };

export type SubmitQuizAnswerMutationVariables = Exact<{
  quizId: Scalars['String']['input'];
  selectedAnswers: Array<SelectedOptions> | SelectedOptions;
  teamId: Scalars['Int']['input'];
  timeTaken: Scalars['Float']['input'];
}>;


export type SubmitQuizAnswerMutation = { __typename?: 'Mutation', submitQuiz: { __typename: 'Error', message: string } | { __typename: 'MutationSubmitQuizSuccess', data: { __typename?: 'QuizScore', id: string, quizId: string, teamId: number } } };

export type ToggleRegistrationsOpenMutationVariables = Exact<{ [key: string]: never; }>;


export type ToggleRegistrationsOpenMutation = { __typename?: 'Mutation', toggleRegistrationsOpen: { __typename: 'Error', message: string } | { __typename: 'MutationToggleRegistrationsOpenSuccess', data: { __typename?: 'ServerSettings', registrationsOpen: boolean } } };

export type UpdateAccommodationStatusMutationVariables = Exact<{
  bookingId: Scalars['String']['input'];
  status: Scalars['String']['input'];
  hotelId: Scalars['String']['input'];
  room: Scalars['String']['input'];
}>;


export type UpdateAccommodationStatusMutation = { __typename?: 'Mutation', updateStatus: { __typename: 'Error', message: string } | { __typename: 'MutationUpdateStatusSuccess', data: { __typename?: 'UserInHotel', status: AccommodationBookingStatus, room?: string | null, user: { __typename?: 'User', name: string }, hotel: { __typename?: 'Hotel', name: string } } } };

export type UpdateEventMutationVariables = Exact<{
  description?: InputMaybe<Scalars['String']['input']>;
  fees?: InputMaybe<Scalars['Int']['input']>;
  maxTeamSize?: InputMaybe<Scalars['Int']['input']>;
  maxTeams?: InputMaybe<Scalars['Int']['input']>;
  minTeamSize?: InputMaybe<Scalars['Int']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  venue?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  eventType?: InputMaybe<EventType>;
  image?: InputMaybe<Scalars['String']['input']>;
  category?: InputMaybe<EventCategory>;
}>;


export type UpdateEventMutation = { __typename?: 'Mutation', updateEvent: { __typename: 'Error', message: string } | { __typename: 'MutationUpdateEventSuccess', data: { __typename?: 'Event', id: string } } };

export type UpdateProfileImageMutationVariables = Exact<{
  imageURL: Scalars['String']['input'];
}>;


export type UpdateProfileImageMutation = { __typename?: 'Mutation', updateProfileImage: { __typename: 'Error', message: string } | { __typename?: 'MutationUpdateProfileImageSuccess' } };

export type UpdateQuizMutationVariables = Exact<{
  quizId?: InputMaybe<Scalars['String']['input']>;
  questions?: InputMaybe<Array<QuestionsCreateInput> | QuestionsCreateInput>;
}>;


export type UpdateQuizMutation = { __typename?: 'Mutation', updateQuiz: { __typename: 'Error', message: string } | { __typename: 'MutationUpdateQuizSuccess', data: { __typename?: 'Quiz', description?: string | null, endTime: Date, eventId: string, id: string, name: string, password: string, overridePassword: string, roundNo: number, startTime: Date, updatedAt: Date, questions: Array<{ __typename?: 'Question', description?: string | null, id: string, image?: string | null, isCode: boolean, question: string, createdAt: Date, options: Array<{ __typename?: 'Options', id: string, isAnswer: boolean, value: string }> }> } } };

export type UpdateQuizFlagMutationVariables = Exact<{
  allowUser?: InputMaybe<Scalars['Boolean']['input']>;
  flags?: InputMaybe<Scalars['Int']['input']>;
  quizId?: InputMaybe<Scalars['String']['input']>;
  teamId?: InputMaybe<Scalars['Int']['input']>;
}>;


export type UpdateQuizFlagMutation = { __typename?: 'Mutation', updateQuizFlag: { __typename: 'Error', message: string } | { __typename?: 'MutationUpdateQuizFlagSuccess' } };

export type UpdateQuizStatusMutationVariables = Exact<{
  quizId?: InputMaybe<Scalars['String']['input']>;
  allowAttempts?: InputMaybe<Scalars['Boolean']['input']>;
}>;


export type UpdateQuizStatusMutation = { __typename?: 'Mutation', updateQuizStatus: { __typename: 'Error', message: string } | { __typename: 'MutationUpdateQuizStatusSuccess' } };

export type UpdateStoneVisibilitiesMutationVariables = Exact<{
  stoneId?: InputMaybe<Scalars['String']['input']>;
}>;


export type UpdateStoneVisibilitiesMutation = { __typename?: 'Mutation', updateStoneVisibilities: { __typename: 'Error', message: string } | { __typename: 'MutationUpdateStoneVisibilitiesSuccess' } };

export type VerifyEmailMutationVariables = Exact<{
  token: Scalars['String']['input'];
}>;


export type VerifyEmailMutation = { __typename?: 'Mutation', verifyEmail: { __typename: 'Error', message: string } | { __typename: 'MutationVerifyEmailSuccess' } };

export type AccommodationRequestByDayQueryVariables = Exact<{
  date: Scalars['DateTime']['input'];
}>;


export type AccommodationRequestByDayQuery = { __typename?: 'Query', accommodationRequestByDay: { __typename: 'Error', message: string } | { __typename: 'QueryAccommodationRequestByDaySuccess', data: Array<{ __typename?: 'UserInHotel', checkIn?: Date | null, checkOut?: Date | null, createdAt?: Date | null, gender: Gender, id: string, room?: string | null, ac: boolean, status: AccommodationBookingStatus, updatedAt?: Date | null, hotel: { __typename?: 'Hotel', createdAt?: Date | null, details?: string | null, id: string, name: string, price: number, updatedAt?: Date | null }, user: { __typename?: 'User', createdAt: Date, email: string, id: string, isVerified: boolean, name: string, phoneNumber?: string | null, college?: { __typename?: 'College', id: string, name: string } | null } }> } };

export type AccommodationRequestByHotelQueryVariables = Exact<{
  name: Scalars['String']['input'];
}>;


export type AccommodationRequestByHotelQuery = { __typename?: 'Query', accommodationRequestByHotel: { __typename: 'Error', message: string } | { __typename: 'QueryAccommodationRequestByHotelSuccess', data: Array<{ __typename?: 'UserInHotel', checkIn?: Date | null, checkOut?: Date | null, createdAt?: Date | null, gender: Gender, id: string, room?: string | null, ac: boolean, status: AccommodationBookingStatus, updatedAt?: Date | null, hotel: { __typename?: 'Hotel', createdAt?: Date | null, details?: string | null, id: string, name: string, price: number, updatedAt?: Date | null }, user: { __typename?: 'User', createdAt: Date, email: string, id: string, isVerified: boolean, name: string, phoneNumber?: string | null, college?: { __typename?: 'College', id: string, name: string } | null } }> } };

export type AccommodationRequestsQueryVariables = Exact<{ [key: string]: never; }>;


export type AccommodationRequestsQuery = { __typename?: 'Query', accommodationRequests: { __typename: 'Error', message: string } | { __typename: 'QueryAccommodationRequestsSuccess', data: Array<{ __typename?: 'UserInHotel', checkIn?: Date | null, checkOut?: Date | null, createdAt?: Date | null, gender: Gender, id: string, room?: string | null, ac: boolean, status: AccommodationBookingStatus, updatedAt?: Date | null, user: { __typename?: 'User', email: string, createdAt: Date, id: string, isVerified: boolean, name: string, phoneNumber?: string | null, college?: { __typename?: 'College', id: string, name: string } | null }, hotel: { __typename?: 'Hotel', details?: string | null, id: string, name: string, price: number } }> } };

export type AccommodationRequestsByUserQueryVariables = Exact<{ [key: string]: never; }>;


export type AccommodationRequestsByUserQuery = { __typename?: 'Query', accommodationRequestsByUser: { __typename: 'Error', message: string } | { __typename: 'QueryAccommodationRequestsByUserSuccess', data: Array<{ __typename?: 'UserInHotel', checkIn?: Date | null, checkOut?: Date | null, room?: string | null, status: AccommodationBookingStatus, hotel: { __typename?: 'Hotel', name: string, price: number } }> } };

export type AccommodationRequestsByUserIdQueryVariables = Exact<{
  userId: Scalars['ID']['input'];
}>;


export type AccommodationRequestsByUserIdQuery = { __typename?: 'Query', accommodationRequestsByUserId: { __typename: 'Error', message: string } | { __typename: 'QueryAccommodationRequestsByUserIdSuccess', data: Array<{ __typename?: 'UserInHotel', ac: boolean, checkIn?: Date | null, checkOut?: Date | null, createdAt?: Date | null, gender: Gender, IdCard?: string | null, room?: string | null, status: AccommodationBookingStatus, hotel: { __typename?: 'Hotel', details?: string | null, createdAt?: Date | null, id: string, name: string, price: number }, user: { __typename?: 'User', id: string, email: string, isVerified: boolean, name: string, phoneNumber?: string | null, college?: { __typename?: 'College', name: string } | null } }> } };

export type AttemptQuizQueryVariables = Exact<{
  quizId: Scalars['ID']['input'];
}>;


export type AttemptQuizQuery = { __typename?: 'Query', attemptQuiz: { __typename: 'Error', message: string } | { __typename: 'QueryAttemptQuizSuccess', data: { __typename?: 'Team', id: string, leaderId?: number | null, name: string, attended: boolean, confirmed: boolean, roundNo: number } } };

export type CollegesQueryVariables = Exact<{ [key: string]: never; }>;


export type CollegesQuery = { __typename?: 'Query', colleges: { __typename: 'Error', message: string } | { __typename: 'QueryCollegesSuccess', data: Array<{ __typename?: 'College', id: string, name: string }> } };

export type CompletedEventsQueryVariables = Exact<{ [key: string]: never; }>;


export type CompletedEventsQuery = { __typename?: 'Query', completedEvents: { __typename: 'Error', message: string } | { __typename: 'QueryCompletedEventsSuccess', data: Array<{ __typename?: 'Event', id: string, name: string, eventType: EventType, winner?: Array<{ __typename?: 'Winners', type: WinnerType, team: { __typename?: 'Team', id: string, leaderId?: number | null, name: string, members: Array<{ __typename?: 'TeamMember', user: { __typename?: 'User', name: string, phoneNumber?: string | null, role: Role, isVerified: boolean, id: string, email: string, createdAt: Date, college?: { __typename?: 'College', name: string } | null } }> } }> | null, rounds: Array<{ __typename?: 'Round', completed: boolean, date?: Date | null, eventId: string, roundNo: number, selectStatus: boolean }> }> } };

export type MySubmissionsQueryVariables = Exact<{
  day: DayType;
}>;


export type MySubmissionsQuery = { __typename?: 'Query', submissionsByUser: { __typename: 'Error', message: string } | { __typename: 'QuerySubmissionsByUserSuccess', data: Array<{ __typename?: 'Submission', cardId: string, image: string }> } };

export type GetCardsQueryVariables = Exact<{
  day: DayType;
}>;


export type GetCardsQuery = { __typename?: 'Query', getCards: { __typename: 'Error', message: string } | { __typename: 'QueryGetCardsSuccess', data: Array<{ __typename?: 'Card', clue: string, day: DayType, id: string }> } };

export type EventByIdQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type EventByIdQuery = { __typename?: 'Query', eventById: { __typename: 'Error', message: string } | { __typename: 'QueryEventByIdSuccess', data: { __typename?: 'Event', id: string, description?: string | null, eventType: EventType, name: string, venue?: string | null, minTeamSize: number, maxTeams?: number | null, maxTeamSize: number, image?: string | null, fees: number, published: boolean, category: EventCategory, organizers: Array<{ __typename?: 'Organizer', user: { __typename?: 'User', email: string, name: string, phoneNumber?: string | null } }>, rounds: Array<{ __typename?: 'Round', completed: boolean, roundNo: number, date?: Date | null }> } } };

export type EventsQueryVariables = Exact<{
  first: Scalars['Int']['input'];
}>;


export type EventsQuery = { __typename?: 'Query', events: { __typename?: 'QueryEventsConnection', edges: Array<{ __typename?: 'QueryEventsConnectionEdge', cursor: string, node: { __typename?: 'Event', id: string, description?: string | null, eventType: EventType, name: string, fees: number, image?: string | null, maxTeamSize: number, maxTeams?: number | null, minTeamSize: number, published: boolean, category: EventCategory, venue?: string | null, branch: { __typename?: 'Branch', id: string, name: string }, rounds: Array<{ __typename?: 'Round', completed: boolean, roundNo: number, date?: Date | null, eventId: string, event: { __typename?: 'Event', branch: { __typename?: 'Branch', id: string, name: string } } }>, teams: Array<{ __typename?: 'Team', id: string, attended: boolean, confirmed: boolean, leaderId?: number | null, name: string, members: Array<{ __typename?: 'TeamMember', user: { __typename?: 'User', id: string, name: string, phoneNumber?: string | null, role: Role, email: string, isVerified: boolean, createdAt: Date } }> }> } }> } };

export type EventsByBranchRepQueryVariables = Exact<{
  branchRepId: Scalars['ID']['input'];
}>;


export type EventsByBranchRepQuery = { __typename?: 'Query', eventsByBranchRep: { __typename: 'Error', message: string } | { __typename: 'QueryEventsByBranchRepSuccess', data: Array<{ __typename?: 'Event', description?: string | null, eventType: EventType, fees: number, id: string, category: EventCategory, image?: string | null, maxTeamSize: number, maxTeams?: number | null, minTeamSize: number, name: string, published: boolean, venue?: string | null, rounds: Array<{ __typename?: 'Round', completed: boolean, roundNo: number, eventId: string, date?: Date | null, judges: Array<{ __typename?: 'Judge', user: { __typename?: 'User', email: string, name: string, id: string } }> }>, organizers: Array<{ __typename?: 'Organizer', user: { __typename?: 'User', email: string, name: string, id: string } }>, branch: { __typename?: 'Branch', id: string, name: string } }> } };

export type EventByOrganizerQueryVariables = Exact<{ [key: string]: never; }>;


export type EventByOrganizerQuery = { __typename?: 'Query', eventByOrganizer: { __typename: 'Error', message: string } | { __typename: 'QueryEventByOrganizerSuccess', data: Array<{ __typename?: 'Event', description?: string | null, eventType: EventType, fees: number, id: string, category: EventCategory, image?: string | null, maxTeamSize: number, maxTeams?: number | null, minTeamSize: number, name: string, published: boolean, venue?: string | null, rounds: Array<{ __typename?: 'Round', completed: boolean, roundNo: number, eventId: string, date?: Date | null, quiz?: { __typename?: 'Quiz', id: string, name: string, description?: string | null, startTime: Date, endTime: Date, password: string, overridePassword: string, points: number, qualifyNext: number, allowAttempts: boolean, completed: boolean, questions: Array<{ __typename?: 'Question', id: string }> } | null, criteria?: Array<{ __typename?: 'Criteria', id: string, name: string, type: CriteriaType }> | null, judges: Array<{ __typename?: 'Judge', user: { __typename?: 'User', email: string, name: string, id: string } }> }>, organizers: Array<{ __typename?: 'Organizer', user: { __typename?: 'User', email: string, name: string, id: string } }>, branch: { __typename?: 'Branch', id: string, name: string } }> } };

export type GetAllHotelsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllHotelsQuery = { __typename?: 'Query', getAllHotels: { __typename: 'Error', message: string } | { __typename: 'QueryGetAllHotelsSuccess', data: Array<{ __typename?: 'Hotel', createdAt?: Date | null, details?: string | null, id: string, name: string, price: number, updatedAt?: Date | null }> } };

export type GetAllQuestionsQueryVariables = Exact<{
  quizId: Scalars['String']['input'];
}>;


export type GetAllQuestionsQuery = { __typename?: 'Query', getAllquestions: { __typename: 'Error', message: string } | { __typename: 'QueryGetAllquestionsSuccess', data: Array<{ __typename?: 'Question', id: string, question: string, image?: string | null, isCode: boolean, description?: string | null, options: Array<{ __typename?: 'Options', id: string, questionId: string, value: string }> }> } };

export type GetAllSubmissionsQueryVariables = Exact<{
  day: DayType;
}>;


export type GetAllSubmissionsQuery = { __typename?: 'Query', getAllSubmissions: { __typename?: 'Error' } | { __typename: 'QueryGetAllSubmissionsSuccess', data: Array<{ __typename?: 'Submission', image: string, user: { __typename?: 'User', name: string, id: string }, card: { __typename?: 'Card', clue: string, id: string, day: DayType } }> } };

export type GetAllWinnersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllWinnersQuery = { __typename?: 'Query', allWinners: { __typename: 'Error', message: string } | { __typename: 'QueryAllWinnersSuccess', data: Array<{ __typename?: 'Winners', type: WinnerType, team: { __typename?: 'Team', members: Array<{ __typename?: 'TeamMember', user: { __typename?: 'User', name: string, phoneNumber?: string | null } }> }, event: { __typename?: 'Event', name: string, branch: { __typename?: 'Branch', name: string, id: string }, rounds: Array<{ __typename?: 'Round', date?: Date | null }> } }> } };

export type GetAvatarsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAvatarsQuery = { __typename?: 'Query', getAvatars: Array<{ __typename?: 'Avatar', name: string, url: string }> };

export type BranchesQueryVariables = Exact<{ [key: string]: never; }>;


export type BranchesQuery = { __typename?: 'Query', getBranches: { __typename: 'Error', message: string } | { __typename: 'QueryGetBranchesSuccess', data: Array<{ __typename?: 'Branch', id: string, name: string, branchReps: Array<{ __typename?: 'BranchRep', branchId: string, userId: string, user: { __typename?: 'User', email: string, id: string, isVerified: boolean, name: string, phoneNumber?: string | null, role: Role } }> }> } };

export type GetChampionshipLeaderboardQueryVariables = Exact<{ [key: string]: never; }>;


export type GetChampionshipLeaderboardQuery = { __typename?: 'Query', getChampionshipLeaderboard: { __typename?: 'Error' } | { __typename: 'QueryGetChampionshipLeaderboardSuccess', data: Array<{ __typename?: 'ChampionshipPoint', id: number, name: string, isEligible: boolean, championshipPoints: number, techCount: number, nonTechCount: number, coreCount: number, diamondCount: { __typename?: 'Counts', winner: number, runner_up: number, second_runner_up: number }, goldCount: { __typename?: 'Counts', winner: number, runner_up: number, second_runner_up: number }, silverCount: { __typename?: 'Counts', winner: number, runner_up: number, second_runner_up: number }, bronzeCount: { __typename?: 'Counts', winner: number, runner_up: number, second_runner_up: number } }> } };

export type GetCommentQueryVariables = Exact<{
  eventId: Scalars['ID']['input'];
  roundNo: Scalars['Int']['input'];
  teamId: Scalars['ID']['input'];
}>;


export type GetCommentQuery = { __typename?: 'Query', getComment: { __typename: 'Error', message: string } | { __typename: 'QueryGetCommentSuccess', data: { __typename?: 'Comments', comment: string } } };

export type GetCoreTeamMembersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCoreTeamMembersQuery = { __typename?: 'Query', getCoreTeamMembers: { __typename: 'Error', message: string } | { __typename: 'QueryGetCoreTeamMembersSuccess', data: Array<{ __typename?: 'CoreTeamMember', committee: string, designation: string, email: string, id: string, imageUrl?: string | null, name: string, phone: string }> } };

export type GetEventStatusQueryVariables = Exact<{ [key: string]: never; }>;


export type GetEventStatusQuery = { __typename?: 'Query', getEventStatus: { __typename: 'Error', message: string } | { __typename: 'QueryGetEventStatusSuccess', data: Array<{ __typename?: 'EventStatus', eventName: string, status: string }> } };

export type GetXpLeaderboardQueryVariables = Exact<{ [key: string]: never; }>;


export type GetXpLeaderboardQuery = { __typename?: 'Query', getXpLeaderboard: { __typename: 'Error', message: string } | { __typename: 'QueryGetXpLeaderboardSuccess', data: Array<{ __typename?: 'XP', id: string, createdAt: Date, level: { __typename?: 'Level', id: string, point: number }, user: { __typename?: 'User', name: string, id: string, email: string, createdAt: Date, isVerified: boolean, phoneNumber?: string | null, role: Role } }> } };

export type GetProniteRegistrationsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetProniteRegistrationsQuery = { __typename?: 'Query', getProniteRegistrations: { __typename?: 'ProniteRegistrationCounts', day1Count: number, day2Count: number } };

export type GetQuizByEventRoundQueryVariables = Exact<{
  eventId: Scalars['Int']['input'];
  roundId: Scalars['Int']['input'];
}>;


export type GetQuizByEventRoundQuery = { __typename?: 'Query', getQuizByEventRound: { __typename: 'Error', message: string } | { __typename: 'QueryGetQuizByEventRoundSuccess', data: { __typename?: 'Quiz', description?: string | null, endTime: Date, id: string, name: string, password: string, overridePassword: string, roundNo: number, startTime: Date, updatedAt: Date, questions: Array<{ __typename?: 'Question', image?: string | null, description?: string | null, isCode: boolean, question: string, id: string, createdAt: Date, options: Array<{ __typename?: 'Options', id: string, value: string, isAnswer: boolean }> }> } } };

export type GetQuizByIdQueryVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type GetQuizByIdQuery = { __typename?: 'Query', getQuizById: { __typename: 'Error', message: string } | { __typename: 'QueryGetQuizByIdSuccess', data: { __typename?: 'Quiz', description?: string | null, endTime: Date, eventId: string, id: string, name: string, roundNo: number, startTime: Date, overridePassword: string, questions: Array<{ __typename?: 'Question', id: string, description?: string | null, image?: string | null, isCode: boolean, question: string, options: Array<{ __typename?: 'Options', id: string, questionId: string, value: string }> }> } } };

export type GetQuizFlagQueryVariables = Exact<{
  teamId?: InputMaybe<Scalars['Int']['input']>;
  quizId?: InputMaybe<Scalars['String']['input']>;
}>;


export type GetQuizFlagQuery = { __typename?: 'Query', getQuizFlag: { __typename: 'Error', message: string } | { __typename: 'QueryGetQuizFlagSuccess', data: { __typename?: 'QuizScore', allowUser: boolean, flags: number } } };

export type GetQuizScoresQueryVariables = Exact<{
  quizId?: InputMaybe<Scalars['String']['input']>;
}>;


export type GetQuizScoresQuery = { __typename?: 'Query', getQuizScores: { __typename: 'Error', message: string } | { __typename: 'QueryGetQuizScoresSuccess', data: Array<{ __typename?: 'QuizScore', score: number, timeTaken: number, teamId: number, team: { __typename?: 'Team', name: string, roundNo: number }, quiz: { __typename?: 'Quiz', qualifyNext: number, roundNo: number, name: string } }> } };

export type GetRegistrationVsDateQueryVariables = Exact<{
  date?: InputMaybe<Scalars['DateTime']['input']>;
}>;


export type GetRegistrationVsDateQuery = { __typename?: 'Query', getRegistrationvsDate: { __typename: 'Error', message: string } | { __typename: 'QueryGetRegistrationvsDateSuccess', data: Array<{ __typename?: 'RegistrationVSDateObject', date: string, externalRegistrations: number, internalRegistrations: number }> } };

export type GetRevenueQueryVariables = Exact<{ [key: string]: never; }>;


export type GetRevenueQuery = { __typename?: 'Query', getRevenue: { __typename: 'Error', message: string } | { __typename: 'QueryGetRevenueSuccess', data: number } };

export type GetRoundStatusQueryVariables = Exact<{
  eventId: Scalars['ID']['input'];
  roundNo: Scalars['Int']['input'];
}>;


export type GetRoundStatusQuery = { __typename?: 'Query', getRoundStatus: { __typename: 'Error', message: string } | { __typename: 'QueryGetRoundStatusSuccess', data: { __typename?: 'Round', selectStatus: boolean } } };

export type GetScoreQueryVariables = Exact<{
  criteriaId: Scalars['ID']['input'];
  roundNo: Scalars['Int']['input'];
  teamId: Scalars['ID']['input'];
}>;


export type GetScoreQuery = { __typename?: 'Query', getScore: { __typename: 'Error', message: string } | { __typename: 'QueryGetScoreSuccess', data: { __typename?: 'Scores', score: string } } };

export type GetScoreSheetJuryQueryVariables = Exact<{
  eventId: Scalars['ID']['input'];
  roundNo: Scalars['Int']['input'];
}>;


export type GetScoreSheetJuryQuery = { __typename?: 'Query', getScoreSheetJuryView: { __typename: 'Error', message: string } | { __typename: 'QueryGetScoreSheetJuryViewSuccess', data: Array<{ __typename?: 'ScoreSheetJuryView', teamId: number, teamName: string, teamScore: number, judges: Array<{ __typename?: 'JudgeJuryView', judgeId: number, judgeName: string, criteria: Array<{ __typename?: 'CriteriaJuryView', criteriaId: number, score: number, criteriaName: string }> }> }> } };

export type GetRegistrationsOpenQueryVariables = Exact<{ [key: string]: never; }>;


export type GetRegistrationsOpenQuery = { __typename?: 'Query', getRegistrationsOpen: { __typename: 'Error', message: string } | { __typename: 'QueryGetRegistrationsOpenSuccess', data: boolean } };

export type GetSponsorsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetSponsorsQuery = { __typename?: 'Query', getSponsors: { __typename: 'Error', message: string } | { __typename: 'QueryGetSponsorsSuccess', data: Array<{ __typename?: 'Sponsor', description: string, id: string, imageUrl?: string | null, name: string, title: string, websiteUrl?: string | null }> } };

export type GetStoneVisibilitiesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetStoneVisibilitiesQuery = { __typename?: 'Query', getStoneVisibilities: { __typename: 'Error', message: string } | { __typename: 'QueryGetStoneVisibilitiesSuccess', data: string } };

export type GetTeamDetailsQueryVariables = Exact<{
  eventId: Scalars['ID']['input'];
}>;


export type GetTeamDetailsQuery = { __typename?: 'Query', myTeam: { __typename: 'Error', message: string } | { __typename: 'QueryMyTeamSuccess', data: { __typename?: 'Team', attended: boolean, confirmed: boolean, id: string, leaderId?: number | null, name: string } } };

export type GetTechTeamMembersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetTechTeamMembersQuery = { __typename?: 'Query', getTechTeamMembers: { __typename: 'Error', message: string } | { __typename: 'QueryGetTechTeamMembersSuccess', data: Array<{ __typename?: 'TechTeamMember', github?: string | null, id: string, role: string, imageUrl?: string | null, instagram?: string | null, quote: string, name: string, linkedin?: string | null }> } };

export type GetTotalRegistrationsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetTotalRegistrationsQuery = { __typename?: 'Query', getTotalRegistrations: { __typename: 'Error', message: string } | { __typename: 'QueryGetTotalRegistrationsSuccess', data: { __typename?: 'EventRegistrationsCount', externalRegistrations: number, internalRegistrations: number } } };

export type GetTotalScoresQueryVariables = Exact<{
  eventId: Scalars['ID']['input'];
  roundNo: Scalars['Int']['input'];
}>;


export type GetTotalScoresQuery = { __typename?: 'Query', getTotalScores: { __typename: 'Error', message: string } | { __typename: 'QueryGetTotalScoresSuccess', data: Array<{ __typename?: 'TotalScores', judgeScore: number, teamId: number, totalScore: number }> } };

export type GetUserXpQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUserXpQuery = { __typename?: 'Query', getUserXp: { __typename: 'Error', message: string } | { __typename: 'QueryGetUserXpSuccess', data: Array<{ __typename?: 'XP', id: string, level: { __typename?: 'Level', id: string, point: number }, user: { __typename?: 'User', id: string, name: string, email: string, phoneNumber?: string | null } }> } };

export type JudgeCountByJudgeQueryVariables = Exact<{ [key: string]: never; }>;


export type JudgeCountByJudgeQuery = { __typename?: 'Query', judgeCountByJudge: { __typename: 'Error', message: string } | { __typename: 'QueryJudgeCountByJudgeSuccess', data: number } };

export type JudgeGetTeamsByRoundQueryVariables = Exact<{
  eventId: Scalars['Int']['input'];
  roundId: Scalars['Int']['input'];
}>;


export type JudgeGetTeamsByRoundQuery = { __typename?: 'Query', judgeGetTeamsByRound: { __typename: 'Error', message: string } | { __typename: 'QueryJudgeGetTeamsByRoundSuccess', data: Array<{ __typename?: 'Team', id: string, name: string, roundNo: number, leaderId?: number | null, members: Array<{ __typename?: 'TeamMember', user: { __typename?: 'User', id: string } }> }> } };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me: { __typename: 'Error', message: string } | { __typename: 'QueryMeSuccess', data: { __typename?: 'User', createdAt: Date, email: string, id: string, isVerified: boolean, name: string, phoneNumber?: string | null, role: Role, profileImage?: string | null, college?: { __typename?: 'College', id: string, name: string } | null } } };

export type MyTeamQueryVariables = Exact<{
  eventId: Scalars['ID']['input'];
}>;


export type MyTeamQuery = { __typename?: 'Query', myTeam: { __typename: 'Error', message: string } | { __typename: 'QueryMyTeamSuccess', data: { __typename?: 'Team', attended: boolean, confirmed: boolean, id: string, leaderId?: number | null, name: string, event: { __typename?: 'Event', id: string, name: string, maxTeamSize: number, minTeamSize: number, fees: number, eventType: EventType }, members: Array<{ __typename?: 'TeamMember', user: { __typename?: 'User', email: string, id: string, phoneNumber?: string | null, name: string, college?: { __typename?: 'College', name: string } | null } }> } } };

export type PublishedEventsSlugQueryVariables = Exact<{ [key: string]: never; }>;


export type PublishedEventsSlugQuery = { __typename?: 'Query', publishedEvents: Array<{ __typename?: 'Event', id: string, name: string }> };

export type PublishedEventsQueryVariables = Exact<{ [key: string]: never; }>;


export type PublishedEventsQuery = { __typename?: 'Query', publishedEvents: Array<{ __typename?: 'Event', id: string, name: string, image?: string | null, venue?: string | null, fees: number, maxTeamSize: number, maxTeams?: number | null, minTeamSize: number, category: EventCategory, eventType: EventType, branch: { __typename?: 'Branch', name: string, id: string }, rounds: Array<{ __typename?: 'Round', date?: Date | null, roundNo: number, completed: boolean }> }> };

export type RegisterdEventsQueryVariables = Exact<{ [key: string]: never; }>;


export type RegisterdEventsQuery = { __typename?: 'Query', registeredEvents: { __typename: 'Error', message: string } | { __typename: 'QueryRegisteredEventsSuccess', data: Array<{ __typename?: 'Event', id: string, image?: string | null, name: string, venue?: string | null, category: EventCategory, rounds: Array<{ __typename?: 'Round', date?: Date | null, roundNo: number }>, teams: Array<{ __typename?: 'Team', id: string, leaderId?: number | null, confirmed: boolean, name: string, attended: boolean, members: Array<{ __typename?: 'TeamMember', user: { __typename?: 'User', id: string, name: string } }>, event: { __typename?: 'Event', name: string, id: string, maxTeamSize: number, minTeamSize: number, fees: number, eventType: EventType } }>, winner?: Array<{ __typename?: 'Winners', id: string, type: WinnerType }> | null }> } };

export type RoundByJudgeQueryVariables = Exact<{ [key: string]: never; }>;


export type RoundByJudgeQuery = { __typename?: 'Query', roundByJudge: { __typename: 'Error', message: string } | { __typename: 'QueryRoundByJudgeSuccess', data: { __typename?: 'Round', eventId: string, roundNo: number, criteria?: Array<{ __typename?: 'Criteria', id: string, name: string, type: CriteriaType }> | null, event: { __typename?: 'Event', name: string, eventType: EventType, rounds: Array<{ __typename?: 'Round', roundNo: number, completed: boolean }> } } } };

export type RoundsByEventQueryVariables = Exact<{
  eventId: Scalars['ID']['input'];
}>;


export type RoundsByEventQuery = { __typename?: 'Query', roundsByEvent: { __typename: 'Error', message: string } | { __typename: 'QueryRoundsByEventSuccess', data: Array<{ __typename?: 'Round', completed: boolean, date?: Date | null, eventId: string, roundNo: number }> } };

export type SearchUsersQueryVariables = Exact<{
  contains?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  after?: InputMaybe<Scalars['String']['input']>;
}>;


export type SearchUsersQuery = { __typename?: 'Query', users: { __typename?: 'QueryUsersConnection', pageInfo: { __typename?: 'PageInfo', endCursor?: string | null, hasNextPage: boolean }, edges: Array<{ __typename?: 'QueryUsersConnectionEdge', cursor: string, node: { __typename?: 'User', id: string, name: string, role: Role, email: string } }> } };

export type TeamDetailsQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type TeamDetailsQuery = { __typename?: 'Query', teamDetails: { __typename: 'Error', message: string } | { __typename: 'QueryTeamDetailsSuccess', data: { __typename?: 'Team', attended: boolean, confirmed: boolean, id: string, name: string, members: Array<{ __typename?: 'TeamMember', user: { __typename?: 'User', createdAt: Date, email: string, id: string, isVerified: boolean, name: string, phoneNumber?: string | null, role: Role, college?: { __typename?: 'College', name: string } | null } }>, event: { __typename?: 'Event', eventType: EventType } } } };

export type TeamsByRoundQueryVariables = Exact<{
  eventId: Scalars['ID']['input'];
  roundNo: Scalars['Int']['input'];
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  contains?: InputMaybe<Scalars['String']['input']>;
}>;


export type TeamsByRoundQuery = { __typename?: 'Query', teamsByRound: { __typename?: 'QueryTeamsByRoundConnection', edges: Array<{ __typename?: 'QueryTeamsByRoundConnectionEdge', node: { __typename?: 'Team', attended: boolean, id: string, name: string, members: Array<{ __typename?: 'TeamMember', user: { __typename?: 'User', id: string, name: string, phoneNumber?: string | null, email: string } }> } }>, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, endCursor?: string | null } } };

export type UserByIdQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type UserByIdQuery = { __typename?: 'Query', userById: { __typename: 'Error', message: string } | { __typename: 'QueryUserByIdSuccess', data: { __typename?: 'User', email: string, id: string, name: string, phoneNumber?: string | null, college?: { __typename?: 'College', name: string } | null } } };

export type VerifyQuizPasswordQueryVariables = Exact<{
  password?: InputMaybe<Scalars['String']['input']>;
  quizId?: InputMaybe<Scalars['String']['input']>;
}>;


export type VerifyQuizPasswordQuery = { __typename?: 'Query', verifyQuizPassword: { __typename: 'Error', message: string } | { __typename: 'QueryVerifyQuizPasswordSuccess' } };

export type WinnersByEventQueryVariables = Exact<{
  eventId: Scalars['ID']['input'];
}>;


export type WinnersByEventQuery = { __typename?: 'Query', winnersByEvent: { __typename: 'Error', message: string } | { __typename: 'QueryWinnersByEventSuccess', data: Array<{ __typename?: 'Winners', id: string, type: WinnerType, team: { __typename?: 'Team', attended: boolean, confirmed: boolean, leaderId?: number | null, id: string, name: string, roundNo: number, members: Array<{ __typename?: 'TeamMember', user: { __typename?: 'User', createdAt: Date, id: string, email: string, isVerified: boolean, name: string, phoneNumber?: string | null, role: Role } }> } }> } };


export const AddAccommodationRequestDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AddAccommodationRequest"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"checkInTime"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"DateTime"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"checkOutTime"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"DateTime"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"gender"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"hotelId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addAccommodationRequest"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"checkIn"},"value":{"kind":"Variable","name":{"kind":"Name","value":"checkInTime"}}},{"kind":"Argument","name":{"kind":"Name","value":"checkOut"},"value":{"kind":"Variable","name":{"kind":"Name","value":"checkOutTime"}}},{"kind":"Argument","name":{"kind":"Name","value":"gender"},"value":{"kind":"Variable","name":{"kind":"Name","value":"gender"}}},{"kind":"Argument","name":{"kind":"Name","value":"hotelId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"hotelId"}}},{"kind":"Argument","name":{"kind":"Name","value":"IdCard"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Error"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MutationAddAccommodationRequestSuccess"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"checkIn"}},{"kind":"Field","name":{"kind":"Name","value":"checkOut"}},{"kind":"Field","name":{"kind":"Name","value":"gender"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"phoneNumber"}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<AddAccommodationRequestMutation, AddAccommodationRequestMutationVariables>;
export const AddBranchDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"addBranch"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addBranch"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Error"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MutationAddBranchSuccess"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]}}]} as unknown as DocumentNode<AddBranchMutation, AddBranchMutationVariables>;
export const AddBranchRepDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AddBranchRep"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"branchId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addBranchRep"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"branchId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"branchId"}}},{"kind":"Argument","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Error"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MutationAddBranchRepSuccess"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"branchId"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}}]}}]}}]}}]}}]} as unknown as DocumentNode<AddBranchRepMutation, AddBranchRepMutationVariables>;
export const AddCommentDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AddComment"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"comment"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"eventId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"roundNo"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"teamId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addComment"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"comment"},"value":{"kind":"Variable","name":{"kind":"Name","value":"comment"}}},{"kind":"Argument","name":{"kind":"Name","value":"eventId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"eventId"}}},{"kind":"Argument","name":{"kind":"Name","value":"roundNo"},"value":{"kind":"Variable","name":{"kind":"Name","value":"roundNo"}}},{"kind":"Argument","name":{"kind":"Name","value":"teamId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"teamId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Error"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MutationAddCommentSuccess"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}}]}}]}}]}}]} as unknown as DocumentNode<AddCommentMutation, AddCommentMutationVariables>;
export const AddOrganizerDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AddOrganizer"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"eventId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addOrganizer"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"eventId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"eventId"}}},{"kind":"Argument","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Error"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MutationAddOrganizerSuccess"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}}]}}]}}]}}]} as unknown as DocumentNode<AddOrganizerMutation, AddOrganizerMutationVariables>;
export const AddScoreDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AddScore"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"criteriaId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"score"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"teamId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addScore"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"criteriaId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"criteriaId"}}},{"kind":"Argument","name":{"kind":"Name","value":"score"},"value":{"kind":"Variable","name":{"kind":"Name","value":"score"}}},{"kind":"Argument","name":{"kind":"Name","value":"teamId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"teamId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Error"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MutationAddScoreSuccess"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}}]}}]}}]}}]} as unknown as DocumentNode<AddScoreMutation, AddScoreMutationVariables>;
export const AddXpDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AddXP"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"levelId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addXP"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"levelId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"levelId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Error"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MutationAddXPSuccess"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"level"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"point"}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<AddXpMutation, AddXpMutationVariables>;
export const ChangeSelectStatusDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ChangeSelectStatus"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"eventId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"roundNo"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"changeSelectStatus"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"eventId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"eventId"}}},{"kind":"Argument","name":{"kind":"Name","value":"roundNo"},"value":{"kind":"Variable","name":{"kind":"Name","value":"roundNo"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Error"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MutationChangeSelectStatusSuccess"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"selectStatus"}}]}}]}}]}}]}}]} as unknown as DocumentNode<ChangeSelectStatusMutation, ChangeSelectStatusMutationVariables>;
export const CompleteRoadiesRoundDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CompleteRoadiesRound"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"eventId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"roundNo"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"completeRoadiesRound"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"eventId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"eventId"}}},{"kind":"Argument","name":{"kind":"Name","value":"roundNo"},"value":{"kind":"Variable","name":{"kind":"Name","value":"roundNo"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Error"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MutationCompleteRoadiesRoundSuccess"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"roundNo"}},{"kind":"Field","name":{"kind":"Name","value":"leaderId"}}]}}]}}]}}]}}]} as unknown as DocumentNode<CompleteRoadiesRoundMutation, CompleteRoadiesRoundMutationVariables>;
export const CompleteRoundDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CompleteRound"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"eventId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"roundNo"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"completeRound"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"eventId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"eventId"}}},{"kind":"Argument","name":{"kind":"Name","value":"roundNo"},"value":{"kind":"Variable","name":{"kind":"Name","value":"roundNo"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Error"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MutationCompleteRoundSuccess"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}}]}}]}}]}}]} as unknown as DocumentNode<CompleteRoundMutation, CompleteRoundMutationVariables>;
export const ConfirmTeamDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ConfirmTeam"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"teamId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"confirmTeam"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"teamId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"teamId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Error"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MutationConfirmTeamSuccess"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}}]}}]}}]}}]} as unknown as DocumentNode<ConfirmTeamMutation, ConfirmTeamMutationVariables>;
export const CreateCardDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateCard"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"clue"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"day"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"DayType"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createCard"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"clue"},"value":{"kind":"Variable","name":{"kind":"Name","value":"clue"}}},{"kind":"Argument","name":{"kind":"Name","value":"day"},"value":{"kind":"Variable","name":{"kind":"Name","value":"day"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Error"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MutationCreateCardSuccess"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}}]}}]}}]}}]} as unknown as DocumentNode<CreateCardMutation, CreateCardMutationVariables>;
export const CreateCollegeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateCollege"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"details"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createCollege"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}},{"kind":"Argument","name":{"kind":"Name","value":"details"},"value":{"kind":"Variable","name":{"kind":"Name","value":"details"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Error"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MutationCreateCollegeSuccess"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]}}]} as unknown as DocumentNode<CreateCollegeMutation, CreateCollegeMutationVariables>;
export const CreateCriteriaDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateCriteria"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"eventId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"roundNo"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"type"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CriteriaType"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createCriteria"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"eventId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"eventId"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"roundNo"},"value":{"kind":"Variable","name":{"kind":"Name","value":"roundNo"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"type"},"value":{"kind":"Variable","name":{"kind":"Name","value":"type"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Error"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MutationCreateCriteriaSuccess"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}}]}}]}}]}}]} as unknown as DocumentNode<CreateCriteriaMutation, CreateCriteriaMutationVariables>;
export const CreateEventDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateEvent"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"eventType"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"EventType"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createEvent"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"eventType"},"value":{"kind":"Variable","name":{"kind":"Name","value":"eventType"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Error"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MutationCreateEventSuccess"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}}]}}]}}]}}]} as unknown as DocumentNode<CreateEventMutation, CreateEventMutationVariables>;
export const CreateHotelDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateHotel"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"details"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"price"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createHotel"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"details"},"value":{"kind":"Variable","name":{"kind":"Name","value":"details"}}},{"kind":"Argument","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}},{"kind":"Argument","name":{"kind":"Name","value":"price"},"value":{"kind":"Variable","name":{"kind":"Name","value":"price"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Error"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MutationCreateHotelSuccess"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"details"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]}}]}}]} as unknown as DocumentNode<CreateHotelMutation, CreateHotelMutationVariables>;
export const CreateJudgeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateJudge"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"eventId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"password"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"roundNo"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createJudge"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}},{"kind":"Argument","name":{"kind":"Name","value":"eventId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"eventId"}}},{"kind":"Argument","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}},{"kind":"Argument","name":{"kind":"Name","value":"password"},"value":{"kind":"Variable","name":{"kind":"Name","value":"password"}}},{"kind":"Argument","name":{"kind":"Name","value":"roundNo"},"value":{"kind":"Variable","name":{"kind":"Name","value":"roundNo"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Error"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MutationCreateJudgeSuccess"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}}]}}]}}]}}]} as unknown as DocumentNode<CreateJudgeMutation, CreateJudgeMutationVariables>;
export const CreateQuizDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateQuiz"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"quizDescription"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}},"defaultValue":{"kind":"StringValue","value":"","block":false}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"endTime"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}},"defaultValue":{"kind":"StringValue","value":"","block":false}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"eventId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}},"defaultValue":{"kind":"StringValue","value":"","block":false}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"quizTitle"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}},"defaultValue":{"kind":"StringValue","value":"","block":false}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"startTime"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}},"defaultValue":{"kind":"StringValue","value":"","block":false}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"roundId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}},"defaultValue":{"kind":"StringValue","value":"","block":false}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"password"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}},"defaultValue":{"kind":"StringValue","value":"","block":false}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"points"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}},"defaultValue":{"kind":"IntValue","value":"1"}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"qualifyNext"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}},"defaultValue":{"kind":"IntValue","value":"5"}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"overridePassword"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}},"defaultValue":{"kind":"StringValue","value":"","block":false}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createQuiz"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"endTime"},"value":{"kind":"Variable","name":{"kind":"Name","value":"endTime"}}},{"kind":"Argument","name":{"kind":"Name","value":"eventId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"eventId"}}},{"kind":"Argument","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"quizTitle"}}},{"kind":"Argument","name":{"kind":"Name","value":"roundId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"roundId"}}},{"kind":"Argument","name":{"kind":"Name","value":"startTime"},"value":{"kind":"Variable","name":{"kind":"Name","value":"startTime"}}},{"kind":"Argument","name":{"kind":"Name","value":"description"},"value":{"kind":"Variable","name":{"kind":"Name","value":"quizDescription"}}},{"kind":"Argument","name":{"kind":"Name","value":"password"},"value":{"kind":"Variable","name":{"kind":"Name","value":"password"}}},{"kind":"Argument","name":{"kind":"Name","value":"points"},"value":{"kind":"Variable","name":{"kind":"Name","value":"points"}}},{"kind":"Argument","name":{"kind":"Name","value":"qualifyNext"},"value":{"kind":"Variable","name":{"kind":"Name","value":"qualifyNext"}}},{"kind":"Argument","name":{"kind":"Name","value":"overridePassword"},"value":{"kind":"Variable","name":{"kind":"Name","value":"overridePassword"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Error"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MutationCreateQuizSuccess"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}}]}}]}}]}}]} as unknown as DocumentNode<CreateQuizMutation, CreateQuizMutationVariables>;
export const CreateRoundDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateRound"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"eventId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"date"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"DateTime"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createRound"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"eventId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"eventId"}}},{"kind":"Argument","name":{"kind":"Name","value":"date"},"value":{"kind":"Variable","name":{"kind":"Name","value":"date"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Error"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MutationCreateRoundSuccess"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"eventId"}},{"kind":"Field","name":{"kind":"Name","value":"roundNo"}}]}}]}}]}}]}}]} as unknown as DocumentNode<CreateRoundMutation, CreateRoundMutationVariables>;
export const CreateSubmissionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateSubmission"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"cardId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"image"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createSubmission"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"cardId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"cardId"}}},{"kind":"Argument","name":{"kind":"Name","value":"image"},"value":{"kind":"Variable","name":{"kind":"Name","value":"image"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MutationCreateSubmissionSuccess"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Error"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}}]}}]}}]}}]} as unknown as DocumentNode<CreateSubmissionMutation, CreateSubmissionMutationVariables>;
export const CreateTeamDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateTeam"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"eventId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createTeam"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"eventId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"eventId"}}},{"kind":"Argument","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Error"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MutationCreateTeamSuccess"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"confirmed"}},{"kind":"Field","name":{"kind":"Name","value":"event"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"members"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<CreateTeamMutation, CreateTeamMutationVariables>;
export const CreateWinnerDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateWinner"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"eventId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"teamId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"type"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"WinnerType"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createWinner"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"eventId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"eventId"}}},{"kind":"Argument","name":{"kind":"Name","value":"teamId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"teamId"}}},{"kind":"Argument","name":{"kind":"Name","value":"type"},"value":{"kind":"Variable","name":{"kind":"Name","value":"type"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Error"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MutationCreateWinnerSuccess"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}}]}}]}}]}}]} as unknown as DocumentNode<CreateWinnerMutation, CreateWinnerMutationVariables>;
export const DeleteCardDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteCard"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteCard"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MutationDeleteCardSuccess"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Error"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]}}]} as unknown as DocumentNode<DeleteCardMutation, DeleteCardMutationVariables>;
export const DeleteCriteriaDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteCriteria"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"criteriaId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"eventId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"roundNo"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteCriteria"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"criteriaId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"criteriaId"}}},{"kind":"Argument","name":{"kind":"Name","value":"eventId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"eventId"}}},{"kind":"Argument","name":{"kind":"Name","value":"roundNo"},"value":{"kind":"Variable","name":{"kind":"Name","value":"roundNo"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Error"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MutationDeleteCriteriaSuccess"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}}]}}]}}]}}]} as unknown as DocumentNode<DeleteCriteriaMutation, DeleteCriteriaMutationVariables>;
export const DeleteEventDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteEvent"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteEvent"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Error"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MutationDeleteEventSuccess"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"data"}}]}}]}}]}}]} as unknown as DocumentNode<DeleteEventMutation, DeleteEventMutationVariables>;
export const DeleteHotelDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteHotel"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteHotel"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"hotelId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Error"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MutationDeleteHotelSuccess"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"details"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"price"}}]}}]}}]}}]}}]} as unknown as DocumentNode<DeleteHotelMutation, DeleteHotelMutationVariables>;
export const DeleteJudgeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteJudge"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"eventId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"roundNo"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteJudge"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"eventId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"eventId"}}},{"kind":"Argument","name":{"kind":"Name","value":"roundNo"},"value":{"kind":"Variable","name":{"kind":"Name","value":"roundNo"}}},{"kind":"Argument","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Error"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MutationDeleteJudgeSuccess"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}}]}}]}}]}}]} as unknown as DocumentNode<DeleteJudgeMutation, DeleteJudgeMutationVariables>;
export const DeleteRoundDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteRound"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"eventId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteRound"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"eventId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"eventId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Error"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MutationDeleteRoundSuccess"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"eventId"}},{"kind":"Field","name":{"kind":"Name","value":"roundNo"}}]}}]}}]}}]}}]} as unknown as DocumentNode<DeleteRoundMutation, DeleteRoundMutationVariables>;
export const DeleteTeamDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteTeam"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"teamId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteTeam"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"teamId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"teamId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Error"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MutationDeleteTeamSuccess"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}}]}}]}}]}}]} as unknown as DocumentNode<DeleteTeamMutation, DeleteTeamMutationVariables>;
export const DeleteWinnerDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteWinner"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteWinner"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Error"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MutationDeleteWinnerSuccess"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}}]}}]}}]}}]} as unknown as DocumentNode<DeleteWinnerMutation, DeleteWinnerMutationVariables>;
export const EmailVerificationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"EmailVerification"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"sendEmailVerification"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Error"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MutationSendEmailVerificationSuccess"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"data"}}]}}]}}]}}]} as unknown as DocumentNode<EmailVerificationMutation, EmailVerificationMutationVariables>;
export const EndQuizDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"EndQuiz"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"quizId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}},"defaultValue":{"kind":"StringValue","value":"","block":false}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"endQuiz"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"quizId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"quizId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Error"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MutationEndQuizSuccess"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}}]}}]}}]}}]} as unknown as DocumentNode<EndQuizMutation, EndQuizMutationVariables>;
export const EventPaymentOrderDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"EventPaymentOrder"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"teamId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"eventPaymentOrder"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"teamId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"teamId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Error"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MutationEventPaymentOrderSuccess"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"Team"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"leaderId"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"event"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"image"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"orderId"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]}}]}}]}}]} as unknown as DocumentNode<EventPaymentOrderMutation, EventPaymentOrderMutationVariables>;
export const FestRegPaymentOrderDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"FestRegPaymentOrder"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createPaymentOrder"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"type"},"value":{"kind":"EnumValue","value":"FEST_REGISTRATION"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Error"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MutationCreatePaymentOrderSuccess"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"orderId"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<FestRegPaymentOrderMutation, FestRegPaymentOrderMutationVariables>;
export const JoinTeamDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"JoinTeam"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"teamId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"joinTeam"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"teamId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"teamId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Error"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MutationJoinTeamSuccess"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"team"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"confirmed"}},{"kind":"Field","name":{"kind":"Name","value":"members"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"event"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"maxTeamSize"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"eventType"}}]}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<JoinTeamMutation, JoinTeamMutationVariables>;
export const LeaveTeamDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"LeaveTeam"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"teamId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"leaveTeam"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"teamId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"teamId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Error"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MutationLeaveTeamSuccess"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}}]}}]}}]}}]} as unknown as DocumentNode<LeaveTeamMutation, LeaveTeamMutationVariables>;
export const NotifyParticipantsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"NotifyParticipants"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"eventId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"roundNo"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"notifyParticipants"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"eventId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"eventId"}}},{"kind":"Argument","name":{"kind":"Name","value":"roundNo"},"value":{"kind":"Variable","name":{"kind":"Name","value":"roundNo"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Error"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MutationNotifyParticipantsSuccess"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"data"}}]}}]}}]}}]} as unknown as DocumentNode<NotifyParticipantsMutation, NotifyParticipantsMutationVariables>;
export const OrganizerAddTeamMemberDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"organizerAddTeamMember"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"teamId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"organizerAddTeamMember"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"teamId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"teamId"}}},{"kind":"Argument","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MutationOrganizerAddTeamMemberSuccess"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"team"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Error"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]}}]} as unknown as DocumentNode<OrganizerAddTeamMemberMutation, OrganizerAddTeamMemberMutationVariables>;
export const OrganizerCreateTeamDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"OrganizerCreateTeam"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"eventId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"organizerCreateTeam"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"eventId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"eventId"}}},{"kind":"Argument","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Error"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MutationOrganizerCreateTeamSuccess"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]}}]} as unknown as DocumentNode<OrganizerCreateTeamMutation, OrganizerCreateTeamMutationVariables>;
export const OrganizerDeleteTeamDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"OrganizerDeleteTeam"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"teamId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"organizerDeleteTeam"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"teamId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"teamId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Error"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MutationOrganizerDeleteTeamSuccess"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]}}]} as unknown as DocumentNode<OrganizerDeleteTeamMutation, OrganizerDeleteTeamMutationVariables>;
export const OrganizerDeleteTeamMemberDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"OrganizerDeleteTeamMember"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"teamId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"organizerDeleteTeamMember"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"teamId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"teamId"}}},{"kind":"Argument","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Error"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MutationOrganizerDeleteTeamMemberSuccess"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"team"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<OrganizerDeleteTeamMemberMutation, OrganizerDeleteTeamMemberMutationVariables>;
export const OrganizerMarkAttendanceDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"OrganizerMarkAttendance"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"attended"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"teamId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"organizerMarkAttendance"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"teamId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"teamId"}}},{"kind":"Argument","name":{"kind":"Name","value":"attended"},"value":{"kind":"Variable","name":{"kind":"Name","value":"attended"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Error"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MutationOrganizerMarkAttendanceSuccess"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]}}]} as unknown as DocumentNode<OrganizerMarkAttendanceMutation, OrganizerMarkAttendanceMutationVariables>;
export const OrganizerMarkAttendanceSoloDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"OrganizerMarkAttendanceSolo"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"eventId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"attended"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"organizerMarkAttendanceSolo"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"eventId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"eventId"}}},{"kind":"Argument","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}},{"kind":"Argument","name":{"kind":"Name","value":"attended"},"value":{"kind":"Variable","name":{"kind":"Name","value":"attended"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Error"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MutationOrganizerMarkAttendanceSoloSuccess"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"data"}}]}}]}}]}}]} as unknown as DocumentNode<OrganizerMarkAttendanceSoloMutation, OrganizerMarkAttendanceSoloMutationVariables>;
export const OrganizerRegisterSoloDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"OrganizerRegisterSolo"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"eventId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"organizerRegisterSolo"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"eventId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"eventId"}}},{"kind":"Argument","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Error"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MutationOrganizerRegisterSoloSuccess"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"attended"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]}}]} as unknown as DocumentNode<OrganizerRegisterSoloMutation, OrganizerRegisterSoloMutationVariables>;
export const PromoteQuizParticipantsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"PromoteQuizParticipants"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"eventId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}},"defaultValue":{"kind":"IntValue","value":"10"}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"quizId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}},"defaultValue":{"kind":"StringValue","value":"","block":false}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"roundId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}},"defaultValue":{"kind":"IntValue","value":"10"}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"teams"}},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},"defaultValue":{"kind":"IntValue","value":"10"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"promoteQuizParticipants"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"eventId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"eventId"}}},{"kind":"Argument","name":{"kind":"Name","value":"quizId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"quizId"}}},{"kind":"Argument","name":{"kind":"Name","value":"roundId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"roundId"}}},{"kind":"Argument","name":{"kind":"Name","value":"teams"},"value":{"kind":"Variable","name":{"kind":"Name","value":"teams"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Error"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MutationPromoteQuizParticipantsSuccess"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}}]}}]}}]}}]} as unknown as DocumentNode<PromoteQuizParticipantsMutation, PromoteQuizParticipantsMutationVariables>;
export const PromoteToNextRoundDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"PromoteToNextRound"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"roundNo"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"teamId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"selected"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"promoteToNextRound"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"roundNo"},"value":{"kind":"Variable","name":{"kind":"Name","value":"roundNo"}}},{"kind":"Argument","name":{"kind":"Name","value":"teamId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"teamId"}}},{"kind":"Argument","name":{"kind":"Name","value":"selected"},"value":{"kind":"Variable","name":{"kind":"Name","value":"selected"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Error"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MutationPromoteToNextRoundSuccess"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}}]}}]}}]}}]} as unknown as DocumentNode<PromoteToNextRoundMutation, PromoteToNextRoundMutationVariables>;
export const PublishEventDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"PublishEvent"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"published"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"publishEvent"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"published"},"value":{"kind":"Variable","name":{"kind":"Name","value":"published"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Error"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MutationPublishEventSuccess"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"data"}}]}}]}}]}}]} as unknown as DocumentNode<PublishEventMutation, PublishEventMutationVariables>;
export const RefreshTokenDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RefreshToken"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"refreshToken"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"refreshToken"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"refreshToken"},"value":{"kind":"Variable","name":{"kind":"Name","value":"refreshToken"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Error"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MutationRefreshTokenSuccess"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"accessToken"}},{"kind":"Field","name":{"kind":"Name","value":"refreshToken"}}]}}]}}]}}]}}]} as unknown as DocumentNode<RefreshTokenMutation, RefreshTokenMutationVariables>;
export const RegisterProniteDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RegisterPronite"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"registerPronite"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Error"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MutationRegisterProniteSuccess"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"proniteDay"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"phoneNumber"}},{"kind":"Field","name":{"kind":"Name","value":"role"}},{"kind":"Field","name":{"kind":"Name","value":"college"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<RegisterProniteMutation, RegisterProniteMutationVariables>;
export const RegisterSoloEventDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RegisterSoloEvent"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"eventId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"registerSoloEvent"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"eventId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"eventId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Error"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MutationRegisterSoloEventSuccess"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"confirmed"}},{"kind":"Field","name":{"kind":"Name","value":"event"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"eventType"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"members"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<RegisterSoloEventMutation, RegisterSoloEventMutationVariables>;
export const RemoveBranchRepDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RemoveBranchRep"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"branchId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"removeBranchRep"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}},{"kind":"Argument","name":{"kind":"Name","value":"branchId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"branchId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Error"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MutationRemoveBranchRepSuccess"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"data"}}]}}]}}]}}]} as unknown as DocumentNode<RemoveBranchRepMutation, RemoveBranchRepMutationVariables>;
export const RemoveCollegeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RemoveCollege"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"removeCollege"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Error"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MutationRemoveCollegeSuccess"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"data"}}]}}]}}]}}]} as unknown as DocumentNode<RemoveCollegeMutation, RemoveCollegeMutationVariables>;
export const RemoveOrganizerDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RemoveOrganizer"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"eventId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"removeOrganizer"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"eventId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"eventId"}}},{"kind":"Argument","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Error"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MutationRemoveOrganizerSuccess"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"data"}}]}}]}}]}}]} as unknown as DocumentNode<RemoveOrganizerMutation, RemoveOrganizerMutationVariables>;
export const RemoveTeamMemberDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RemoveTeamMember"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"teamId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"removeTeamMember"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"teamId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"teamId"}}},{"kind":"Argument","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Error"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MutationRemoveTeamMemberSuccess"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}}]}}]}}]}}]} as unknown as DocumentNode<RemoveTeamMemberMutation, RemoveTeamMemberMutationVariables>;
export const ResetPasswordDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ResetPassword"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"password"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"token"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"resetPassword"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"password"},"value":{"kind":"Variable","name":{"kind":"Name","value":"password"}}},{"kind":"Argument","name":{"kind":"Name","value":"token"},"value":{"kind":"Variable","name":{"kind":"Name","value":"token"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Error"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MutationResetPasswordSuccess"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}}]}}]}}]}}]} as unknown as DocumentNode<ResetPasswordMutation, ResetPasswordMutationVariables>;
export const ResetPasswordEmailDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ResetPasswordEmail"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"sendPasswordResetEmail"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Error"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MutationSendPasswordResetEmailSuccess"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"data"}}]}}]}}]}}]} as unknown as DocumentNode<ResetPasswordEmailMutation, ResetPasswordEmailMutationVariables>;
export const SendWinnerWhatsAppNotificationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"SendWinnerWhatsAppNotification"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"eventId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"location"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"date"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"fromTime"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"toTime"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"sendWinnerWhatsAppNotification"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"eventId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"eventId"}}},{"kind":"Argument","name":{"kind":"Name","value":"location"},"value":{"kind":"Variable","name":{"kind":"Name","value":"location"}}},{"kind":"Argument","name":{"kind":"Name","value":"date"},"value":{"kind":"Variable","name":{"kind":"Name","value":"date"}}},{"kind":"Argument","name":{"kind":"Name","value":"fromTime"},"value":{"kind":"Variable","name":{"kind":"Name","value":"fromTime"}}},{"kind":"Argument","name":{"kind":"Name","value":"toTime"},"value":{"kind":"Variable","name":{"kind":"Name","value":"toTime"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Error"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MutationSendWinnerWhatsAppNotificationSuccess"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"}}]}}]}}]}}]} as unknown as DocumentNode<SendWinnerWhatsAppNotificationMutation, SendWinnerWhatsAppNotificationMutationVariables>;
export const SignInDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"SignIn"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"password"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"login"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"password"},"value":{"kind":"Variable","name":{"kind":"Name","value":"password"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Error"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MutationLoginSuccess"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"accessToken"}},{"kind":"Field","name":{"kind":"Name","value":"refreshToken"}}]}}]}}]}}]}}]} as unknown as DocumentNode<SignInMutation, SignInMutationVariables>;
export const SignUpDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"SignUp"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"password"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"collegeId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"phoneNumber"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"signUp"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"password"},"value":{"kind":"Variable","name":{"kind":"Name","value":"password"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"phoneNumber"},"value":{"kind":"Variable","name":{"kind":"Name","value":"phoneNumber"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"collegeId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"collegeId"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"profileImage"},"value":{"kind":"StringValue","value":"","block":false}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Error"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MutationSignUpSuccess"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}}]}}]}}]}}]} as unknown as DocumentNode<SignUpMutation, SignUpMutationVariables>;
export const SubmitQuizAnswerDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"SubmitQuizAnswer"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"quizId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"selectedAnswers"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"SelectedOptions"}}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"teamId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"timeTaken"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"submitQuiz"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"quizId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"quizId"}}},{"kind":"Argument","name":{"kind":"Name","value":"selectedAnswers"},"value":{"kind":"Variable","name":{"kind":"Name","value":"selectedAnswers"}}},{"kind":"Argument","name":{"kind":"Name","value":"teamId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"teamId"}}},{"kind":"Argument","name":{"kind":"Name","value":"timeTaken"},"value":{"kind":"Variable","name":{"kind":"Name","value":"timeTaken"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Error"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MutationSubmitQuizSuccess"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"quizId"}},{"kind":"Field","name":{"kind":"Name","value":"teamId"}}]}}]}}]}}]}}]} as unknown as DocumentNode<SubmitQuizAnswerMutation, SubmitQuizAnswerMutationVariables>;
export const ToggleRegistrationsOpenDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ToggleRegistrationsOpen"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"toggleRegistrationsOpen"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Error"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MutationToggleRegistrationsOpenSuccess"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"registrationsOpen"}}]}}]}}]}}]}}]} as unknown as DocumentNode<ToggleRegistrationsOpenMutation, ToggleRegistrationsOpenMutationVariables>;
export const UpdateAccommodationStatusDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateAccommodationStatus"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"bookingId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"status"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"hotelId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"room"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateStatus"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"bookingId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"bookingId"}}},{"kind":"Argument","name":{"kind":"Name","value":"status"},"value":{"kind":"Variable","name":{"kind":"Name","value":"status"}}},{"kind":"Argument","name":{"kind":"Name","value":"room"},"value":{"kind":"Variable","name":{"kind":"Name","value":"room"}}},{"kind":"Argument","name":{"kind":"Name","value":"hotelId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"hotelId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Error"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MutationUpdateStatusSuccess"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"room"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"hotel"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<UpdateAccommodationStatusMutation, UpdateAccommodationStatusMutationVariables>;
export const UpdateEventDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateEvent"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"description"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"fees"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"maxTeamSize"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"maxTeams"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"minTeamSize"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"venue"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"eventType"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"EventType"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"image"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"category"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"EventCategory"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateEvent"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"description"},"value":{"kind":"Variable","name":{"kind":"Name","value":"description"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"fees"},"value":{"kind":"Variable","name":{"kind":"Name","value":"fees"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"maxTeamSize"},"value":{"kind":"Variable","name":{"kind":"Name","value":"maxTeamSize"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"maxTeams"},"value":{"kind":"Variable","name":{"kind":"Name","value":"maxTeams"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"minTeamSize"},"value":{"kind":"Variable","name":{"kind":"Name","value":"minTeamSize"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"venue"},"value":{"kind":"Variable","name":{"kind":"Name","value":"venue"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"eventType"},"value":{"kind":"Variable","name":{"kind":"Name","value":"eventType"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"image"},"value":{"kind":"Variable","name":{"kind":"Name","value":"image"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"category"},"value":{"kind":"Variable","name":{"kind":"Name","value":"category"}}}]}},{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Error"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MutationUpdateEventSuccess"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]}}]} as unknown as DocumentNode<UpdateEventMutation, UpdateEventMutationVariables>;
export const UpdateProfileImageDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateProfileImage"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"imageURL"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateProfileImage"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"imageURL"},"value":{"kind":"Variable","name":{"kind":"Name","value":"imageURL"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Error"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]}}]} as unknown as DocumentNode<UpdateProfileImageMutation, UpdateProfileImageMutationVariables>;
export const UpdateQuizDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateQuiz"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"quizId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}},"defaultValue":{"kind":"StringValue","value":"","block":false}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"questions"}},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"QuestionsCreateInput"}}}},"defaultValue":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"question"},"value":{"kind":"StringValue","value":"","block":false}},{"kind":"ObjectField","name":{"kind":"Name","value":"description"},"value":{"kind":"StringValue","value":"","block":false}},{"kind":"ObjectField","name":{"kind":"Name","value":"id"},"value":{"kind":"StringValue","value":"","block":false}},{"kind":"ObjectField","name":{"kind":"Name","value":"image"},"value":{"kind":"StringValue","value":"","block":false}},{"kind":"ObjectField","name":{"kind":"Name","value":"isCode"},"value":{"kind":"BooleanValue","value":false}},{"kind":"ObjectField","name":{"kind":"Name","value":"mode"},"value":{"kind":"StringValue","value":"","block":false}},{"kind":"ObjectField","name":{"kind":"Name","value":"options"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"isAnswer"},"value":{"kind":"BooleanValue","value":false}},{"kind":"ObjectField","name":{"kind":"Name","value":"value"},"value":{"kind":"StringValue","value":"","block":false}}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateQuiz"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"questions"},"value":{"kind":"Variable","name":{"kind":"Name","value":"questions"}}},{"kind":"Argument","name":{"kind":"Name","value":"quizId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"quizId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Error"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MutationUpdateQuizSuccess"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"endTime"}},{"kind":"Field","name":{"kind":"Name","value":"eventId"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"password"}},{"kind":"Field","name":{"kind":"Name","value":"overridePassword"}},{"kind":"Field","name":{"kind":"Name","value":"roundNo"}},{"kind":"Field","name":{"kind":"Name","value":"startTime"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"questions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"isCode"}},{"kind":"Field","name":{"kind":"Name","value":"question"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"options"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"isAnswer"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<UpdateQuizMutation, UpdateQuizMutationVariables>;
export const UpdateQuizFlagDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"updateQuizFlag"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"allowUser"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}},"defaultValue":{"kind":"BooleanValue","value":false}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"flags"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}},"defaultValue":{"kind":"IntValue","value":"10"}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"quizId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}},"defaultValue":{"kind":"StringValue","value":"","block":false}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"teamId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}},"defaultValue":{"kind":"IntValue","value":"10"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateQuizFlag"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"allowUser"},"value":{"kind":"Variable","name":{"kind":"Name","value":"allowUser"}}},{"kind":"Argument","name":{"kind":"Name","value":"flags"},"value":{"kind":"Variable","name":{"kind":"Name","value":"flags"}}},{"kind":"Argument","name":{"kind":"Name","value":"quizId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"quizId"}}},{"kind":"Argument","name":{"kind":"Name","value":"teamId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"teamId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Error"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]}}]} as unknown as DocumentNode<UpdateQuizFlagMutation, UpdateQuizFlagMutationVariables>;
export const UpdateQuizStatusDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateQuizStatus"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"quizId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}},"defaultValue":{"kind":"StringValue","value":"","block":false}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"allowAttempts"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}},"defaultValue":{"kind":"BooleanValue","value":false}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateQuizStatus"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"quizId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"quizId"}}},{"kind":"Argument","name":{"kind":"Name","value":"allowAttempts"},"value":{"kind":"Variable","name":{"kind":"Name","value":"allowAttempts"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Error"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MutationUpdateQuizStatusSuccess"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}}]}}]}}]}}]} as unknown as DocumentNode<UpdateQuizStatusMutation, UpdateQuizStatusMutationVariables>;
export const UpdateStoneVisibilitiesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateStoneVisibilities"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"stoneId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}},"defaultValue":{"kind":"StringValue","value":"","block":false}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateStoneVisibilities"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"stoneVisibilities"},"value":{"kind":"Variable","name":{"kind":"Name","value":"stoneId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Error"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MutationUpdateStoneVisibilitiesSuccess"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}}]}}]}}]}}]} as unknown as DocumentNode<UpdateStoneVisibilitiesMutation, UpdateStoneVisibilitiesMutationVariables>;
export const VerifyEmailDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"VerifyEmail"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"token"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"verifyEmail"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"token"},"value":{"kind":"Variable","name":{"kind":"Name","value":"token"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Error"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MutationVerifyEmailSuccess"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}}]}}]}}]}}]} as unknown as DocumentNode<VerifyEmailMutation, VerifyEmailMutationVariables>;
export const AccommodationRequestByDayDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"AccommodationRequestByDay"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"date"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"DateTime"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"accommodationRequestByDay"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"date"},"value":{"kind":"Variable","name":{"kind":"Name","value":"date"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Error"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"QueryAccommodationRequestByDaySuccess"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"checkIn"}},{"kind":"Field","name":{"kind":"Name","value":"checkOut"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"gender"}},{"kind":"Field","name":{"kind":"Name","value":"hotel"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"details"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"room"}},{"kind":"Field","name":{"kind":"Name","value":"ac"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"college"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"isVerified"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"phoneNumber"}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<AccommodationRequestByDayQuery, AccommodationRequestByDayQueryVariables>;
export const AccommodationRequestByHotelDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"AccommodationRequestByHotel"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"accommodationRequestByHotel"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"QueryAccommodationRequestByHotelSuccess"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"checkIn"}},{"kind":"Field","name":{"kind":"Name","value":"checkOut"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"gender"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"room"}},{"kind":"Field","name":{"kind":"Name","value":"ac"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"hotel"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"details"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"college"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"isVerified"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"phoneNumber"}}]}}]}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Error"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]}}]} as unknown as DocumentNode<AccommodationRequestByHotelQuery, AccommodationRequestByHotelQueryVariables>;
export const AccommodationRequestsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"AccommodationRequests"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"accommodationRequests"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"QueryAccommodationRequestsSuccess"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"checkIn"}},{"kind":"Field","name":{"kind":"Name","value":"checkOut"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"gender"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"room"}},{"kind":"Field","name":{"kind":"Name","value":"ac"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"isVerified"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"phoneNumber"}},{"kind":"Field","name":{"kind":"Name","value":"college"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"hotel"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"details"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"price"}}]}}]}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Error"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]}}]} as unknown as DocumentNode<AccommodationRequestsQuery, AccommodationRequestsQueryVariables>;
export const AccommodationRequestsByUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"AccommodationRequestsByUser"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"accommodationRequestsByUser"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Error"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"QueryAccommodationRequestsByUserSuccess"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"checkIn"}},{"kind":"Field","name":{"kind":"Name","value":"checkOut"}},{"kind":"Field","name":{"kind":"Name","value":"room"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"hotel"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"price"}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<AccommodationRequestsByUserQuery, AccommodationRequestsByUserQueryVariables>;
export const AccommodationRequestsByUserIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"AccommodationRequestsByUserId"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"accommodationRequestsByUserId"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Error"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"QueryAccommodationRequestsByUserIdSuccess"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ac"}},{"kind":"Field","name":{"kind":"Name","value":"checkIn"}},{"kind":"Field","name":{"kind":"Name","value":"checkOut"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"gender"}},{"kind":"Field","name":{"kind":"Name","value":"IdCard"}},{"kind":"Field","name":{"kind":"Name","value":"room"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"hotel"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"details"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"price"}}]}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"college"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"isVerified"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"phoneNumber"}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<AccommodationRequestsByUserIdQuery, AccommodationRequestsByUserIdQueryVariables>;
export const AttemptQuizDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"AttemptQuiz"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"quizId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"attemptQuiz"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"quizId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"quizId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Error"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"QueryAttemptQuizSuccess"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"leaderId"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"attended"}},{"kind":"Field","name":{"kind":"Name","value":"confirmed"}},{"kind":"Field","name":{"kind":"Name","value":"roundNo"}}]}}]}}]}}]}}]} as unknown as DocumentNode<AttemptQuizQuery, AttemptQuizQueryVariables>;
export const CollegesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Colleges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"colleges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Error"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"QueryCollegesSuccess"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]}}]} as unknown as DocumentNode<CollegesQuery, CollegesQueryVariables>;
export const CompletedEventsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"CompletedEvents"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"completedEvents"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Error"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"QueryCompletedEventsSuccess"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"eventType"}},{"kind":"Field","name":{"kind":"Name","value":"winner"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"team"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"members"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"phoneNumber"}},{"kind":"Field","name":{"kind":"Name","value":"role"}},{"kind":"Field","name":{"kind":"Name","value":"isVerified"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"college"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"leaderId"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"type"}}]}},{"kind":"Field","name":{"kind":"Name","value":"rounds"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"completed"}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"eventId"}},{"kind":"Field","name":{"kind":"Name","value":"roundNo"}},{"kind":"Field","name":{"kind":"Name","value":"selectStatus"}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<CompletedEventsQuery, CompletedEventsQueryVariables>;
export const MySubmissionsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"MySubmissions"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"day"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"DayType"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"submissionsByUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"day"},"value":{"kind":"Variable","name":{"kind":"Name","value":"day"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"QuerySubmissionsByUserSuccess"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"cardId"}},{"kind":"Field","name":{"kind":"Name","value":"image"}}]}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Error"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]}}]} as unknown as DocumentNode<MySubmissionsQuery, MySubmissionsQueryVariables>;
export const GetCardsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetCards"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"day"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"DayType"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getCards"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"day"},"value":{"kind":"Variable","name":{"kind":"Name","value":"day"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"QueryGetCardsSuccess"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"clue"}},{"kind":"Field","name":{"kind":"Name","value":"day"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Error"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]}}]} as unknown as DocumentNode<GetCardsQuery, GetCardsQueryVariables>;
export const EventByIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"EventById"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"eventById"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Error"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"QueryEventByIdSuccess"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"eventType"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"venue"}},{"kind":"Field","name":{"kind":"Name","value":"minTeamSize"}},{"kind":"Field","name":{"kind":"Name","value":"maxTeams"}},{"kind":"Field","name":{"kind":"Name","value":"maxTeamSize"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"fees"}},{"kind":"Field","name":{"kind":"Name","value":"published"}},{"kind":"Field","name":{"kind":"Name","value":"category"}},{"kind":"Field","name":{"kind":"Name","value":"organizers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"phoneNumber"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"rounds"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"completed"}},{"kind":"Field","name":{"kind":"Name","value":"roundNo"}},{"kind":"Field","name":{"kind":"Name","value":"date"}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<EventByIdQuery, EventByIdQueryVariables>;
export const EventsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Events"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"first"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"events"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"Variable","name":{"kind":"Name","value":"first"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"eventType"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"fees"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"maxTeamSize"}},{"kind":"Field","name":{"kind":"Name","value":"maxTeams"}},{"kind":"Field","name":{"kind":"Name","value":"minTeamSize"}},{"kind":"Field","name":{"kind":"Name","value":"published"}},{"kind":"Field","name":{"kind":"Name","value":"category"}},{"kind":"Field","name":{"kind":"Name","value":"branch"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"rounds"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"completed"}},{"kind":"Field","name":{"kind":"Name","value":"roundNo"}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"eventId"}},{"kind":"Field","name":{"kind":"Name","value":"event"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"branch"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"venue"}},{"kind":"Field","name":{"kind":"Name","value":"teams"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"attended"}},{"kind":"Field","name":{"kind":"Name","value":"confirmed"}},{"kind":"Field","name":{"kind":"Name","value":"leaderId"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"members"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"phoneNumber"}},{"kind":"Field","name":{"kind":"Name","value":"role"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"isVerified"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"cursor"}}]}}]}}]}}]} as unknown as DocumentNode<EventsQuery, EventsQueryVariables>;
export const EventsByBranchRepDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"EventsByBranchRep"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"branchRepId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"eventsByBranchRep"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"branchRepId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"branchRepId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Error"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"QueryEventsByBranchRepSuccess"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"rounds"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"completed"}},{"kind":"Field","name":{"kind":"Name","value":"roundNo"}},{"kind":"Field","name":{"kind":"Name","value":"eventId"}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"judges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"eventType"}},{"kind":"Field","name":{"kind":"Name","value":"fees"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"category"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"maxTeamSize"}},{"kind":"Field","name":{"kind":"Name","value":"maxTeams"}},{"kind":"Field","name":{"kind":"Name","value":"minTeamSize"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"organizers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"branch"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"published"}},{"kind":"Field","name":{"kind":"Name","value":"venue"}}]}}]}}]}}]}}]} as unknown as DocumentNode<EventsByBranchRepQuery, EventsByBranchRepQueryVariables>;
export const EventByOrganizerDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"EventByOrganizer"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"eventByOrganizer"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Error"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"QueryEventByOrganizerSuccess"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"rounds"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"completed"}},{"kind":"Field","name":{"kind":"Name","value":"roundNo"}},{"kind":"Field","name":{"kind":"Name","value":"eventId"}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"quiz"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"startTime"}},{"kind":"Field","name":{"kind":"Name","value":"endTime"}},{"kind":"Field","name":{"kind":"Name","value":"password"}},{"kind":"Field","name":{"kind":"Name","value":"overridePassword"}},{"kind":"Field","name":{"kind":"Name","value":"points"}},{"kind":"Field","name":{"kind":"Name","value":"qualifyNext"}},{"kind":"Field","name":{"kind":"Name","value":"allowAttempts"}},{"kind":"Field","name":{"kind":"Name","value":"completed"}},{"kind":"Field","name":{"kind":"Name","value":"questions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"criteria"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"type"}}]}},{"kind":"Field","name":{"kind":"Name","value":"judges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"eventType"}},{"kind":"Field","name":{"kind":"Name","value":"fees"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"category"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"maxTeamSize"}},{"kind":"Field","name":{"kind":"Name","value":"maxTeams"}},{"kind":"Field","name":{"kind":"Name","value":"minTeamSize"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"organizers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"branch"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"published"}},{"kind":"Field","name":{"kind":"Name","value":"venue"}}]}}]}}]}}]}}]} as unknown as DocumentNode<EventByOrganizerQuery, EventByOrganizerQueryVariables>;
export const GetAllHotelsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetAllHotels"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getAllHotels"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Error"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"QueryGetAllHotelsSuccess"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"details"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetAllHotelsQuery, GetAllHotelsQueryVariables>;
export const GetAllQuestionsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetAllQuestions"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"quizId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getAllquestions"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"quizId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"quizId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Error"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"QueryGetAllquestionsSuccess"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"question"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"isCode"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"options"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"questionId"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetAllQuestionsQuery, GetAllQuestionsQueryVariables>;
export const GetAllSubmissionsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetAllSubmissions"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"day"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"DayType"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getAllSubmissions"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"day"},"value":{"kind":"Variable","name":{"kind":"Name","value":"day"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"QueryGetAllSubmissionsSuccess"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"card"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"clue"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"day"}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetAllSubmissionsQuery, GetAllSubmissionsQueryVariables>;
export const GetAllWinnersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetAllWinners"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"allWinners"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Error"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"QueryAllWinnersSuccess"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"team"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"members"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"phoneNumber"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"event"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"branch"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"rounds"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"date"}}]}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetAllWinnersQuery, GetAllWinnersQueryVariables>;
export const GetAvatarsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetAvatars"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getAvatars"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}}]}}]} as unknown as DocumentNode<GetAvatarsQuery, GetAvatarsQueryVariables>;
export const BranchesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Branches"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getBranches"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Error"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"QueryGetBranchesSuccess"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"branchReps"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"branchId"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"isVerified"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"phoneNumber"}},{"kind":"Field","name":{"kind":"Name","value":"role"}}]}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<BranchesQuery, BranchesQueryVariables>;
export const GetChampionshipLeaderboardDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetChampionshipLeaderboard"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getChampionshipLeaderboard"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"QueryGetChampionshipLeaderboardSuccess"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"isEligible"}},{"kind":"Field","name":{"kind":"Name","value":"championshipPoints"}},{"kind":"Field","name":{"kind":"Name","value":"techCount"}},{"kind":"Field","name":{"kind":"Name","value":"nonTechCount"}},{"kind":"Field","name":{"kind":"Name","value":"coreCount"}},{"kind":"Field","name":{"kind":"Name","value":"diamondCount"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"winner"}},{"kind":"Field","name":{"kind":"Name","value":"runner_up"}},{"kind":"Field","name":{"kind":"Name","value":"second_runner_up"}}]}},{"kind":"Field","name":{"kind":"Name","value":"goldCount"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"winner"}},{"kind":"Field","name":{"kind":"Name","value":"runner_up"}},{"kind":"Field","name":{"kind":"Name","value":"second_runner_up"}}]}},{"kind":"Field","name":{"kind":"Name","value":"silverCount"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"winner"}},{"kind":"Field","name":{"kind":"Name","value":"runner_up"}},{"kind":"Field","name":{"kind":"Name","value":"second_runner_up"}}]}},{"kind":"Field","name":{"kind":"Name","value":"bronzeCount"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"winner"}},{"kind":"Field","name":{"kind":"Name","value":"runner_up"}},{"kind":"Field","name":{"kind":"Name","value":"second_runner_up"}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetChampionshipLeaderboardQuery, GetChampionshipLeaderboardQueryVariables>;
export const GetCommentDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetComment"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"eventId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"roundNo"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"teamId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getComment"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"eventId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"eventId"}}},{"kind":"Argument","name":{"kind":"Name","value":"roundNo"},"value":{"kind":"Variable","name":{"kind":"Name","value":"roundNo"}}},{"kind":"Argument","name":{"kind":"Name","value":"teamId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"teamId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Error"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"QueryGetCommentSuccess"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"comment"}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetCommentQuery, GetCommentQueryVariables>;
export const GetCoreTeamMembersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetCoreTeamMembers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getCoreTeamMembers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Error"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"QueryGetCoreTeamMembersSuccess"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"committee"}},{"kind":"Field","name":{"kind":"Name","value":"designation"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetCoreTeamMembersQuery, GetCoreTeamMembersQueryVariables>;
export const GetEventStatusDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetEventStatus"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getEventStatus"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Error"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"QueryGetEventStatusSuccess"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"eventName"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetEventStatusQuery, GetEventStatusQueryVariables>;
export const GetXpLeaderboardDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetXpLeaderboard"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getXpLeaderboard"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Error"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"QueryGetXpLeaderboardSuccess"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"level"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"point"}}]}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"isVerified"}},{"kind":"Field","name":{"kind":"Name","value":"phoneNumber"}},{"kind":"Field","name":{"kind":"Name","value":"role"}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetXpLeaderboardQuery, GetXpLeaderboardQueryVariables>;
export const GetProniteRegistrationsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetProniteRegistrations"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getProniteRegistrations"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"day1Count"}},{"kind":"Field","name":{"kind":"Name","value":"day2Count"}}]}}]}}]} as unknown as DocumentNode<GetProniteRegistrationsQuery, GetProniteRegistrationsQueryVariables>;
export const GetQuizByEventRoundDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetQuizByEventRound"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"eventId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"roundId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getQuizByEventRound"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"eventId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"eventId"}}},{"kind":"Argument","name":{"kind":"Name","value":"roundId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"roundId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Error"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"QueryGetQuizByEventRoundSuccess"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"endTime"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"password"}},{"kind":"Field","name":{"kind":"Name","value":"overridePassword"}},{"kind":"Field","name":{"kind":"Name","value":"roundNo"}},{"kind":"Field","name":{"kind":"Name","value":"startTime"}},{"kind":"Field","name":{"kind":"Name","value":"questions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"isCode"}},{"kind":"Field","name":{"kind":"Name","value":"options"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"value"}},{"kind":"Field","name":{"kind":"Name","value":"isAnswer"}}]}},{"kind":"Field","name":{"kind":"Name","value":"question"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetQuizByEventRoundQuery, GetQuizByEventRoundQueryVariables>;
export const GetQuizByIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetQuizById"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getQuizById"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"quizId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Error"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"QueryGetQuizByIdSuccess"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"endTime"}},{"kind":"Field","name":{"kind":"Name","value":"eventId"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"roundNo"}},{"kind":"Field","name":{"kind":"Name","value":"startTime"}},{"kind":"Field","name":{"kind":"Name","value":"overridePassword"}},{"kind":"Field","name":{"kind":"Name","value":"questions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"isCode"}},{"kind":"Field","name":{"kind":"Name","value":"question"}},{"kind":"Field","name":{"kind":"Name","value":"options"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"questionId"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetQuizByIdQuery, GetQuizByIdQueryVariables>;
export const GetQuizFlagDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getQuizFlag"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"teamId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}},"defaultValue":{"kind":"IntValue","value":"10"}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"quizId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}},"defaultValue":{"kind":"StringValue","value":"","block":false}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getQuizFlag"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"quizId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"quizId"}}},{"kind":"Argument","name":{"kind":"Name","value":"teamId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"teamId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"QueryGetQuizFlagSuccess"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"allowUser"}},{"kind":"Field","name":{"kind":"Name","value":"flags"}}]}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Error"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]}}]} as unknown as DocumentNode<GetQuizFlagQuery, GetQuizFlagQueryVariables>;
export const GetQuizScoresDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getQuizScores"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"quizId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}},"defaultValue":{"kind":"StringValue","value":"","block":false}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getQuizScores"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"quizId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"quizId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Error"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"QueryGetQuizScoresSuccess"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"score"}},{"kind":"Field","name":{"kind":"Name","value":"timeTaken"}},{"kind":"Field","name":{"kind":"Name","value":"teamId"}},{"kind":"Field","name":{"kind":"Name","value":"team"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"roundNo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"quiz"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"qualifyNext"}},{"kind":"Field","name":{"kind":"Name","value":"roundNo"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetQuizScoresQuery, GetQuizScoresQueryVariables>;
export const GetRegistrationVsDateDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetRegistrationVSDate"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"date"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"DateTime"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getRegistrationvsDate"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"date"},"value":{"kind":"Variable","name":{"kind":"Name","value":"date"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Error"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"QueryGetRegistrationvsDateSuccess"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"externalRegistrations"}},{"kind":"Field","name":{"kind":"Name","value":"internalRegistrations"}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetRegistrationVsDateQuery, GetRegistrationVsDateQueryVariables>;
export const GetRevenueDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetRevenue"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getRevenue"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"QueryGetRevenueSuccess"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"data"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Error"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]}}]} as unknown as DocumentNode<GetRevenueQuery, GetRevenueQueryVariables>;
export const GetRoundStatusDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetRoundStatus"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"eventId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"roundNo"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getRoundStatus"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"eventId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"eventId"}}},{"kind":"Argument","name":{"kind":"Name","value":"roundNo"},"value":{"kind":"Variable","name":{"kind":"Name","value":"roundNo"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Error"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"QueryGetRoundStatusSuccess"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"selectStatus"}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetRoundStatusQuery, GetRoundStatusQueryVariables>;
export const GetScoreDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetScore"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"criteriaId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"roundNo"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"teamId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getScore"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"criteriaId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"criteriaId"}}},{"kind":"Argument","name":{"kind":"Name","value":"roundNo"},"value":{"kind":"Variable","name":{"kind":"Name","value":"roundNo"}}},{"kind":"Argument","name":{"kind":"Name","value":"teamId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"teamId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Error"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"QueryGetScoreSuccess"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"score"}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetScoreQuery, GetScoreQueryVariables>;
export const GetScoreSheetJuryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetScoreSheetJury"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"eventId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"roundNo"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getScoreSheetJuryView"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"eventId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"eventId"}}},{"kind":"Argument","name":{"kind":"Name","value":"roundNo"},"value":{"kind":"Variable","name":{"kind":"Name","value":"roundNo"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Error"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"QueryGetScoreSheetJuryViewSuccess"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"judges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"criteria"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"criteriaId"}},{"kind":"Field","name":{"kind":"Name","value":"score"}},{"kind":"Field","name":{"kind":"Name","value":"criteriaName"}}]}},{"kind":"Field","name":{"kind":"Name","value":"judgeId"}},{"kind":"Field","name":{"kind":"Name","value":"judgeName"}}]}},{"kind":"Field","name":{"kind":"Name","value":"teamId"}},{"kind":"Field","name":{"kind":"Name","value":"teamName"}},{"kind":"Field","name":{"kind":"Name","value":"teamScore"}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetScoreSheetJuryQuery, GetScoreSheetJuryQueryVariables>;
export const GetRegistrationsOpenDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetRegistrationsOpen"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getRegistrationsOpen"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Error"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"QueryGetRegistrationsOpenSuccess"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"data"}}]}}]}}]}}]} as unknown as DocumentNode<GetRegistrationsOpenQuery, GetRegistrationsOpenQueryVariables>;
export const GetSponsorsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetSponsors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getSponsors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Error"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"QueryGetSponsorsSuccess"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"websiteUrl"}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetSponsorsQuery, GetSponsorsQueryVariables>;
export const GetStoneVisibilitiesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetStoneVisibilities"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getStoneVisibilities"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Error"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"QueryGetStoneVisibilitiesSuccess"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"data"}}]}}]}}]}}]} as unknown as DocumentNode<GetStoneVisibilitiesQuery, GetStoneVisibilitiesQueryVariables>;
export const GetTeamDetailsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetTeamDetails"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"eventId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"myTeam"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"eventId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"eventId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"QueryMyTeamSuccess"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"attended"}},{"kind":"Field","name":{"kind":"Name","value":"confirmed"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"leaderId"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Error"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]}}]} as unknown as DocumentNode<GetTeamDetailsQuery, GetTeamDetailsQueryVariables>;
export const GetTechTeamMembersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetTechTeamMembers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getTechTeamMembers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Error"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"QueryGetTechTeamMembersSuccess"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"github"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"role"}},{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}},{"kind":"Field","name":{"kind":"Name","value":"instagram"}},{"kind":"Field","name":{"kind":"Name","value":"quote"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"linkedin"}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetTechTeamMembersQuery, GetTechTeamMembersQueryVariables>;
export const GetTotalRegistrationsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetTotalRegistrations"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getTotalRegistrations"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Error"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"QueryGetTotalRegistrationsSuccess"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"externalRegistrations"}},{"kind":"Field","name":{"kind":"Name","value":"internalRegistrations"}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetTotalRegistrationsQuery, GetTotalRegistrationsQueryVariables>;
export const GetTotalScoresDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetTotalScores"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"eventId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"roundNo"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getTotalScores"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"eventId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"eventId"}}},{"kind":"Argument","name":{"kind":"Name","value":"roundNo"},"value":{"kind":"Variable","name":{"kind":"Name","value":"roundNo"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Error"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"QueryGetTotalScoresSuccess"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"judgeScore"}},{"kind":"Field","name":{"kind":"Name","value":"teamId"}},{"kind":"Field","name":{"kind":"Name","value":"totalScore"}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetTotalScoresQuery, GetTotalScoresQueryVariables>;
export const GetUserXpDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetUserXp"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getUserXp"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Error"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"QueryGetUserXpSuccess"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"level"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"point"}}]}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"phoneNumber"}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetUserXpQuery, GetUserXpQueryVariables>;
export const JudgeCountByJudgeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"JudgeCountByJudge"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"judgeCountByJudge"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Error"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"QueryJudgeCountByJudgeSuccess"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"data"}}]}}]}}]}}]} as unknown as DocumentNode<JudgeCountByJudgeQuery, JudgeCountByJudgeQueryVariables>;
export const JudgeGetTeamsByRoundDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"JudgeGetTeamsByRound"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"eventId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"roundId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"judgeGetTeamsByRound"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"eventId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"eventId"}}},{"kind":"Argument","name":{"kind":"Name","value":"roundId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"roundId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Error"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"QueryJudgeGetTeamsByRoundSuccess"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"roundNo"}},{"kind":"Field","name":{"kind":"Name","value":"leaderId"}},{"kind":"Field","name":{"kind":"Name","value":"members"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<JudgeGetTeamsByRoundQuery, JudgeGetTeamsByRoundQueryVariables>;
export const MeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Me"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"me"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Error"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"QueryMeSuccess"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"college"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"isVerified"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"phoneNumber"}},{"kind":"Field","name":{"kind":"Name","value":"role"}},{"kind":"Field","name":{"kind":"Name","value":"profileImage"}},{"kind":"Field","name":{"kind":"Name","value":"college"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<MeQuery, MeQueryVariables>;
export const MyTeamDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"MyTeam"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"eventId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"myTeam"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"eventId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"eventId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Error"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"QueryMyTeamSuccess"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"attended"}},{"kind":"Field","name":{"kind":"Name","value":"confirmed"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"leaderId"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"event"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"maxTeamSize"}},{"kind":"Field","name":{"kind":"Name","value":"minTeamSize"}},{"kind":"Field","name":{"kind":"Name","value":"fees"}},{"kind":"Field","name":{"kind":"Name","value":"eventType"}}]}},{"kind":"Field","name":{"kind":"Name","value":"members"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"phoneNumber"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"college"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<MyTeamQuery, MyTeamQueryVariables>;
export const PublishedEventsSlugDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"PublishedEventsSlug"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"publishedEvents"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<PublishedEventsSlugQuery, PublishedEventsSlugQueryVariables>;
export const PublishedEventsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"PublishedEvents"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"publishedEvents"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"venue"}},{"kind":"Field","name":{"kind":"Name","value":"branch"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"fees"}},{"kind":"Field","name":{"kind":"Name","value":"maxTeamSize"}},{"kind":"Field","name":{"kind":"Name","value":"maxTeams"}},{"kind":"Field","name":{"kind":"Name","value":"minTeamSize"}},{"kind":"Field","name":{"kind":"Name","value":"category"}},{"kind":"Field","name":{"kind":"Name","value":"eventType"}},{"kind":"Field","name":{"kind":"Name","value":"rounds"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"roundNo"}},{"kind":"Field","name":{"kind":"Name","value":"completed"}}]}}]}}]}}]} as unknown as DocumentNode<PublishedEventsQuery, PublishedEventsQueryVariables>;
export const RegisterdEventsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"RegisterdEvents"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"registeredEvents"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Error"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"QueryRegisteredEventsSuccess"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"venue"}},{"kind":"Field","name":{"kind":"Name","value":"category"}},{"kind":"Field","name":{"kind":"Name","value":"rounds"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"roundNo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"teams"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"leaderId"}},{"kind":"Field","name":{"kind":"Name","value":"confirmed"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"attended"}},{"kind":"Field","name":{"kind":"Name","value":"members"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"event"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"maxTeamSize"}},{"kind":"Field","name":{"kind":"Name","value":"minTeamSize"}},{"kind":"Field","name":{"kind":"Name","value":"fees"}},{"kind":"Field","name":{"kind":"Name","value":"eventType"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"winner"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<RegisterdEventsQuery, RegisterdEventsQueryVariables>;
export const RoundByJudgeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"RoundByJudge"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"roundByJudge"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Error"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"QueryRoundByJudgeSuccess"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"eventId"}},{"kind":"Field","name":{"kind":"Name","value":"roundNo"}},{"kind":"Field","name":{"kind":"Name","value":"criteria"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"type"}}]}},{"kind":"Field","name":{"kind":"Name","value":"event"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"eventType"}},{"kind":"Field","name":{"kind":"Name","value":"rounds"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"roundNo"}},{"kind":"Field","name":{"kind":"Name","value":"completed"}}]}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<RoundByJudgeQuery, RoundByJudgeQueryVariables>;
export const RoundsByEventDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"RoundsByEvent"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"eventId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"roundsByEvent"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"eventId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"eventId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Error"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"QueryRoundsByEventSuccess"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"completed"}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"eventId"}},{"kind":"Field","name":{"kind":"Name","value":"roundNo"}}]}}]}}]}}]}}]} as unknown as DocumentNode<RoundsByEventQuery, RoundsByEventQueryVariables>;
export const SearchUsersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"SearchUsers"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"contains"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"first"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"after"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"users"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"contains"},"value":{"kind":"Variable","name":{"kind":"Name","value":"contains"}}},{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"Variable","name":{"kind":"Name","value":"first"}}},{"kind":"Argument","name":{"kind":"Name","value":"after"},"value":{"kind":"Variable","name":{"kind":"Name","value":"after"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"pageInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"endCursor"}},{"kind":"Field","name":{"kind":"Name","value":"hasNextPage"}}]}},{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"cursor"}},{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"role"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}}]}}]}}]}}]} as unknown as DocumentNode<SearchUsersQuery, SearchUsersQueryVariables>;
export const TeamDetailsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"TeamDetails"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"teamDetails"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"QueryTeamDetailsSuccess"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"attended"}},{"kind":"Field","name":{"kind":"Name","value":"confirmed"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"members"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"college"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"isVerified"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"phoneNumber"}},{"kind":"Field","name":{"kind":"Name","value":"role"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"event"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"eventType"}}]}}]}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Error"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]}}]} as unknown as DocumentNode<TeamDetailsQuery, TeamDetailsQueryVariables>;
export const TeamsByRoundDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"TeamsByRound"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"eventId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"roundNo"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"after"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"first"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"contains"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"teamsByRound"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"eventId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"eventId"}}},{"kind":"Argument","name":{"kind":"Name","value":"roundNo"},"value":{"kind":"Variable","name":{"kind":"Name","value":"roundNo"}}},{"kind":"Argument","name":{"kind":"Name","value":"after"},"value":{"kind":"Variable","name":{"kind":"Name","value":"after"}}},{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"Variable","name":{"kind":"Name","value":"first"}}},{"kind":"Argument","name":{"kind":"Name","value":"contains"},"value":{"kind":"Variable","name":{"kind":"Name","value":"contains"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"attended"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"members"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"phoneNumber"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"pageInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"hasNextPage"}},{"kind":"Field","name":{"kind":"Name","value":"endCursor"}}]}}]}}]}}]} as unknown as DocumentNode<TeamsByRoundQuery, TeamsByRoundQueryVariables>;
export const UserByIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"UserById"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userById"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Error"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"QueryUserByIdSuccess"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"college"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"phoneNumber"}}]}}]}}]}}]}}]} as unknown as DocumentNode<UserByIdQuery, UserByIdQueryVariables>;
export const VerifyQuizPasswordDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"VerifyQuizPassword"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"password"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}},"defaultValue":{"kind":"StringValue","value":"","block":false}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"quizId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}},"defaultValue":{"kind":"StringValue","value":"","block":false}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"verifyQuizPassword"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"password"},"value":{"kind":"Variable","name":{"kind":"Name","value":"password"}}},{"kind":"Argument","name":{"kind":"Name","value":"quizId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"quizId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Error"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"QueryVerifyQuizPasswordSuccess"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}}]}}]}}]}}]} as unknown as DocumentNode<VerifyQuizPasswordQuery, VerifyQuizPasswordQueryVariables>;
export const WinnersByEventDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"WinnersByEvent"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"eventId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"winnersByEvent"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"eventId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"eventId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Error"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"QueryWinnersByEventSuccess"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"team"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"attended"}},{"kind":"Field","name":{"kind":"Name","value":"confirmed"}},{"kind":"Field","name":{"kind":"Name","value":"leaderId"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"roundNo"}},{"kind":"Field","name":{"kind":"Name","value":"members"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"isVerified"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"phoneNumber"}},{"kind":"Field","name":{"kind":"Name","value":"role"}}]}}]}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<WinnersByEventQuery, WinnersByEventQueryVariables>;