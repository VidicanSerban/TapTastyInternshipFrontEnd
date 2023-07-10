<template>
  <div>
    <header class="header fixed-top bg-light">
      <nav class="navbar bg-warning">
        <form class="container-fluid justify-content-end">
          <button class="btn btn-outline-dark me-2" type="button">Login</button>
          <button class="btn btn-outline-dark me-2" type="button">Sign Up</button>
          <!-- <button class="btn btn-outline-dark me-2" @click="goToDefault">Go Back</button> -->
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
          <p>Pret: {{ produs.pret }} RON</p>
        </div>

        <div class="confirm">
          <p>Total de plată: {{ sumaTotala }} RON</p>
          <button class="btn btn-outline-dark" @click="sendEmail">Confirma comanda</button>
        </div>
      </div>
    </div>
  </div>
</template>

  
<script>
import axios from 'axios'
export default {
  data() {
    return {
      produseCos: [], // A vector to store the products added to the cart
      sumaTotala: 0 // Variable to store the total payment amount
    };
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
      async sendEmail() {
        // Make an API call to your Laravel backend to send the email
        try {
          const response = await axios.post('http://laravel.test/send-email', {
            produseCos: this.produseCos,
            sumaTotala: this.sumaTotala
          });
          if (response.data.success) {
            // Handle success, e.g., display success message or perform additional tasks
            console.log('Email sent and data saved');
          } else {
            // Handle failure, if needed
            console.log('Failed to send email or save data');
          }
        } catch (error) {
          // Handle any errors that occur during the API call
          console.error(error);
        }
      }
    }
  };
</script>