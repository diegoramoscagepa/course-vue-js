// Acessamos Vue do objeto global (quando usando CDN)
const { createApp } = Vue;

// Criamos a aplicação Vue
const app = createApp({
  data() {
    return {
      count: 0,
      buttonText: 'Clique-me'
    }
  },
  methods: {
    increment() {
      this.count++;
      if (this.count === 5) {
        this.buttonText = 'Continue clicando';
      }
    }
  },
  mounted() {
    console.log('Aplicação Vue montada!');
  }
});

// Montamos no elemento #app
app.mount('#app');