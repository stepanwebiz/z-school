import React, { useEffect, useState } from "react";
import type { GetStaticProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import Lesson from "@/components/Lesson";
import { LessonItem } from "@/sharedTypes";
import ScreenTitle from "@/components/ScreenTitle";

const dummyData: LessonItem[] = [
  {
    id: 1,
    subject: "Some Science lesson Subject",
    type: "Science",
    teacherName: "Teacher 1",
    teacherAvatar: "https://img.freepik.com/free-icon/man_318-157501.jpg",
    hour: "12:00",
    date: "12.3",
    day: "Sunday",
    zoomUrl:
      "https://www.google.com/search?q=test&sxsrf=APwXEdeeB4-xh8Yo7p9nL08b5DQ6khgMHA%3A1680183361845&source=hp&ei=QZAlZOGKMdqYkdUP04-G8AU&iflsig=AOEireoAAAAAZCWeUdCCTE42xNOK42xqyt3tnWufBDmd&ved=0ahUKEwihr8Dj4oP-AhVaTKQEHdOHAV4Q4dUDCAk&uact=5&oq=test&gs_lcp=Cgdnd3Mtd2l6EAMyBAgjECcyDQgAEIoFELEDEIMBEEMyBwgAEIoFEEMyBwgAEIoFEEMyBQgAEIAEMgsIABCABBCxAxCDATIFCAAQgAQyBQgAEIAEMgUIABCABDIFCAAQgAQ6CAgAEIoFEJECOgoIABCKBRCxAxBDOggIABCABBCxAzoICAAQigUQsQM6EAguEIoFELEDEMcBENEDEEM6DQguEIoFEMcBENEDEEM6BwguEIoFEENQAFiYDmC8EWgAcAB4AIAB1wKIAecIkgEFMi0zLjGYAQCgAQE&sclient=gws-wiz",
  },
  {
    id: 2,
    subject: "Some Computer Science lesson Subject",
    type: "Computer Science",
    teacherName: "Teacher 1",
    teacherAvatar: "https://img.freepik.com/free-icon/man_318-157501.jpg",
    hour: "12:00",
    date: "12.3",
    day: "Sunday",
    zoomUrl: "https://www.google.com/",
  },
  {
    id: 3,
    subject: "Some math lesson Subject",
    type: "Math",
    teacherName: "Teacher 1",
    teacherAvatar: "https://img.freepik.com/free-icon/man_318-157501.jpg",
    hour: "12:00",
    date: "12.3",
    day: "Sunday",
    zoomUrl:
      "https://www.google.com/search?q=test&sxsrf=APwXEdeeB4-xh8Yo7p9nL08b5DQ6khgMHA%3A1680183361845&source=hp&ei=QZAlZOGKMdqYkdUP04-G8AU&iflsig=AOEireoAAAAAZCWeUdCCTE42xNOK42xqyt3tnWufBDmd&ved=0ahUKEwihr8Dj4oP-AhVaTKQEHdOHAV4Q4dUDCAk&uact=5&oq=test&gs_lcp=Cgdnd3Mtd2l6EAMyBAgjECcyDQgAEIoFELEDEIMBEEMyBwgAEIoFEEMyBwgAEIoFEEMyBQgAEIAEMgsIABCABBCxAxCDATIFCAAQgAQyBQgAEIAEMgUIABCABDIFCAAQgAQ6CAgAEIoFEJECOgoIABCKBRCxAxBDOggIABCABBCxAzoICAAQigUQsQM6EAguEIoFELEDEMcBENEDEEM6DQguEIoFEMcBENEDEEM6BwguEIoFEENQAFiYDmC8EWgAcAB4AIAB1wKIAecIkgEFMi0zLjGYAQCgAQE&sclient=gws-wiz",
  },
  {
    id: 4,
    subject: "Some Computer Science lesson Subject",
    type: "Computer Science",
    teacherName: "Teacher 1",
    teacherAvatar: "https://img.freepik.com/free-icon/man_318-157501.jpg",
    hour: "12:00",
    date: "12.3",
    day: "Sunday",
    zoomUrl: "https://www.google.com/",
  },
  {
    id: 5,
    subject: "Some math lesson Subject",
    type: "Math",
    teacherName: "Teacher 1",
    teacherAvatar: "https://img.freepik.com/free-icon/man_318-157501.jpg",
    hour: "12:00",
    date: "12.3",
    day: "Sunday",
    zoomUrl:
      "https://www.google.com/search?q=test&sxsrf=APwXEdeeB4-xh8Yo7p9nL08b5DQ6khgMHA%3A1680183361845&source=hp&ei=QZAlZOGKMdqYkdUP04-G8AU&iflsig=AOEireoAAAAAZCWeUdCCTE42xNOK42xqyt3tnWufBDmd&ved=0ahUKEwihr8Dj4oP-AhVaTKQEHdOHAV4Q4dUDCAk&uact=5&oq=test&gs_lcp=Cgdnd3Mtd2l6EAMyBAgjECcyDQgAEIoFELEDEIMBEEMyBwgAEIoFEEMyBwgAEIoFEEMyBQgAEIAEMgsIABCABBCxAxCDATIFCAAQgAQyBQgAEIAEMgUIABCABDIFCAAQgAQ6CAgAEIoFEJECOgoIABCKBRCxAxBDOggIABCABBCxAzoICAAQigUQsQM6EAguEIoFELEDEMcBENEDEEM6DQguEIoFEMcBENEDEEM6BwguEIoFEENQAFiYDmC8EWgAcAB4AIAB1wKIAecIkgEFMi0zLjGYAQCgAQE&sclient=gws-wiz",
  },
  {
    id: 6,
    subject: "Some Computer Science lesson Subject",
    type: "Computer Science",
    teacherName: "Teacher 1",
    teacherAvatar: "https://img.freepik.com/free-icon/man_318-157501.jpg",
    hour: "12:00",
    date: "12.3",
    day: "Sunday",
    zoomUrl: "https://www.google.com/",
  },
  {
    id: 7,
    subject: "Some math lesson Subject",
    type: "Math",
    teacherName: "Teacher 1",
    teacherAvatar: "https://img.freepik.com/free-icon/man_318-157501.jpg",
    hour: "12:00",
    date: "12.3",
    day: "Sunday",
    zoomUrl:
      "https://www.google.com/search?q=test&sxsrf=APwXEdeeB4-xh8Yo7p9nL08b5DQ6khgMHA%3A1680183361845&source=hp&ei=QZAlZOGKMdqYkdUP04-G8AU&iflsig=AOEireoAAAAAZCWeUdCCTE42xNOK42xqyt3tnWufBDmd&ved=0ahUKEwihr8Dj4oP-AhVaTKQEHdOHAV4Q4dUDCAk&uact=5&oq=test&gs_lcp=Cgdnd3Mtd2l6EAMyBAgjECcyDQgAEIoFELEDEIMBEEMyBwgAEIoFEEMyBwgAEIoFEEMyBQgAEIAEMgsIABCABBCxAxCDATIFCAAQgAQyBQgAEIAEMgUIABCABDIFCAAQgAQ6CAgAEIoFEJECOgoIABCKBRCxAxBDOggIABCABBCxAzoICAAQigUQsQM6EAguEIoFELEDEMcBENEDEEM6DQguEIoFEMcBENEDEEM6BwguEIoFEENQAFiYDmC8EWgAcAB4AIAB1wKIAecIkgEFMi0zLjGYAQCgAQE&sclient=gws-wiz",
  },
  {
    id: 8,
    subject: "Some Computer Science lesson Subject",
    type: "Computer Science",
    teacherName: "Teacher 1",
    teacherAvatar: "https://img.freepik.com/free-icon/man_318-157501.jpg",
    hour: "12:00",
    date: "12.3",
    day: "Sunday",
    zoomUrl: "https://www.google.com/",
  },
  {
    id: 9,
    subject: "Some math lesson Subject",
    type: "Math",
    teacherName: "Teacher 1",
    teacherAvatar: "https://img.freepik.com/free-icon/man_318-157501.jpg",
    hour: "12:00",
    date: "12.3",
    day: "Sunday",
    zoomUrl:
      "https://www.google.com/search?q=test&sxsrf=APwXEdeeB4-xh8Yo7p9nL08b5DQ6khgMHA%3A1680183361845&source=hp&ei=QZAlZOGKMdqYkdUP04-G8AU&iflsig=AOEireoAAAAAZCWeUdCCTE42xNOK42xqyt3tnWufBDmd&ved=0ahUKEwihr8Dj4oP-AhVaTKQEHdOHAV4Q4dUDCAk&uact=5&oq=test&gs_lcp=Cgdnd3Mtd2l6EAMyBAgjECcyDQgAEIoFELEDEIMBEEMyBwgAEIoFEEMyBwgAEIoFEEMyBQgAEIAEMgsIABCABBCxAxCDATIFCAAQgAQyBQgAEIAEMgUIABCABDIFCAAQgAQ6CAgAEIoFEJECOgoIABCKBRCxAxBDOggIABCABBCxAzoICAAQigUQsQM6EAguEIoFELEDEMcBENEDEEM6DQguEIoFEMcBENEDEEM6BwguEIoFEENQAFiYDmC8EWgAcAB4AIAB1wKIAecIkgEFMi0zLjGYAQCgAQE&sclient=gws-wiz",
  },
  {
    id: 10,
    subject: "Some Computer Science lesson Subject",
    type: "Computer Science",
    teacherName: "Teacher 1",
    teacherAvatar: "https://img.freepik.com/free-icon/man_318-157501.jpg",
    hour: "12:00",
    date: "12.3",
    day: "Sunday",
    zoomUrl: "https://www.google.com/",
  },
];

export default function MyLessons() {
  const router = useRouter();
  const { t } = useTranslation("common");

  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    setRole(localStorage.getItem("role"));
  }, []);

  return (
    <div className="w-full h-full flex px-[20px] justify-center bg-[#CFE9FD] overflowY-auto overflow-x-hidden relative lg:pb-[40px] lg:h-[unset]">
      <div className="w-full max-w-[1024px] h-full flex flex-col gap-[40px] mt-[40px] 2xl:max-w-[870px] xl:max-w-[700px] lg:md:max-w-[470px] md:max-w-[340px] sm:max-w-[unset] lg:mt-[24px] lg:gap-[24px]">
        <ScreenTitle text={t("My Lessons")} />
        {dummyData.map(
          (item: LessonItem): JSX.Element => (
            <Lesson key={item.id} item={item} t={t} />
          )
        )}
        <div className="opacity-0">.</div>
        <img
          className="absolute w-[242px] h-[170px] top-[-60px] left-[50%] z-1 translate-x-[-50%]"
          src={"/images/cloud.png"}
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
