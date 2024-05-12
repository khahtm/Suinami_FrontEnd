import { Stack, Typography, styled, Box, Button } from "@mui/material";
import { useWallet } from "@suiet/wallet-kit";
import CurrencyInputItem from "components/CurrencyInputItem";
import CurrenciesModal from "components/Modals/CurrenciesModal";
import { tokenDataType } from "constants/types";
import { useState } from "react";
import { AiOutlinePlus, AiOutlinePlusCircle } from "react-icons/ai";

type CurrencyInputPanelProps = {
  title?: string | null | undefined;
  isSelect?: boolean;
  tradeType?: number;
  coinData?: tokenDataType[];
  setCoinData?: void;
  selectTokenType?: any
};

const CurrencyInputPanel = ({
  title,
  isSelect = false,
  tradeType,
  coinData,
  setCoinData,
  selectTokenType
}: CurrencyInputPanelProps) => {
  const { connected, address } = useWallet();
  const [openCurrentcy, setOpenCurrentcy] = useState(false);
  console.log('selectTokenType 1===>', selectTokenType);

  const toggleCurrentcyModal = () => {
    setOpenCurrentcy(!openCurrentcy);
  };

  return (
    <>
      <WrapBox gap=".5rem">
        <Stack
          justifyContent="space-between"
          alignItems="flex-start"
          gap=".5rem"
        >
          <Title>{title}</Title>
          {coinData && coinData.length > 0 ? (
            <Stack
              sx={{
                gap: "0.7rem",
                alignItems: "end",
              }}
            >
              <SelectTokenSm onClick={toggleCurrentcyModal}>
                <Stack flexDirection="row" gap=".5rem" alignItems="center">
                  <AiOutlinePlus color="#00D085" fontSize="1.4rem" />
                  <SelectToken>Select Tokens</SelectToken>
                </Stack>
              </SelectTokenSm>
              {coinData?.map((item: any) =>  (
                <CurrencyInputItem key={item?.address} data={item} />
              ))}
            </Stack>
          ) : (
            <SelectTokenLg
              sx={{ background: "transparent" }}
              onClick={toggleCurrentcyModal}
              disabled={!address}
            >
              <Stack flexDirection="row" gap="0.8rem" alignItems="center">
                <AiOutlinePlusCircle color="#00D085" fontSize="2.4rem" />
                <Typography>Select Tokens</Typography>
              </Stack>
            </SelectTokenLg>
          )}
        </Stack>
      </WrapBox>
      <CurrenciesModal
        open={openCurrentcy}
        onDismiss={toggleCurrentcyModal}
        addressWallet={address}
        coinData={coinData}
        setCoinData={setCoinData}
        selectTokenType={selectTokenType}
      />
    </>
  );
};

const WrapBox = styled(Stack)``;
const Title = styled(Typography)`
  font-weight: 600;
  font-size: 1.6rem;
  line-height: 140%;
  text-align: center;
  color: ${(props) => (props.theme.palette as any).palette.text.secondary};
`;
const SelectToken = styled(Typography)`
  font-weight: 600;
  font-size: 1.4rem;
  line-height: 140%;
  color: ${(props) => (props.theme.palette as any).palette.text.selectToken};
  text-transform: initial;
`;
const SelectTokenLg = styled(Button)`
  width: 100%;
  height: 107px;
  display: flex;
  background: ${(props) =>
    (props.theme.palette as any).palette.background.currentcyBox} !important;
  border-radius: 0.8rem;
  padding: 2.2rem;
  border: none;
  box-shadow: none;

  :hover {
    border: none;
  }

  p {
    font-weight: 600;
    font-size: 18px;
    line-height: 140%;
    color: #00d085;
  }
`;
const SelectTokenSm = styled(Button)`
  padding: 0;
  background: transparent;
  border: none;
  box-shadow: none;

  :hover {
    border: none;
    background: transparent;
  }
`;

export default CurrencyInputPanel;
