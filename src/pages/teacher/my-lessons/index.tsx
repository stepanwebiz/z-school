import React, { useEffect, useState } from "react";
import Image from "next/image";
import type { GetStaticProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import TeacherLesson from "@/components/TeacherLesson";
import { LessonItemTeacher } from "@/sharedTypes";
import ScreenTitle from "@/components/ScreenTitle";
import Link from "next/link";

const dummyData: LessonItemTeacher[] = [
  {
    id: 1,
    subject: "Some Science lesson Subject",
    type: "Science",
    hour: "12:00",
    studentNames: ["Tom", "John", "Max", "Anna", "Amy"],
    date: "12.3",
    day: "Sunday",
    zoomUrl:
      "https://www.google.com/search?q=test&sxsrf=APwXEdeeB4-xh8Yo7p9nL08b5DQ6khgMHA%3A1680183361845&source=hp&ei=QZAlZOGKMdqYkdUP04-G8AU&iflsig=AOEireoAAAAAZCWeUdCCTE42xNOK42xqyt3tnWufBDmd&ved=0ahUKEwihr8Dj4oP-AhVaTKQEHdOHAV4Q4dUDCAk&uact=5&oq=test&gs_lcp=Cgdnd3Mtd2l6EAMyBAgjECcyDQgAEIoFELEDEIMBEEMyBwgAEIoFEEMyBwgAEIoFEEMyBQgAEIAEMgsIABCABBCxAxCDATIFCAAQgAQyBQgAEIAEMgUIABCABDIFCAAQgAQ6CAgAEIoFEJECOgoIABCKBRCxAxBDOggIABCABBCxAzoICAAQigUQsQM6EAguEIoFELEDEMcBENEDEEM6DQguEIoFEMcBENEDEEM6BwguEIoFEENQAFiYDmC8EWgAcAB4AIAB1wKIAecIkgEFMi0zLjGYAQCgAQE&sclient=gws-wiz",
  },
  {
    id: 2,
    subject: "Some Computer Science lesson Subject",
    type: "Computer Science",
    hour: "12:00",
    studentNames: ["Tom", "John", "Max", "Shai", "Itamar", "Yuval", "George", "Anna", "Amy"],
    date: "12.3",
    day: "Sunday",
    zoomUrl: "https://www.google.com/",
  },
  {
    id: 3,
    subject: "Some math lesson Subject",
    type: "Math",
    hour: "12:00",
    studentNames: ["Shai", "Itamar", "Yuval", "George", "Anna", "Amy", "Tom", "John", "Max"],
    date: "12.3",
    day: "Sunday",
    zoomUrl:
      "https://www.google.com/search?q=test&sxsrf=APwXEdeeB4-xh8Yo7p9nL08b5DQ6khgMHA%3A1680183361845&source=hp&ei=QZAlZOGKMdqYkdUP04-G8AU&iflsig=AOEireoAAAAAZCWeUdCCTE42xNOK42xqyt3tnWufBDmd&ved=0ahUKEwihr8Dj4oP-AhVaTKQEHdOHAV4Q4dUDCAk&uact=5&oq=test&gs_lcp=Cgdnd3Mtd2l6EAMyBAgjECcyDQgAEIoFELEDEIMBEEMyBwgAEIoFEEMyBwgAEIoFEEMyBQgAEIAEMgsIABCABBCxAxCDATIFCAAQgAQyBQgAEIAEMgUIABCABDIFCAAQgAQ6CAgAEIoFEJECOgoIABCKBRCxAxBDOggIABCABBCxAzoICAAQigUQsQM6EAguEIoFELEDEMcBENEDEEM6DQguEIoFEMcBENEDEEM6BwguEIoFEENQAFiYDmC8EWgAcAB4AIAB1wKIAecIkgEFMi0zLjGYAQCgAQE&sclient=gws-wiz",
  },
  {
    id: 4,
    subject: "Some Computer Science lesson Subject",
    type: "Computer Science",
    hour: "12:00",
    studentNames: ["Tom", "John", "Max", "George", "Anna", "Amy"],
    date: "12.3",
    day: "Sunday",
    zoomUrl: "https://www.google.com/",
  },
  {
    id: 5,
    subject: "Some math lesson Subject",
    type: "Math",
    hour: "12:00",
    studentNames: ["Tom", "John", "Max", "George", "Anna", "Amy"],
    date: "12.3",
    day: "Sunday",
    zoomUrl:
      "https://www.google.com/search?q=test&sxsrf=APwXEdeeB4-xh8Yo7p9nL08b5DQ6khgMHA%3A1680183361845&source=hp&ei=QZAlZOGKMdqYkdUP04-G8AU&iflsig=AOEireoAAAAAZCWeUdCCTE42xNOK42xqyt3tnWufBDmd&ved=0ahUKEwihr8Dj4oP-AhVaTKQEHdOHAV4Q4dUDCAk&uact=5&oq=test&gs_lcp=Cgdnd3Mtd2l6EAMyBAgjECcyDQgAEIoFELEDEIMBEEMyBwgAEIoFEEMyBwgAEIoFEEMyBQgAEIAEMgsIABCABBCxAxCDATIFCAAQgAQyBQgAEIAEMgUIABCABDIFCAAQgAQ6CAgAEIoFEJECOgoIABCKBRCxAxBDOggIABCABBCxAzoICAAQigUQsQM6EAguEIoFELEDEMcBENEDEEM6DQguEIoFEMcBENEDEEM6BwguEIoFEENQAFiYDmC8EWgAcAB4AIAB1wKIAecIkgEFMi0zLjGYAQCgAQE&sclient=gws-wiz",
  },
  {
    id: 6,
    subject: "Some Computer Science lesson Subject",
    type: "Computer Science",
    hour: "12:00",
    studentNames: ["Tom", "John", "Max", "George", "Anna", "Amy"],
    date: "12.3",
    day: "Sunday",
    zoomUrl: "https://www.google.com/",
  },
  {
    id: 7,
    subject: "Some math lesson Subject",
    type: "Math",
    hour: "12:00",
    studentNames: ["Tom", "John", "Max", "George", "Anna", "Amy"],
    date: "12.3",
    day: "Sunday",
    zoomUrl:
      "https://www.google.com/search?q=test&sxsrf=APwXEdeeB4-xh8Yo7p9nL08b5DQ6khgMHA%3A1680183361845&source=hp&ei=QZAlZOGKMdqYkdUP04-G8AU&iflsig=AOEireoAAAAAZCWeUdCCTE42xNOK42xqyt3tnWufBDmd&ved=0ahUKEwihr8Dj4oP-AhVaTKQEHdOHAV4Q4dUDCAk&uact=5&oq=test&gs_lcp=Cgdnd3Mtd2l6EAMyBAgjECcyDQgAEIoFELEDEIMBEEMyBwgAEIoFEEMyBwgAEIoFEEMyBQgAEIAEMgsIABCABBCxAxCDATIFCAAQgAQyBQgAEIAEMgUIABCABDIFCAAQgAQ6CAgAEIoFEJECOgoIABCKBRCxAxBDOggIABCABBCxAzoICAAQigUQsQM6EAguEIoFELEDEMcBENEDEEM6DQguEIoFEMcBENEDEEM6BwguEIoFEENQAFiYDmC8EWgAcAB4AIAB1wKIAecIkgEFMi0zLjGYAQCgAQE&sclient=gws-wiz",
  },
  {
    id: 8,
    subject: "Some Computer Science lesson Subject",
    type: "Computer Science",
    hour: "12:00",
    studentNames: ["Tom", "John", "Max", "George"],
    date: "12.3",
    day: "Sunday",
    zoomUrl: "https://www.google.com/",
  },
  {
    id: 9,
    subject: "Some math lesson Subject",
    type: "Math",
    hour: "12:00",
    studentNames: ["Tom", "John", "Max", "Anna", "Amy"],
    date: "12.3",
    day: "Sunday",
    zoomUrl:
      "https://www.google.com/search?q=test&sxsrf=APwXEdeeB4-xh8Yo7p9nL08b5DQ6khgMHA%3A1680183361845&source=hp&ei=QZAlZOGKMdqYkdUP04-G8AU&iflsig=AOEireoAAAAAZCWeUdCCTE42xNOK42xqyt3tnWufBDmd&ved=0ahUKEwihr8Dj4oP-AhVaTKQEHdOHAV4Q4dUDCAk&uact=5&oq=test&gs_lcp=Cgdnd3Mtd2l6EAMyBAgjECcyDQgAEIoFELEDEIMBEEMyBwgAEIoFEEMyBwgAEIoFEEMyBQgAEIAEMgsIABCABBCxAxCDATIFCAAQgAQyBQgAEIAEMgUIABCABDIFCAAQgAQ6CAgAEIoFEJECOgoIABCKBRCxAxBDOggIABCABBCxAzoICAAQigUQsQM6EAguEIoFELEDEMcBENEDEEM6DQguEIoFEMcBENEDEEM6BwguEIoFEENQAFiYDmC8EWgAcAB4AIAB1wKIAecIkgEFMi0zLjGYAQCgAQE&sclient=gws-wiz",
  },
  {
    id: 10,
    subject: "Some Computer Science lesson Subject",
    type: "Computer Science",
    hour: "12:00",
    studentNames: ["Tom", "John", "Max", "George", "Anna", "Amy"],
    date: "12.3",
    day: "Sunday",
    zoomUrl: "https://www.google.com/",
  },
];

export default function MyLessons() {
  const router = useRouter();
  const { t } = useTranslation("common");

  return (
    <div className="w-full flex pb-[240px] px-[20px] justify-center bg-[#CFE9FD] overflowY-auto overflow-x-hidden relative">
      <Link href="/teacher/add-lesson" className={`flex items-center ${router.locale !== "en" ? "left-[20px]" : "right-[20px]"} absolute top-[40px] z-[1]`}>
        <div className={`rounded-[14px] bg-[#fff] py-[14px] px-[32px] translate-x-[${router.locale !== "en" ? "-20px" : "20px"}] lg:px-[20px] lg:py-[8px] lg:rounded-[6px] lg:translate-x-[${router.locale !== "en" ? "-12px" : "12px"}] md:hidden`}>{t("Add Lesson")}</div>
        <div className="w-[100px] h-[100px] flex items-center justify-center text-[32px] rounded-[50%] bg-[#FF544D] text-[#fff] z-[1] lg:w-[64px] lg:h-[64px] lg:text-[24px]">+</div>
      </Link>
      <div className="flex-row-reverse flex-row left-[20px] right-[20px] translate-x-[-20px] translate-x-[20px] display-none"></div>
      <div className="w-full max-w-[1024px] h-full flex flex-col gap-[32px] mt-[40px] 2xl:max-w-[870px] xl:max-w-[700px] lg:md:max-w-[470px]">
        <ScreenTitle text={t("My Lessons")} />
        {dummyData.map(
          (item: LessonItemTeacher): JSX.Element => (
            <TeacherLesson key={item.id} item={item} t={t} />
          )
        )}
        <Image
          className="absolute top-[-60px] left-[50%] z-1 translate-x-[-50%]"
          width={242}
          height={170}
          src={"/images/cloud.png"}
          alt="cloud"
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
