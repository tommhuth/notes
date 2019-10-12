import create from "zustand"
import ShortUniqueId from "short-unique-id"
import { LocalStorage } from "@huth/utils"

const uid = new ShortUniqueId()

const [useStore, api] = create((set, get) => {
    return {
        notes: [],

        // actions
        remove(id) {
            let notes = get().notes

            set({
                notes: [
                    ...notes.filter(i => i.id !== id)
                ]
            })
        },
        update(id, document, intro) {
            let notes = get().notes

            set({
                notes: [
                    ...notes.filter(i => i.id !== id),
                    {
                        ...notes.find(i => i.id === id),
                        document,
                        intro,
                        updatedAt: new Date().toISOString()
                    }
                ]
            })
        },
        create(document, intro) {
            let id = uid.randomUUID(8)
            let notes = get().notes

            set({
                notes: [
                    ...notes,
                    {
                        document,
                        id,
                        intro, 
                        updatedAt:  new Date().toISOString()
                    }
                ]
            })

            return id
        }
    }
})

api.subscribe(state => LocalStorage.set("notes", state.notes))
api.setState({ notes: LocalStorage.get("notes") || [] })



export { useStore, api }