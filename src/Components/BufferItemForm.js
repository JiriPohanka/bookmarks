import { TextField } from "@mui/material"
import { useEffect, useState } from "react"
import { Button } from "@mui/material"
import { Typography } from "@mui/material"


const BufferItemForm = (props) => {

    function handleSubmit(e) {
        e.preventDefault()
        props.submitBookmark(title, desc, url)
    }

    const [title, setTitle] = useState(props.data.title)
    const [desc, setDesc] = useState(props.data.description)
    const [url, setUrl] = useState(props.data.url)

    useEffect(
        () => {
            setTitle(props.data.title)
            setDesc(props.data.description)
            setUrl(props.data.url)
        }
        , [props])

    return (
        <>
            <form onSubmit={handleSubmit} className="new-bookmark-form">
                {/* <Typography variant="subtitle2"> */}
                <TextField
                    type="text"
                    data-input-type="title"
                    onChange={(e) => setTitle(e.target.value)}
                    value={title}
                    label="title"
                    variant="standard"
                    size="small" />
                {/* </Typography> */}
                {/* <Typography variant="body2"> */}
                <TextField type="text"
                    data-input-type="description"
                    onChange={(e) => setDesc(e.target.value)}
                    value={desc}
                    label="description"
                    variant="standard"
                    size="small"
                    multiline />
                {/* </Typography> */}
                <TextField type="url"
                    data-input-type="url"
                    onChange={(e) => setUrl(e.target.value)}
                    value={url}
                    label="url"
                    variant="standard"
                    size="small"
                    required />
                <Button data-input-type="submit" value="save" type="submit">Add to Buffer</Button>
            </form>
        </>
    )
}

export default BufferItemForm
