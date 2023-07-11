<template>
    <div>
        <h1>Autentifica-te</h1>
        <form @submit.prevent="submitForm" class="form-card">
            <div class="form-group">
                <label for="email">Email:</label>
                <input type="email" id="email" v-model="form.email" class="form-control" required>
            </div>
            <div class="form-group">
                <label for="parola">Parola:</label>
                <input type="password" id="parola" v-model="form.parola" class="form-control" required>
            </div>
            <button type="submit" class="btn btn-primary mt-3">Autentifica-te</button>
        </form>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            form: {
                email: '',
                parola: ''
            }
        };
    },
    methods: {
        submitForm() {
            // Perform form validation and submit the form data to the server
            axios.post('http://laravel.test/login', this.form)
                .then(response => {
                    // Handle the response
                    if (response.data.success) {
                        // Redirect to the main page
                        this.$router.push('/');
                        
                        // Save the email in session storage
                        sessionStorage.setItem('email', this.form.email);
                    } else {
                        // Handle invalid login credentials
                        console.log('Invalid login credentials');
                    }
                })
                .catch(error => {
                    // Handle the error
                    console.log(error);
                });
        }
    }
};
</script>
