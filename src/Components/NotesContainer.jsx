import { NewNote } from "./NewNote"
import { Others } from "./Others"
import { Pinned } from "./Pinned"

export const NotesContainer = () => {
    return(
        <>
        <h2>Notes Container</h2>
        <NewNote />
        <Pinned />
        <Others />
        </>
    )
}