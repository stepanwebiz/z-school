import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

interface LanguageSelectorProps {}

const LanguageSelector: React.FC<LanguageSelectorProps> = () => {
  const router = useRouter();
  const changeTo = router.locale === "en" ? "default" : "en";
  return (
    <Link href={router.pathname} locale={changeTo}>
      {router.locale === "en" ? (
        <Image
          src={"/images/israelFlag.png"}
          alt={"logo"}
          width={35}
          height={20}
          className="h-[22px] rounded-[3px]"
        />
      ) : (
        <Image
          src={"/images/usFlag.png"}
          alt={"logo"}
          width={35}
          height={20}
          className="h-[22px] rounded-[3px]"
        />
      )}
    </Link>
  );
};

export default LanguageSelector;
