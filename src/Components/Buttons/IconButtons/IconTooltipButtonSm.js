import Tooltip from "@mui/material/Tooltip"
import IconButton from "@mui/material/IconButton"
import Zoom from "@mui/material/Zoom"
import EditIcon from '@mui/icons-material/Edit'

const IconTooltipButtonSm = ({tooltip, onClick}) => {
    return (
        <Tooltip TransitionComponent={Zoom} title={tooltip}>
            <IconButton onClick={onClick} size="small">
                <EditIcon fontSize="small" />
            </IconButton>
        </Tooltip>
    )
}

export default IconTooltipButtonSm
