import { useState } from "react";
import { LessonItemTeacher } from "@/sharedTypes";
import { TFunction } from "next-i18next";
import Link from "next/link";
import { Collapse } from '@mui/material';
import Input from "@/components/Input";
import { useRouter } from "next/router";

interface LessonProps {
  item: LessonItemTeacher;
  t: TFunction;
}
const TeacherLesson: React.FC<LessonProps> = ({ item, t }) => {
  const {
    id,
    subject,
    type,
    hour,
    date,
    day,
    studentNames,
    zoomUrl,
  } = item;

  const router = useRouter();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="w-full flex flex-col">
      <div className="w-full flex items-start xl:overflow-x-scroll xl:relative xl:z-[1]">
        <div className="flex items-center mx-[16px]">
          <div className="text-[32px] font-[700] text-[#2A3366] mt-[53px]">
            {item.id}
          </div>
        </div>
        <div className="w-full flex flex-col text-[16px] font-[400] text-[#2A3366] max-w-[970px] 2xl:max-w-[820px] xl:max-w-[700px] lg:md:max-w-[450px]">
          <div className="w-full flex px-[22px] mb-[16px]">
            <div className="w-[14%] text-center truncate">{t("Day")}</div>
            <div className="w-[14%] text-center truncate">{t("Date")}</div>
            <div className="w-[10%] text-center truncate">{t("Hour")}</div>
            <div className="w-[20%] text-center truncate">
              {t("Lesson type")}
            </div>
            <div className="w-[25%] text-center truncate">
              {t("Lesson subject")}
            </div>
          </div>
          <div className="w-full h-[54px] flex items-center bg-[#ffffff] rounded-[26px] px-[22px] relative">
            <div className="w-[14%] text-center truncate">{day}</div>
            <div className="w-[14%] text-center truncate">{date}</div>
            <div className="w-[10%] text-center truncate">{hour}</div>
            <div className="w-[20%] text-center truncate">{type}</div>
            <div className="w-[25%] text-center truncate">{subject}</div>
            <Link href="#" className={`w-[54px] h-[54px] text-[#fff] rounded-[50%] mx-[auto] p-[8px] absolute ${router.locale === "en" ? "left-[100%]" : "right-[100%]"} translate-x-[${router.locale === "en" ? "-75%" : "75%"}] bg-[#0E88E5] text-center text-[12px] leading-none flex items-center justify-center break-words`}>{t("Edit Lesson")}</Link>
            <div className="opacity-0 left-[100%] right-[100%] translate-x-[75%] translate-x-[-75%] display-none"></div>
          </div>
          <div onClick={() => setCollapsed(!collapsed)} className="mt-[16px] text-[16px] text-[#2A3366] self-start flex items-center cursor-pointer">
            <span className="mx-[12px]">{t(`${collapsed ? "Hide" : "More"} Details`)}</span>
            <span className="text-[24px]">{collapsed ? "-" : "+"}</span>
          </div>
          <Collapse in={collapsed}>
            <div className="mb-[18px] mt-[24px] text-[16px] font-[400] text-[#2A3366]">
              {t("Lesson's Zoom URL")}
            </div>
            <Link href={zoomUrl} target="_blank">
              <div className="w-full bg-[#ffffff] rounded-[26px] px-[22px] py-[6px] text-[16px] font-[400] text-[rgb(1,192,250)] truncate">
                {zoomUrl}
              </div>
            </Link>
            <div className="mt-[24px] flex flex-col gap-[18px] lg:flex-wrap">
              <div className="text-[16px] font-[400] text-[#2A3366]">
                {t("Students Names")}
              </div>
              <div className="flex gap-[18px] flex-wrap">
                {studentNames.map((i, k): JSX.Element => <Input value={i} key={k} readonly />)}
              </div>
            </div>
          </Collapse>
        </div>
      </div>
    </div>
  );
};

export default TeacherLesson;
