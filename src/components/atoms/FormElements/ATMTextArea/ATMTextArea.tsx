import React, {
  ChangeEvent,
  FocusEventHandler,
  useEffect,
  useRef,
  useState,
} from "react";
import { Variant } from "../ATMNumberField/ATMNumberField";
import ATMFieldLabel from "../../ATMFieldLabel/ATMFieldLabel";
import ATMFieldError from "../../ATMFieldError/ATMFieldError";

interface TextFieldProps {
  name?: string;
  label: string;
  value: string;
  onChange: (value: ChangeEvent<HTMLTextAreaElement>) => void;

  placeholder?: string;
  className?: string;
  fullWidth?: boolean;
  disabled?: boolean;
  onBlur?: (e: React.FocusEvent<HTMLTextAreaElement>) => void; // Updated type
  isFocused?: boolean;
  isValid?: boolean;
  isTouched?: boolean;
  errorMessage?: string;
  disableErrorMessage?: boolean;
  helperText?: string;
  variant?: Variant;
  rows?: number;
}

const ATMTextArea: React.FC<TextFieldProps> = ({
  name,
  label,
  value,
  onChange,

  placeholder,
  className,
  disabled,
  onBlur,
  isFocused = false,
  helperText = "",
  isValid = true,
  variant = "default",
  rows = 4,

  isTouched = true,
  errorMessage = "",
  disableErrorMessage = false,
}) => {
  const [focused, setFocused] = useState(false);

  const inputRef = useRef<HTMLTextAreaElement>(null);

  const isOutlined = variant === "outlined";

  useEffect(() => {
    setFocused(isFocused);
    isFocused && inputRef?.current?.focus();

    return () => {
      setFocused(false);
    };
  }, [isFocused]);

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>): void => {
    onChange(event);
  };

  const handleBlur: FocusEventHandler<HTMLTextAreaElement> = (e) => {
    setFocused(false);
    onBlur?.(e as React.FocusEvent<HTMLTextAreaElement>); // Cast to correct type
    inputRef?.current?.blur();
  };

  return (
    <div className="relative">
      <ATMFieldLabel htmlFor={name} hidden={isOutlined}>
        {label}
      </ATMFieldLabel>

      <div
        onClick={() => {
          inputRef?.current?.focus();
          !disabled && setFocused(true);
        }}
        className={`relative rounded flex flex-col bg-white ${isOutlined && "justify-end"
          } ${disabled && "opacity-60"} border  ${focused && !disabled ? "border-primary" : "border-neutral-80"
          }`}
      >
        {/* <label
          className={`absolute left-2 transition-all duration-200  ${focused || value
            ? "top-0 text-primary font-medium text-xs"
            : "top-1/2 transform -translate-y-1/2 text-xs text-gray-400 cursor-text"
            }  ${!isOutlined && "hidden"} `}
        >
          {label}
        </label> */}
        <textarea
          key={name} // Added stable key for DOM element stability
          id={name}
          placeholder={isOutlined ? (focused ? placeholder : "") : placeholder}
          value={value}
          onChange={handleChange}
          className={`rounded-md w-full bg-inherit focus:outline-none px-2 py-1 ${className} placeholder:text-xs text-xs ${!isOutlined && "h-full"
            } ${isTouched && !isValid && "text-error-70"}`}
          disabled={disabled}
          onFocus={() => setFocused(true)}
          onBlur={handleBlur}
          ref={inputRef}
          rows={rows}
        />
      </div>

      {/* {helperText && isValid && (
        <p className="absolute text-xs text-slate-500"> {helperText} </p>
      )} */}
      {/* <ErrorMessage name={name}>
        {(errorMessage) => <ATMFieldError> {errorMessage} </ATMFieldError>}
      </ErrorMessage> */}
    </div>
  );
};

// 👇 FIX: Wrap the component in React.memo to prevent unnecessary re-renders
export default React.memo(ATMTextArea);