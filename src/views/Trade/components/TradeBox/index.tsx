import { Stack, styled, Typography, Button } from "@mui/material";
import BoxWithinShadow from "components/BoxWithinShadow";
import CurrencyInputPanel from "components/CurrencyInputPanel";
import { tradeType } from "constants/types";
import { useEffect, useState } from "react";
import { TbArrowBackUp } from "react-icons/tb";
import { d } from "utils/number";

import {
  Coin,
  GetObjectDataResponse,
  getObjectExistsResponse,
  JsonRpcProvider,
  getObjectFields,
  getObjectReference,
  SuiMoveObject,
} from "@mysten/sui.js";
import { useWallet, SuiDevnetChain } from "@suiet/wallet-kit";
import {
  CURRRENCY_ADDRESS,
  GLOBAL_STATUS_ADDRESS,
  POOL_BNB_ETH_ADDRESS,
  SWAP_CONTRACT_ADDRESS,
} from "constants/addresses";
import { getCoinOutWithFees } from "utils/swap";

const TradeBox = ({
  handleCurrentcyModal,
  walletAddress,
  coinPays,
  setCoinPays,
  coinReceives,
  setCoinReceives,
}: any) => {
  const [buttonTitle, setButtonTitle] = useState("");
  const wallet = useWallet();
  const provider = new JsonRpcProvider();

  useEffect(() => {
    const handleTitleButton = () => {
      if (!walletAddress) {
        setButtonTitle("Connect Button");
      } else if (coinPays.length <= 0 || coinReceives.length <= 0) {
        setButtonTitle("Please Select Your Coin");
      }
      // else if (!coinPays?.[0]?.amount) {
      //   setButtonTitle("Enter an Amount");
      // }
      else {
        setButtonTitle("Swap");
      }
    };
    handleTitleButton();
  }, [walletAddress, coinPays, coinReceives]);

  console.log("coinPays==>", coinPays);

  const abc = async () => {
    if (!wallet.connected) return;
    try {
      const cointInput = `${CURRRENCY_ADDRESS}::${coinPays?.[0]?.symbol.toLowerCase()}::${coinPays?.[0]?.symbol.toUpperCase()}`;
      const cointOutput = `${CURRRENCY_ADDRESS}::${coinReceives?.[0]?.symbol.toLowerCase()}::${coinReceives?.[0]?.symbol.toUpperCase()}`;

      const coinObject = await provider.getCoins(
        wallet?.address || "",
        cointInput
      );

      console.log("coinObject==>", coinObject);

      if (coinObject?.data.length <= 0) return;

      const poolObject = await provider.getObject(POOL_BNB_ETH_ADDRESS);
      console.log("🚀 ~ file: index.tsx:86 ~ abc ~ poolObject:", poolObject);

      if (!poolObject?.details?.data?.fields) return;

      const coinOutWithFee = getCoinOutWithFees(
        d(coinPays?.[0]?.amont),
        d(poolObject?.details?.data?.fields?.coin_a),
        d(poolObject?.details?.data?.fields?.coin_b),
        poolObject?.details?.data?.fields?.trade_fee_denominator,
        poolObject?.details?.data?.fields?.trade_fee_numerator
      );
      console.log(
        "🚀 ~ file: index.tsx:99 ~ abc ~ coinOutWithFee:",
        coinOutWithFee.toString()
      );

      const moveCallTxn = await wallet.signAndExecuteTransaction({
        transaction: {
          kind: "moveCall",
          data: {
            packageObjectId: SWAP_CONTRACT_ADDRESS,
            module: "amm_script",
            function: "swap_exact_coinA_for_coinB",
            typeArguments: [cointInput, cointOutput],
            arguments: [
              POOL_BNB_ETH_ADDRESS, // Pool address
              GLOBAL_STATUS_ADDRESS, // Global status
              coinObject?.data[0]?.coinObjectId, // Coin ObjectID
              coinPays?.[0]?.amont,
              coinOutWithFee.toString(),
            ],
            gasBudget: 10000,
          },
        },
      });
      // console.log("moveCallTxn", moveCallTxn);
    } catch (error) {
      console.log("error===>", error);
    }
  };

  return (
    <BoxWithinShadow>
      <WrapBox>
        <Stack>
          {/* <TbArrowBackUp /> */}
          <Title>Trade</Title>
        </Stack>
        <CurrencyInputPanel
          title="You Pay"
          tradeType={tradeType.pay}
          coinData={coinPays}
          setCoinData={setCoinPays}
        />
        <CurrencyInputPanel
          title="You Receive"
          isSelect={true}
          tradeType={tradeType.reeceive}
          coinData={coinReceives}
          setCoinData={setCoinReceives}
        />
        <Button onClick={abc}>{buttonTitle}</Button>
      </WrapBox>
    </BoxWithinShadow>
  );
};

const WrapBox = styled(Stack)`
  padding: 1.5rem 3.2rem 3.5rem;
  gap: 2rem;
`;

const Title = styled(Typography)`
  font-weight: 700;
  font-size: 2rem;
  line-height: 180%;
  text-align: center;
  color: ${(props) => (props.theme.palette as any).palette.text.title};
`;

export default TradeBox;
