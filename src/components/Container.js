import "./styles/container.scss"

import React from "react"
import cn from "classnames"

export default function Container({
    children 
}) {
    return (
        <div
            className={cn("container")}
        >
            {children}
        </div>
    )
}