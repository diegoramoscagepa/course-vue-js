const app = createApp({
    data() {
      return {
        count: 0
      }
    },
    methods: {
      increment() {
        this.count++;
        if (this.count === 10) {
          alert('Você atingiu 10 cliques!');
        }
      }
    }
  });