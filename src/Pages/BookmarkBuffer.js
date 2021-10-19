import BookmarkItem from "../Components/BookmarkItem/BookmarkItem"
import BufferItemForm from "../Components/BufferItemForm"
import ItemWrap from "../Components/ItemWrap/ItemWrap"
import { useState } from "react"

const BookmarkBuffer = ({
    bookmarks,
    setBookmarks,
    bookmarkSuggestion,
    submitBookmark,
    showBookmarkSuggestionForm,
    deleteBookmark,
    editBookmark,
    updateBookmark
}) => {

    const [detailId, setDetailId] = useState()
    const bufferBookmarks = bookmarks.filter(bookmark => bookmark.itemType === "buffer")

    return (
        <div className="content-area">
            <div className="bookmarks buffer-grid" >
                {showBookmarkSuggestionForm &&
                    <ItemWrap
                        classes={["bookmar-form-wrap"]}
                        child={<BufferItemForm
                            submitBookmark={submitBookmark}
                            data={bookmarkSuggestion} />}>
                    </ItemWrap>}
                {bufferBookmarks.length > 0 && bufferBookmarks.map(el =>
                    <BookmarkItem
                        classes={["buffer-item-wrap"]}
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

export default BookmarkBuffer
