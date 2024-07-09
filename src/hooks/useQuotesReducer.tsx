import { useReducer } from "react";

import {
  advice1,
  advice2,
  advice3,
  advice4,
  advice5,
  Freedom_is_Worth_The_Fight,
  SMILE,
  al,
  ankur_warikoo_22_lessons,
  Jet_Van_Wijk,
} from "../data";
import { QuotesAction, QuotesActionKind, QuotesState } from "../types";

const initialState: QuotesState = [
  ...SMILE,
  ...ankur_warikoo_22_lessons,
  ...advice5,
  ...advice4,
  ...advice3,
  ...advice2,
  ...advice1,
  ...al,
  ...Freedom_is_Worth_The_Fight,
  ...Jet_Van_Wijk,
];
const init = () => initialState;

const reducer = (state: QuotesState, action: QuotesAction) => {
  switch (action.type) {
    case QuotesActionKind.ADVICE_1:
      return [...SMILE, ...advice1];
    case QuotesActionKind.ADVICE_2:
      return [...SMILE, ...advice2];
    case QuotesActionKind.ADVICE_3:
      return [...SMILE, ...advice3];
    case QuotesActionKind.ADVICE_4:
      return [...SMILE, ...advice4];
    case QuotesActionKind.ADVICE_5:
      return [...SMILE, ...advice5];
    case QuotesActionKind.ALPH_MAN:
      return [...SMILE, ...al];
    case QuotesActionKind.FREEDOM_IS_WORTH_FIGHTING:
      return [...SMILE, ...Freedom_is_Worth_The_Fight];
    case QuotesActionKind.ANKUR_WARIKOO_22_LESSONS:
      return [...SMILE, ...ankur_warikoo_22_lessons];
    default:
      return initialState;
  }
};

const useQuotesReducer = () => {
  const [state, dispatch] = useReducer<any, QuotesState>(
    reducer,
    initialState,
    init
  );
  return [state, dispatch];
};

export default useQuotesReducer;
