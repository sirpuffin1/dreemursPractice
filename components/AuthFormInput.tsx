import { ChangeEvent } from "react";

export interface AuthFormInputProps {
  type: string;
  placeholder: string;
  value: string;
  labelText: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  name?: string
  minLength: number
  maxLength: number
  required: boolean
}

const AuthFormInput = ({
  type,
  placeholder,
  value,
  labelText,
  onChange,
  name,
  minLength,
  maxLength,
  required
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
        className="input input-bordered w-full max-w-xs text-black bg-white"
        required={required}
        minLength={minLength}
        maxLength={maxLength}
      />
    </>
  );
};

export default AuthFormInput;
