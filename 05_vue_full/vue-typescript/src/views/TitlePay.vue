<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import api from '@/services/api';

const dados = ref([]);
const isLoading = ref(true);
const error = ref(null);
const itemsPerPage = 10;
const currentPage = ref(1);


const totalPages = computed(() => {
  if (!dados.value) return 0;
  return Math.ceil(dados.value.APIGEN.ITEM.length / itemsPerPage)
});

const paginatedItems = computed(() => {
  if (!dados.value?.APIGEN?.ITEM) return [];
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return dados.value.APIGEN.ITEM.slice(start, end);
});

const nextPage = () => currentPage.value++;
const prevPage = () => currentPage.value--;

const fetchUsers = async () => {
  isLoading.value = true;
  error.value = null;
  currentPage.value = 1;

  try {

    const response = await api.get(import.meta.env.VITE_APP_API_ENDPOINT);
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

const hasItems = computed(() => {
  return dados.value && dados.value.APIGEN > 0
});

console.log(hasItems)

onMounted(
  fetchUsers
)

</script>
<template>
  <div class="min-h-screen bg-gray-50 p-4 flex justify-center items-start">
    <div class="w-full max-w-6xl bg-white rounded-xl shadow-md p-6">
      <h1 class="text-2xl font-bold text-gray-800 mb-6">Titulos a pagar</h1>
      <button @click="fetchUsers" :disabled="isLoading" class="bg-emerald-500 text-white px-6 py-2 rounded-lg font-medium mb-6
               hover:bg-emerald-600 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed
               flex items-center gap-2 mx-auto">
        <span v-if="isLoading">
          <i class="fas fa-spinner fa-spin"></i> Carregando...
        </span>
        <span v-else>
          <i class="fas fa-sync-alt"></i> Atualizar Lista
        </span>
      </button>

      <div v-if="error" class="bg-red-50 text-red-600 p-4 rounded-lg mb-6 flex items-center justify-center gap-2">
        <i class="fas fa-exclamation-triangle"></i> {{ error }}
        <button @click="fetchUsers" class="retry-button">Tentar novamente</button>
      </div>

      <div v-if="dados && dados.APIGEN && dados.APIGEN.ITEM" class="relative overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-emerald-500">
            <tr>
              <th scope="col" class="px-6 py-3 text-align text-base font-medium text-white uppercase tracking-wider">
                Filial
              </th>
              <th scope="col" class="px-6 py-3 text-align text-base font-medium text-white uppercase tracking-wider">
                Cód.
                Filial</th>
              <th scope="col" class="px-6 py-3 text-align text-base font-medium text-white uppercase tracking-wider">
                Tipo
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(dado, index) in paginatedItems" :key="index">
              <td class="px-6 py-4
              whitespace-nowrap text-sm text-gray-800">
                {{ Object.values(dado)[0] || '-' }}</td>
              <td class="px-6 py-4
              whitespace-nowrap text-sm text-gray-800">
                {{ Object.values(dado)[1] || '-' }}</td>
              <td class="px-6 py-4
              whitespace-nowrap text-sm text-gray-800">
                {{ Object.values(dado)[2] || '-' }}</td>
            </tr>
          </tbody>
        </table>
        <div v-if="!isLoading && (!dados.APIGEN || !dados.APIGEN.ITEM || dados.APIGEN.ITEM.length === 0) && !error"
          class="empty-state">
          Nenhum título a pagar carregado!
        </div>
      </div>
      <div v-if="validateDate" class="mt-4 flex justify-between items-center">
        <button @click="prevPage" :disabled="currentPage === 1" class="px-4 py-2 border rounded-md text-sm font-medium
                 disabled:opacity-50 disabled:cursor-not-allowed">
          Anterior
        </button>
        <span class="text-sm text-gray-700">
          Página {{ currentPage }} de {{ totalPages }}
        </span>
        <button @click="nextPage" :disabled="currentPage === totalPages" class="px-4 py-2 border rounded-md text-sm font-medium
                 disabled:opacity-50 disabled:cursor-not-allowed">
          Próxima
        </button>
      </div>
    </div>
  </div>
</template>


<style scoped></style>
