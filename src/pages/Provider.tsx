import { ThemeProvider } from "@mui/system";
import { getTheme } from "configs/theme";
import { WalletProvider } from '@suiet/wallet-kit';
import '@suiet/wallet-kit/style.css';

type ProviderProps = {
  children: React.ReactElement;
};

type StyledThemeProviderProps = {
  children: React.ReactElement;
};

const StyledThemeProvider = ({ children }: StyledThemeProviderProps) => {
  const theme = getTheme("light");
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

const Provider = ({ children }: ProviderProps) => {
  return (
    <WalletProvider>
      <StyledThemeProvider>{children}</StyledThemeProvider>
    </WalletProvider>
  );
};

export default Provider;
