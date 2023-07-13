<template>
    <div>
        <h1>Inregistreaza-te</h1>
        <form @submit.prevent="submitForm" class="form-card">
            <div class="form-group">
                <label for="nume">Nume:</label>
                <input type="text" id="nume" v-model="form.nume" class="form-control" required>
            </div>
            <div class="form-group">
                <label for="prenume">Prenume:</label>
                <input type="text" id="prenume" v-model="form.prenume" class="form-control" required>
            </div>
            <div class="form-group">
                <label for="email">Email:</label>
                <input type="email" id="email" v-model="form.email" class="form-control" required>
            </div>
            <div class="form-group">
                <label for="password">Parola:</label>
                <input type="password" id="password" v-model="form.password" class="form-control" required>
            </div>
            <div class="form-group">
                <label for="adresa">Adresa:</label>
                <input type="text" id="adresa" v-model="form.adresa" class="form-control" required>
            </div>
            <button type="submit" class="btn btn-primary mt-3">Inregistreaza-te</button>

        </form>
        <div>
            <button @click="navigateToLogin" class="btn btn-secondary mt-3">Ai deja un cont? Autentifica-te</button>
        </div>
        <button @click="goToHomePage" class="btn btn-secondary mt-3">Inapoi la cumparaturi</button>
    </div>
</template>
  
  
<script>
import axios from 'axios';

export default {
    data() {
        return {
            form: {
                nume: '',
                prenume: '',
                email: '',
                password: '',
                adresa: ''
            }
        };
    },
    methods: {
        goToHomePage() {
            // Navigate to the home page with route "/lista-produse"
            this.$router.push('/');
        },
        navigateToLogin() {
            this.$router.push('/login');
        },
        submitForm() {
            // Perform form validation and submit the form data to the server
            axios.post('http://exampleapp.test/api/register', this.form)
                .then(response => {
                    // Handle the response and redirect to the desired page
                    // For example, you can redirect to the login page
                    this.$router.push('/login');
                })
                .catch(error => {
                    // Handle the error
                    console.log(error);
                });
        },
    }
};
</script>
  