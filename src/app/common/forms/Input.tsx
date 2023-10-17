import React from "react";

interface InputProps {
    label: string,
    value: string,
    onChange: (value: string) => void,
    error: string | null
}
export default function Input({ label, value, onChange, error }: InputProps) {
    return <div className="form-control w-full">
        <label className="label">
            <span className="label-text">{label}</span>
        </label>
        <input type="text"
               value={value}
               onChange={(e) => onChange(e.target.value)}
               placeholder="Type here"
               className={`input input-bordered w-full ${error && "border-red-500"}`} />
        {error && <label className="label">
            <span className="label-text-alt text-red-500">{error}</span>
        </label>}
    </div>
}
