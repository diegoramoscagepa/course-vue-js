<script setup>
import { ref, onMounted, onUpdated } from 'vue'

// reactive state
const count = ref(0)

// functions that mutate state and trigger updates
function increment() {
    count.value++
}

// Serve para montar o componente
onMounted(() => console.log(`The initial count is ${count.value}.`));


</script>

<template>
    <button @click="increment">Count is: {{ count }}</button>
</template>
