import BookmarkItem from "../Components/BookmarkItem/BookmarkItem"
import { useState } from "react"


const Library = ({
    bookmarks,
    setBookmarks,
    deleteBookmark,
    editBookmark,
    updateBookmark,
}) => {

    const libraryBookmarks = bookmarks.filter(bookmark => bookmark.itemType === "library")
    const [detailId, setDetailId] = useState()

    return (
        <div className="content-area">
            <div className="bookmarks library-grid" >
                {libraryBookmarks.length > 0 && libraryBookmarks.map(el =>
                    <BookmarkItem
                        classes={["library-item-wrap"]}
                        key={el.id}
                        data={el}
                        editBookmark={editBookmark}
                        updateBookmark={updateBookmark}
                        bookmarks={bookmarks}
                        setBookmarks={setBookmarks}
                        deleteBookmark={deleteBookmark}
                        detailId={detailId}
                        setDetailId={setDetailId} />
                )}
            </div>
        </div>
    )
}

export default Library
