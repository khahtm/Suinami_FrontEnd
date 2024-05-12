import { Stack, styled } from "@mui/material";

type BoxWithinShadowProps = {
  children?: any;
  sx?: any;
};

const BoxWithinShadow = ({ children, sx }: BoxWithinShadowProps) => {
  return <WrapBox sx={{ ...sx }}>{children}</WrapBox>;
};

const WrapBox = styled(Stack)`
  background: ${(props) => (props.theme.palette as any).palette.background.box};
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.3);
  border-radius: 0.8rem;
  border: 1px solid ${(props) => (props.theme.palette as any).palette.divider.main};
`;

export default BoxWithinShadow;
