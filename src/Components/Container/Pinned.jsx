import { useDataContext } from "../../Context"
import { getFilteredData, NoteCard } from "../";

export const Pinned = () => {
    const {state:{pinned, filter}} = useDataContext();
    const filteredData = getFilteredData(pinned, filter);
    return(
        <>
        <h3 className="txt-header-3">Pinned Notes</h3>
        <div className="card-container">
        {filteredData.map(note =>(
            <NoteCard key={note.id} note={note}/>
        ))}
        </div>
        {filteredData.length===0 && <em className="primaryBg-txt">No Pinned Notes</em>}
        </>
    )
}