<template>
  <div id="app" class="container my-5">
    {{ info }}
    <div class="row mb-3">
      <div class="col-md-9">
        <h1>Camera Store</h1>
      </div>
      <div class="col-md-3 text-right">
        <shoppingCart />
      </div>
    </div>
    <div class="row">
      <Item
        v-for="item in forSale"
        :key="item.invId"
        :invId="item.invId"
        :name="item.name"
        :image="item.image"
        :price="item.price"
      />
    </div>
  </div>
</template>

<script>
import Item from './Item.vue';
import ShoppingCart from './ShoppingCart.vue';

export default {
  name: 'app',
  computed: {
    forSale() { return this.$store.getters.forSale; },
    inCart() { return this.$store.getters.inCart; },
  },
  components: {
    Item,
    ShoppingCart,
  },
  mounted() {
    this.$store.dispatch('fetchProducts')
    this.$store.dispatch('populateCart')
    this.$store.dispatch('removeFromCart')
  },
};
</script>

<style>
  * {
    font-family: 'Noto Serif SC', serif;
  }
  html {
    background-color: #A9A9A9;
  }
  #app {
    background-color: #A9A9A9;
  }
  body {
    background-color: #A9A9A9;
  }
  .text-right {
    padding-top: 15px;
  }
</style>
