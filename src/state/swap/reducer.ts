import { createReducer } from "@reduxjs/toolkit";

import { Field, replaceSwapState } from "./actions";

export interface SwapState {
  readonly independentField: Field;
  readonly typedValue: string;
  readonly [Field.INPUT]: [
    {
      readonly currencyId: string | undefined;
      readonly amount: string | undefined;
    }
  ];
  readonly [Field.OUTPUT]: [
    {
      readonly currencyId: string | undefined;
      readonly amount: string | undefined;
    }
  ];
  // the typed recipient address or ENS name, or null if swap should go to sender
  readonly recipient?: string;
  readonly maxFee?: string;
  readonly maxPriorityFee?: string;
}

const initialState: SwapState = {
  independentField: Field.INPUT,
  typedValue: "",
  [Field.INPUT]: [
    {
      currencyId: "",
      amount: "",
    },
  ],
  [Field.OUTPUT]: [
    {
      currencyId: "",
      amount: "",
    },
  ],
  recipient: undefined,
  maxFee: undefined,
  maxPriorityFee: undefined,
};

export default createReducer<SwapState>(initialState, (builder: any) => {
  builder.addCase(
    replaceSwapState,
    (
      state: any,
      { payload: { typedValue, field, inputCurrency, outputCurrency } }
    ) => {
      return {
        [Field.INPUT]: inputCurrency,
        [Field.OUTPUT]: outputCurrency,
        independentField: field,
        typedValue: typedValue,
      };
    }
  );
});
