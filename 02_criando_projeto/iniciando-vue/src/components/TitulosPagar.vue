<script setup>
import { ref, onMounted } from 'vue';
import api from '@/services/api';




const dados = ref([]);
const isLoading = ref(false);
const error = ref(null);


const fetchUsers = async () => {
  isLoading.value = true;
  error.value = null;

  try {

    const auth = btoa(import.meta.env.VITE_APP_KEY_API_TOTVS);

    const headers = {
      'Accept': '*/*',
      'Authorization': `Basic ${auth}`,
      'tenantid': '01,01SEDE0001',
      'Content-Type': 'application/json'
    };


    const response = await api.get('/rest/API/INTEGRACAO/GENERICA', {
      params: { cCodIntegracao: '000024' },
      headers: headers
    });

    dados.value = response.data;

  } catch (err) {
    handleError(err);
    console.log(err)
  } finally {
    isLoading.value = false;
  }
};



const handleError = (err) => {

  if (err.response) {
    error.value = `Erro ${err.response.status}: ${err.response.data.message || 'Falha na requisição'}`;
  } else if (err.request) {
    error.value = 'Servidor não respondeu. Verifique sua conexão.';
  } else {
    error.value = 'Erro ao configurar a requisição';
  }
  console.error('Detalhes do erro:', err);
}

onMounted(fetchUsers)

</script>


<template>
  <div class="user-list-container">
    <div class="user-list-content">
      <h1 class="title">Titulos a pagar</h1>

      <button @click="fetchUsers" :disabled="isLoading" class="fetch-button">
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

      <div>{{ dados.APIGEN.ITEM[0] }}</div>

      <div v-if="dados.APIGEN.ITEM.length > 0" class="user-grid">
        <div v-for="dado in dados.APIGEN.ITEM" :key="dado.id" class="user-card">
          <h3>{{ dado.ITEM }}</h3>
          <p><i class="fas fa-envelope"></i> {{ dado.E2_NUM }}</p>
          <p><i class="fas fa-phone"></i> {{ dado }}</p>
          <p><i class="fas fa-globe"></i> {{ dado }}</p>
        </div>
      </div>

      <div v-if="!isLoading && dados.length === 0 && !error" class="empty-state">
        Nenhum usuário encontrado
      </div>
    </div>
  </div>
</template>


<style scoped>
.user-list-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 1rem;
  background-color: #f8f9fa;
  min-width: 100vh;
}



.user-list-content {
  width: 100%;
  max-width: 1200px;
  background: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

.title {
  align-items: center;
  color: #141414;
  margin-bottom: 1.5rem;
  font-size: 2rem;
}



.fetch-button {
  background-color: #42b983;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 6px;
  cursor: pointer;
  font-size: 1rem;
  margin: 0 auto 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s ease;
}


.fetch-button:hover:not(:disabled) {
  background-color: #3aa876;
  transform: translateY(-2px);
}


.fetch-button:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
  opacity: 0.8;
}


.error-message {
  color: #dc3545;
  background-color: #f8d7da;
  padding: 1rem;
  border-radius: 6px;
  margin: 0 auto 1.5rem;
  max-width: 600px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}

.retry-button {
  background: none;
  border: 1px solid #dc3545;
  color: #dc3545;
  padding: 0.25rem 0.75rem;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-left: 0.5rem;
}

.retry-button:hover {
  background-color: #dc3545;
  color: white;
}

.user-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
  margin-top: 1.5rem;
}

.user-card {
  background: white;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  text-align: center;
  border: 1px solid #e9ecef;
}

.user-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.1);
}

.user-card h3 {
  margin: 0 0 1rem 0;
  color: #2c3e50;
  font-size: 1.25rem;
}

.user-card p {
  margin: 0.5rem 0;
  color: #6c757d;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}

.empty-state {
  text-align: center;
  padding: 2rem;
  color: #6c757d;
  font-size: 1.1rem;
}

.fa-spinner {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}

@media (max-width: 768px) {
  .user-list-container {
    padding: 1rem;
  }

  .user-list-content {
    padding: 1.5rem;
  }

  .user-grid {
    grid-template-columns: 1fr;
  }

  .title {
    font-size: 1.5rem;
  }
}
</style>
