import { HTMLInputTypeAttribute } from "react";
import { InputAdornment, TextField, useMediaQuery } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Error } from "../icons/Error";
import { useTranslation } from "react-i18next";

interface InputProps {
  id?:string;
  value?: string;
  name?: string;
  type?: HTMLInputTypeAttribute;
  placeholder?: string;
  label?: string;
  className?: string;
  error?: boolean;
  fontSize?: number;
  inputProps?: any;
  large?: boolean;
  onChange?: (e: any) => void;
  blockClassName?:string;
  readonly?:boolean;
}

const Input: React.FC<InputProps> = ({
  id,
  value,
  name,
  onChange,
  className,
  type,
  label,
  placeholder = "",
  error,
  large = false,
  blockClassName,
  readonly,
  ...rest
}) => {
  const { t } = useTranslation("common");
  if (large) {
    return (
      <div className={blockClassName}>
        {label && (
          <div className="text-[18px] font-[400] text-[#2A3366] mb-[8px]">
            {label}
          </div>
        )}
        <input
          id={id}
          name={name}
          onChange={onChange}
          value={value}
          type={type}
          placeholder={placeholder}
          className={`w-full rounded-[23px] bg-white p-[12px] outline-0 text-[18px] placeholder-[#2A3366]`}
          readOnly={readonly}
        />
      </div>
    );
  }
  return (
    <div className={blockClassName}>
      {label && (
        <div className="text-[16px] font-[400] text-[#2A3366] mb-[8px]">
          {label}
        </div>
      )}
      <input
        id={id}
        name={name}
        onChange={onChange}
        value={value}
        type={type}
        placeholder={placeholder}
        className={`w-full rounded-[20px] bg-white p-[11px] outline-0 text-[16px] placeholder-[#2A3366]`}
        readOnly={readonly}
      />
    </div>
  );
};

export default Input;
