<template>
  <div class="user-list">
    <h1>Lista de Usuários</h1>

    <button
      @click="fetchUsers"
      :disabled="isLoading"
      class="fetch-button"
    >
      <span v-if="isLoading">
        <i class="fas fa-spinner fa-spin"></i> Carregando...
      </span>
      <span v-else>
        <i class="fas fa-sync-alt"></i> Atualizar Lista
      </span>
    </button>

    <div v-if="error" class="error-message">
      <i class="fas fa-exclamation-triangle"></i> {{ error }}
      <button @click="fetchUsers" class="retry-button">Tentar novamente</button>
    </div>

    <div v-if="users.length > 0" class="user-grid">
      <div v-for="user in users" :key="user.id" class="user-card">
        <h3>{{ user.name }}</h3>
        <p><i class="fas fa-envelope"></i> {{ user.email }}</p>
        <p><i class="fas fa-phone"></i> {{ user.phone }}</p>
        <p><i class="fas fa-globe"></i> {{ user.website }}</p>
      </div>
    </div>

    <div v-if="!isLoading && users.length === 0 && !error" class="empty-state">
      Nenhum usuário encontrado
    </div>
  </div>
</template>

<script>
import api from '@/services/api';

export default {
  name: 'UserList',
  data() {
    return {
      users: [],
      isLoading: false,
      error: null,
    };
  },
  created() {
    // Carrega os dados quando o componente é criado
    this.fetchUsers();
  },
  methods: {
    async fetchUsers() {
      this.isLoading = true;
      this.error = null;

      try {
        // Usa a variável de ambiente para o endpoint
        const endpoint = import.meta.env.VUE_APP_USERS_ENDPOINT;
        const response = await api.get(endpoint);

        this.users = response.data.slice(0, 6); // Limita a 6 usuários para exemplo
      } catch (err) {
        this.handleError(err);
      } finally {
        this.isLoading = false;
      }
    },
    handleError(error) {
      if (error.response) {
        // Erro da API (4xx, 5xx)
        this.error = `Erro ${error.response.status}: ${error.response.data.message || 'Falha na requisição'}`;
      } else if (error.request) {
        // Sem resposta do servidor
        this.error = 'Servidor não respondeu. Verifique sua conexão.';
      } else {
        // Erro na configuração da requisição
        this.error = 'Erro ao configurar a requisição';
      }

      console.error('Detalhes do erro:', error);
    }
  }
};
</script>

<style scoped>
.user-list {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.fetch-button {
  background-color: #42b983;
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  margin-bottom: 20px;
}

.fetch-button:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}

.error-message {
  color: #ff4444;
  background-color: #ffebee;
  padding: 15px;
  border-radius: 4px;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  gap: 10px;
}

.retry-button {
  margin-left: 15px;
  background: none;
  border: 1px solid #ff4444;
  color: #ff4444;
  padding: 5px 10px;
  border-radius: 3px;
  cursor: pointer;
}

.user-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
}

.user-card {
  background: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.user-card h3 {
  margin-top: 0;
  color: #2c3e50;
}

.user-card p {
  margin: 8px 0;
  color: #666;
}

.empty-state {
  text-align: center;
  padding: 40px;
  color: #666;
  font-size: 18px;
}

.fa-spinner {
  margin-right: 8px;
}
</style>
