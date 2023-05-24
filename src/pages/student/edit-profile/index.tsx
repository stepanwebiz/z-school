import React from "react";
import type { GetStaticProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import ScreenTitle from "@/components/ScreenTitle";
import Input from "@/components/Input";
import UserAvatar from "@/components/UserAvatar";
import Button from "@/components/Button";

export default function StudentProfile() {
  const router = useRouter();
  const { t } = useTranslation("common");

  return (
    <div className="w-full pb-[400px] px-[20px] flex justify-center bg-[#CFE9FD] overflowY-auto overflow-x-hidden lg:pb-[40px] lg:h-[unset]">
      <div className="w-full max-w-[1024px] h-full pt-[40px] relative lg:pt-[24px]">
        <ScreenTitle text={t("Student / Parent Profile Edit")} />
        <div className="flex gap-[10px] mt-[52px] lg:relative lg:z-[2] lg:mt-[32px]">
          <UserAvatar width={80} height={80} className="max-w-[80px] max-h-[80px] lg:max-w-[48px] lg:max-h-[48px] "/>
          <div className="flex flex-col justify-between max-w-[164px]">
            <div className="mx-[12px] text-[22px] font-[400] text-[#2A3366] lg:mb-[12px] lg:text-[16px]">
              {t("Profile Name")}
            </div>
            <Input />
          </div>
        </div>
        <div className="max-w-[712px] flex gap-[18px] lg:flex-wrap mt-[70px] lg:mt-[32px]">
          <Input label={t("First Name")} blockClassName="lg:w-full" />
          <Input label={t("Last Name")} blockClassName="lg:w-full" />
          <Input label={t("Email")} blockClassName="lg:w-full" />
          <Input label={t("Phone")} blockClassName="lg:w-full" />
        </div>
        <div className="flex flex-col gap-[16px] mt-[32px] lg:gap-[18px]">
          <div className="max-w-[348px] flex gap-[16px]">
            <Input label={t("Child name")} />
            <Input label={t("Age")} />
          </div>
          <div className="max-w-[348px] flex gap-[16px]">
            <Input label={t("Child name")} />
            <Input label={t("Age")} />
          </div>
          <div className="max-w-[348px] flex gap-[16px]">
            <Input label={t("Child name")} />
            <Input label={t("Age")} />
          </div>
          <div className="max-w-[348px] flex gap-[16px]">
            <Input label={t("Child name")} />
            <Input label={t("Age")} />
          </div>
          <div className="max-w-[348px] flex gap-[16px]">
            <Input label={t("Child name")} />
            <Input label={t("Age")} />
          </div>
        </div>
        <Button
          className="bg-gradient-to-r from-[#3399FE] to-[#01C0FA] px-[20px] mt-[32px] mb-[32px]"
          dynamicheight={40}
          dynamicwidth={164}
          dynamicradius={23}
          dynamiccolor="#ffffff !important"
          // dynamicbg="linear-gradient(90deg, #3399FE 0%, #01C0FA 100%), #FFFFFF; !important"
          dynamicweight={700}
          dynamicfontsize={18}
        >
          {t("Update Profile")}
        </Button>
        <img
          className="absolute w-[242px] h-[170px] top-[-20px] left-[50%] z-[1] translate-x-[-50%]"
          src={"/images/cloud.png"}
        />
        <img
          src={"/images/laptop.png"}
          alt={"logo"}
          className={`absolute w-[240px] top-[70px] z-[1] ${router.locale === "en" ? "right-[0px]" : "left-[0px]"
            } lg:hidden`}
        />
      </div>
    </div>
  );
}

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? "he", ["common"])),
  },
});
