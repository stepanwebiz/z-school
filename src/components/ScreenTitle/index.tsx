import { useRouter } from "next/router";
import { TFunction } from "i18next";

interface ScreenTitleProps {
  // t: TFunction;
  text: string;
}

const ScreenTitle: React.FC<ScreenTitleProps> = ({ text }) => {
  return (
    <div className="flex">
      <div
        className="z-[2] border-dashed border-white border-[3px] rounded-[34px] px-[36px] py-[10px] bg-[#E4EEF6] 
      leading-[45px] text-[45px] font-[700] text-[#2A3366] xl:text-[32px] xl:leading-[32px] lg:text-[20px] lg:px-[16px] lg:py-[8px]"
      >
        {/* translate when passing props */}
        {text}
      </div>
    </div>
  );
};

export default ScreenTitle;
