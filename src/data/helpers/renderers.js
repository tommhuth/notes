import React from "react"

export function renderMark({ mark, attributes, children }, editor, next) {
    switch (mark.type) {
        case "strong":
            return <strong {...attributes} >{children}</strong>
        case "code":
            return <code {...attributes} >{children}</code>
        case "em":
            return <em {...attributes} >{children}</em>
        default:
            return next()
    }
}

export function renderBlock({ attributes, children, node }, editor, next) {
    switch (node.type) {
        case "li":
            return <div {...attributes} className="li">{children}</div>
        case "heading-1":
            return <h1 {...attributes}>{children}</h1>
        case "heading-2":
            return <h2 {...attributes}>{children}</h2>
        case "heading-3":
            return <h3 {...attributes}>{children}</h3>
        case "heading-4":
            return <h4 {...attributes}>{children}</h4>
        case "heading-5":
            return <h5 {...attributes}>{children}</h5>
        case "paragraph":
            return <p {...attributes}>{children}</p>
        case "code":
            return <pre {...attributes}>{children}</pre>
        default:
            return next()
    }
}