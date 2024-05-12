import { createAction } from '@reduxjs/toolkit';

export enum Field {
  INPUT = "INPUT",
  OUTPUT = "OUTPUT",
}

export const replaceSwapState = createAction<{
  field: Field;
  typedValue: string;
  inputCurrency?: [];
  outputCurrency?: [];
  recipient?: string;
}>('swap/replaceSwapState');