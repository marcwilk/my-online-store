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
    ADD_TO_CART(state, invId) { state.inCart.push(invId); },
    REMOVE_FROM_CART(state, index) { state.inCart.splice(index, 1); },
    forSale(state, payload) { state.forSale = payload },
  },
  actions: {
    addToCart(context, invId) { context.commit('ADD_TO_CART', invId); },
    removeFromCart(context, index) { context.commit('REMOVE_FROM_CART', index); },
    fetchProducts(context) {
      axios.get('http://localhost:8082/api/cameras')
      .then(function (response) {
        let newForSale = response.data.map(item => {
          return {
            invId : item.id,
            name : item.name,
            image : item.picture,
            price: item.price,
          }
        })
        context.commit('forSale', newForSale)
        }
      )
    }
  },
});
