import { Stack, Box, styled, Typography, Button } from "@mui/material";
import Image from "next/image";

type NonAvailableCurrentcyItemProps = {
  iconUrl?: string;
  id?: string;
  name?: string;
  symbol?: string;
  decimals?: number;
};

const NonAvailableCurrentcyItem = ({
  iconUrl = "",
  id,
  name,
  symbol,
  decimals,
}: NonAvailableCurrentcyItemProps) => {
  return (
    <Box>
      <Stack>
        <Box>
          {/* <Image src={iconUrl} alt={iconUrl} /> */}
        </Box>
        <Stack>
          <Stack>
            <Symbol>{symbol}</Symbol>
            <Name>{name}</Name>
          </Stack>
          <Address>{id}</Address>
        </Stack>
        <Button>Import</Button>
      </Stack>
    </Box>
  );
};

const Symbol = styled(Typography)``;

const Name = styled(Typography)``;

const Address = styled(Typography)``;

export default NonAvailableCurrentcyItem;
