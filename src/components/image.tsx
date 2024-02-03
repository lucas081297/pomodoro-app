import React from "react";



interface Props{
    imageSource: string
    imageAlt: string
}

export function Image(props: Props): JSX.Element{
    return (
            <img src={props.imageSource} alt={props.imageAlt} />

    )
}