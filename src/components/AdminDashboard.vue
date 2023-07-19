<template>
    <div>
      <!-- Add buttons to navigate to different views -->
      <h2>Admin Dashboard</h2>
      <div>
        <button class="btn btn-outline-dark me-2" @click="showProductManagement">Management Produse</button>
        <button class="btn btn-outline-dark me-2" @click="showCategoryManagement">Management Categorii</button>
        <button class="btn btn-outline-dark me-2" @click="showUserManagement">Management Users</button>
      </div>
  
      <!-- Render the selected embedded component -->
      <div v-if="selectedComponent">
        <component :is="selectedComponent"></component>
      </div>
    </div>
  </template>
  
  <script>
  import ProductManagement from './admin/ProductManagement.vue';
  import CategoryManagement from './admin/CategoryManagement.vue';
  import UserManagement from './admin/UserManagement.vue';
  
  export default {
    name: 'AdminDashboard',
    components: {
      ProductManagement,
      CategoryManagement,
      UserManagement,
    },
    data() {
      return {
        selectedComponent: null,
      };
    },
    methods: {
      showProductManagement() {
        this.selectedComponent = ProductManagement;
      },
      showCategoryManagement() {
        this.selectedComponent = CategoryManagement;
      },
      showUserManagement() {
        this.selectedComponent = UserManagement;
      },
    },
  };
  </script>
  