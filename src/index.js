import './sass/index.scss';
import Notiflix from 'notiflix';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import { PixabayApi, PixabayApi } from "./pixabay-api";


const formEl = document.querySelector('.search-form');
const galleryListEl = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');

const pixabayApi = new PixabayApi();

const onSearchSubmitForm = async event => {
  event.preventDefault();

  const searchQuery = event.currentTarget.elements.searchQuery.value;

  try {
    const {data} = await pixabayApi.fetchPhotos(searchQuery);
    console.log(data)

    galleryListEl.innerHTML =  renderGalleryList(data.hits);
    loadMoreBtn.classList.remove('is-hidden')


    if (!data.hits.length) {
      Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.");
  }


} catch(err) {
    console.log(err);

};


}

function renderGalleryList(photos) {
  return photos
     .map(({webformatURL, tags, likes, views, comments, downloads}) => {
      return `<div class="photo-card">
        <img src="${webformatURL}" alt="${tags}" loading="lazy" />
        <div class="info">
         <p class="info-item">
         <b>Likes: ${likes}</b>
          </p>
         <p class="info-item">
         <b>Views: ${views}</b>
         </p>
        <p class="info-item">
        <b>Comments: ${comments}</b>
         </p>
          <p class="info-item">
         <b>Downloads: ${downloads} </b>
           </p>
            </div>
         </div>`
     }) .join("");



  }


const onLoadMoreBtnClick = async () => {
  pixabayApi.page += 1;

  try {
    const {data} = await pixabayApi.fetchPhotos(formEl.value);

    console.log(data);

    if (pixabayApi.page === Math.ceil(data.total / 40)) {
      loadMoreBtn.classList.add('is-hidden');

    }



    galleryListEl.innerHTML += renderGalleryList(data.hits);

    if (pixabayApi.page > data.totalHits) {
      loadMoreBtn.classList.remove('is-hidden');
      Notiflix.Notify.failure("We're sorry, but you've reached the end of search results.");
  }
  } catch (err) {
    console.log(err);
  } 
};

formEl.addEventListener('submit', onSearchSubmitForm);
loadMoreBtn.addEventListener('click', onLoadMoreBtnClick);