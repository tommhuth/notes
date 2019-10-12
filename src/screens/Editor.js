import "./styles/editor.scss"

import React, { useState, useRef, useEffect } from "react"
import { Editor as SlateEditor } from "slate-react"
import { Value } from "slate"
import { navigate } from "@reach/router"
import { useStore } from "../data/store"
import Plain from "slate-plain-serializer"
import Only from "../components/Only"
import Time from "../components/Time"
import Screen from "../components/Screen"
import Lists from "@convertkit/slate-lists"
import Toolbar from "../components/Toolbar"
import Container from "../components/Container"
import emptyDocument from "../data/helpers/emptyDocument"
import { renderBlock, renderMark } from "../data/helpers/renderers"
import isLegalParent from "../data/helpers/isLegalParent"
import Button from "../components/Button"

const plugins = [
    Lists({
        blocks: {
            ordered_list: "ordered-list",
            unordered_list: "unordered-list",
            list_item: "list-item",
        },
        classNames: {
            ordered_list: "ordered-list",
            unordered_list: "unordered-list",
            list_item: "list-item"
        }
    })
]

export default function Editor({
    documentId
}) {
    let notes = useStore(state => state.notes)
    let create = useStore(state => state.create)
    let remove = useStore(state => state.remove)
    let update = useStore(state => state.update)
    let updatedAt = useStore(state => state.notes.find(i => i.id === documentId) && state.notes.find(i => i.id === documentId).updatedAt)
    let [value, setValue] = useState(() => Value.fromJSON(emptyDocument))
    let ref = useRef()
    let editor = ref.current

    useEffect(() => {
        let note = notes.find(i => i.id === documentId)

        if (note) {
            setValue(Value.fromJS(note.document))
        } else {
            navigate("/")
        }
    }, [])

    return (
        <> 
            <Toolbar top>
                <Only if={notes.length}>
                    <Button to="/archive">Back</Button>
                </Only>
                <Button
                    onClick={() => {
                        let text = Plain.serialize(value).trim()
                        let firstNewline = text.indexOf("\n")
                        let intro = text.substring(0, firstNewline >= 0 ? firstNewline : text.length)

                        if (documentId) {
                            update(documentId, value.toJSON(), intro)
                        } else if (intro) {
                            let id = create(value.toJSON(), intro)

                            navigate("/write/" + id)
                        }
                    }}
                >
                    {documentId ? "Save" : "Save"}
                </Button>
                <Only if={updatedAt}>
                    <Time dateTime={updatedAt}>
                        Last saved
                    </Time>
                    <Button
                        onClick={() => {
                            if (notes.length > 1) { 
                                navigate("/archive")
                            } else {
                                setValue(Value.fromJSON(emptyDocument))
                                navigate("/")
                            }

                            remove(documentId)
                        }}
                    >
                        Delete
                    </Button>
                </Only>
            </Toolbar>

            <Screen>
                <Container>
                    <SlateEditor
                        autoFocus
                        autoCorrect
                        className="editor"
                        ref={ref}
                        value={value}
                        onPaste={(e, editor) => {
                            e.preventDefault()
                            editor.insertText(e.clipboardData.getData("text/plain"))
                        }}
                        plugins={plugins}
                        onChange={(e) => {
                            setValue(e.value)
                        }}
                        renderBlock={renderBlock}
                        renderMark={renderMark}
                    />
                </Container>
            </Screen>

            <Toolbar bottom>
                <Button
                    onClick={() => {
                        if (isLegalParent(editor)) {
                            editor.setBlocks("paragraph")
                        }
                    }}
                >
                    P
                </Button>
                <Button
                    onClick={() => {
                        if (isLegalParent(editor)) {
                            editor.setBlocks("heading-1")
                        }
                    }}
                >
                    H1
                </Button>
                <Button
                    onClick={() => {
                        if (isLegalParent(editor)) {
                            editor.setBlocks("heading-2")
                        }
                    }}
                >
                    H2
                </Button>
                <Button
                    onClick={() => {
                        if (isLegalParent(editor)) {
                            editor.setBlocks("heading-3")
                        }
                    }}
                >
                    H3
                </Button>
                <Button
                    onClick={() => {
                        if (isLegalParent(editor)) {
                            editor.setBlocks("heading-4")
                        }
                    }}
                >
                    H4
                </Button>
                <Button
                    onClick={() => {
                        editor.toggleList()
                    }}
                >
                    UL
                </Button>
                <Button
                    onClick={() => {
                        editor.toggleList({ type: "ordered-list" })
                    }}
                >
                    OL
                </Button>
                <Button onClick={() => {
                    editor.toggleMark("strong")
                }}
                >
                    Bold
                </Button>
                <Button onClick={() => {
                    editor.toggleMark("em")
                }}
                >
                    Italic
                </Button>
            </Toolbar>
        </>
    )
}