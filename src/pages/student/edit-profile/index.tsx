import React, { useState, useEffect } from "react";
import type { GetStaticProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import axios from "axios";
import { useRouter } from "next/router";
import ScreenTitle from "@/components/ScreenTitle";
import Input from "@/components/Input";
import UserAvatar from "@/components/UserAvatar";
import Button from "@/components/Button";
import Image from "next/image";

export default function StudentProfile() {
  const router = useRouter();
  const { t } = useTranslation("common");
  const [userData, setUserData] = useState<any>(null);

  useEffect(() => {
    axios.get(`${process.env.WEB_APP_DASHBOARD_URL}users/myProfile/${localStorage.getItem("user_id")}`)
      .then(function (response) {
        console.log(response);
        setUserData(response.data);
      })
      .catch(function (error) {
        console.log(error);
      })
  }, [])

  const handleSubmit = (e: any) => {
    e.preventDefault();
    let formData = {
      user_id: localStorage.getItem("user_id"),
      first_name: e.target.first_name.value,
      last_name: e.target.last_name.value,
      phone_number: e.target.phone_number.value,
      child_details: null
    }

    axios.post(
      `${process.env.WEB_APP_DASHBOARD_URL}users/editStudentProfile/${localStorage.getItem('user_id')}`,
      formData,
      { headers: { "content-type": "multipart/form-data" } }
    )
      .then((response) => {
        console.log(response);
      }).catch((error) => {
        console.log(error)
      });
  }

  return (
    <form onSubmit={(e) => handleSubmit(e)} className="w-full pb-[400px] px-[20px] flex justify-center bg-[#CFE9FD] overflowY-auto overflow-x-hidden lg:pb-[40px] lg:h-[unset]">
      <div className="w-full max-w-[1024px] h-full pt-[40px] relative lg:pt-[24px]">
        <ScreenTitle text={t("Student / Parent Profile Edit")} />
        <div className="flex gap-[10px] mt-[52px] lg:relative lg:z-[2] lg:mt-[32px]">
          <UserAvatar src={userData?.profile_img_url} width={80} height={80} className="max-w-[80px] max-h-[80px] lg:max-w-[48px] lg:max-h-[48px] " />
          <div className="flex flex-col justify-between max-w-[164px]">
            <div className="mx-[12px] text-[22px] font-[400] text-[#2A3366] lg:mb-[12px] lg:text-[16px]">
              {t("Profile Name")}
            </div>
            <Input />
          </div>
        </div>
        <div className="max-w-[712px] flex flex-col gap-[18px] lg:flex-wrap mt-[70px] lg:mt-[32px]">
          <div className="text-[16px] font-[400] text-[#2A3366]">
            {t("Update Profile")}
          </div>
          <div className="flex gap-[18px] lg:flex-wrap">
            <Input name="first_name" key={userData?.phone_number} placeholder={t("First Name")} blockClassName="lg:w-full" defaultValue={userData?.first_name} />
            <Input name="last_name" key={userData?.phone_number} placeholder={t("Last Name")} blockClassName="lg:w-full" defaultValue={userData?.last_name} />
            <Input name="email" key={userData?.phone_number} placeholder={t("Email")} blockClassName="lg:w-full" defaultValue={userData?.email} />
            <Input name="phone_number" key={userData?.phone_number} placeholder={t("Phone")} blockClassName="lg:w-full" defaultValue={userData?.phone_number} />
          </div>
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
          type="submit"
          className="bg-gradient-to-r from-[#3399FE] to-[#01C0FA] px-[20px] mt-[32px] mb-[32px]"
          dynamicheight={40}
          dynamicwidth={164}
          dynamicradius={23}
          dynamiccolor="#ffffff !important"
          dynamicweight={700}
          dynamicfontsize={18}
        >
          {t("Update Profile")}
        </Button>
        <Image
          className="absolute w-[242px] h-[170px] top-[-20px] left-[50%] z-[1] translate-x-[-50%]"
          src={"/images/cloud.png"}
          width={242}
          height={170}
          alt="cloud"
        />
        <Image
          src={"/images/laptop.png"}
          alt={"logo"}
          width={240}
          height={240}
          className={`absolute w-[240px] top-[70px] z-[1] ${router.locale === "en" ? "right-[0px]" : "left-[0px]"
            } lg:hidden`}
        />
        
      </div>
    </form>
  );
}

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? "he", ["common"])),
  },
});
