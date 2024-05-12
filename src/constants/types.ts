import { SelectTokenTypeEnum } from "./status";

export const tradeType = {
    'pay': 0,
    'reeceive': 1
}

export type tokenDataType = {
    address: string;
    decimals: number;
    name: string;
    symbol: string;
    coinType: string;
    amont?: number;
};

// export type SelectTokenType = SelectTokenTypeEnum.SWAP | SelectTokenTypeEnum.LIQUIDITY;
  