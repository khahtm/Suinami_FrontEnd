import {
  Box,
  styled,
  Stack,
  Container,
  Typography,
  Button,
} from "@mui/material";
import Image from "next/image";
import BoxWithinShadow from "components/BoxWithinShadow";
import CurrencyInputPanel from "components/CurrencyInputPanel";
import { SelectTokenTypeEnum } from "constants/status";

const Liquidity = () => {
  return (
    <Section>
      <Container>
        <Box
          sx={{
            maxWidth: "53.5rem",
            width: "100%",
            margin: "auto",
          }}
        >
          <BoxWithinShadow
            sx={{
              padding: "2.4rem 3.9rem",
              minHeight: "34.7rem",
            }}
          >
            <Title>Liquidity</Title>
            <Content>Connect to wallet to view your liquidity.</Content>
            <CurrencyInputPanel
            //   tradeType={tradeType.pay}
            //   coinData={coinPays}
            //   setCoinData={setCoinPays}
            selectTokenType={SelectTokenTypeEnum?.LIQUIDITY}
            />
            <WrapAddIcon>
              <Image
                src="/images/Frame.svg"
                alt="Frame.svg"
                layout="fill"
                objectFit="contain"
              />
            </WrapAddIcon>
            <CurrencyInputPanel
            //   tradeType={tradeType.pay}
            //   coinData={coinPays}
            //   setCoinData={setCoinPays}
            selectTokenType={SelectTokenTypeEnum?.LIQUIDITY}
            />
            <Button>Connect Wallet</Button>
          </BoxWithinShadow>
        </Box>
      </Container>
    </Section>
  );
};

const Title = styled(Typography)`
  font-weight: 700;
  font-size: 2rem;
  line-height: 180%;
  text-align: center;
  color: ${(props) => (props.theme.palette as any).palette.text.title};
`;
const WrapAddIcon = styled(Box)`
  width: 3.3rem;
  height: 3.3rem;
  position: relative;
`;
const Content = styled(Typography)`
  font-weight: 600;
  font-size: 1.6rem;
  line-height: 180%;
  text-align: center;
  margin: auto;
`;

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

export default Liquidity;
