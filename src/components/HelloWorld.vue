<template>
  <div>
    <header class="header fixed-top bg-light">
      <nav class="navbar bg-warning">
        <form class="container-fluid justify-content-end">
          <button class="btn btn-outline-dark me-2" type="button">Login</button>
          <button class="btn btn-outline-dark me-2" type="button">Sign Up</button>
          <button class="btn btn-outline-dark me-2" type="button" @click="goToCart">Cosul meu</button>
        </form>
      </nav>
    </header>

    <div>
      <h1 class="title mt-5">Bine ati venit la The Wholesome Wheelbarrow</h1>

      <nav>
        <ul class="menu nav justify-content-center">
          <li v-for="categorie in categorii" :key="categorie.id">
            <button class="btn btn-warning btn-outline-dark me-2 mb-2" @click="showProductsByCategory(categorie.id)">{{ categorie.nume }}</button>
          </li>
        </ul>
      </nav>

      <div v-if="selectedCategory">
        <h2 id="nume_categorii" class="bg-warning text-dark d-inline-block p-2">{{ selectedCategory.nume }}</h2>
        <div class="card-container">
          <div v-for="produs in selectedCategory.produse" :key="produs.id" class="card px-2">
            <img :src="getImageUrl(produs.imagine)" alt="Imagine produs" class="produs_img img-fluid">
            <h3>{{ produs.nume }}</h3>
            <p>Categorie: {{ produs.categorie.nume }}</p>
            <p>Pret: {{ produs.pret }} RON</p>
            <p>Cantitate: {{ produs.cantitate }} {{ produs.cantitate > 1 ? (produs.cantitate > 19 ? 'de' : '') + ' bucăți' : 'bucată' }}</p>
            <p v-if="produs.detalii">Detalii: {{ produs.detalii }}</p>
            <button class="btn btn-outline-dark" @click="addToCart(produs)">
              <img src="/src/assets/images/cos_cumparaturi.jpg" alt="Add to Cart Icon" class="btn-icon">
              Adauga in cos
            </button>
          </div>
        </div>
      </div>
    </div>

    <footer class="footer fixed-bottom bg-light">
      Image by <a href="https://www.freepik.com/free-photo/shopping-carts-facing-each-other_5496677.htm#query=shopping%20background&position=46&from_view=keyword&track=ais">Freepik</a>
    </footer>
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
        produs.imagine = produs.imagine_produs;
        grupate[categorie].push(produs);
        return grupate;
      }, {});
    },
    getImageUrl(imagine) {
      const baseUrl = 'http://laravel.test/imagini_produse/'; // înlocuiți cu URL-ul de bază al proiectului Laravel
      return `${baseUrl}${imagine}`;
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
    },
    // addToCart(produs) {
    // // Adăugați produsul în coșul de cumpărături
    // // Acesta poate fi un vector sau o altă structură de date utilizată pentru a stoca produsele din coș

    // // Exemplu de adăugare a produsului într-un vector numit "cosulMeu"
    // this.cosulMeu.push(produs);
    // },
    // goToCart() {
    // // Redirecționați utilizatorul către pagina "CosulMeu.vue"
    // // Acest lucru poate fi realizat utilizând router-ul specific framework-ului dvs. sau prin utilizarea window.location.href
    // // De exemplu, în Vue Router, puteți utiliza metoda router.push() pentru a redirecționa utilizatorul

    // this.$router.push('/cosul-meu');
    // }
  }
};
</script>