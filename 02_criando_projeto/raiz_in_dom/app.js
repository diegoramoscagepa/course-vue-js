const { createApp, ref, onMounted } = Vue;

const app = createApp({
  setup() {
    // Composition API
    const count = ref(0);
    const buttonText = ref('Clique-me');

    const increment = () => {
      count.value++;
      if (count.value === 5) {
        buttonText.value = 'Continue clicando';
      }
    };

    onMounted(() => {
      console.log('Aplicação Vue montada!');
    });

    return {
      count,
      buttonText,
      increment
    };
  }
});

app.mount('#app');




/*
// Com options (lagado*)
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
*/