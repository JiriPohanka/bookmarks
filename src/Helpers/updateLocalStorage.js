function updateLocalStorage(item, keyString) {
    window.localStorage.setItem(keyString, JSON.stringify(item))
}
//TODO: add actual database instead of just local storage

export default updateLocalStorage