import {
  Box,
  styled,
  Stack,
  Button,
  FormControl,
  OutlinedInput,
} from "@mui/material";

type InputCurrencyProps = {
  input: number | string | undefined | null;
  setInput: any; 
};

const InputCurrency = ({input, setInput}: InputCurrencyProps) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value)
  }

  return (
    <WrapBox>
      <Stack flexDirection="row" gap='1rem'>
        <MaxButton>Max</MaxButton>
        <FormControl variant="outlined">
          <OutlinedInput value={input} onChange={handleChange} placeholder="0.0"  />
        </FormControl>
      </Stack>
    </WrapBox>
  );
};

const WrapBox = styled(Box)`
  padding: 0.7rem 1.5rem;
  background: ${(props) => (props.theme.palette as any).palette.background.inputCurrentcy};
  border-radius: .8rem;

  input {
    padding: 0;
    text-align: right;
  }

  fieldset {
    display: none;
  }
`;
const MaxButton = styled(Button)`
  border: 1px solid ${(props) => (props.theme.palette as any).palette.background.maxButton};
  border-radius: 0.4rem;
  font-weight: 600;
  font-size: 1.2rem;
  line-height: 100%;
  color: ${(props) => (props.theme.palette as any).palette.divider.maxButton};
  text-transform: inherit;
  padding: 0;
  background: transparent;
  letter-spacing: 0.1rem;
`;

export default InputCurrency;
