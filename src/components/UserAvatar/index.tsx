import { Avatar } from "@mui/material";
import Image from "next/image";
import { User } from "../icons/User";

interface UserAvatarProps {
  width?: number;
  height?: number;
  iconWidth?: number;
  iconHeight?: number;
  className?:string;
  src?:string;
}

const UserAvatar: React.FC<UserAvatarProps> = ({
  width = 32,
  height = 32,
  className,
  src
}) => {
  return (
    <Avatar sx={{ width, height }} className={`bg-[transparent] ${className}`}>
      {!!src ? (
        <Image
          src={"/images/logo.png"}
          alt={"user"}
          width={width}
          height={height}
        />
      ) : (
        <User width={width} height={height} />
      )}
    </Avatar>
  );
};

export default UserAvatar;
