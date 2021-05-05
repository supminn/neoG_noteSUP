import { NewNote, Pinned, Others } from "../"

export const NotesContainer = () => {
    return(
        <div className="notes-container">
        <NewNote />
        <Pinned />
        <Others />
        </div>
    )
}