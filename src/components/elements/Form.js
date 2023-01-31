import React from "react";

export default function Form({ children, className, onSubmit }) {
    return <form onSubmit={onSubmit} className={className}>{children}</form>
}