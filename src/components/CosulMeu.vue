<template>
  <div>
    <header class="header fixed-top bg-light">
      <nav class="navbar bg-warning">
        <form class="container-fluid justify-content-end">
          <button class="btn btn-outline-dark me-2" @click="navigateToHomePage">Go Back</button>
        </form>
      </nav>
    </header>

    <div>
      <h1 class="title mt-5">Cosul meu</h1>

      <div v-if="produseCos.length === 0">
        <p>Nu există produse în coș.</p>
      </div>

      <div v-else>
        <div class="product-box" v-for="produs in produseCos" :key="produs.id">
          <h3>{{ produs.nume }}</h3>
          <p>Cantitate: {{ produs.cantitate }}</p>
          <p>Pret: {{ produs.pret }} RON</p>
          <button class="btn btn-outline-danger" @click="removeFromCart(produs)">Remove</button>
        </div>

        <div class="confirm">
          <p>Total de plată: {{ sumaTotala }} RON</p>
          <button class="btn btn-outline-dark" @click="confirmaComanda">Confirma comanda</button>
        </div>
      </div>
    </div>
  </div>

  <Footer></Footer>
</template>

<script>
import Footer from './Footer.vue';
export default {
  data() {
    return {
      produseCos: [], // A vector to store the products added to the cart
      sumaTotala: 0 // Variable to store the total payment amount
    };
  },
  components: {
    Footer,
  },
  created() {
    // Retrieve the cart items from localStorage when the component is created (page is loaded or refreshed)
    const cartItems = JSON.parse(localStorage.getItem('cartItems'));
    if (cartItems && cartItems.length > 0) {
      this.produseCos = cartItems;
    }

    // Calculate the total payment amount
    this.sumaTotala = this.produseCos.reduce((total, produs) => {
      return total + produs.pret;
    }, 0);
  },
  methods: {
    navigateToHomePage() {
      this.$router.push('/');
    },
    removeFromCart(produs) {
      // Find the index of the product in the cart
      const index = this.produseCos.findIndex(item => item.id === produs.id);

      if (index > -1) {
        // Remove the product from the cart
        this.produseCos.splice(index, 1);

        // Update the total payment amount
        this.sumaTotala -= produs.pret;

        // Save the updated cart items to localStorage
        localStorage.setItem('cartItems', JSON.stringify(this.produseCos));
      }
    },
    async confirmaComanda() {
      this.$router.push('/confirma');
    }
  }
};
</script>