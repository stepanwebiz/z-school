import { useRouter } from "next/router";
import { TFunction } from "i18next";
import Header from "../Header";
import SideBar from "../SideBar";

interface LayoutProps {
  children: JSX.Element;
  t: TFunction;
}

const Layout: React.FC<LayoutProps> = ({ children, t }) => {
  const router = useRouter();
  const notSignedIn =
    router.pathname !== "/" && router.pathname !== "/reset-password";
  return (
    <div className="w-full h-full flex flex-col">
      {notSignedIn && <Header />}
      <main className="w-full h-full flex overflowY-auto overflow-x-hidden lg:flex-col">
        {notSignedIn && <SideBar t={t} />}
        <div className="w-full h-full">{children}</div>
      </main>
    </div>
  );
};

export default Layout;
