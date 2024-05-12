import { Stack, Box, styled, Container } from "@mui/material";
import { useWallet } from "@suiet/wallet-kit";
import { tokenDataType } from "constants/types";
import { useEffect, useState } from "react";
import HeadPage from "./components/HeadPage";
import TradeBox from "./components/TradeBox";

const Trade = () => {
  const { connected, address } = useWallet();
  const [openCurrentcy, setOpenCurrentcy] = useState(false);
  const [coinPays, setCoinPays] = useState<tokenDataType[]>([]);
  const [coinReceives, setCoinReceives] = useState<tokenDataType[]>([]);

  const toggleCurrentcyModal = () => {
    setOpenCurrentcy(!openCurrentcy);
  };

  return (
    <Section>
      <Container maxWidth="xl">
        <WrapBox>
           <Box
            sx={{
              maxWidth: "60rem",
              margin: "auto",
            }}
          >
            <HeadPage title="Trade all SUI's tokens in the fastest way!" />
          </Box>
          <Box
            sx={{
              maxWidth: "53.5rem",
              width: "100%",
              margin: "auto",
            }}
          >
            <TradeBox
              handleCurrentcyModal={toggleCurrentcyModal}
              walletAddress={address}
              coinPays={coinPays}
              setCoinPays={setCoinPays}
              coinReceives={coinReceives}
              setCoinReceives={setCoinReceives}
            />
          </Box>
        </WrapBox>
      </Container>
    </Section>
  );
};

const Section = styled(Stack)`
  background: ${(props) =>
    (props.theme.palette as any).palette.background.body};
  background-image: url("/images/bg_image.svg");
  background-position: bottom;
  background-repeat: no-repeat;
  min-height: calc(100vh - 103px);
  height: auto;
  align-items: center;
  justify-content: center;
  background-size: 100%;
`;
const WrapBox = styled(Stack)`
  gap: 4rem;
  margin-top: -15%;
`;

export default Trade;
