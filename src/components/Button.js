import "./styles/button.scss"

import { Link } from "@reach/router"
import React from "react"
import cn from "classnames"

export default function Button({
    children,
    type = "button",
    to,
    plain,
    className,
    ...restProps
}) {
    if (to) {
        return (
            <Link
                className={cn("button", className, { "button--plain": plain })}
                to={to}
            >
                {children}
            </Link>
        )
    }

    return (
        <button
            className={cn("button", className, { "button--plain": plain })}
            type={type}
            {...restProps}
        >
            {children}
        </button>
    )
}