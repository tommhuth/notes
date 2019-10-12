import "./styles/toolbar.scss"

import React, { useState, useEffect } from "react"
import cn from "classnames"
import Container from "./Container"

export default function Toolbar({
    children,
    top,
    bottom = !top
}) {
    let [visible, setVisible] = useState(false)

    useEffect(() => {
        const listener = ({ clientY }) => {
            if (clientY < 100) {
                setVisible(true)
            } else if (visible) {
                setVisible(false)
            }
        }

        window.addEventListener("mousemove", listener)

        return () => window.removeEventListener("mousemove", listener)
    }, [visible])

    return (
        <div
            className={cn("toolbar", {
                "toolbar--top": top,
                "toolbar--top-visible": visible,
                "toolbar--bottom": bottom
            })}
        >
            <Container>
                {children}
            </Container>
        </div>
    )
}