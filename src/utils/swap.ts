// import Decimal from "utils/decimal";
import Decimal from "decimal.js";
import { d } from "utils/number";

export const getCoinOutWithFees = (
  coinInVal: Decimal.Instance,
  reserveInSize: Decimal.Instance,
  reserveOutSize: Decimal.Instance,
  feeDenominator: string,
  feeNumerator: string
): Decimal => {
  const { feePct, feeScale } = {
    feePct: d(feeNumerator),
    feeScale: d(feeDenominator),
  };
  const feeMultiplier = feeScale.sub(feePct);
  const coinInAfterFees = coinInVal.mul(feeMultiplier);
  const newReservesInSize = reserveInSize.mul(feeScale).plus(coinInAfterFees);

  return Decimal.floor(
    coinInAfterFees.mul(reserveOutSize).div(newReservesInSize)
  );
};
