import { v4 } from "uuid"

class BookmarkObj {

    constructor(title, description = "No description available", url = "#", itemType = "buffer") {
        this.title = title
        this.description = description
        this.url = url
        this.id = v4()
        this.isSubmited = true
        this.isEditOn = false
        this.itemType = itemType
        this.getBookmarkInfo = this.getBookmarkInfo.bind(this)
        this.moveToLibrary = this.moveToLibrary.bind(this)
        this.moveToBuffer = this.moveToBuffer.bind(this)
        this.moveToArchive = this.moveToArchive.bind(this)
    }

    getBookmarkInfo() {
        return `[${this.id}] ${this.title} ${this.description}`
    }

    moveToLibrary() {
        this.itemType = "library"
    }

    moveToBuffer() {
        this.itemType = "buffer"
    }

    moveToArchive() {
        this.itemType = "archive"
    }
}

export default BookmarkObj
