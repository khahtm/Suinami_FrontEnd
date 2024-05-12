import {
  Box,
  Button,
  IconButton,
  styled,
  Typography,
  Stack,
} from "@mui/material";
import { useEffect, useState, useMemo } from "react";
import BaseModal from "../BaseModal";
import { RiCloseCircleLine } from "react-icons/ri";
import { useSortedTokensByQuery } from "hooks/useSortedTokensByQuery";
import { Token } from "entities/Token";
import { filterTokens } from "utils/filter";
import { getObject, suiCoinMetadata } from "api/balance";
import CurrentcyItem from "./components/CurrentcyItem";
import { CURRRENCY_ADDRESS, LIQUIDITY_ADDRESS } from "constants/addresses";
import Search from "components/Search";
import { tokenDataType } from "constants/types";
import { JsonRpcProvider } from "@mysten/sui.js";
import { SelectTokenTypeEnum, suiRespondStatus } from "constants/status";
import NonAvailableCurrentcyItem from "./components/NonAvailableCurrentcyItem";

type CurrenciesModalProps = {
  open: boolean;
  onDismiss: () => void;
  title?: string;
  addressWallet: string | undefined;
  coinData: tokenDataType[] | undefined;
  setCoinData: any;
  selectTokenType?: any;
};

const CurrenciesModal = ({
  open,
  onDismiss,
  title,
  addressWallet,
  coinData,
  setCoinData,
  selectTokenType = SelectTokenTypeEnum?.SWAP,
}: CurrenciesModalProps) => {
  const [object, setObject] = useState(null);
  const [addresses, setAddresses] = useState<any>([]);
  const [nonAvailableCurrentcy, setNonAvailableCurrentcy] = useState<any>();

  const [temporaryToken, setTemporaryToken] = useState<any>([]);
  const [tokenTypes, seTokenTypes] = useState([]);
  const provider = new JsonRpcProvider();

  const [searchKey, setSearchKey] = useState("");
  const [tokens, setTokens] = useState([]);

  const getObjectLPs = async (address: string) => {
    const res: any = await provider.getObject(address);
    if (res && res.status === suiRespondStatus.exists) {
      console.log("token res===>", res);
      const abc: any = formatTypeDataObject(res?.details?.data?.type);
      // seTokenTypes()
      return res;
    }
    return null;
  };

  const formatTypeDataObject = (parram: string = "") => {
    const myRe: RegExp = /0x[a-fA-F0-9]{40}:*[a-z_]*:*[a-zA-Z]*/gm;
    const myArray = parram.match(myRe);
    return myArray;
  };

  useEffect(() => {
    const initData = () => {
      coinData ? setTemporaryToken([...coinData]) : [];
      LIQUIDITY_ADDRESS.map((item: any) => {
        const dataLP: any = getObjectLPs(item);
      });
    };

    const handleGetObject = async () => {
      try {
        const res = await getObject(CURRRENCY_ADDRESS as string);
        if (res) {
          setObject(res?.details);
          let addressArray: any[] = [];
          Object.entries(res?.details?.data?.disassembled).map((t, k) => {
            addressArray.push(
              `${res?.details?.reference?.objectId}::${
                t[0]
              }::${t[0].toUpperCase()}`
            );
          });
          setAddresses(addressArray);
          setSearchKey("");
        }
      } catch (error) {
        console.log("error", error);
      }
    };
    initData();
    handleGetObject();
  }, [open]);

  // const data = useMemo(() => {
  //   let argument: any[] = [];
  //   addresses.map((item: any) => {
  //     const index = item.indexOf(searchKey);
  //     return index !== -1 && argument.push(item);
  //   });
  //   return argument;
  // }, [searchKey, addresses]);

  const data = useMemo(async () => {
    console.log("selectTokenType==>", selectTokenType);
    if (selectTokenType === SelectTokenTypeEnum?.SWAP) {
    } else if (selectTokenType === SelectTokenTypeEnum?.LIQUIDITY) {
      try {
        const resBE = { data: [] }; // Đây sẽ là nơi get API lấy danh sách token về
        if (resBE?.data?.length !== 0) {
          return resBE?.data;
        }
        const res: any = await provider.getObject(searchKey);
        console.log("🚀 ~ file: index.tsx:121 ~ data ~ res:", res);
        if (res && res.details) {
          const tokenData: any = formatTypeDataObject(res.details.data.type);
          const resSUI = await suiCoinMetadata(tokenData[0]);
          console.log("🚀 ~ file: index.tsx:124 ~ data ~ resSUI:", resSUI);
          if (resSUI) {
            setNonAvailableCurrentcy(resSUI)
          }
        }
      } catch (error) {
        console.log("error====>", error);
      }
    }
  }, [searchKey, addresses]);

  const handleSelectTokens = () => {
    setCoinData(temporaryToken);
    onDismiss();
  };

  return (
    <BaseModal
      open={open}
      sx={{
        maxWidth: "556px",
        width: "100%",
        overflowY: "auto",
        maxHeight: "70%",
      }}
    >
      <IconButton
        onClick={onDismiss}
        sx={{ position: "absolute", right: 8, top: 8 }}
      >
        <RiCloseCircleLine fontSize="2.5rem" color="#1C1B1F" />
      </IconButton>
      <WrapBox gap="1.9rem">
        <Title textAlign="center" pt="3rem">
          Select Token
        </Title>
        <Box pr="3rem" pl="3rem">
          <Search searchKey={searchKey} setSearchKey={setSearchKey} />
        </Box>
        {/* <WrapToken>
          <Stack>
            {data?.map((item: any) => (
              <CurrentcyItem
                key={item}
                coinType={item}
                addressWallet={addressWallet}
                coinData={temporaryToken}
                setCoinData={setTemporaryToken}
              />
            ))}
          </Stack>
        </WrapToken> */}

        {tokens?.length === 0 ? (
          <WrapTokenEmpty>
            <TokenEmpty>No results found.</TokenEmpty>
          </WrapTokenEmpty>
        ) : (
          <Typography>No results found.</Typography>
        )}

        <NonAvailableCurrentcyItem
          id={nonAvailableCurrentcy?.id}
          iconUrl={nonAvailableCurrentcy?.iconUrl}
          name={nonAvailableCurrentcy?.name}
          symbol={nonAvailableCurrentcy?.symbol}
          decimals={nonAvailableCurrentcy?.decimals}
        />

        {/* <Stack pb="3rem" pr="3rem" pl="3rem">
          <Button
            onClick={handleSelectTokens}
            sx={{ width: "100%", maxWidth: "44.6rem", margin: "auto" }}
          >
            Select a Token
          </Button>
        </Stack> */}
      </WrapBox>
    </BaseModal>
  );
};

const WrapBox = styled(Stack)``;
const Title = styled(Typography)`
  font-weight: 700;
  font-size: 2rem;
  line-height: 2.4rem;
  letter-spacing: -0.5px;
  color: ${(props) => props.theme.palette.primary.main};
`;
const WrapToken = styled(Box)`
  min-height: calc(100% - 27rem);
  overflow-y: auto;
`;

//=====> style for Select Token Liquidity
const WrapTokenEmpty = styled(Stack)`
  align-items: center;
  justify-content: center;
  height: 100%;
`;
const TokenEmpty = styled(Typography)`
  letter-spacing: 0.2px;
  font-weight: 700;
  font-size: 1.8rem;
  line-height: 140%;
`;

export default CurrenciesModal;
