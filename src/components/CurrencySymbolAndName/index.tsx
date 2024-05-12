import { Stack, styled, Box, Typography } from "@mui/material";
import Image from "next/image";
import { HiOutlineChevronDown } from "react-icons/hi";

type CurrencySymbolAndNameProps = {
  name?: string;
  symbol?: string;
};

const CurrencySymbolAndName = ({
  name = "",
  symbol = "",
}: CurrencySymbolAndNameProps) => {
  return (
    <Stack flexDirection="row" alignItems="center" gap=".8rem" width="auto">
      <CurrencySymbol>
        <Image
          src={`/images/currencies/${symbol?.toLowerCase()}-icon.svg`}
          alt={`/images/currencies/${symbol?.toLowerCase()}-icon.svg`}
          layout="fill"
          objectFit="contain"
        />
      </CurrencySymbol>
      <Stack gap="0.4rem" justifyContent="center" width="auto">
        <CurrentcySortName>{symbol}</CurrentcySortName>
        {/* <CurrentcyFullName>{name}</CurrentcyFullName> */}
      </Stack>
      <HiOutlineChevronDown fontSize="2rem" color="#000000" />
    </Stack>
  );
};

const CurrencySymbol = styled(Box)`
  position: relative;
  min-width: 3.4rem;
  aspect-ratio: 1;
`;
const CurrentcySortName = styled(Typography)`
  font-weight: 700;
  font-size: 2rem;
  line-height: 140%;
  color: ${(props) => props.theme.palette.text.primary};
`;
const CurrentcyFullName = styled(Typography)`
  font-weight: 400;
  font-size: 1.4rem;
  line-height: 1.7rem;
  color: ${(props) => props.theme.palette.text.primary};
`;

export default CurrencySymbolAndName;
