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

  pixabayApi.page = 1;

  try {
    const {data} = await pixabayApi.fetchPhotos(searchQuery);
    console.log(pixabayApi.page)
    Notiflix.Notify.success(`Hooray! We found ${data.totalHits} images.`);

    galleryListEl.innerHTML = renderGalleryList(data.hits);
    let gallery = new SimpleLightbox('.gallery a');
    gallery.refresh(data.hits);

    loadMoreBtn.classList.remove('is-hidden')


       if (!data.hits.length) {
      Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.");
       }

   } catch(err) {
    console.log(err);

   };

};

function renderGalleryList(data) {
  return data
     .map(({largeImageURL, webformatURL, tags, likes, views, comments, downloads}) => {
      return `<div class="photo-card">
      <a class="gallery__item" href="${largeImageURL}">
        <img src="${webformatURL}" alt="${tags}" loading="lazy" />
        </a>
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

  };

const onLoadMoreBtnClick = async () => {
  pixabayApi.page += 1;

  try {
    const {data} = await pixabayApi.fetchPhotos(formEl.value);


    if (pixabayApi.page === Math.ceil(data.totalHits / 40)) {
      loadMoreBtn.classList.add('is-hidden');
      Notiflix.Notify.failure("We're sorry, but you've reached the end of search results.");
    }

    galleryListEl.innerHTML += renderGalleryList(data.hits);
     let gallery = new SimpleLightbox('.gallery a');
     gallery.refresh(data.hits)

  } catch (err) {
    console.log(err);
  }

  const { height: cardHeight } = document
  .querySelector(".gallery")
  .firstElementChild.getBoundingClientRect();

  window.scrollBy({
  top: cardHeight * 2,
  behavior: "smooth",

});

};

formEl.addEventListener('submit', onSearchSubmitForm);
loadMoreBtn.addEventListener('click', onLoadMoreBtnClick);