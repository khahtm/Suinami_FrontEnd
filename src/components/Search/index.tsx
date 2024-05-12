import { FormControl, OutlinedInput, styled, Box } from "@mui/material";
import { useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";

type SearchProps = {
  searchKey: string,
  setSearchKey: any,
}

const Search = ({ searchKey, setSearchKey }: SearchProps) => {
  const [searchInput, setSearcInput] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchKey(event.target.value)
    setSearcInput(event.target.value)
  };

  return (
    <WrapBox>
      <FormControl sx={{ width: "100%" }} variant="outlined">
        <OutlinedInput
          value={searchInput}
          onChange={handleChange}
          startAdornment={<AiOutlineSearch color="#CDCDCD" fontSize="2.5rem" />}
          placeholder="Enter token name / address..."
        />
      </FormControl>
    </WrapBox>
  );
};

const WrapBox = styled(Box)`
  .MuiFormControl-root {
    background: #f8f8f8;
    border-radius: 0.8rem;
    padding: 1.7rem 2rem;

    .MuiInputBase-root {
      padding: 0;
      display: flex;
      gap: 1rem;
    }

    input {
      padding: 0;
      align-items: center;
      color: #000000;
      font-weight: 400;
      font-size: 1.6rem;
      line-height: 140%;
    }
  }

  fieldset {
    display: none;
  }
`;

export default Search;
