import { useDataContext } from "../Context/DataProvider"
import { getFilteredData } from "./LabelContainer";
import { NoteCard } from "./NoteCard";

export const Pinned = () => {
    const {state:{pinned, filter}} = useDataContext();
    const filteredData = getFilteredData(pinned, filter);
    return(
        <>
        <h2>Pinned Notes</h2>
        {filteredData.map(note =>(
            <NoteCard key={note._id} note={note}/>
        ))}
        </>
    )
}