import { ChangeEvent } from "react";

export interface AuthFormInputProps {
  type: string;
  placeholder: string;
  value: string;
  labelText: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  name?: string
}

const AuthFormInput = ({
  type,
  placeholder,
  value,
  labelText,
  onChange,
  name
}: AuthFormInputProps) => {
  return (
    <>
      <label className="label">
        <span className="label-text text-white">{labelText}</span>
      </label>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        name={name}
        className="input input-bordered w-full max-w-xs text-black"
      />
    </>
  );
};

export default AuthFormInput;
