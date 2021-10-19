import updateLocalStorage from "../../Helpers/updateLocalStorage"
import ControlButtons from "./ControlButtons"
import ItemWrap from "../ItemWrap/ItemWrap"

const BookmarkItem = ({
    setBookmarks,
    bookmarks,
    editBookmark,
    updateBookmark,
    data,
    deleteBookmark,
    detailId,
    setDetailId
}) => {

    function handleEdit() {
        editBookmark(data.id)
    }

    function handleUpdate(e) {
        e.preventDefault()
        updateBookmark(e, data.id)
    }

    function moveToArchive() {
        data.moveToArchive()
        const newBookmarks = bookmarks.map(bookmark => bookmark)
        setBookmarks(newBookmarks)
        updateLocalStorage(newBookmarks, 'bookmarks')
    }

    function moveToLibrary() {
        data.moveToLibrary()
        const newBookmarks = bookmarks.map(bookmark => bookmark)
        setBookmarks(newBookmarks)
        updateLocalStorage(newBookmarks, 'bookmarks')
    }

    function moveToBuffer() {
        data.moveToBuffer()
        const newBookmarks = bookmarks.map(bookmark => bookmark)
        setBookmarks(newBookmarks)
        updateLocalStorage(newBookmarks, 'bookmarks')
    }

    if (data.isEditOn && data.isSubmited) {
        return (
            <form onSubmit={handleUpdate}>
                <input data-input-type="title" defaultValue={data.title} type="text" />
                <input data-input-type="description" defaultValue={data.description} type="text" />
                <input data-input-type="url" defaultValue={data.url} type="url" />
                <input data-input-type="submit" value="save" type="submit" />
            </form>
        )
    }

    if (detailId === data.id) {
        return (
            <ItemWrap classes="padding-05rem hover-box item-wrap grid-col-span-2 grid-row-span-2" child={
                <div className={`bookmark bookmark-${data.id}`} id={`${data.id}`}>
                    <ControlButtons data={data}
                        setDetailId={setDetailId}
                        detailId={detailId}
                        handleEdit={handleEdit}
                        deleteBookmark={deleteBookmark}
                        moveToLibrary={moveToLibrary}
                        moveToArchive={moveToArchive}
                        moveToBuffer={moveToBuffer} />
                    <div className="item-info">
                        <a href={data.url} target="_blank" rel="noreferrer">
                            {data.title ?
                                <p className="word-break-keep-all">{data.title}</p>
                                : <p className="word-break-break-all">{data.url}</p>}
                        </a>
                        <p className="bookmark-description">{data.description}</p>
                    </div>
                </div>
            } />
        )
    }

    return (
        <ItemWrap classes="padding-05rem hover-box item-wrap" child={
            <div className={`bookmark bookmark-${data.id}`} id={`${data.id}`}>
                <ControlButtons data={data}
                    setDetailId={setDetailId}
                    detailId={detailId}
                    handleEdit={handleEdit}
                    deleteBookmark={deleteBookmark}
                    moveToLibrary={moveToLibrary}
                    moveToArchive={moveToArchive}
                    moveToBuffer={moveToBuffer} />
                <div className="item-info">
                    <a href={data.url} target="_blank" rel="noreferrer">
                        {data.title ?
                            <p className="word-break-keep-all">{data.title}</p>
                            : <p className="word-break-break-all">{data.url}</p>}
                    </a>
                    <p className="bookmark-description">{data.description}</p>
                </div>
            </div>
        } />
    )

}

export default BookmarkItem
