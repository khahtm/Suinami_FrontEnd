import { createTheme, PaletteOptions, ThemeOptions } from "@mui/material";

const lightPalette: any = {
  mode: "light",
  primary: {
    main: "#00649A",
  },
  text: {
    primary: "#000000",
    secondary: "#2B2C31",
  },
  background: {
    paper: "#FAFAFA",
  },
  action: {
    active: "#00D085",
  },
  palette: {
    background: {
      box: "#FFFFFF",
      body: "#FAFAFA",
      currentcyBox: "#F2F2F2",
      inputCurrentcy: "#E6E6E6",
    },
    main: {
      primary: "#FFFFFF",
      secondary: "#000000",
    },
    neutral: {
      selectTokenText: "#00D085",
    },
    divider: {
      main: "#2B2C31",
      maxButton: "#8247E5",
    },
    text: {
      title: "#00649A",
      secondary: "#242D35",
      selectToken: "#00D085",
      maxButton: "#8247E5",
      balance: "#717D8A",
    },
  },
};

const darkPalette: any = {
  mode: "dark",
  primary: {
    main: "#00649A",
  },
  text: {
    primary: "#FFFFFF",
    secondary: "#2B2C31",
  },
  background: {
    paper: "#EFEFEF",
  },
  action: {
    active: "#00D085",
  },
  palette: {
    background: {
      box: "#FFFFFF",
      body: "#000E12",
      currentcyBox: "#000E12",
      inputCurrentcy: "#0C1620",
    },
    main: {
      primary: "#000000",
      secondary: "#FFFFFF",
    },
    neutral: {
      selectTokenText: "#00D085",
    },
    divider: {
      main: "#ffffff",
      maxButton: "#00A3FF",
    },
    text: {
      title: "#FFFFFF",
      secondary: "#FFFFFF",
      selectToken: "#F0B90B",
      maxButton: "#00A3FF",
      balance: "#717D8A",
    },
  },
};

const getComponentTheme = (basePalette: any): ThemeOptions => {
  return {
    breakpoints: {
      values: {
        xs: 0,
        sm: 576,
        md: 768,
        lg: 992,
        xl: 1200,
      },
    },
    components: {
      MuiTypography: {
        defaultProps: {
          color: "text.primary",
          fontFamily: "'Urbanist', sans-serif",
          letterSpacing: "-0.5px",
        },
      },
      MuiStack: {
        defaultProps: {
          height: "100%",
          width: "100%",
          flexDirection: "column",
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            fontFamily: "'Urbanist', sans-serif",
            borderRadius: ".8rem",
            padding: "1.9rem",
            color: "#000000",
            fontWeight: "700",
            fontSize: "1.6rem",
            lineHeight: "140%",
            textShadow: "4px 8px 24px rgba(0, 0, 0, 0.25)",
            textTransform: "inherit",
            background: "#00D085",
            boxShadow: "4px 8px 24px rgba(0, 208, 133, 0.25)",
            border: "1px solid #00D085",

            '&:hover': {
              border: "1px solid #00D085",
            color: "#00D085",
            }
          },
        },
      },
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            fontFamily: "'Urbanist', sans-serif",
            color: "text.primary",
            fontSize: "2rem",
            lineHeight: "2.4rem",
            fontWeight: "700",
            letterSpacing: "0.1rem",
          },
        },
      },
    },
  };
};

export const getTheme = (mode: "light" | "dark") => {
  if (mode === "light")
    return createTheme({
      palette: lightPalette as any as PaletteOptions,
      ...(getComponentTheme(lightPalette) as any as ThemeOptions),
    });

  return createTheme({
    palette: darkPalette as any as PaletteOptions,
    ...(getComponentTheme(darkPalette) as any as ThemeOptions),
  });
};
