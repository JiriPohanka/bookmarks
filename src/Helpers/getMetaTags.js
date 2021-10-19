async function getMetaTags(uri) {

    let data;

    try {
        // using facebook api to scrape the metatags
        const response = await fetch(`https://graph.facebook.com/?id=${uri}&scrape=true&access_token=867159623930199|bOLYr4yxgiiB1i5i5xB9RReBs10`, {
            method: 'POST',
            mode: 'cors',
        })
        data = await response.json()
        return data
    } catch (er) {
        console.warn(er)
    }
}

export default getMetaTags
