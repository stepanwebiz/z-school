import { Button as MuiButton } from "@mui/material";
import { styled } from "@mui/material/styles";

interface NavButtonProps {
  children: string | JSX.Element;
  className?: string;
  disabled?: boolean | undefined;
  onClick?: (e: any) => void;
}
interface NavButtonMUIProps {
  disabled: boolean | undefined;
}

const CustomizedNavButton = styled(MuiButton)(
  ({ disabled }: NavButtonMUIProps) => ({
    // width: 335,
    // height: 56,
    // borderRadius: 38,
    // fontWeight: 400,
    // fontSize: 32,
    // color: "#FFF !important",
    // backgroundColor: "#FFC022 !important",
    // cursor: "pointer",
    // textTransform: "none",
  })
);

const NavButton: React.FC<NavButtonProps> = ({
  onClick,
  className,
  disabled,
  children,
  ...rest
}) => {
  return (
    <CustomizedNavButton
      className={className}
      onClick={onClick}
      disabled={disabled}
      {...rest}
    >
      {children}
    </CustomizedNavButton>
  );
};

export default NavButton;
