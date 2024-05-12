import { Stack, Typography, styled } from "@mui/material";
import { getBalance } from "api/balance";
import { useEffect } from "react";
import { IoWalletOutline } from "react-icons/io5";



const CurrencyBalance = ({symbol, balance}: any) => {

  return (
    <Stack flexDirection='row' gap='0.5rem'>
      <IoWalletOutline fontSize='1.8rem' color='#717D8A' />
      <Text>{balance}</Text>
      <Text>{symbol}</Text>
    </Stack>
  );
};

const Text = styled(Typography)`
  font-weight: 600;
  font-size: 1.6rem;
  line-height: 1.9rem;
  color: ${(props) => (props.theme.palette as any).palette.text.balance};
`;

export default CurrencyBalance;
