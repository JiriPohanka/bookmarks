import { IconButton, Tooltip, Zoom } from "@mui/material"
import ArchiveIcon from '@mui/icons-material/Archive'
import EditIcon from '@mui/icons-material/Edit'
import LibraryAddCheckIcon from '@mui/icons-material/LibraryAddCheck'
import DeleteIcon from '@mui/icons-material/Delete';
import OpenInFullOutlinedIcon from '@mui/icons-material/OpenInFullOutlined'
import FilterListIcon from '@mui/icons-material/FilterList';
import "./ControlButtons.css"

const ControlButtons = ({
    data,
    handleEdit,
    moveToLibrary,
    moveToArchive,
    moveToBuffer,
    deleteBookmark,
    detailId,
    setDetailId,
}) => {

    const editBookmark = () => {
        handleEdit(data.id)
    }

    const handleDelete = () => {
        deleteBookmark(data.id)
    }

    const setDetailView = (id) => {
        setDetailId(data.id)
    }
    
    const resetView = (e) => {
        e.preventDefault()
        setDetailId("")
    }

    return (
        <div className="control-buttons">
            <Tooltip TransitionComponent={Zoom} title="Edit Bookmark">
                <IconButton onClick={editBookmark} size="small">
                    <EditIcon fontSize="small" />
                </IconButton>
            </Tooltip>
            {data.itemType === "library" || <Tooltip TransitionComponent={Zoom} title="Move to Library">
                <IconButton onClick={moveToLibrary} size="small">
                    <LibraryAddCheckIcon fontSize="small" />
                </IconButton>
            </Tooltip>}
            {data.itemType === "archive" || <Tooltip TransitionComponent={Zoom} title="Move to Archive">
                <IconButton onClick={moveToArchive} size="small" >
                    <ArchiveIcon fontSize="small" />
                </IconButton>
            </Tooltip>}
            {data.itemType === "buffer" || <Tooltip TransitionComponent={Zoom} title="Move to Buffer">
                <IconButton onClick={moveToBuffer} size="small" >
                    <FilterListIcon fontSize="small" />
                </IconButton>
            </Tooltip>}
            <Tooltip TransitionComponent={Zoom} title="Delete Bookmark">
                <IconButton onClick={handleDelete} size="small">
                    <DeleteIcon fontSize="small" />
                </IconButton>
            </Tooltip>
            {data.id === detailId ?
                <Tooltip TransitionComponent={Zoom} title="Collapse Bookmark">
                    <IconButton onClick={resetView} size="small">
                        <OpenInFullOutlinedIcon fontSize="small" />
                    </IconButton>
                </Tooltip> :
                <Tooltip TransitionComponent={Zoom} title="Expand Bookmark">
                    <IconButton onClick={setDetailView} size="small">
                        <OpenInFullOutlinedIcon fontSize="small" />
                    </IconButton>
                </Tooltip>}
        </div>
    )
}

export default ControlButtons
