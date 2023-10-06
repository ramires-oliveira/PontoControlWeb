import { Button, ButtonContainer } from "./styles";
import { Link } from "react-router-dom";
import { TbReportSearch } from "react-icons/tb";

interface CustomButtonProps {
  color?: string;
  text: string;
  link?: string;
  icon?: boolean;
  onClick?: () => void;
}

const CustomButton = ({
  color,
  text,
  link,
  icon,
  onClick,
}: CustomButtonProps) => {
  return (
    <ButtonContainer onClick={onClick}>
      {link ? (
        <Link to={link}>
          <Button color={color}>{text}</Button>
        </Link>
      ) : (
        <Button color={color}>
          {icon && <TbReportSearch />}
          {text}
        </Button>
      )}
    </ButtonContainer>
  );
};

export default CustomButton;
