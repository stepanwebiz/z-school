import React, { useState, useEffect, useCallback } from "react";
import type { GetStaticProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import axios from "axios";
import ScreenTitle from "@/components/ScreenTitle";
import Input from "@/components/Input";
import UserAvatar from "@/components/UserAvatar";
import Button from "@/components/Button";
import Multiselect from 'multiselect-react-dropdown';
import Image from "next/image";

const grades = ["First", "Second", "Third", "Fourth", "Fifth", "Sixth", "Seventh", "Eighth", "Ninth", "Tenth", "Eleventh", "Twelfth"];

const expByYears: any = {
  options: [{ name: '1' }, { name: '2' }, { name: '3' }, { name: '4' }, { name: '5' }, { name: '6+' },]
};

const subjects: any = {
  options: [{ name: 'SUbject 1', id: 1 }, { name: 'SUbject 2', id: 2 }, { name: 'SUbject 3', id: 3 }, { name: 'SUbject 4', id: 4 }, { name: 'SUbject 5', id: 5 }]
};

export default function TeacherProfile() {
  const router = useRouter();
  const { t } = useTranslation("common");
  const [userData, setUserData] = useState<any>(null);
  const [gender, setGender] = useState<string>("");
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [checkedGrades, setCheckedGrades] = useState<string[]>([]);
  const [isTeacher, setIsTeacher] = useState<boolean>();
  const [teacherExp, setteacherExp] = useState<any>();

  useEffect(() => {
    axios.get(`${process.env.WEB_APP_DASHBOARD_URL}users/myProfile/${localStorage.getItem('user_id')}`)
      .then(function (response) {
        setUserData(response.data);
        setGender(response.data.teacher_gender)
        setIsTeacher(!!response.data.is_teacher)
      })
      .catch(function (error) {
        console.log(error);
      })
  }, [])

  useEffect(() => {
    let selectedValueIndex;
    let selectedObj = {};
    expByYears.options.forEach((i: any) => {
      if (i.name.includes(userData?.is_teacher_years)) {

        if (i.name.length > 1) {
          selectedValueIndex = i.name.substring(0, i.name.length - 1)
        } else {
          selectedValueIndex = i.name;
        }
        selectedObj = {
          [String(selectedValueIndex - 1)]: i
        }
        setteacherExp(selectedObj);
      }
    })
  }, [userData])


  const handleGradesCheck = (e: any) => {
    let updatedList = [...checkedGrades];
    if (e.target.checked) {
      updatedList = [...checkedGrades, e.target.value];
    } else {
      updatedList.splice(checkedGrades.indexOf(e.target.value), 1);
    }
    setCheckedGrades(updatedList);
  }

  const handleSubmit = (e: any) => {
    e.preventDefault();
    let formData = {
      teacher_id: localStorage.getItem("user_id"),
      first_name: e.target.first_name.value,
      last_name: e.target.last_name.value,
      phone_number: e.target.phone_number.value,
      teacher_gender: gender,
      profile_img_url: e.target.avatar.value,
      teaching_grades: checkedGrades,
      teaching_subjects:null,
      is_teacher:isTeacher,
      is_teacher_years:teacherExp?.name,
      education:null,
      more_info: e.target.education_experience.value
    }

    axios.post(
      `${process.env.WEB_APP_DASHBOARD_URL}users/editTeacherProfile/${localStorage.getItem('user_id')}`,
      formData,
      { headers: { "content-type": "multipart/form-data" } }
    )
      .then((response) => {
        console.log(response);
      }).catch((error) => {
        console.log(error)
      });
  }

  const handleGenderChange = (e: any) => {
    e.target.id === "gender-male" ? setGender("male") : setGender("female")
  }

  const handleisTeacherChange = (e: any) => setIsTeacher(e.target.id === "teacher-yes");

  return (
    <form onSubmit={(e) => handleSubmit(e)} className="w-full px-[20px] pb-[400px] flex justify-center bg-[#CFE9FD] overflowY-auto overflow-x-hidden lg:pb-[40px] lg:h-[unset]">
      <div className="w-full max-w-[1024px] h-full pt-[40px] relative lg:pt-[24px]">
        <ScreenTitle text={t("Profile Edit")} />
        <div className="flex gap-[10px] mt-[52px] lg:relative lg:z-[2] lg:mt-[32px]">
          <UserAvatar src={userData?.profile_img_url} width={80} height={80} className="max-w-[80px] max-h-[80px] lg:max-w-[48px] lg:max-h-[48px] " />
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
            <Input name="first_name" key={userData?.phone_number} placeholder={t("First Name")} blockClassName="lg:w-full" defaultValue={userData?.first_name} />
            <Input name="last_name" key={userData?.phone_number} placeholder={t("Last Name")} blockClassName="lg:w-full" defaultValue={userData?.last_name} />
            <Input name="email" key={userData?.phone_number} placeholder={t("Email")} blockClassName="lg:w-full" defaultValue={userData?.email} />
            <Input name="phone_number" key={userData?.phone_number} placeholder={t("Phone")} blockClassName="lg:w-full" defaultValue={userData?.phone_number} />
          </div>
        </div>
        <div className="max-w-[712px] mt-[48px] flex flex-col gap-[18px] lg:flex-wrap lg:mt-[32px]">
          <div className="text-[16px] font-[400] text-[#2A3366]">
            {t("Gender")}
          </div>
          <div className="flex gap-[18px] lg:flex-wrap">
            <div className="flex items-center ">
              <input onChange={handleGenderChange} checked={gender === "male"} id="gender-male" type="radio" name="gender" className="w-5 h-5 cursor-pointer peer appearance-none rounded-full border-transparent text-[#2A3366] checked:border-[#2A3366] checked:before:bg-[#2A3366] checked:bg-none focus:ring-[#cfe9fd] focus:ring-offset-transparent" />
              <label htmlFor="gender-male" className="text-[16px] font-[400] text-[#2A3366] mx-[10px] cursor-pointer ">{t("Male")}</label>
            </div>
            <div className="flex items-center">
              <input onChange={handleGenderChange} checked={gender === "female"} id="gender-female" type="radio" name="gender" className="w-5 h-5 cursor-pointer peer appearance-none rounded-full border-transparent text-[#2A3366] checked:border-[#2A3366] checked:before:bg-[#2A3366] checked:bg-none focus:ring-[#cfe9fd] focus:ring-offset-transparent" />
              <label htmlFor="gender-female" className="text-[16px] font-[400] text-[#2A3366] mx-[10px] cursor-pointer ">{t("Female")}</label>
            </div>
          </div>
        </div>
        <div className=" mt-[48px] flex gap-[18px] items-start lg:flex-wrap lg:mt-[32px]">
          <div className="flex flex-col">
            <label htmlFor="upload-avatar" className="w-fit text-[16px] font-[400] text-[#2A3366] cursor-pointer flex flex-col align-center">
              <div className="mb-[16px]">{t("Replace Profile Picture")}</div>
              <div className="uploader flex max-w-[170px] text-[16px] font-[400] text-[#2A3366] rounded-[23px] bg-white p-[12px] outline-0">
                <img className="w-7" src="/images/upload.png" />
                <div className="ml-[12px] mr-[12px] line-clamp-1">{uploadedImage ? uploadedImage : t("Upload File")}</div>
              </div>
            </label>
            <input id="upload-avatar" type='file' name="avatar" className="hidden" onChange={(e) => setUploadedImage(e.target.value.replace(/^.*[\\\/]/, ''))} />
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
                multiselectContainer: {
                  minHeight: "45px",
                },
                inputField: {
                  margin: "0",
                  padding: "0",
                  fontSize: "16px",
                  border: "none",
                  boxShadow: "0px 0px 0px white",
                  maxWidth: "80px",
                },
                searchBox: {
                  border: "none",
                  minHeight: "unset",
                  padding: '0',
                },
                option: {
                  fontSize: "13px"
                },
                chips: {
                  height: "21px",
                  marginBottom: "8px",
                  background: "#18aefc"
                }
              }}
            />
          </div>
          <div className="flex flex-col justify-between">
            <label htmlFor="gender-male" className="text-[16px] font-[400] text-[#2A3366] mx-[10px] cursor-pointer mb-[16px]">{t("Which grades are you teaching")}</label>
            <div className={`flex flex-wrap max-w-[${router.locale === "en" ? "465" : "385"}px]`}>
              {grades.map((i: any, k: number) => {
                return (
                  <div className="flex items-center mr-[12px] mb-[12px] max-w-[385px] max-w-[465px]" key={k}>
                    <input onChange={handleGradesCheck} id="grade" type="checkbox" name="grade" value={i} className="w-5 h-5 cursor-pointer peer appearance-none rounded-full border-transparent text-[#2A3366] checked:border-[#2A3366] checked:before:bg-[#2A3366] checked:bg-none focus:ring-[#cfe9fd] focus:ring-offset-transparent" />
                    <label className="text-[14px] font-[400] text-[#2A3366] mx-[10px] cursor-pointer ">{t(i)}</label>
                  </div>
                )
              })}
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
                <input onChange={handleisTeacherChange} checked={isTeacher} id="teacher-yes" type="radio" name="exp-as-teacher" className="w-5 h-5 cursor-pointer peer appearance-none rounded-full border-transparent text-[#2A3366] checked:border-[#2A3366] checked:before:bg-[#2A3366] checked:bg-none focus:ring-[#cfe9fd] focus:ring-offset-transparent" />
                <label htmlFor="exp-as-teacher-yes" className="text-[16px] font-[400] text-[#2A3366] mx-[10px] cursor-pointer ">{t("Yes")}</label>
              </div>
              <div className="flex items-center">
                <input onChange={handleisTeacherChange} checked={!isTeacher} id="teacher-no" type="radio" name="exp-as-teacher" className="w-5 h-5 cursor-pointer peer appearance-none rounded-full border-transparent text-[#2A3366] checked:border-[#2A3366] checked:before:bg-[#2A3366] checked:bg-none focus:ring-[#cfe9fd] focus:ring-offset-transparent" />
                <label htmlFor="exp-as-teacher-not" className="text-[16px] font-[400] text-[#2A3366] mx-[10px] cursor-pointer ">{t("Not")}</label>
              </div>
              <Multiselect
                id="exp-as-years"
                className="w-full rounded-[23px] bg-white p-[12px] outline-0 text-[18px] placeholder-[#2A3366]"
                options={expByYears.options}
                displayValue="name"
                singleSelect
                customCloseIcon={null}
                selectedValues={teacherExp}
                style={{
                  multiselectContainer: {
                    height: "45px",
                  },
                  inputField: {
                    margin: "0",
                    padding: "0",
                    fontSize: "16px",
                    border: "none",
                    boxShadow: "0px 0px 0px white",
                    maxWidth: "80px",
                  },
                  searchBox: {
                    border: "none",
                    minHeight: "unset",
                    padding: '0',
                  },
                  option: {
                    fontSize: "13px"
                  },
                  chips: {
                    height: "21px",
                    marginBottom: "0",
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
            <Input name="education_experience" key={userData?.more_info} defaultValue={userData?.more_info}/>
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
