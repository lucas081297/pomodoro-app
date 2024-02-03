import React from "react";

interface Props {
    onClick?: ()=> void
    text: string
    ClassName?: string
}

export function Button (props:Props): JSX.Element{
    return (
        <button onClick={props.onClick} className={props.ClassName}>{props.text}</button>
    )
}