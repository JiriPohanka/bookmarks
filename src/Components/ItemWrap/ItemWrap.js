import Paper from '@mui/material/Paper'
import "./ItemWrap.css"

const ItemWrap = ({child, classes}) => {

    return (
        <Paper className={classes} elevation={0} variant="outlined">
                {child}
        </Paper>
    )
}

export default ItemWrap
