<template>
    <div>
      <div class="card" v-for="item in data" :key="item.id">
        <!-- Render the data properties in the card view -->
        <h2>{{ item.title }}</h2>
        <p>{{ item.description }}</p>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        data: [],
      };
    },
    mounted() {
      // Fetch the data from the API endpoint
      axios.get('http://laravel.test/store')
        .then(response => {
          this.data = response.data;
        })
        .catch(error => {
          console.error(error);
        });
    },
  };
  </script>

  