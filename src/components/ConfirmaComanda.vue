<template>
  <div class="container">
    <h1 class="mb-4">Confirm Order</h1>

    <form @submit.prevent="sendEmail" class="form-card">
      <div class="mb-3">
        <label for="numeClient" class="form-label">Nume Client:</label>
        <input type="text" id="numeClient" class="form-control" v-model="numeClient" required>
      </div>

      <div class="mb-3">
        <label for="adresaClient" class="form-label">Adresa Client:</label>
        <input type="text" id="adresaClient" class="form-control" v-model="adresaClient" required>
      </div>

      <!-- <div class="mb-3">
        <label for="email" class="form-label">Email:</label>
        <input type="email" id="email" class="form-control" v-model="email" required>
      </div> -->

      <button type="submit" class="btn btn-outline-dark">Confirma comanda</button>
    </form>
    <button @click="navigateToHomePage" class="btn btn-secondary mt-3">Inapoi la cumparaturi</button>
  </div>
</template>


  
<script>
import axios from 'axios';

export default {
  data() {
    return {
      numeClient: '',
      adresaClient: '',
      email: '',
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
    navigateToHomePage() {
      this.$router.push('/');
    },
    async sendEmail() {

      try {
        const response = await axios.post('http://laravel.test/send-email', {
          numeClient: this.numeClient,
          adresaClient: this.adresaClient,
          email: sessionStorage.getItem('email'),
          produseCos: this.produseCos,
          sumaTotala: this.sumaTotala,
        });
        if (response.data.success) {
          // Handle success, e.g., display success message or perform additional tasks
          console.log('Email sent and data saved');
          localStorage.clear();
          this.$router.push('/');
        } else {
          // Handle failure, if needed
          console.log('Failed to send email or save data');
        }
      } catch (error) {
        // Handle any errors that occur during the API call
        console.error(error);
      }
    },
  },
};
</script>