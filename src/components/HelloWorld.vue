<template>
  <div>
    <header class="header fixed-top bg-light">
      <nav class="navbar bg-warning">
        <div class="menu-wrapper container-fluid justify-content-end">
          <div v-if="loggedIn && userRole === 'admin'">
            <!-- Show only the 'Deconecteaza-te' button for admin -->
            <button class="btn btn-outline-dark me-2" type="button" @click="logout">Deconecteaza-te</button>
          </div>
          <div v-else-if="loggedIn && userRole !== 'admin'">
            <!-- Show additional buttons for logged-in non-admin users -->
            <button class="btn btn-outline-dark me-2" type="button" @click="logout">Deconecteaza-te</button>
            <button class="btn btn-outline-dark me-2" type="button" @click="redirectToOrderHistory">Istoric
              comenzi</button>
            <button class="btn btn-outline-dark me-2" type="button" @click="goToCart">Cosul meu</button>
          </div>
          <div v-else>
            <!-- Show login and sign up buttons for logged-out users -->
            <button class="btn btn-outline-dark me-2" type="button" @click="navigateToLogin">Autentifica-te</button>
            <button class="btn btn-outline-dark me-2" type="button" @click="navigateToSignUp">Inregistreaza-te</button>
          </div>
        </div>
        <div class="menu-toggle" @click="toggleMenu">
          <img class="menu-icon" src="src\assets\images\menu.png">
        </div>
        <form class="container-fluid justify-content-end" v-show="showMenu">
          <!-- The same logic as in the navbar -->
          <div v-if="loggedIn && userRole === 'admin'">
            <button class="btn btn-outline-dark me-2" type="button" @click="logout">Deconecteaza-te</button>
          </div>
          <div v-else-if="loggedIn && userRole !== 'admin'">
            <button class="btn btn-outline-dark me-2" type="button" @click="logout">Deconecteaza-te</button>
            <button class="btn btn-outline-dark me-2" type="button" @click="redirectToOrderHistory">Istoric
              comenzi</button>
            <button class="btn btn-outline-dark me-2" type="button" @click="goToCart">Cosul meu</button>
          </div>
          <div v-else>
            <button class="btn btn-outline-dark me-2" type="button" @click="navigateToLogin">Log in</button>
            <button class="btn btn-outline-dark me-2" type="button" @click="navigateToSignUp">Sign up</button>
          </div>
        </form>
      </nav>
    </header>

    <div v-if="loggedIn">
      <div v-if="userRole === 'admin'">
        <!-- Render the AdminDashboard component for the admin user -->
        <AdminDashboard />
      </div>
      <div v-else>
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
              <p>Cantitate: {{ produs.cantitate }} {{ produs.cantitate > 1 ? (produs.cantitate > 19 ? 'de' : '') + 'bucăți' : 'bucată' }}</p>
              <p v-if="produs.detalii">Detalii: {{ produs.detalii }}</p>
              <button class="btn btn-outline-dark" @click="addToCart(produs)">Adauga in cos</button>
            </div>
          </div>
        </div>
        <div v-if="successMessage" class="success-message">
          {{ successMessage }}
        </div>
      </div>
    </div>

    <div v-else>
      <h1 class="title mt-5">Bine ati venit la The Wholesome Wheelbarrow</h1>
      <!-- ... Existing content for logged out users ... -->
    </div>

    <Footer></Footer>
  </div>
</template>

<script>
import axios from 'axios';
import Footer from './Footer.vue';
import AdminDashboard from './AdminDashboard.vue';
export default {
  data() {
    return {
      produse: [],
      produseGrupate: {},
      categorii: [],
      selectedCategory: null,
      successMessage: '',
      showMenu: false,
      loggedIn: false,
      userEmail: '',
      userRole: '',
    };
  },
  components: {
    Footer,
    AdminDashboard,
  },
  mounted() {
    const userToken = sessionStorage.getItem('token');
    if (userToken) {
      this.loggedIn = true;
      this.userToken = userToken;
      this.fetchUserRole();
    } else {
      this.loggedIn = false;
    }

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
    logout() {
      const token = sessionStorage.getItem('token');
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      axios.post('http://exampleapp.test/api/logout')
        .then(response => {
          sessionStorage.clear();
          this.$router.push('/login');
        })
        .catch(error => {
          console.log(error);
        });
    },
    redirectToOrderHistory() {
      this.$router.push('/istoric');
    },
    toggleMenu() {
      this.showMenu = !this.showMenu;
    },
    navigateToSignUp() {
      this.$router.push('/signup');
    },
    navigateToLogin() {
      this.$router.push('/login');
    },
    groupProductsByCategory() {
      this.produse.sort((a, b) => {
        if (a.categorie.id !== b.categorie.id) {
          return a.categorie.id - b.categorie.id;
        }
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
      const baseUrl = 'http://laravel.test/imagini_produse/';
      return `${baseUrl}${imagine}`;
    },
    fetchCategories() {
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
      axios.post('http://laravel.test/checksession', { token: sessionStorage.getItem('token') })
        .then(response => {
          if (response.data.success) {
            const { nume, cantitate, pret } = produs;
            const existingCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
            const existingProductIndex = existingCartItems.findIndex(item => item.nume === nume);
            if (existingProductIndex !== -1) {
              existingCartItems[existingProductIndex].cantitate += cantitate;
              existingCartItems[existingProductIndex].pret += pret;
            } else {
              existingCartItems.push({ nume, cantitate, pret });
            }
            localStorage.setItem('cartItems', JSON.stringify(existingCartItems));
            this.successMessage = 'Produsul a fost adaugat in cosul dumneavoastra cu succes';
            setTimeout(() => {
              this.successMessage = '';
            }, 3000);
          } else {
            console.log('Failed to save email in the session');
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    fetchUserRole() {
      this.userRole = sessionStorage.getItem('role');
    },
  },
};
</script>
