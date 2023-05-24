import { Button as MuiButton } from "@mui/material";
import { styled } from "@mui/material/styles";

interface ButtonProps {
  children: string | JSX.Element;
  className?: string;
  disabled?: boolean | undefined;
  onClick?: (e: any) => void;
  dynamicheight?: number;
  dynamicwidth?: number;
  dynamicradius?: number;
  dynamiccolor?: string;
  dynamicbg?: string;
  dynamicweight?: number;
  dynamicfontsize?: number;
  type?:any;
}
interface ButtonMUIProps {
  disabled: boolean | undefined;
  dynamicheight: number | undefined;
  dynamicwidth: number | undefined;
  dynamicradius: number | undefined;
  dynamiccolor: string | undefined;
  dynamicbg: string | undefined;
  dynamicweight: number | undefined;
  dynamicfontsize: number | undefined;
}

const CustomizedButton = styled(MuiButton)(
  ({
    disabled,
    dynamicheight,
    dynamicwidth,
    dynamicradius,
    dynamiccolor,
    dynamicbg,
    dynamicweight,
    dynamicfontsize,
  }: ButtonMUIProps) => ({
    width: dynamicwidth || 335,
    height: dynamicheight || 56,
    borderRadius: dynamicradius || 38,
    fontWeight: dynamicweight || 400,
    fontSize: dynamicfontsize || 32,
    color: dynamiccolor || "#FFF !important",
    backgroundColor: dynamicbg || "#FFC022 !important",
    cursor: "pointer",
    textTransform: "none",
  })
);

const Button: React.FC<ButtonProps> = ({
  onClick,
  className,
  disabled,
  children,
  dynamicheight,
  dynamicwidth,
  dynamicradius,
  dynamiccolor,
  dynamicbg,
  dynamicweight,
  dynamicfontsize,
  ...rest
}) => {
  return (
    <CustomizedButton
      className={className}
      onClick={onClick}
      disabled={disabled}
      dynamicheight={dynamicheight}
      dynamicwidth={dynamicwidth}
      dynamicradius={dynamicradius}
      dynamiccolor={dynamiccolor}
      dynamicbg={dynamicbg}
      dynamicweight={dynamicweight}
      dynamicfontsize={dynamicfontsize}
      {...rest}
    >
      {children}
    </CustomizedButton>
  );
};

export default Button;
