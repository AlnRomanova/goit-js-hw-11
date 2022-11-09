export class PixabayApi {
  #BASE_URL = 'https://pixabay.com/api/';


  page = 1;
  query = null;

 fetchPhotos() {
   return fetch(
    `${this.#BASE_URL}?key=31209256-0b3a6934894cd0b0ba6ec9540&q=${this.query}&image_type=photo&orientation=horizontal&safesearch=true`
    ).then(response => {
      if(!response.ok) {
        throw new Error(response.status)
      }
      return response.json()
    })
 }


}