import { useDataContext } from "../Context/DataProvider"
import { NoteCard } from "./NoteCard";

export const Others = () => {
    const {state:{others}} = useDataContext();
    return(
        <>
        <h2>Other Notes</h2>
        {others.map(note =>(
            <NoteCard key={note._id} note={note}/>
        ))}
        </>
    )
}