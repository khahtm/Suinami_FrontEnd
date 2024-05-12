import BaseModal from "../BaseModal";
import {
  Box,
  Button,
  IconButton,
  Stack,
  styled,
  Typography,
} from "@mui/material";
import { RiCloseCircleLine } from "react-icons/ri";
import { RxExternalLink, RxCopy } from "react-icons/rx";
import { shortenAddress } from "utils/format";

const AccountModal = ({ open, onDismiss, address, disconnectWallet }: any) => {
  const onDisconnect = () => {
    disconnectWallet();
    onDismiss();
  }

  return (
    <BaseModal
      open={open}
      sx={{
        padding: "1.5rem",
        maxWidth: "38.4rem",
        width: "100%",
        overflowY: "auto",
        height: "auto",
      }}
    >
      <IconButton
        onClick={onDismiss}
        sx={{ position: "absolute", right: 8, top: 8 }}
      >
        <RiCloseCircleLine fontSize='2.5rem' color="#1C1B1F" />
      </IconButton>
      <WrapBox>
        <Account>Account</Account>
        <Stack flexDirection="row" justifyContent='space-between'>
          <Address>{shortenAddress(address as string)}</Address>
          <Stack flexDirection="row" gap="1rem" width='auto'>
            <BoxIcon>
              <RxExternalLink fontSize="2.5rem" color="#636363" />
            </BoxIcon>
            <BoxIcon>
              <RxCopy fontSize="2.5rem" color="#636363" />
            </BoxIcon>
          </Stack>
        </Stack>
        <Stack>
          <Button onClick={onDisconnect}>Disconnect Wallet</Button>
        </Stack>
      </WrapBox>
    </BaseModal>
  );
};

const WrapBox = styled(Stack)`
  gap: 2.3rem;
`;
const BoxIcon = styled(Box)`
  background: #efefef;
  padding: 0.5rem;
  border-radius: 1rem;
`;
const Account = styled(Typography)`
  font-weight: 600;
  font-size: 1.925rem;
`;
const Address = styled(Typography)`
  font-weight: 700;
  font-size: 2.2rem;
`;

export default AccountModal;
