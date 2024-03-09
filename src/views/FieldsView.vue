<script setup>
import { ref } from 'vue'

const items = ref([
  {
    title: 'Item #2',
    value: 2,
    props: {
      appendIcon: 'mdi-close',
      color: 'primary',
      variant: 'tonal'
    }
  },
  {
    title: 'Item #3',
    value: 3,
    props: {
      color: 'primary',
      variant: 'tonal'
    }
  }
])
</script>

<template>
  <v-list :items="items"></v-list>
</template>
