<template>
  <div>
    <h1 class="title">Bine ati venit The Wholesome Wheelbarrow</h1>

    <nav>
      <ul class="navbar">
        <li v-for="categorie in categorii" :key="categorie.id">
          <button @click="showProductsByCategory(categorie.id)">{{ categorie.nume }}</button>
        </li>
      </ul>
    </nav>

    <div v-if="selectedCategory">
      <h2 id="nume_categorii">{{ selectedCategory.nume }}</h2>
      <div class="card-container">
        <div v-for="produs in selectedCategory.produse" :key="produs.id" class="card">
          <h3>{{ produs.nume }}</h3>
          <p>Categorie: {{ produs.categorie.nume }}</p>
          <p>Pret: {{ produs.pret }} RON</p>
          <p>Cantitate: {{ produs.cantitate }} {{ produs.cantitate > 1 ? (produs.cantitate > 19 ? 'de' : '') + ' bucăți' : 'bucată' }}</p>
          <p v-if="produs.detalii">{{ produs.detalii }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      produse: [],
      produseGrupate: {},
      categorii: [],
      selectedCategory: null
    };
  },
  mounted() {
    axios.get('http://laravel.test/produseget')
      .then(response => {
        this.produse = response.data;
        this.groupProductsByCategory();
        this.fetchCategories();
      })
      .catch(error => {
        console.log(error);
      });
  },
  methods: {
    groupProductsByCategory() {
      this.produse.sort((a, b) => {
        // Sortează produsele după ID-ul categoriei
        if (a.categorie.id !== b.categorie.id) {
          return a.categorie.id - b.categorie.id;
        }
        // Sortează produsele după ID-ul produsului
        return a.id - b.id;
      });

      this.produseGrupate = this.produse.reduce((grupate, produs) => {
        const categorie = produs.categorie.nume;
        if (!grupate[categorie]) {
          grupate[categorie] = [];
        }
        grupate[categorie].push(produs);
        return grupate;
      }, {});
    },
    fetchCategories() {
  // Extract unique categories from the products
  const uniqueCategories = [...new Set(this.produse.map(produs => produs.categorie))];
  this.categorii = uniqueCategories.reduce((acc, categorie) => {
    if (!acc.find(c => c.id === categorie.id)) {
      acc.push(categorie);
    }
    return acc;
  }, []);
},
  showProductsByCategory(categorieId) {
      const selectedCategory = this.categorii.find(categorie => categorie.id === categorieId);
      if (selectedCategory) {
        const selectedCategoryName = selectedCategory.nume;
        const produseCategorie = this.produseGrupate[selectedCategoryName];
        if (produseCategorie) {
          this.selectedCategory = {
            ...selectedCategory,
            produse: produseCategorie
          };
        }
      }
    }
  }
};
</script>