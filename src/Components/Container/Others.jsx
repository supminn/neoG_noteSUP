import { useDataContext } from "../../Context"
import { getFilteredData, NoteCard } from "../";

export const Others = () => {
    const {state:{others, filter}} = useDataContext();
    const filteredData = getFilteredData(others, filter);
    return(
        <>
        <h3 className="txt-header-3">Other Notes</h3>
        <div className="card-container">
        {filteredData.map(note =>(
            <NoteCard key={note.id} note={note}/>
        ))}
        </div>
        {filteredData.length===0 && <em className="primaryBg-txt">No Unpinned Notes</em>}
        </>
    )
}