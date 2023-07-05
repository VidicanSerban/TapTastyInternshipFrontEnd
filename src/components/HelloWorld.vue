<template>
  <form @submit.prevent="submitForm">
    <div>
      <label for="nume">Nume:</label>
      <input type="text" id="nume" v-model="form.nume" />
    </div>
    <div>
      <label for="prenume">Prenume:</label>
      <input type="text" id="prenume" v-model="form.prenume" />
    </div>
    <div>
      <label for="data_nasterii">Data Nasterii:</label>
      <input type="date" id="data_nasterii" v-model="form.data_nasterii" />
    </div>
    <div>
      <label for="comentarii">Comentarii:</label>
      <textarea id="comentarii" v-model="form.comentarii"></textarea>
    </div>
    <div>
      <button type="submit">Submit</button>
    </div>
  </form>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      form: {
        nume: '',
        prenume: '',
        data_nasterii: '',
        comentarii: '',
      },
    };
  },
  methods: {
    submitForm() {
      axios.post('http://laravel.test/store', this.form)
        .then(response => {
          // Handle the successful response
          console.log(response.data);
        })
        .catch(error => {
          // Handle the error
          console.error(error);
        });
    },
  },
};
</script>

<style>
/* Add your custom CSS styles here */
</style>
