import { useState, useRef } from "react"
import BookmarkObj from "../../Helpers/createBookmark"
import getMetaTags from "../../Helpers/getMetaTags"
import updateLocalStorage from "../../Helpers/updateLocalStorage"
import "./DropOverlay.css"
import { Block } from "@mui/icons-material"
import Icon from '@mui/material/Icon'

const DropOverlay = (props) => {

    const setShowDropOverlay = props.setShowDropOverlay
    const setBookmarkSuggestion = props.setBookmarkSuggestion
    const bookmarks = props.bookmarks
    const setBookmarks = props.setBookmarks
    const setShowBookmarkSuggestionForm = props.setShowBookmarkSuggestionForm

    const [showSpinner, setShowSpinner] = useState(false)
    const [showCancelHover, setShowCancelHover] = useState(false)
    const [showCancelArea, setShowCancelArea] = useState(true)
    const [dragTarget, setDragTarget] = useState()  
    const cancelDiv = useRef()
    
    // setBookmarkSuggestion(data)
    // updateLocalStorage(data, 'bookmarkSuggestion')

    async function handleDrop(e, boolean) {
        e.preventDefault()
        setShowSpinner(true)
        if (boolean === false) {
            setShowDropOverlay(false)
            return
        }
        // setShowCancelArea(false)
        const uri = e.dataTransfer.getData("text/uri-list")
        const data = await getMetaTags(uri)
        data.url = data.url || uri 

        setShowSpinner(false)
        setShowDropOverlay(false)

        if (props.autoSubmit) {
            const newBookmark = new BookmarkObj(data.title, data.description, data.url, "buffer")
            const newBookmarks = [newBookmark, ...bookmarks]
            setBookmarks(newBookmarks)
            updateLocalStorage(newBookmarks, 'bookmarks')
        }

        if (!props.autoSubmit) {
            setBookmarkSuggestion(data)
            setShowBookmarkSuggestionForm(true)
            updateLocalStorage('bookmarkSuggestion', data)
        }
    }

    function addHover(e) {
        e.preventDefault()
        // dragEnter event on the child fires before dragLeave on parent
        // and saves value of event target as a state
        // dragLeave event later checks if the dragTarget equals the cancelArea
        // if so, then drop overlay stays on
        setDragTarget (e.target)
        setShowCancelHover(true)
    }

    function removeHover(e) {
        e.preventDefault()
        setDragTarget("empty")
        setShowCancelHover(false)
    }

    function cancelDrop(e) {
        e.stopPropagation()
        e.preventDefault()
        setShowDropOverlay(false)
    }

    function hideDropOverlay(e) {
        e.preventDefault()
        // as mentioned above, if dragTarget was set by addHover function
        // which handles dragEnter on child element, then dropOverlay stays
        if (dragTarget !== cancelDiv.current ) {
            setShowDropOverlay(false)
        }
    }

    function handleDragOver(e) {
        e.preventDefault()
    }

    let cancelAreaClasses
    showCancelHover ? cancelAreaClasses = "cancel-area cancel-area-active" : cancelAreaClasses = "cancel-area"

    return (
        <div className="drop-overlay-wrap" onDrop={handleDrop} onDragOver={handleDragOver} onDragLeave={hideDropOverlay}>
                {showSpinner ? 
                <><div className="loader" /><p>adding to buffer</p> </> : null }
                

                {showCancelArea && 
                <div className={cancelAreaClasses}>
                    <div ref={cancelDiv} className="block-icon-overlay" onDrop={cancelDrop} onDragEnter={addHover} onDragLeave={removeHover}/>
                    <Icon fontSize="inherit" baseClassName="block-icon">
                        <Block fontSize="inherit" />
                    </Icon>
                </div>}
        </div>

    )
}

export default DropOverlay
