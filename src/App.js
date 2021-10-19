import Header from './Components/Header/Header'
import BookmarkBuffer from './Pages/BookmarkBuffer'
import Library from './Pages/Library'
import Archive from './Pages/Archive'
import DropOverlay from './Components/DropOverlay/DropOverlay';
import updateLocalStorage from './Helpers/updateLocalStorage'
import BookmarkObj from "./Helpers/createBookmark"
import { v4 } from 'uuid'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import { useState } from 'react'

const App = () => {

    const [showDropOverlay, setShowDropOverlay] = useState(false)
    const [autoSubmit, setAutoSubmit] = useState(false)
    const [showBookmarkSuggestionForm, setShowBookmarkSuggestionForm] = useState(false)
    const [bookmarkSuggestion, setBookmarkSuggestion] = useState(JSON.parse(window.localStorage.getItem('bookmarkSuggestion')) ??
    {
        title: "",
        description: "",
        url: "",
        id: "bookmarkSuggestion",
        isSubmited: false,
        isEditOn: true,
    })

    const startingBookmarks = [{
        title: "Example Bookmark",
        description: "most of these are automatically generated",
        url: "#",
        id: v4(),
        isSubmited: true,
    }]


    const [bookmarks, setBookmarks] = useState(JSON.parse(window.localStorage.getItem('bookmarks'))
        ?.map(bookmark => new BookmarkObj(bookmark.title, bookmark.description, bookmark.url, bookmark.itemType)) ?? startingBookmarks)

    function handleDragOver(e) {
        e.preventDefault()
        setShowDropOverlay(true)
    }

    function submitBookmark(title, description, url) {
        const newBookmark = new BookmarkObj(title, description, url)

        const newBookmarks = [newBookmark, ...bookmarks]
        setBookmarks(newBookmarks)
        updateLocalStorage(newBookmarks, 'bookmarks')
        setBookmarkSuggestion({ title: "", description: "", url: "", id: "bookmarkSuggestion", isEditOn: true, isSubmited: false })
        updateLocalStorage({ title: "", description: "", url: "", id: "bookmarkSuggestion", isEditOn: true, isSubmited: false }, 'bookmarkSuggestion')
        setShowBookmarkSuggestionForm(false)
    }

    function editBookmark(id) {
        const newBookmarks = bookmarks.map(bookmark => {
            if (bookmark.id === id) {
                bookmark.isEditOn = true
                return bookmark
            }
            return bookmark
        })

        setBookmarks(newBookmarks)
        updateLocalStorage(newBookmarks, 'bookmarks')
    }

    function updateBookmark(e, id) { //TODO: rework from e.target.elements into useRef()
        e.preventDefault()
        const newBookmarks = bookmarks.map(bookmark => {

            if (bookmark.id === id) {
                for (let el of e.target.elements) {
                    bookmark[el.dataset.inputType] = el.value
                }
                bookmark.isEditOn = false
            }
            return bookmark
        })
        setBookmarks(newBookmarks)
        updateLocalStorage(newBookmarks, 'bookmarks')
    }

    function deleteBookmark(bookmarkId) {
        const i = bookmarks.map(bookmark => bookmark.id === bookmarkId).indexOf(true)
        const newBookmarks = bookmarks.map(bookmark => bookmark)
        newBookmarks.splice(i, 1)
        setBookmarks(newBookmarks)
        updateLocalStorage(newBookmarks, 'bookmarks')
    }

    return (
        <BrowserRouter>
            {showDropOverlay ? <DropOverlay
                setShowDropOverlay={setShowDropOverlay}
                setBookmarkSuggestion={setBookmarkSuggestion}
                bookmarks={bookmarks}
                setBookmarks={setBookmarks}
                autoSubmit={autoSubmit}
                setShowBookmarkSuggestionForm={setShowBookmarkSuggestionForm} /> : null}

            <div className="drag-overlay" onDragOver={handleDragOver}>
                <Header setAutoSubmit={setAutoSubmit} autoSubmit={autoSubmit} />
                <Switch>
                    <Route path='/' exact>
                        <Redirect to='/buffer' />
                    </Route>
                        <Route path='/buffer'>
                            <BookmarkBuffer
                                bookmarks={bookmarks}
                                setBookmarks={setBookmarks}
                                bookmarkSuggestion={bookmarkSuggestion}
                                setBookmarkSuggestion={setBookmarkSuggestion}
                                submitBookmark={submitBookmark}
                                editBookmark={editBookmark}
                                deleteBookmark={deleteBookmark}
                                updateBookmark={updateBookmark}
                                showBookmarkSuggestionForm={showBookmarkSuggestionForm} />
                        </Route>
                        <Route path='/library'>
                            <Library
                                bookmarks={bookmarks}
                                setBookmarks={setBookmarks}
                                submitBookmark={submitBookmark}
                                editBookmark={editBookmark}
                                deleteBookmark={deleteBookmark}
                                updateBookmark={updateBookmark} />
                        </Route>
                        <Route path='/archive'>
                            <Archive
                                bookmarks={bookmarks}
                                setBookmarks={setBookmarks}
                                submitBookmark={submitBookmark}
                                editBookmark={editBookmark}
                                deleteBookmark={deleteBookmark}
                                updateBookmark={updateBookmark} />
                        </Route>
                </Switch>
            </div>
        </BrowserRouter>

    )
}

export default App
