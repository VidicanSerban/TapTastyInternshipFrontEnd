<template>
    <div>
      <h1>Cosul meu</h1>
  
      <div v-if="produseCos.length === 0">
        <p>Nu există produse în coș.</p>
      </div>
  
      <div v-else>
        <ul>
          <li v-for="produs in produseCos" :key="produs.id">
            <img :src="produs.imagine" alt="Imagine produs">
            <h3>{{ produs.nume }}</h3>
            <p>Pret: {{ produs.pret }} RON</p>
          </li>
        </ul>
  
        <div>
          <p>Total de plată: {{ sumaTotala }} RON</p>
          <button @click="finalizareComanda">Confirma comanda</button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        produseCos: [], // Un vector pentru a stoca produsele adăugate în coș
        sumaTotala: 0 // Variabila pentru a stoca suma totală de plată
      };
    },
    methods: {
      finalizareComanda() {
        // Logica pentru finalizarea comenzii
        // Poți trimite datele comenzii la server sau afișa un mesaj de confirmare
      }
    }
  };
  </script>
  
  <style>
  /* CSS pentru stilizare */
  </style>
  