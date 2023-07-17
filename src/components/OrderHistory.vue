<template>
    <header class="header fixed-top bg-light">
        <nav class="navbar bg-warning">
            <div class="menu-wrapper container-fluid justify-content-end">
                <!-- Show the user's email and logout button if logged in -->
                <div v-if="loggedIn">
                    <button class="btn btn-outline-dark me-2" type="button" @click="logout">Logout</button>
                    <button class="btn btn-outline-dark me-2" type="button" @click="redirectToHomePage">Produse</button>
                </div>
                <!-- Show login and sign up buttons if logged out -->
                <button class="btn btn-outline-dark me-2" type="button" @click="goToCart">Cosul meu</button>
            </div>
            <!-- Add a hamburger icon for small screens -->
            <div class="menu-toggle" @click="toggleMenu">
                <img class="menu-icon" src="src\assets\images\menu.png">
            </div>
            <!-- Add a class to hide the menu items on small screens -->
            <form class="container-fluid justify-content-end" v-show="showMenu">
                <div v-if="loggedIn">
                    <button class="btn btn-outline-dark me-2" type="button" @click="logout">Logout</button>
                    <button class="btn btn-outline-dark me-2" type="button" @click="redirectToHomePage">Produse</button>
                </div>
                <!-- Show login and sign up buttons if logged out -->
                <button class="btn btn-outline-dark me-2" type="button" @click="goToCart">Cosul meu</button>
            </form>
        </nav>
    </header>
    <div>
        <h1>Istoricul comenzilor tale</h1>
        <div>
            <div v-for="order in userOrders" :key="order.id" class="order">
                <!-- Display the details of each order here -->
                <p>ID comanda: {{ order.id }}</p>
                <p>Nume client: {{ order.numeClient }}</p>
                <p>Adresa livrare: {{ order.adresaClient }} RON</p>
                <p>Valoarea comenzii: {{ order.sumaTotala }} RON</p>
                <!-- You can display more details about the order as needed -->
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            loggedIn: false,
            userEmail: '',
            userOrders: [],
            showMenu: false,
        };
    },
    mounted() {
        const userToken = sessionStorage.getItem('token');
        if (userToken) {
            this.loggedIn = true;
            this.userToken = userToken;
            this.fetchUserEmail();
        } else {
            this.loggedIn = false;
        }
    },
    methods: {
        redirectToHomePage() {
            this.$router.push('/');
        },
        goToCart() {
            this.$router.push('/cosul-meu');
        },
        toggleMenu() {
            this.showMenu = !this.showMenu;
        },
        logout() {
            // Get the token from the session storage
            const token = sessionStorage.getItem('token');

            // Include the token in the request headers
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

            // Make the logout API call
            axios.post('http://exampleapp.test/api/logout')
                .then(response => {
                    // Handle the response
                    console.log(response.data.message);

                    // Remove the token from session storage after successful logout
                    sessionStorage.removeItem('token');

                    // Redirect to the login page or any other appropriate page
                    this.$router.push('/login');
                })
                .catch(error => {
                    // Handle the error
                    console.log(error);
                });
        },
        fetchUserEmail() {
            // Get the token from sessionStorage
            const userToken = sessionStorage.getItem('token');

            // Check if the user is logged in
            if (userToken) {
                // Make an API call to fetch the user's email from the current project's API
                axios.get('http://exampleapp.test/api/user-email', {
                    headers: {
                        Authorization: `Bearer ${userToken}`,
                    },
                })
                    .then(response => {
                        const userEmail = response.data.email;
                        // Now that we have the user's email, fetch the user's orders using the email
                        this.fetchUserOrders();
                    })
                    .catch(error => {
                        console.log(error);
                    });
            } else {
                // Handle the case where the user is not logged in or the token is not available
                console.log('User not logged in.');
            }
        },
        fetchUserOrders() {
            // Make an API call to fetch the user's order history from the other project's API
            // Pass the userEmail as a query parameter or in the request body, depending on the API's design
            axios.get('http://exampleapp.test/orders', {
                params: {
                    email: userEmail,
                },
                // Or if the API expects the email in the request body:
                // data: {
                //   email: userEmail,
                // },
            })
                .then(response => {
                    this.userOrders = response.data;
                })
                .catch(error => {
                    console.log(error);
                });
        },
    },
};
</script>