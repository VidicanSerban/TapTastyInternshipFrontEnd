<template>
    <div>
      <table>
        <thead>
          <tr>
            <th>Nume categorie</th>
            <th>Acțiuni</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(category, index) in categories" :key="index">
            <td>{{ category.name }}</td>
            <td>
              <button @click="editCategory(category.id)">Editează</button>
              <button @click="deleteCategory(category.id)">Șterge</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    name: 'CategoryManagement',
    data() {
      return {
        categories: []
      };
    },
    mounted() {
      this.fetchCategories();
    },
    methods: {
      fetchCategories() {
        axios
    .get(
      "http://laravel.test/api/admin/categories",
      {},
      {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem('token'),
          Accept: "application/json",
        },
      }
    ) // înlocuiește URL-ul cu endpoint-ul tău pentru preluarea categoriilor
          .then(response => {
            this.categories = response.data;
          })
          .catch(error => {
            console.error('Eroare la preluarea categoriilor:', error);
          });
      },
      editCategory(categoryId) {
        // Implementează acțiunea de editare a categoriei cu ID-ul categoryId
        console.log('Editează categoria cu ID:', categoryId);
      },
      deleteCategory(categoryId) {
        // Implementează acțiunea de ștergere a categoriei cu ID-ul categoryId
        console.log('Șterge categoria cu ID:', categoryId);
      }
    }
  };
  </script>