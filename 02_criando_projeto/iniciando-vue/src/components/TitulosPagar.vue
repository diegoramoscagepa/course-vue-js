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

    const response = await api.get(import.meta.env.VITE_APP_API_ENDPOINT, {
      params: { cCodIntegracao: '000024' },
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

      <div v-if="dados && dados.APIGEN && dados.APIGEN.ITEM" class="table-container">
        <table class="data-table">
          <thead>
            <tr>
              <th>Filial</th>
              <th>Cód. Filial</th>
              <th>Tipo</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(dado, index) in dados.APIGEN.ITEM" :key="index">
              <td>{{ dado.E2_NUM || 'N/A' }}</td>
              <td>{{ dado.E2_FILIAL || 'N/A' }}</td>
              <td>{{ dado.E2_TIPO || 'N/A' }}</td>
            </tr>
          </tbody>
        </table>

      </div>


      <div v-if="!isLoading && dados.length === 0 && !error" class="empty-state">
        Nenhum título a pagar carregado!
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
.table-container {
  width: 100%;
  overflow-x: auto;
  margin-top: 1.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
}

.data-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.9rem;
}

.data-table th,
.data-table td {
  padding: 12px 15px;
  text-align: center;
  border-bottom: 1px solid #e9ecef;
}

.data-table th {
  background-color: #42b983;
  color: white;
  font-weight: 600;
  text-transform: uppercase;
  font-size: 0.8rem;
  letter-spacing: 0.5px;
}

.data-table tr:hover {
  background-color: #f8f9fa;
}

.data-table tr:nth-child(even) {
  background-color: #f8f9fa;
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

  .data-table {
    display: block;
    overflow-x: auto;
    white-space: nowrap;
  }

  .data-table th,
  .data-table td {
    padding: 8px 10px;
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
