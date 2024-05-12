import { styled, Typography } from "@mui/material";

type HeadPageProps = {
  title: string;
};

const HeadPage = ({ title }: HeadPageProps) => {
  return <Title>{title}</Title>;
};

const Title = styled(Typography)`
  font-size: 5.6rem;
  line-height: 7.8rem;
  text-align: center;
  font-weight: 700;
`;

export default HeadPage;
