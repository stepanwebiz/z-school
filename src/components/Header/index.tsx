import React, { useState, useEffect} from "react";
import { Menu, MenuItem, MenuProps } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useTranslation } from "next-i18next";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import Button from "../Button";
import { DropDown } from "../icons/DropDown";
import UserAvatar from "../UserAvatar";
import LanguageSelector from "../LanguageSelector";

interface HeaderProps {
  height?: number;
}

const StyledMenu = styled((props: MenuProps) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "right",
    }}
    transformOrigin={{
      vertical: -10,
      horizontal: "right",
    }}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: 22,
    marginTop: theme.spacing(1),
    // minWidth: 200,
    backgroundColor: "#3399FE",
    border: "3px solid #ffffff",
    color: "#ffffff",
    boxShadow:
      "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
    "& .MuiMenu-list": {
      padding: "0px",
    },
    "& .MuiMenuItem-root": {
      lineHeight: "46px",
      display: "flex",
      justifyContent: "center",
      "& .MuiSvgIcon-root": {
        fontSize: 18,
        color: "#ffffff",
        marginRight: theme.spacing(1.5),
      },
      "&:active": {
        backgroundColor: "#3399FE",
      },
    },
  },
}));

const Header: React.FC<HeaderProps> = ({ height }) => {
  const { t } = useTranslation("common");
  const router = useRouter();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [userEmail, setUserEmail] = useState<null | string>("");
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = (): void => {
    localStorage.clear();
    router.push("/");
  };

  useEffect(() => {
    if(typeof window !== 'undefined' ){
      let email = localStorage.getItem("user_email");
      setUserEmail(email);
    }
  }, [])
  

  return (
    <div className="w-full h-[62px] xl:h-[unset] flex justify-between items-center bg-gradient-to-r from-[#3399FE] to-[#01C0FA] px-[20px] xl:py-[12px]">
      <div>
        <Link href="/">
          <div>
            <Image
              src={"/images/logo.png"}
              alt={"logo"}
              width={374}
              height={61}
              className="w-[187px] xl:w-[110px]"
            />
          </div>
        </Link>
      </div>
      <div className="flex gap-[22px] xl:gap-[16px] xl:flex-wrap xl:justify-between xl:mx-[8px]">
        <div className="flex items-center xl:order-4">
          <LanguageSelector />
        </div>
        <Button
          className="xl:order-3"
          dynamicheight={32}
          dynamicwidth={92}
          dynamicradius={14}
          dynamiccolor="#000000 !important"
          dynamicbg="#ffffff !important"
          dynamicweight={500}
          dynamicfontsize={14}
        >
          {t("Contact us")}
        </Button>
        <div className="flex items-center border-[2px] border-solid border-white rounded-[14px] text-[14px] font-[400] text-[#ffffff] px-[20px] cursor-pointer xl:order-1 xl:px-[8px]">
          {userEmail}
        </div>
        <div
          onClick={handleClick}
          className="flex items-center gap-[4px] cursor-pointer xl:order-2"
        >
          <UserAvatar />
          <DropDown />
        </div>
        <StyledMenu
          id="demo-customized-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          disableAutoFocusItem
        >
          <MenuItem className="px-[32px] xl:text-[14px] xl:max-w-[150px] xl:px-[16px]" onClick={handleClose}>{t("Edit Profile")}</MenuItem>
          <MenuItem className="px-[32px] xl:text-[14px] xl:max-w-[150px] xl:px-[16px]"  onClick={handleLogout}>{t("Logout")}</MenuItem>
        </StyledMenu>
      </div>
    </div>
  );
};

export default Header;
