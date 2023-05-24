import React, { useState } from "react";
import Image from "next/image";
import type { GetStaticProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import Link from "next/link";
import { useRouter } from "next/router";
import Input from "@/components/Input";
import Button from "@/components/Button";
import LanguageSelector from "@/components/LanguageSelector";
import axios from "axios";

export default function Login() {
  const router = useRouter();
  const { t } = useTranslation("common");

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleLogin = (e:any): void => {
    e.preventDefault();
    
    const userData = {
      email: email,
      password: password
    };

    axios.post(
      `${process.env.WEB_APP_DASHBOARD_URL}login/login`, 
      userData, 
      {headers: {"content-type": "multipart/form-data"}}
    )
    .then((response) => {
      localStorage.setItem("role", response.data.user_role);
      localStorage.setItem("user_id", response.data.user_id); 
      localStorage.setItem("user_email", userData.email); 
      router.push(`${response.data.user_role}/my-lessons`)
    }).catch((error)=>{
      console.log(error)
    });
  };

  return (
    <div className="w-full h-full flex justify-center items-center p-[30px]">
      <div className="w-full max-w-[736px] bg-[#93CEFF] rounded-[26px] p-[15px] relative">
        <div className="w-full h-full border-2 border-solid border-white rounded-[26px] pb-[32px]">
          <div className="flex justify-center items-center gap-[32px] mt-[42px] px-[15px] flex-wrap">
            <div className="font-[700] text-[#ffffff] text-[36px] whitespace-nowrap leading-[36px]">
              {t("login")}
            </div>
            <div className="font-[700] text-[#FFC022] text-[36px] whitespace-nowrap leading-[36px]">
              {t("Z-SCHOOL")}
            </div>
          </div>
          <form className="w-full flex justify-center items-center mt-[32px]">
            <div className="w-full max-w-[526px] px-[15px]">
              <Input
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                label={t("email")}
                large
              />
              <div className={`mt-[16px]`}>
                <Input
                  type="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  label={t("password")}
                  large
                />
              </div>
              <div className="w-full flex justify-start">
                <Button
                  className="text-[18px] w-[150px] h-[46px] mt-[42px]"
                  onClick={handleLogin}
                >
                  {t("login")}
                </Button>
              </div>
              <div className="w-full flex justify-start">
                <Link href="/reset-password">
                  <div className="text-[18px] font-[400] text-[#2A3366] mx-[10px] cursor-pointer mt-[12px]">
                    {t("Forgot password?")}
                  </div>
                </Link>
              </div>
            </div>
          </form>
        </div>
        <div className="absolute top-[30px] right-[30px]">
          <LanguageSelector />
        </div>
        <Image
          src={"/images/laptop.png"}
          alt={"logo"}
          width={100}
          height={95}
          className={`absolute bottom-[-20px] ${
            router.locale === "en" ? "right-[-20px]" : "left-[-20px]"
          }`}
        />
        <Image
          src={"/images/books.png"}
          alt={"logo"}
          width={100}
          height={84}
          className={`absolute bottom-[-20px] ${
            router.locale === "en" ? "left-[-40px]" : "right-[-40px]"
          }`}
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
