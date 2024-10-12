<script setup lang="ts">
import Card from './Card.vue'

const cards = Array.from(Array(100), (_, x) => `Card ${x + 1}`)

// Add code to this file to complete the task
</script>

<template>
  <div>
    <Card v-for="(card, id) in cards" :cardText="card" :key="id">
      <p>{{ card }}</p>
    </Card>
  </div>
</template>

<style scoped></style>
