import { styled, Stack, Typography, Button, Box } from "@mui/material";
import { useWallet } from "@suiet/wallet-kit";
import { getBalance } from "api/balance";
import CurrencyBalance from "components/CurrencyBalance";
import CurrencySymbolAndName from "components/CurrencySymbolAndName";
import InputCurrency from "components/InputCurrency";
import { tokenDataType } from "constants/types";
import { useEffect, useState } from "react";
import { convertDecimal } from "utils/format";

type CurrencyInputItemProps = {
  isSelect?: boolean;
  data: tokenDataType;
};

const CurrencyInputItem = ({ isSelect = false, data }: CurrencyInputItemProps) => {
  const { address } = useWallet();
  const [balance, setBalance] = useState(0);
  const [amont, setAmount] = useState(0)
  const [coinData, setCoinData] = useState(data)

  useEffect(() => {
    const onGetBalance = async () => {
      try {
        const res = await getBalance(address, coinData?.coinType);
        if (res) {
          let abc = convertDecimal(res?.totalBalance, 2);
          setBalance(abc);
        }
      } catch (error) {
        console.log("error====>", error);
      }
    };

    onGetBalance();
  }, [address, data?.coinType]);

  useEffect(() => {
    const handleChangeInput = () => {
      let abc = data;
      abc.amont = amont;
      setCoinData(abc);
    }
    handleChangeInput();
  }, [amont])

  return (
    <WrapBox>
      <WrapCurrency>
        <CurrencySymbolAndName name={coinData?.name} symbol={coinData?.symbol} />
        <Box maxWidth="21rem">
          <InputCurrency input={amont} setInput={setAmount} />
        </Box>
      </WrapCurrency>
      <CurrencyBalance balance={balance} symbol={coinData?.symbol} />
    </WrapBox>
  );
};

const WrapBox = styled(Stack)`
  background: ${(props) =>
    (props.theme.palette as any).palette.background.currentcyBox};
  border-radius: 0.8rem;
  width: 100%;
  min-height: 1.1rem;
  height: auto;
  padding: 1.5rem 2rem;
  justify-content: center;
  gap: 1rem;
`;
const WrapCurrency = styled(Stack)`
  flex-direction: row;
  justify-content: space-between;
`;

export default CurrencyInputItem;
