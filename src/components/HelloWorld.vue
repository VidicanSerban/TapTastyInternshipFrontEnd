<template>
  <div>
    <header class="header fixed-top bg-light">
      <nav class="navbar bg-warning">
        <form class="container-fluid justify-content-end">
          <button class="btn btn-outline-dark me-2" type="button" @click="navigateToLogin">Autentifica-te</button>
          <button class="btn btn-outline-dark me-2" type="button" @click="navigateToSignUp">Inregistreaza-te</button>
          <button class="btn btn-outline-dark me-2" type="button" @click="goToCart">Cosul meu</button>
        </form>
      </nav>
    </header>

    <div>
      <h1 class="title mt-5">Bine ati venit la The Wholesome Wheelbarrow</h1>

      <nav>
        <ul class="menu nav justify-content-center">
          <li v-for="categorie in categorii" :key="categorie.id">
            <button class="btn btn-warning btn-outline-dark me-2 mb-2" @click="showProductsByCategory(categorie.id)">{{
              categorie.nume }}</button>
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
            <p>Cantitate: {{ produs.cantitate }} {{ produs.cantitate > 1 ? (produs.cantitate > 19 ? 'de' : '') + ' bucăți'
              : 'bucată' }}</p>
            <p v-if="produs.detalii">Detalii: {{ produs.detalii }}</p>
            <button class="btn btn-outline-dark" @click="addToCart(produs)">
              <!-- <img src="/src/assets/images/cos_cumparaturi.jpg" alt="Add to Cart Icon" class="btn-icon"> -->
              Adauga in cos
            </button>
          </div>
        </div>
      </div>
      <div v-if="successMessage" class="alert alert-success">
        {{ successMessage }}
      </div>
    </div>

    <footer class="footer fixed-bottom bg-light">
      Image by <a
        href="https://www.freepik.com/free-photo/shopping-carts-facing-each-other_5496677.htm#query=shopping%20background&position=46&from_view=keyword&track=ais">Freepik</a>
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
      selectedCategory: null,
      successMessage: ''
    };
  },
  mounted() {
    sessionStorage.setItem("email", "wot.serbanv@gmail.com");
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
    navigateToSignUp() {
      this.$router.push('/signup');
    },
    navigateToLogin() {
      this.$router.push('/login');
    },
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
    goToCart() {
      this.$router.push('/cosul-meu');
    },
    addToCart(produs) {
      // Set the session email
      axios.post('http://laravel.test/checksession', { email: sessionStorage.getItem('email') })
        .then(response => {
          // Check if the email was successfully saved in the session
          if (response.data.success) {
            const { nume, cantitate, pret } = produs;

            // Get the existing cart items from local storage (if any)
            const existingCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

            // Check if the product with the same name already exists in the cart
            const existingProductIndex = existingCartItems.findIndex(item => item.nume === nume);

            if (existingProductIndex !== -1) {
              // If the product already exists, update its quantity and price
              existingCartItems[existingProductIndex].cantitate += cantitate;
              existingCartItems[existingProductIndex].pret += pret;
            } else {
              // If the product does not exist, add it to the cart
              existingCartItems.push({ nume, cantitate, pret });
            }

            // Update the cart items in local storage
            localStorage.setItem('cartItems', JSON.stringify(existingCartItems));

            this.successMessage = 'Produsul a fost adaugat in cosul dumneavoastra cu succes';

            setTimeout(() => {
              this.successMessage = '';
            }, 3000);
          } else {
            // Handle failure to save the email in the session, if needed
            console.log('Failed to save email in the session');
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
  }
};
</script>