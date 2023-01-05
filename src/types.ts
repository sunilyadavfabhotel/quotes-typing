// An enum with all the types of actions to use in our Quotes reducer
enum QuotesActionKind {
  SMILE = "smile",
  ADVICE_1 = "ADVICE_1",
  ADVICE_2 = "ADVICE_2",
  ADVICE_3 = "ADVICE_3",
  ADVICE_4 = "ADVICE_4",
  ADVICE_5 = "ADVICE_5",
  ALPH_MAN = "ALPH_MAN",
  FREEDOM_IS_WORTH_FIGHTING = "FREEDOM_IS_WORTH_FIGHTING",
  ANKUR_WARIKOO_22_LESSONS = "ANKUR_WARIKOO_22_LESSONS",
  ALL = "ALL",
}

const OPTIONS = [
  { type: QuotesActionKind.ALL, label: "All Quotes" },
  {
    type: QuotesActionKind.ANKUR_WARIKOO_22_LESSONS,
    label: "Ankur Warikoo 22 Lessons",
  },
  { type: QuotesActionKind.ADVICE_1, label: "Advice 1" },
  { type: QuotesActionKind.ADVICE_2, label: "Advice 2" },
  { type: QuotesActionKind.ADVICE_3, label: "Advice 3" },
  { type: QuotesActionKind.ADVICE_4, label: "Advice 4" },
  { type: QuotesActionKind.ADVICE_5, label: "Advice 5" },
  { type: QuotesActionKind.ALPH_MAN, label: "Alpha man qualities" },
  {
    type: QuotesActionKind.FREEDOM_IS_WORTH_FIGHTING,
    label: "Freedom is worth fighting",
  },
];

// An interface for our Qoutes action
interface QuotesAction {
  type: QuotesActionKind;
}

// An interface for our Qoutes state
interface QuotesState {
  [index: number]: string;
}

export type { QuotesAction, QuotesState };
export { QuotesActionKind, OPTIONS };
