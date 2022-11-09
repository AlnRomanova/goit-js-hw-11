import axios from "axios";
import Notiflix from 'notiflix';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import { PixabayApi, PixabayApi } from "./pixabay-api";


const formEl = document.querySelector('.search-form');

formEl.addEventListener('submit', handleSearchForm);

const pixabayApi = new PixabayApi();


function handleSearchForm (event) {
  event.preventDefault();

  pixabayApi
  .fetchPhotos()
  .then(data => {
    console.log(data)
  }).catch();
}

  // const searchQuery = event.target.elements['searchQuery'];
  // console.log(searchQuery)
  // if(!searchQuery) {
  //   return
  // }




