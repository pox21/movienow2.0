// import axios from 'axios';
import { createStore } from 'vuex';
import axios from 'axios';

const getFilmsURL =
  'https://kinopoiskapiunofficial.tech/api/v2.2/films/premieres?year=2022&month=JANUARY';
const getFilmByIdURL = 'https://kinopoiskapiunofficial.tech/api/v2.2/films/';
const token = '820d842f-162b-422a-a372-b702aef6d694';

// Create a new store instance.
export const store = createStore({
  state() {
    return {
      filmsArr: [],
      film: {}
    };
  },
  getters: {
    getFilmsArr(state) {
      return state.filmsArr;
    },
    getFilm(state) {
      return state.film;
    }
  },
  mutations: {
    setFilmsArr(state, data) {
      state.filmsArr = data;
    },
    setFilm(state, data) {
      state.film = data;
    }
  },
  actions: {
    async loadFilms(context) {
      const response = await axios.get(getFilmsURL, {
        headers: {
          'X-API-KEY': token,
          'Content-Type': 'application/json'
        }
      });
      try {
        context.commit('setFilmsArr', response.data.items);
      } catch {
        console.log('неизвестная ошибка при запросе списка фильмов');
      }
    },
    async loadFilm(context, id) {
      const response = await axios.get(getFilmByIdURL + id, {
        headers: {
          'X-API-KEY': token,
          'Content-Type': 'application/json'
        }
      });
      try {
        context.commit('setFilm', response.data);
      } catch {
        console.log('неизвестная ошибка при запросе данных фильма');
      }
    }
  }
});
