// this takes in a title from user input, makes an api call to google
// then returns an object with author and imag_Url
export default async function getBookInfo(title){
    const apiKey = process.env.API_KEY
    const googleUrl = `https://www.googleapis.com/books/v1/volumes?q=${title}&key=${apiKey}`
    const response = await fetch(googleUrl)
    const author = response.author
    const image_url = response.imageLinks.thumbnail
    // "categories" can be extracted from the API call as well

    return { author, image_url }
}

