import BookmarkItem from "../Components/BookmarkItem/BookmarkItem"
import { useState } from "react"

const Archive = ({
    bookmarks,
    setBookmarks,
    deleteBookmark,
    editBookmark,
    updateBookmark
}) => {

    const [detailId, setDetailId] = useState()
    const archiveBookmarks = bookmarks.filter(bookmark => bookmark.itemType === "archive")

    return (
        <div className="content-area">
            <div className="bookmarks library-grid" >
                {archiveBookmarks.length > 0 && archiveBookmarks.map(el =>
                    <BookmarkItem
                        classes={["archive-item-wrap"]}
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

export default Archive
