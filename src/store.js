import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex);
export default new Vuex.Store({
  state: {
    forSale: [],
    inCart: [],
  },
  getters: {
    forSale: state => state.forSale,
    inCart: state => state.inCart,
  },
  mutations: {
    ADD_TO_CART(state, invId) { state.inCart.push(invId) },
    REMOVE_FROM_CART(state, index) { state.inCart.splice(index, 1) },
    FETCH_PRODUCTS(state, payload) { state.forSale = payload },
    POPULATE_CART(state, payload) { state.inCart = payload },
  },
  actions: {
    addToCart(context, invId) {
      axios.patch(`https://collective-api-mww.herokuapp.com/api/cameras/${invId}/add`)
      .then(function (response) {
        { context.commit('ADD_TO_CART', invId) }
      })
    },
    removeFromCart(context, index) {
      axios.patch(`https://collective-api-mww.herokuapp.com/api/cameras/${index}/remove`)
      .then(function (response) {
        console.log(response.data.inCart)
        console.log(index)
        { context.commit('REMOVE_FROM_CART', index) }
      })
    },
    fetchProducts(context) {
      axios.get('https://collective-api-mww.herokuapp.com/api/cameras')
      .then(function (response) {
        let newForSale = response.data.map(item => {
          return {
            invId : item.id,
            name : item.name,
            image : item.picture,
            price: item.price,
            inCart: item.inCart,
          }
        })
        { context.commit('FETCH_PRODUCTS', newForSale) }
      })
    },
    populateCart(context, idArray) {
      axios.get('https://collective-api-mww.herokuapp.com/api/cameras')
      .then(function (response) {
        let newInCart = response.data.filter(item => item.inCart).map(item => item.id)
        { context.commit('POPULATE_CART', newInCart) }
      })
    }
  },
});
