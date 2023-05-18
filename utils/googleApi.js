// this takes in a title from user input, makes an api call to google
// then returns an object with author and imag_Url
// const googleApi = 
 async function getBookInfo(title){
    const apiKey = process.env.API_KEY
    const googleUrl = `https://www.googleapis.com/books/v1/volumes?q=${title}&key=${apiKey}`
    try {
        // Code that may throw an exception or error
        // For example:
        const response = await fetch(googleUrl)
        const author = response.author
        const image_url = response.imageLinks.thumbnail
        // "categories" can be extracted from the API call as well
        console.log(response);
        return { author, image_url }
      } catch (error) {
        // Code to handle the exception or error
        console.log("Oops! An error occurred: " + error.message);
      } finally {
        // Code that will always execute, regardless of whether an exception occurred or not
        console.log("This is the 'finally' block. It will always be executed.");
        return { author, image_url }
      }  
}

module.exports = {getBookInfo};