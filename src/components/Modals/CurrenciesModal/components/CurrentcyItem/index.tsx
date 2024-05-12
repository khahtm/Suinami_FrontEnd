import {
  Box,
  Stack,
  styled,
  Typography,
  Skeleton,
  Button,
  Checkbox,
} from "@mui/material";
import { getBalance, suiCoinMetadata } from "api/balance";
import Image from "next/image";
import { useEffect, useState } from "react";
import { convertDecimal, shortenAddress } from "utils/format";
import { AiOutlineCheckCircle, AiOutlinePlusCircle } from "react-icons/ai";
import { tokenDataType } from "constants/types";

const CurrentcyItem = ({
  coinType,
  addressWallet,
  coinData,
  setCoinData,
}: any) => {
  const [data, setData] = useState<any>(null);
  const [balance, setBalance] = useState<any>(null);
  const [isSelect, setIsSelect] = useState(false);

  useEffect(() => {
    const onMetadata = async () => {
      try {
        const res = await suiCoinMetadata(coinType);
        if (res) {
          setData(res);
        }
      } catch (error) {
        console.log("error==>", error);
      }
    };
    onMetadata();
  }, [coinType]);

  useEffect(() => {
    const onGetBalance = async () => {
      try {
        const res = await getBalance(addressWallet, coinType);
        if (res) {
          setBalance(res);
        }
      } catch (error) {}
    };

    onGetBalance();
  }, []);

  const checkSelect = () => {
    let index = coinData.findIndex((x: any) => x.address === data?.id)
    if (index === -1) {
      setIsSelect(false);
    } else {
      setIsSelect(true);
    }
  };

  useEffect(() => {
    checkSelect();
  }, [coinData, data?.id]);

  const addCoin = () => {
    let fetchCoinData = [...coinData];
    const dataItem: tokenDataType = {
      address: data?.id,
      decimals: data?.decimals,
      name: data?.name,
      symbol: data?.symbol,
      coinType: coinType,
    };
    let index = fetchCoinData.findIndex((x: any) => x.address === dataItem.address)
    if (index === -1) {
      fetchCoinData.push(dataItem);
    } else {
      fetchCoinData.splice(index, 1);
    }
    setCoinData(fetchCoinData); 
    checkSelect();
  };

  return (
    <Box
      p="1.2rem 3rem"
      onClick={addCoin}
      sx={{
        cursor: "pointer",
        borderBottom: "1px solid #F2F2F2",
      }}
    >
      <Stack flexDirection="row" gap="1.2rem" alignItems="center">
        {data ? (
          <TokenIcon>
            <Image
              src={
                data?.iconUrl ||
                `/images/currencies/${data?.symbol?.toLowerCase()}-icon.svg`
              }
              alt={
                data?.iconUrl ||
                `/images/currencies/${data?.symbol?.toLowerCase()}-icon.svg`
              }
              layout="fill"
              objectFit="contain"
            />
          </TokenIcon>
        ) : (
          <Skeleton variant="circular" width="4.2rem" height="4.2rem" />
        )}

        <Stack gap="0.4rem" flex="1">
          {data?.name && data?.symbol && data?.id ? (
            <>
              <Stack flexDirection="row" gap="2px" alignItems="center">
                <TokenName>{data?.name}</TokenName>
                <TokenSymbol>({data?.symbol})</TokenSymbol>{" "}
              </Stack>
              <TokenAddress>{shortenAddress(data?.id)}</TokenAddress>
            </>
          ) : (
            <>
              <Skeleton variant="rectangular" width="30rem" height="2.5rem" />
              <Skeleton variant="rectangular" width="30.5rem" height="2.0rem" />
            </>
          )}
        </Stack>
        {data?.decimals ? (
          <>
            <TokenName>
              Balance: {convertDecimal(balance?.totalBalance, data?.decimals)}{" "}
              {data?.symbol}
            </TokenName>
            <Box>
              {isSelect ? (
                <AiOutlineCheckCircle color="#44C13C" fontSize="2.2rem" />
              ) : (
                <AiOutlinePlusCircle color="#9F9F9F" fontSize="2.2rem" />
              )}
            </Box>
          </>
        ) : (
          <Skeleton variant="rectangular" width="14rem" height="2.6rem" />
        )}
      </Stack>
    </Box>
  );
};

const TokenIcon = styled(Box)`
  position: relative;
  width: 4.2rem;
  height: 4.2rem;
`;
const TokenSymbol = styled(Typography)`
  font-weight: 500;
  font-size: 1.4rem;
  line-height: 140%;
  color: ${(props) => props.theme.palette.primary.main};
`;
const TokenName = styled(Typography)`
  font-weight: 700;
  font-size: 1.8rem;
  line-height: 140%;
  color: ${(props) => props.theme.palette.text.primary};
`;
const TokenAddress = styled(Typography)`
  font-weight: 500;
  font-size: 1.4rem;
  line-height: 140%;
  color: ${(props) => (props.theme.palette as any).palette.text.balance};
`;

export default CurrentcyItem;
