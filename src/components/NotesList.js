import "./styles/notes-list.scss"

import React from "react"
import arraySort from "array-sort"
import { Link } from "@reach/router"
import Container from "./Container"
import trim from "../data/helpers/trim"
import Time from "./Time"

export default function NotesList({
    notes = [],
    maxLength = 220
}) {
    let sorted = arraySort(notes, "updatedAt", { reverse: true })

    return (
        <>
            <Container> 
                <h1 className="notes-list-heading">Recent notes</h1>
            </Container>

            <ul className="notes-list">
                {sorted.map(({ id, updatedAt, intro }) => {
                    return (
                        <li key={id}>
                            <Link className="notes-list__item" to={"/write/" + id}>
                                <Container>
                                    <Time
                                        className="notes-list__item-date"
                                        dateTime={updatedAt}
                                    />
                                    <p className="notes-list__item-title">
                                        {trim(intro, maxLength)}
                                    </p>
                                </Container>
                            </Link>
                        </li>
                    )
                })}
            </ul>
        </>
    )
}