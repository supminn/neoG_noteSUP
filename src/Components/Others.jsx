import { useDataContext } from "../Context/DataProvider"
import { getFilteredData } from "./LabelContainer";
import { NoteCard } from "./NoteCard";

export const Others = () => {
    const {state:{others, filter}} = useDataContext();
    const filteredData = getFilteredData(others, filter);
    return(
        <>
        <h2>Other Notes</h2>
        {filteredData.map(note =>(
            <NoteCard key={note._id} note={note}/>
        ))}
        </>
    )
}