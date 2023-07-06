<template>
  <div>
    <div v-for="(produseCategorie, categorie) in produseGrupate" :key="categorie">
      <h2 id="nume_categorii">{{ categorie }}</h2>
      <div class="card-container">
        <div v-for="produs in produseCategorie" :key="produs.id" class="card">
          <h3>{{ produs.nume }}</h3>
          <p>Categorie: {{ produs.categorie.nume }}</p>
          <p>Pret: {{ produs.pret }}</p>
          <p>Cantitate: {{ produs.cantitate }}</p>
          <p v-if="produs.detalii">{{ produs.detalii }}</p>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import axios from 'axios';

export default {
  data() {
    return {
      produse: [],
      produseGrupate: {}
    };
  },
  mounted() {
    axios.get('http://laravel.test/produse')
      .then(response => {
        this.produse = response.data;
        this.groupProductsByCategory();
      })
      .catch(error => {
        console.log(error);
      });
  },
  methods: {
    groupProductsByCategory() {
      this.produse.sort((a, b) => {
        // Sortează produsele după ID-ul categoriei
        if (a.categorie.id !== b.categorie.id) {
          return a.categorie.id - b.categorie.id;
        }
        // Sortează produsele după ID-ul produsului
        return a.id - b.id;
      });

      this.produseGrupate = this.produse.reduce((grupate, produs) => {
        const categorie = produs.categorie.nume;
        if (!grupate[categorie]) {
          grupate[categorie] = [];
        }
        grupate[categorie].push(produs);
        return grupate;
      }, {});
    }
  }
};
</script>