import {
  styled,
  Box,
  Stack,
  Container,
  Button,
  Typography,
} from "@mui/material";
import Image from "next/image";
import { useWallet, ConnectModal } from "@suiet/wallet-kit";
import { RxDotFilled } from "react-icons/rx";
import { IoWalletSharp } from "react-icons/io5";
import { useEffect, useState } from "react";
import { convertDecimal, shortenAddress } from "utils/format";
import { getBalance } from "api/balance";
import AccountModal from "components/Modals/AccountModal";

const Menu = () => {
  const { connected, address, disconnect } = useWallet();
  const [showModal, setShowModal] = useState(false);
  const [balance, setBalance] = useState(0);
  const [showAccountModal, setShowAccountModal] = useState(false)

  useEffect(() => {
    const handleGetBalance = async () => {
      try {
        const res = await getBalance(address);
        if (res) {
          setBalance(res.totalBalance);
        }
      } catch (error: any) {
        console.log(error.response.data);
      }
    };

    handleGetBalance();
  }, [address]);

  const onShowModal = () => {
    setShowModal(!showModal);
  };

  const onShowAccountModal = () => {
    setShowAccountModal(!showAccountModal);
  }

  return (
    <WrapBox>
      <Container maxWidth="xl">
        <Stack
          flexDirection="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Logo>
            <Image
              src="/images/Suinami-Logo.png"
              alt="Suinami-Logo.png"
              layout="fill"
              objectFit="contain"
            />
          </Logo>
          {connected ? (
            <Stack
              flexDirection="row"
              gap="3rem"
              alignItems="center"
              width="auto"
              marginTop=".8rem"
            >
              <Stack flexDirection="row" gap="0.5rem" flex="1" mt='.9rem'>
                <Box position="relative" width="30px" height="30px" onClick={onShowAccountModal} sx={{
                  cursor: 'pointer'
                }}>
                  <Image
                    src="/images/SuinamiToken.png"
                    alt="SuinamiToken"
                    layout="fill"
                    objectFit="contain"
                  />
                </Box>
                <TokenBalance>${convertDecimal(balance)}</TokenBalance>
              </Stack>
              <WrapSUI>
                <Stack
                  flexDirection="row"
                  alignItems="center"
                  width="auto"
                  margin="auto"
                >
                  <RxDotFilled fontSize="2.2rem" color="#53F3C3" />
                  <ChainName>SUI</ChainName>
                </Stack>
                <WalletAddress
                  flexDirection="row"
                  alignItems="center"
                  justifyContent="space-around"
                >
                  <IoWalletSharp
                    fontSize="2.5rem"
                    color="palette.main.secondary"
                  />
                  <AddressNum>{shortenAddress(address as string)}</AddressNum>
                </WalletAddress>
              </WrapSUI>
            </Stack>
          ) : (
            <ConnectWalletButton onClick={onShowModal}>
              Connect Wallet
            </ConnectWalletButton>
          )}
        </Stack>
      </Container>
      <ConnectModal
        open={showModal}
        onOpenChange={(open) => setShowModal(open)}
      />
      <AccountModal open={showAccountModal} onDismiss={onShowAccountModal} address={address} disconnectWallet={disconnect} />
    </WrapBox>
  );
};

const WrapBox = styled(Box)`
  padding-top: 23px;
  padding-bottom: 23px;
  background: ${(props) => props.theme.palette.background.default};
`;
const Logo = styled(Box)`
  position: relative;
  max-width: 150px;
  width: 100%;
  aspect-ratio: 1/0.38;
`;
const ConnectWalletButton = styled(Button)`
  border-radius: 50px;
  background: ${(props) => props.theme.palette.text.primary};
  max-width: 183px;
  width: 100%;
  font-weight: 400;
  font-size: 18px;
  line-height: 22px;
  letter-spacing: -0.5px;
  color: ${(props) => (props.theme.palette as any).palette.main.primary};
`;
const WrapSUI = styled(Stack)`
  border-radius: 100px;
  background: #2c2d3a;
  flex-direction: row;
  width: 260px;
  height: 40px;
  padding-left: 0.5rem;
  justify-content: space-between;
`;
const WalletAddress = styled(Stack)`
  max-width: 180px;
  width: 100%;
  background: ${(props) => props.theme.palette.primary.main};
  border-radius: 100px;
  height: 40px;
`;
const AddressNum = styled(Typography)`
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  color: ${(props) => (props.theme.palette as any).palette.main.primary};
`;
const ChainName = styled(Typography)`
  font-weight: 700;
  font-size: 14px;
  line-height: 24px;
  color: ${(props) => (props.theme.palette as any).palette.main.primary};
`;
const TokenBalance = styled(Typography)`
  font-weight: 400;
  font-size: 18px;
  line-height: 22px;
  letter-spacing: -0.5px;
  color: ${(props) => (props.theme.palette as any).palette.main.secondary};
`;

export default Menu;
