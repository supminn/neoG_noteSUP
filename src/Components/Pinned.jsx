import { useDataContext } from "../Context/DataProvider"
import { NoteCard } from "./NoteCard";

export const Pinned = () => {
    const {state:{pinned}} = useDataContext();
    return(
        <>
        <h2>Pinned Notes</h2>
        {pinned.map(note =>(
            <NoteCard key={note._id} note={note}/>
        ))}
        </>
    )
}