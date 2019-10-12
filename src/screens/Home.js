import React, { useEffect } from "react"
import { useStore } from "../data/store"
import Toolbar from "../components/Toolbar" 
import Screen from "../components/Screen"
import NotesList from "../components/NotesList"
import Button from "../components/Button" 

export default function Home() {
    let notes = useStore(state => state.notes)

    useEffect(() => {
        document.body.style.backgroundColor = "var(--purple)"

        return () => document.body.style.backgroundColor = null
    }, [])

    return (
        <>
            <Toolbar bottom> 
                <Button to="/">Write</Button>
            </Toolbar>

            <Screen> 
                <NotesList notes={notes} />
            </Screen>
        </>
    )
}