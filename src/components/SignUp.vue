<template>
    <div>
        <h1>Sign Up</h1>
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
                <label for="parola">Parola:</label>
                <input type="password" id="parola" v-model="form.parola" class="form-control" required>
            </div>
            <div class="form-group">
                <label for="adresa">Adresa:</label>
                <input type="text" id="adresa" v-model="form.adresa" class="form-control" required>
            </div>
            <button type="submit" class="btn btn-primary mt-3">Sign Up</button>
        </form>
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
                parola: '',
                adresa: ''
            }
        };
    },
    methods: {
        submitForm() {
            // Perform form validation and submit the form data to the server
            axios.post('http://laravel.test/signup', this.form)
                .then(response => {
                    // Handle the response and redirect to the desired page
                    // For example, you can redirect to the login page
                    this.$router.push('/login');
                })
                .catch(error => {
                    // Handle the error
                    console.log(error);
                });
        }
    }
};
</script>
  