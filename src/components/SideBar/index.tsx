import { useEffect, useState } from "react";
import { TFunction } from "i18next";
import Link from "next/link";
import { MyLessonsIcon } from "../icons/MyLessonsIcon";
import { ProfileEditIcon } from "../icons/ProfileEditIcon";
import NavButton from "../NavButton";

interface SideBarProps {
  t: TFunction;
}

const SideBar: React.FC<SideBarProps> = ({ t }) => {
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    setRole(localStorage.getItem("role"));
  }, []);

  return (
    <div className="w-[84px] h-full bg-white lg:w-full lg:h-[auto] lg:flex">
      <Link href={`/${role}/my-lessons`}>
        <NavButton className="flex flex-col justify-center items-center gap-[10px] py-[24px] cursor-pointer hover:bg-[rgba(1,192,250,0.2)] transition-colors ease-in-out duration-300 group lg:py-[12px]">
          <>
            <MyLessonsIcon className="w-[45px] h-[45px] lg:w-[24px] lg:h-[24px]"/>
            <div className="text-center text-[16px] font-[400] normal-case text-[#000000] group-hover:text-[#359afe] transition-colors ease-in-out duration-300 lg:text-[12px]">
              {t("My Lessons")}
            </div>
          </>
        </NavButton>
      </Link>
      <div className="w-full h-[1px] bg-[#E1E1E1] lg:hidden" />
      <Link href={`/${role}/edit-profile`}>
        <NavButton className="flex flex-col justify-center items-center gap-[10px] py-[24px] cursor-pointer hover:bg-[rgba(1,192,250,0.2)] transition-colors ease-in-out duration-300 group lg:py-[12px]">
          <>
            <ProfileEditIcon className="w-[45px] h-[45px] lg:w-[24px] lg:h-[24px]"/>
            <div className="text-center text-[16px] font-[400] normal-case text-[#000000] group-hover:text-[#359afe] transition-colors ease-in-out duration-300 lg:text-[12px]">
              {t("Edit Profile")}
            </div>
          </>
        </NavButton>
      </Link>
    </div>
  );
};

export default SideBar;
