import React from "react";
import { NumericFormat } from "react-number-format";

interface Props {
    label: string;
    value: string;
    onChange?: React.ChangeEventHandler<HTMLInputElement> | undefined;
    onBlur?: React.FocusEventHandler<HTMLInputElement> | undefined;
    errorMessage?: string | undefined;
    isError?: boolean;
    placeholder?: string;
    type?: string;
    className?: string;
    id: string;
    min?: string | number | undefined;
    max?: string | number | undefined;
    maxLength?: number | undefined;
}

const InputField: React.FC<Props> = ({
    label,
    value,
    onChange,
    onBlur,
    errorMessage,
    placeholder,
    type,
    className,
    isError,
    id,
    min,
    max,
    maxLength,
}) => {
    return (
        <div className={`w-full ${className} `}>
            <label
                htmlFor={id}
                className='block text-gray-700 text-sm font-bold mb-2'
            >
                {label}
            </label>
            {type === "amount" ? (
                <NumericFormat
                    className={`'shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                        isError ? "border-red-700" : "border-gray-300"
                    }`}
                    value={value}
                    placeholder={placeholder}
                    onBlur={onBlur}
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    onValueChange={onChange}
                    prefix='₦'
                    thousandSeparator={true}
                    allowNegative={false}
                />
            ) : (
                <input
                    className={`'shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                        isError ? "border-red-700" : "border-gray-300"
                    }`}
                    type={type}
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                    onBlur={onBlur}
                    id={id}
                    min={min}
                    max={max}
                    maxLength={maxLength}
                />
            )}
            {errorMessage && (
                <p className='text-red-700 text-xs '>{errorMessage}</p>
            )}
        </div>
    );
};

export default InputField;
