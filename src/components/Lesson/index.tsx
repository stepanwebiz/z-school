import * as React from "react";
import { LessonItem } from "@/sharedTypes";
import { TFunction } from "next-i18next";
import Link from "next/link";

interface LessonProps {
  item: LessonItem;
  t: TFunction;
}
const Lesson: React.FC<LessonProps> = ({ item, t }) => {
  const {
    id,
    subject,
    type,
    teacherName,
    teacherAvatar,
    hour,
    date,
    day,
    zoomUrl,
  } = item;
  return (
    <div className="w-full">
      <div className="w-full flex lg:overflow-x-scroll lg:relative lg:z-[1]">
        <div className="flex items-center mx-[16px]">
          <div className="text-[32px] font-[700] text-[#2A3366] mt-[-42px] xl:text-[24px]">
            {item.id}
          </div>
        </div>
        <div className="w-full flex flex-col text-[16px] font-[400] text-[#2A3366] max-w-[970px] 2xl:max-w-[820px] xl:max-w-[700px] lg:md:w-fit">
          <div className="w-full flex px-[22px] mb-[16px]">
            <div className="w-[14%] text-center truncate">{t("Day")}</div>
            <div className="w-[14%] text-center truncate">{t("Date")}</div>
            <div className="w-[10%] text-center truncate">{t("Hour")}</div>
            <div className="w-[17%] text-center truncate">
              {t("Teacher name")}
            </div>
            <div className="w-[20%] text-center truncate">
              {t("Lesson type")}
            </div>
            <div className="w-[25%] text-center truncate">
              {t("Lesson subject")}
            </div>
          </div>
          <div className="w-full h-[54px] flex items-center bg-[#ffffff] rounded-[26px] px-[22px]">
            <div className="w-[14%] text-center truncate">{day}</div>
            <div className="w-[14%] text-center truncate">{date}</div>
            <div className="w-[10%] text-center truncate">{hour}</div>
            <div className="w-[17%] flex items-center justify-center gap-[10px]">
              <img
                src={teacherAvatar}
                alt="teacher"
                className="w-[34px] h-[34px]"
              />
              <div className="text-center truncate">{teacherName}</div>
            </div>
            <div className="w-[20%] text-center truncate">{type}</div>
            <div className="w-[25%] text-center truncate">{subject}</div>
          </div>
          <div className="mb-[4px] mt-[24px] mx-[12px] text-[16px] font-[400] text-[#2A3366]">
            {t("Lesson's Zoom URL")}
          </div>
          <Link href={zoomUrl} target="_blank">
            <div className="w-full bg-[#ffffff] rounded-[26px] px-[22px] py-[6px] text-[16px] font-[400] text-[rgb(1,192,250)] truncate">
              {zoomUrl}
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Lesson;
