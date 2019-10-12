import "./styles/time.scss"

import React from "react"
import cn from "classnames"
import formatRelative from "date-fns/formatRelative"

export default function Time({ children, dateTime, className}) {
    return (
        <time
            dateTime={dateTime}
            className={cn("time", className)}
        >
            {children}{" "}
            {formatRelative(typeof dateTime === "string" ? new Date(dateTime) : dateTime, new Date())}
        </time>
    )
}