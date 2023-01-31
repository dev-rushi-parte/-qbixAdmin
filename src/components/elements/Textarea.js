import React from "react";

export default function Textarea({ type, placeholder, className, ...rest }) {
    return <textarea type={type || "text"} placeholder={placeholder} className={className} {...rest} />
}