import React, { useState } from "react";
import type { GetStaticProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import ScreenTitle from "@/components/ScreenTitle";
import Input from "@/components/Input";
import UserAvatar from "@/components/UserAvatar";
import Button from "@/components/Button";
import Multiselect from 'multiselect-react-dropdown';
import Image from "next/image";

export default function TeacherProfile() {
  const router = useRouter();
  const { t } = useTranslation("common");
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const subjects: any = {
    options: [{ name: 'SUbject 1', id: 1 }, { name: 'SUbject 2', id: 2 }, { name: 'SUbject 3', id: 3 }, { name: 'SUbject 4', id: 4 }, { name: 'SUbject 5', id: 5 }]
  };

  const expByYears: any = {
    options: [{ name: '1', id: 1 }, { name: '2', id: 2 }, { name: '3', id: 3 }, { name: '4', id: 4 }, { name: '5', id: 5 },{ name: '6+', id: 6 },]
  };

  return (
    <div className="w-full px-[20px] pb-[400px] flex justify-center bg-[#CFE9FD] overflowY-auto overflow-x-hidden lg:pb-[40px] lg:h-[unset]">
      <div className="w-full max-w-[1024px] h-full pt-[40px] relative lg:pt-[24px]">
        <ScreenTitle text={t("Profile Edit")} />
        <div className="flex gap-[10px] mt-[52px] lg:relative lg:z-[2] lg:mt-[32px]">
          <UserAvatar width={80} height={80} className="max-w-[80px] max-h-[80px] lg:max-w-[48px] lg:max-h-[48px] "/>
          <div className="flex flex-col justify-between max-w-[164px]">
            <div className="mx-[12px] text-[22px] font-[400] text-[#2A3366] lg:mb-[12px] lg:text-[16px]">
              {t("Profile Name")}
            </div>
            <Input />
          </div>
        </div>
        <div className="mt-[142px] text-[22px] font-[400] text-[#2A3366] lg:mt-[32px]">
          {t("Update Profile")}
        </div>
        <div className="max-w-[712px] mt-[48px] flex flex-col gap-[18px] lg:flex-wrap lg:mt-[32px]">
          <div className="text-[16px] font-[400] text-[#2A3366]">
            {t("Personal Details")}
          </div>
          <div className="flex gap-[18px] lg:flex-wrap">
            <Input placeholder={t("First Name")} blockClassName="lg:w-full"/>
            <Input placeholder={t("Last Name")} blockClassName="lg:w-full"/>
            <Input type="email" placeholder={t("email")} blockClassName="lg:w-full"/>
            <Input type="tel" placeholder={t("Phone")} blockClassName="lg:w-full"/>
          </div>
        </div>
        <div className="max-w-[712px] mt-[48px] flex flex-col gap-[18px] lg:flex-wrap lg:mt-[32px]">
          <div className="text-[16px] font-[400] text-[#2A3366]">
            {t("Gender")}
          </div>
          <div className="flex gap-[18px] lg:flex-wrap">
            <div className="flex items-center ">
              <input id="gender-male" type="radio" name="gender" className="w-5 h-5 cursor-pointer peer appearance-none rounded-full border-transparent text-[#2A3366] checked:border-[#2A3366] checked:before:bg-[#2A3366] checked:bg-none focus:ring-[#cfe9fd] focus:ring-offset-transparent" />
              <label htmlFor="gender-male" className="text-[16px] font-[400] text-[#2A3366] mx-[10px] cursor-pointer ">{t("Male")}</label>
            </div>
            <div className="flex items-center">
              <input id="gender-female" type="radio" name="gender" className="w-5 h-5 cursor-pointer peer appearance-none rounded-full border-transparent text-[#2A3366] checked:border-[#2A3366] checked:before:bg-[#2A3366] checked:bg-none focus:ring-[#cfe9fd] focus:ring-offset-transparent" />
              <label htmlFor="gender-female" className="text-[16px] font-[400] text-[#2A3366] mx-[10px] cursor-pointer ">{t("Female")}</label>
            </div>
          </div>
        </div>
        <div className=" mt-[48px] flex gap-[18px] items-start lg:flex-wrap lg:mt-[32px]">
          <div className="flex flex-col">
            <label htmlFor="upload-avatar" className="w-fit text-[16px] font-[400] text-[#2A3366] cursor-pointer flex flex-col align-center">
              <div className="mb-[16px]">{t("Replace Profile Picture")}</div>
              <div className="uploader flex text-[16px] font-[400] text-[#2A3366] rounded-[23px] bg-white p-[12px] outline-0">
                <img className="w-7" src="/images/upload.png" />
                <div className="ml-[12px] mr-[12px]">{uploadedImage ? uploadedImage : t("Upload File")}</div>
              </div>
            </label>
            <input id="upload-avatar" type='file' className="hidden" onChange={(e) => setUploadedImage(e.target.value.replace(/^.*[\\\/]/, ''))} />
          </div>
          <div className="flex flex-col justify-between">
            <label htmlFor="subjects" className="text-[16px] font-[400] text-[#2A3366] mx-[10px] cursor-pointer mb-[16px]">{t("Subjects that you will teach")}</label>  
            <Multiselect
              id="subjects"
              className="w-full rounded-[23px] bg-white p-[12px] outline-0 text-[18px] placeholder-[#2A3366]"
              options={subjects.options}
              displayValue="name"
              placeholder=""
              style={{
                multiselectContainer:{
                  minHeight:"45px",
                },
                inputField: { 
                  margin: "0",
                  padding:"0",
                  fontSize:"16px",
                  border:"none",
                  boxShadow: "0px 0px 0px white",
                  maxWidth:"80px",
                }, 
                searchBox: {
                  border: "none",
                  minHeight: "unset",
                  padding:'0',
                },
                option:{
                  fontSize:"13px"
                },
                chips:{
                  height:"21px",
                  marginBottom:"8px",
                  background:"#18aefc"
                }
              }}
            />
          </div>
          <div className="flex flex-col justify-between">
            <label htmlFor="gender-male" className="text-[16px] font-[400] text-[#2A3366] mx-[10px] cursor-pointer mb-[16px]">{t("Which grades are you teaching")}</label>
            <div className={`flex flex-wrap max-w-[${router.locale === "en" ? "465" : "385"}px]`}>
              <div className="flex items-center mr-[12px] mb-[12px] max-w-[385px] max-w-[465px]">
                <input id="grade-1" type="checkbox" name="grade" className="w-5 h-5 cursor-pointer peer appearance-none rounded-full border-transparent text-[#2A3366] checked:border-[#2A3366] checked:before:bg-[#2A3366] checked:bg-none focus:ring-[#cfe9fd] focus:ring-offset-transparent" />
                <label htmlFor="grade-1" className="text-[14px] font-[400] text-[#2A3366] mx-[10px] cursor-pointer ">{t("First")}</label>
              </div>
              <div className="flex items-center mr-[12px] mb-[12px]">
                <input id="grade-2" type="checkbox" name="grade" className="w-5 h-5 cursor-pointer peer appearance-none rounded-full border-transparent text-[#2A3366] checked:border-[#2A3366] checked:before:bg-[#2A3366] checked:bg-none focus:ring-[#cfe9fd] focus:ring-offset-transparent" />
                <label htmlFor="grade-2" className="text-[14px] font-[400] text-[#2A3366] mx-[10px] cursor-pointer ">{t("Second")}</label>
              </div>
              <div className="flex items-center mr-[12px] mb-[12px]">
                <input id="grade-3" type="checkbox" name="grade" className="w-5 h-5 cursor-pointer peer appearance-none rounded-full border-transparent text-[#2A3366] checked:border-[#2A3366] checked:before:bg-[#2A3366] checked:bg-none focus:ring-[#cfe9fd] focus:ring-offset-transparent" />
                <label htmlFor="grade-3" className="text-[14px] font-[400] text-[#2A3366] mx-[10px] cursor-pointer ">{t("Third")}</label>
              </div>
              <div className="flex items-center mr-[12px] mb-[12px]">
                <input id="grade-4" type="checkbox" name="grade" className="w-5 h-5 cursor-pointer peer appearance-none rounded-full border-transparent text-[#2A3366] checked:border-[#2A3366] checked:before:bg-[#2A3366] checked:bg-none focus:ring-[#cfe9fd] focus:ring-offset-transparent" />
                <label htmlFor="grade-4" className="text-[14px] font-[400] text-[#2A3366] mx-[10px] cursor-pointer ">{t("Fourth")}</label>
              </div>
              <div className="flex items-center mr-[12px] mb-[12px]">
                <input id="grade-5" type="checkbox" name="grade" className="w-5 h-5 cursor-pointer peer appearance-none rounded-full border-transparent text-[#2A3366] checked:border-[#2A3366] checked:before:bg-[#2A3366] checked:bg-none focus:ring-[#cfe9fd] focus:ring-offset-transparent" />
                <label htmlFor="grade-5" className="text-[14px] font-[400] text-[#2A3366] mx-[10px] cursor-pointer ">{t("Fifth")}</label>
              </div>
              <div className="flex items-center mr-[12px] mb-[12px]">
                <input id="grade-6" type="checkbox" name="grade" className="w-5 h-5 cursor-pointer peer appearance-none rounded-full border-transparent text-[#2A3366] checked:border-[#2A3366] checked:before:bg-[#2A3366] checked:bg-none focus:ring-[#cfe9fd] focus:ring-offset-transparent" />
                <label htmlFor="grade-6" className="text-[14px] font-[400] text-[#2A3366] mx-[10px] cursor-pointer ">{t("Sixth")}</label>
              </div>
              <div className="flex items-center mr-[12px] md:mb-[12px]">
                <input id="grade-7" type="checkbox" name="grade" className="w-5 h-5 cursor-pointer peer appearance-none rounded-full border-transparent text-[#2A3366] checked:border-[#2A3366] checked:before:bg-[#2A3366] checked:bg-none focus:ring-[#cfe9fd] focus:ring-offset-transparent" />
                <label htmlFor="grade-7" className="text-[14px] font-[400] text-[#2A3366] mx-[10px] cursor-pointer ">{t("Seventh")}</label>
              </div>
              <div className="flex items-center mr-[12px] md:mb-[12px]">
                <input id="grade-8" type="checkbox" name="grade" className="w-5 h-5 cursor-pointer peer appearance-none rounded-full border-transparent text-[#2A3366] checked:border-[#2A3366] checked:before:bg-[#2A3366] checked:bg-none focus:ring-[#cfe9fd] focus:ring-offset-transparent" />
                <label htmlFor="grade-8" className="text-[14px] font-[400] text-[#2A3366] mx-[10px] cursor-pointer ">{t("Eighth")}</label>
              </div>
              <div className="flex items-center mr-[12px] md:mb-[12px]">
                <input id="grade-9" type="checkbox" name="grade" className="w-5 h-5 cursor-pointer peer appearance-none rounded-full border-transparent text-[#2A3366] checked:border-[#2A3366] checked:before:bg-[#2A3366] checked:bg-none focus:ring-[#cfe9fd] focus:ring-offset-transparent" />
                <label htmlFor="grade-9" className="text-[14px] font-[400] text-[#2A3366] mx-[10px] cursor-pointer ">{t("Ninth")}</label>
              </div>
              <div className="flex items-center mr-[12px] md:mb-[12px]">
                <input id="grade-10" type="checkbox" name="grade" className="w-5 h-5 cursor-pointer peer appearance-none rounded-full border-transparent text-[#2A3366] checked:border-[#2A3366] checked:before:bg-[#2A3366] checked:bg-none focus:ring-[#cfe9fd] focus:ring-offset-transparent" />
                <label htmlFor="grade-10" className="text-[14px] font-[400] text-[#2A3366] mx-[10px] cursor-pointer ">{t("Tenth")}</label>
              </div>
              <div className="flex items-center mr-[12px] md:mb-[12px]">
                <input id="grade-11" type="checkbox" name="grade" className="w-5 h-5 cursor-pointer peer appearance-none rounded-full border-transparent text-[#2A3366] checked:border-[#2A3366] checked:before:bg-[#2A3366] checked:bg-none focus:ring-[#cfe9fd] focus:ring-offset-transparent" />
                <label htmlFor="grade-11" className="text-[14px] font-[400] text-[#2A3366] mx-[10px] cursor-pointer ">{t("Eleventh")}</label>
              </div>
              <div className="flex items-center mr-[12px] md:mb-[12px]">
                <input id="grade-12" type="checkbox" name="grade" className="w-5 h-5 cursor-pointer peer appearance-none rounded-full border-transparent text-[#2A3366] checked:border-[#2A3366] checked:before:bg-[#2A3366] checked:bg-none focus:ring-[#cfe9fd] focus:ring-offset-transparent" />
                <label htmlFor="grade-12" className="text-[14px] font-[400] text-[#2A3366] mx-[10px] cursor-pointer ">{t("Twelfth")}</label>
              </div>
            </div>
          </div>
        </div>
        <div className="flex max-w-[712px] mt-[48px] gap-[18px] lg:flex-wrap lg:mt-[32px]">
          <div className="flex flex-col">
            <div className="text-[16px] font-[400] text-[#2A3366] mb-[16px]">
              {t("Experience as a school teacher")}
            </div>
            <div className="flex gap-[18px] lg:flex-wrap">
              <div className="flex items-center ">
                <input type="radio" name="exp-as-teacher" className="w-5 h-5 cursor-pointer peer appearance-none rounded-full border-transparent text-[#2A3366] checked:border-[#2A3366] checked:before:bg-[#2A3366] checked:bg-none focus:ring-[#cfe9fd] focus:ring-offset-transparent" />
                <label htmlFor="exp-as-teacher-yes" className="text-[16px] font-[400] text-[#2A3366] mx-[10px] cursor-pointer ">{t("Yes")}</label>
              </div>
              <div className="flex items-center">
                <input type="radio" name="exp-as-teacher" className="w-5 h-5 cursor-pointer peer appearance-none rounded-full border-transparent text-[#2A3366] checked:border-[#2A3366] checked:before:bg-[#2A3366] checked:bg-none focus:ring-[#cfe9fd] focus:ring-offset-transparent" />
                <label htmlFor="exp-as-teacher-not" className="text-[16px] font-[400] text-[#2A3366] mx-[10px] cursor-pointer ">{t("Not")}</label>
              </div>
              <Multiselect
                id="exp-as-years"
                className="w-full rounded-[23px] bg-white p-[12px] outline-0 text-[18px] placeholder-[#2A3366]"
                options={expByYears.options}
                displayValue="name"
                singleSelect={true}
                customCloseIcon={null}
                style={{
                  multiselectContainer:{
                    height:"45px",
                  },
                  inputField: { 
                    margin: "0",
                    padding:"0",
                    fontSize:"16px",
                    border:"none",
                    boxShadow: "0px 0px 0px white",
                    maxWidth:"80px",
                  }, 
                  searchBox: {
                    border: "none",
                    minHeight: "unset",
                    padding:'0',
                  },
                  option:{
                    fontSize:"13px"
                  },
                  chips:{
                    height:"21px",
                    marginBottom:"0",
                  }
                }}
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col flex max-w-[712px] mt-[48px] lg:mt-[32px]">
          <div className="flex flex-col justify-between">
            <div className="text-[16px] font-[400] text-[#2A3366] mb-[16px]">
              {t("Education and teaching experience")}
            </div>
            <Input />
          </div>
        </div>
        <Button
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
    </div>
  );
}

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? "he", ["common"])),
  },
});
