<template>
  <div class="col-md-3">
    <div class="card">
      <div class="image-container">
        <img :src="image" :alt="name" class="card-img-top">
      </div>
      <div class="card-body">
        <h4 class="card-title">{{ name }}</h4>
        <div class="card-text">{{ price | dollars }}</div>
        <div class="row justify-content-end">
          <button class="btn btn-primary" @click="addToCart(invId)">Add to cart</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { dollars } from './filters';

export default {
  name: 'item',
  props: ['invId', 'name', 'image', 'price'],
  filters: {
    dollars,
  },
  methods: {
    addToCart(invId) {
      this.$store.dispatch('addToCart', invId);
    },
  },
};
</script>

<style scoped>
  img {
    max-width: 150px;
  }
  .image-container {
    margin: 0 auto;
    display: flex;
    align-items: flex-end;
  }
  .card {
    padding-top: 10px;
    height: 100%;
    flex-direction: row;
    flex-wrap: wrap;
  }
  .card-body {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
  }
  .col-md-3 {
    padding-bottom: 20px;
  }
</style>
