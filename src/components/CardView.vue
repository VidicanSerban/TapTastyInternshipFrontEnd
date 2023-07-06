<template>
  <div class="form-container">
    <form @submit.prevent="addProduct" class="form">
      <h2>Adaugati un produs</h2>
      <div class="form-group">
        <label for="nume">Numele produsului:</label>
        <input type="text" id="nume" v-model="formData.nume" required>
      </div>
      <div class="form-group">
        <label for="categorie">Categorie:</label>
        <input type="number" id="categorie" v-model="formData.categorie_id" required>
      </div>
      <div class="form-group">
        <label for="pret">Pret:</label>
        <input type="number" id="pret" v-model="formData.pret" required>
      </div>
      <div class="form-group">
        <label for="cantitate">Cantitate:</label>
        <input type="number" id="cantitate" v-model="formData.cantitate" required>
      </div>
      <button type="submit">Adaugati produs</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      formData: {
        nume: '',
        categorie_id: null,
        pret: null,
        cantitate: null
      }
    };
  },
  methods: {
    addProduct() {
      axios.post('http://laravel.test/produse', this.formData)
        .then(response => {
          console.log(response.data);
          // Realizează orice acțiuni supțională după adăugarea produsului, cum ar fi golirea formularului sau reîncărcarea listei de produse
        })
        .catch(error => {
          console.log(error);
          // Tratează orice erori care pot apărea în timpul adăugării produsului
        });
    }
  }
};
</script>

<style>
.form-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.form {
  width: 400px;
  padding: 20px;
  background-color: #1a1a1a;
  border-radius: 5px;
  border: 1px solid #ccc;
}

.form h2 {
  text-align: center;
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
}

input {
  width: 100%;
  padding: 8px;
  border-radius: 3px;
  margin-left:-10px;
  border: 1px solid #ccc;
}

button {
  width: 100%;
  padding: 8px;
  background-color: #ccc;
  color: #000;
  border: none;
  border-radius: 3px;
  cursor: pointer;
}
</style>