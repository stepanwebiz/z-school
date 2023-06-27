import React, { useCallback, useEffect, useState } from "react";
import type { GetStaticProps } from "next";
import axios from "axios";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import ScreenTitle from "@/components/ScreenTitle";
import Input from "@/components/Input";
import Button from "@/components/Button";
import Image from "next/image";

const grades = ["First", "Second", "Third", "Fourth", "Fifth", "Sixth", "Seventh", "Eighth", "Ninth", "Tenth", "Eleventh", "Twelfth"];
const numberOfStudents = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

type Employee = {
  [key: string]: string;
};

export default function EditLesson() {
  const router = useRouter();
  const { t } = useTranslation("common");
  const [recuringTimes, setRecuringTimes] = useState<string | null>(null);
  const [checkedGrades, setCheckedGrades] = useState<string[]>([]);
  const [studentIds, setStudentIds] = useState<string[]>([]);
  let studentsIdObj: Employee = {};

  const handleGradesCheck = (e: any) => {
    let updatedList = [...checkedGrades];
    if (e.target.checked) {
      updatedList = [...checkedGrades, e.target.value];
    } else {
      updatedList.splice(checkedGrades.indexOf(e.target.value), 1);
    }
    setCheckedGrades(updatedList);
  }

  const handleStudentIdChange = (e: any, key: number) => {
    if (e.target.value.length > 0) {
      studentsIdObj = { ...studentsIdObj, [key]: e.target.value }
    } else {
      delete studentsIdObj[key]
    }

    let arr: string[] = [];
    Object.values(studentsIdObj).forEach(val => arr.push(val));
    setStudentIds(arr);
  }

  const storeStudentIdInputs = useCallback(() => {
    return numberOfStudents.map((k: number) => {
      return <Input onChange={(e) => handleStudentIdChange(e, k)} key={k} name="student_id" type="number" blockClassName="md:w-[calc(50%-6px)] md:mb-[16px] md:ml-[6px]" />
    })
  }, [])

  const handleSubmit = (e: any) => {
    e.preventDefault();
    let formData = {
      name: e.target.lesson_name.value,
      class_topic: e.target.lesson_type.value,
      date: e.target.lesson_date.value,
      time: e.target.lesson_start_time.value,
      end_time: e.target.lesson_end_time.value,
      teacher_id: localStorage.getItem("user_id"),
      grades: checkedGrades,
      recuring: !!recuringTimes,
      reacuring_value: recuringTimes,
      student_ids: studentIds
    }

    // axios.post(
    //   `${process.env.WEB_APP_DASHBOARD_URL}rest/createNewLesson/`, 
    //   formData, 
    //   {headers: {"content-type": "multipart/form-data"}}
    // )
    // .then((response) => {
    //   console.log(response);
    // }).catch((error)=>{
    //   console.log(error)
    // });
  }

  return (
    <div className="w-full px-[20px] pb-[400px] flex justify-center bg-[#CFE9FD] overflowY-auto overflow-x-hidden relative lg:pb-[40px] lg:h-[unset]">
      <form onSubmit={(e) => handleSubmit(e)} className="w-full max-w-[1024px] h-full pt-[40px] relative lg:md:max-w-[470px] md:max-w-[340px] sm:max-w-[unset] lg:gap-[24px] lg:pt-[24px]">
        <ScreenTitle text={t("Edit Lesson")} />
        <div className="max-w-[950px] mt-[48px] flex flex-col gap-[18px] lg:flex-wrap lg:mt-[32px] lg:relative lg:z-[2]">
          <div className="flex gap-[18px] lg:flex-wrap">
            <div className="flex flex-col lg:w-full">
              <label htmlFor="lessonName" className="text-[16px] font-[400] text-[#2A3366] mx-[10px] cursor-pointer mb-[16px]">{t("Lesson Name")}</label>
              <Input id="lessonName" name="lesson_name" blockClassName="lg:w-full" />
            </div>
            <div className="flex flex-col lg:w-full">
              <label htmlFor="lessonType" className="text-[16px] font-[400] text-[#2A3366] mx-[10px] cursor-pointer mb-[16px]">{t("Type")}</label>
              <Input id="lessonType" name="lesson_type" blockClassName="lg:w-full" />
            </div>
            <div className="flex flex-col justify-between">
              <label className="text-[16px] font-[400] text-[#2A3366] mx-[10px] cursor-pointer mb-[16px]">{t("Grade")}</label>
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
        </div>
        <div className="max-w-[712px] mt-[48px] flex gap-[18px] lg:flex-wrap lg:mt-[32px]">
          <div className="flex flex-col lg:w-full">
            <label htmlFor="lessonDate" className="text-[16px] font-[400] text-[#2A3366] mx-[10px] cursor-pointer mb-[16px]">{t("Lesson Date")}</label>
            <Input name="lesson_date" />
          </div>
          <div className="flex flex-col lg:w-full">
            <label htmlFor="lessonStartTime" className="text-[16px] font-[400] text-[#2A3366] mx-[10px] cursor-pointer mb-[16px]">{t("Start Time")}</label>
            <Input name="lesson_start_time" />
          </div>
          <div className="flex flex-col lg:w-full">
            <label htmlFor="lessonEndTime" className="text-[16px] font-[400] text-[#2A3366] mx-[10px] cursor-pointer mb-[16px]">{t("End Time")}</label>
            <Input name="lesson_end_time" />
          </div>
        </div>
        <div className="max-w-[712px] mt-[48px] flex gap-[18px] lg:flex-wrap lg:mt-[32px]">
          <div className="flex items-center ">
            <input id="privateLesson" type="radio" name="lessonCat" className="w-5 h-5 cursor-pointer peer appearance-none rounded-full border-transparent text-[#2A3366] checked:border-[#2A3366] checked:before:bg-[#2A3366] checked:bg-none focus:ring-[#cfe9fd] focus:ring-offset-transparent" />
            <label htmlFor="privateLesson" className="text-[16px] font-[400] text-[#2A3366] mx-[10px] cursor-pointer ">{t("Private Lesson")}</label>
          </div>
          <div className="flex items-center">
            <input id="groupLesson" type="radio" name="lessonCat" className="w-5 h-5 cursor-pointer peer appearance-none rounded-full border-transparent text-[#2A3366] checked:border-[#2A3366] checked:before:bg-[#2A3366] checked:bg-none focus:ring-[#cfe9fd] focus:ring-offset-transparent" />
            <label htmlFor="groupLesson" className="text-[16px] font-[400] text-[#2A3366] mx-[10px] cursor-pointer ">{t("Group Lesson")}</label>
          </div>
        </div>
        <div className="max-w-[712px] mt-[48px] flex flex-col gap-[18px] lg:flex-wrap lg:mt-[32px]">
          <div className="text-[16px] font-[400] text-[#2A3366]">
            {t("Lesson will recur")}
          </div>
          <div className="flex gap-[18px] lg:flex-wrap">
            <div className="flex items-center ">
              <input onChange={(e) => setRecuringTimes(e.target.value)} value={4} id="four-times" type="radio" name="lesson-recurs" className="w-5 h-5 cursor-pointer peer appearance-none rounded-full border-transparent text-[#2A3366] checked:border-[#2A3366] checked:before:bg-[#2A3366] checked:bg-none focus:ring-[#cfe9fd] focus:ring-offset-transparent" />
              <label htmlFor="four-times" className="text-[16px] font-[400] text-[#2A3366] mx-[10px] cursor-pointer ">{t("4 times")}</label>
            </div>
            <div className="flex items-center">
              <input onChange={(e) => setRecuringTimes(e.target.value)} value={8} id="eight-times" type="radio" name="lesson-recurs" className="w-5 h-5 cursor-pointer peer appearance-none rounded-full border-transparent text-[#2A3366] checked:border-[#2A3366] checked:before:bg-[#2A3366] checked:bg-none focus:ring-[#cfe9fd] focus:ring-offset-transparent" />
              <label htmlFor="eight-times" className="text-[16px] font-[400] text-[#2A3366] mx-[10px] cursor-pointer ">{t("8 times")}</label>
            </div>
            <div className="flex items-center">
              <input onChange={(e) => setRecuringTimes(e.target.value)} value={12} id="twelve-times" type="radio" name="lesson-recurs" className="w-5 h-5 cursor-pointer peer appearance-none rounded-full border-transparent text-[#2A3366] checked:border-[#2A3366] checked:before:bg-[#2A3366] checked:bg-none focus:ring-[#cfe9fd] focus:ring-offset-transparent" />
              <label htmlFor="twelve-times" className="text-[16px] font-[400] text-[#2A3366] mx-[10px] cursor-pointer ">{t("12 times")}</label>
            </div>
          </div>
        </div>
        <div className="max-w-[900px] mt-[48px] flex flex-col gap-[18px] lg:flex-wrap lg:mt-[32px]">
          <div className="text-[16px] font-[400] text-[#2A3366]">
            {t("Student number")}
          </div>
          <div className="flex gap-[8px] lg:flex-wrap">
            {numberOfStudents.map((i: number, k: number) => {
              return (
                <div className="flex items-center lg:mb-[8px]" key={k}>
                  <input id="numberOfStudents" type="radio" name="number_of_students" className="w-5 h-5 cursor-pointer peer appearance-none rounded-full border-transparent text-[#2A3366] checked:border-[#2A3366] checked:before:bg-[#2A3366] checked:bg-none focus:ring-[#cfe9fd] focus:ring-offset-transparent" />
                  <label className="text-[16px] font-[400] text-[#2A3366] mx-[10px] cursor-pointer ">{i}</label>
                </div>
              )
            })}
          </div>
        </div>
        <div className="max-w-[950px] mt-[48px] flex flex-col gap-[18px] lg:flex-wrap lg:mt-[32px]">
          <div className="text-[16px] font-[400] text-[#2A3366]">
            {t("Add Students by adding their student ID")}
          </div>
          <div className="flex flex-wrap gap-[18px] md:gap-[0]">{storeStudentIdInputs()}</div>
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
          {t("Edit Lesson")}
        </Button>
        <Image
          className="absolute w-[242px] h-[170px] top-[-20px] left-[50%] z-[1] translate-x-[-50%]"
          src={"/images/cloud.png"}
          width={242}
          height={170}
          alt="cloud"
        />
        <Image
          className="absolute w-[242px] h-[170px] top-[120%] left-[150px] z-[1] md:hidden"
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
          className={`absolute w-[240px] bottom-[-150px] z-[1] ${router.locale === "en" ? "right-[0px]" : "left-[0px]"
            } md:hidden`}
        />
      </form>
    </div >
  );
}

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? "he", ["common"])),
  },
});
