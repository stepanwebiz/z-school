import React, { useState } from "react";
import type { GetStaticProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import Input from "@/components/Input";
import Button from "@/components/Button";
import LanguageSelector from "@/components/LanguageSelector";

export default function ResetPassword() {
  const router = useRouter();
  const { t } = useTranslation("common");

  const [email, setEmail] = useState<string>("");

  return (
    <div className="w-full h-full flex justify-center items-center p-[30px]">
      <div className="w-full max-w-[564px] bg-[#93CEFF] rounded-[26px] p-[30px] pb-[60px] flex justify-center items-center relative">
        <div className="w-full max-w-[422px] h-full">
          <div className="flex justify-center items-center gap-[32px] mt-[40px] px-[15px]">
            <div className="font-[700] text-[#fff] text-[36px] sm:text-[28px] whitespace-nowrap">
              {t("Reset Password")}
            </div>
          </div>
          <div className="w-full flex justify-center items-center mt-[64px]">
            <div className="w-full max-w-[526px]">
              <Input
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                label={t("Email you enrolled with")}
                large
              />
              <div className="w-full flex justify-between gap-[22px] mt-[22px] flex-nowrap md:flex-wrap">
                <Button
                  onClick={() => router.push("/")}
                  className="text-[16px] w-full h-[46px]"
                >
                  {t("Cancel")}
                </Button>
                <Button
                  className="text-[16px] w-full h-[46px]"
                  onClick={() => console.log("click")}
                >
                  {t("Reset Password")}
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute top-[30px] right-[30px]">
          <LanguageSelector />
        </div>
      </div>
    </div>
  );
}

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? "he", ["common"])),
  },
});
