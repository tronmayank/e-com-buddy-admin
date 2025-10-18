import React from 'react';

interface ATMRadioInputProps {
    name: string;
    value: string;
    label: string;
    subLabel?: string; // Optional prop
    checked: boolean;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const ATMRadio: React.FC<ATMRadioInputProps> = ({
    name,
    value,
    label,
    subLabel,
    checked,
    onChange,
}) => {
    return (
        <div>
            <label className="flex items-center space-x-2">
                <input
                    type="radio"
                    name={name}
                    value={value}
                    checked={checked}
                    className="form-radio bg-primary"
                    onChange={onChange}
                />
                <span className="text-sm font-medium">
                    {label}{" "}
                    {subLabel && (
                        <span className="text-gray-500 text-[12px] font-normal">({subLabel})</span>
                    )}
                </span>
            </label>
        </div>
    );
};

export default ATMRadio;
