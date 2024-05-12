import { Box, IconButton, Modal, Stack, SxProps } from "@mui/material";
import BoxWithinShadow from "components/BoxWithinShadow";
import React from "react";
import { RiCloseCircleLine } from "react-icons/ri";

type Props = {
  children: React.ReactNode;
  open: boolean;
  onClose?: () => void;
  sx?: SxProps;
};

const BaseModal = ({ children, open, onClose, sx }: Props) => {
  return (
    <Modal open={open} onClose={onClose}>
      <>
        <BoxWithinShadow
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            minWidth: 300,
            ...sx,
          }}
        >
          <IconButton
            onClick={onClose}
            sx={{ position: "absolute", top: 8, right: 8 }}
          >
            <RiCloseCircleLine fontSize="2.5rem" color="#1C1B1F" />
          </IconButton>
          {children}
        </BoxWithinShadow>
      </>
    </Modal>
  );
};

export default BaseModal;
