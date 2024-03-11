<script setup>
import { useDataStore } from '@/stores/dataStore'
import TokenView from '@/views/TokenView.vue'
import MainView from '@/views/MainView.vue'

const dataStore = useDataStore()
</script>

<template>
  <TokenView />
  <MainView />
  <br />
  <pre>
   {{ dataStore.fields }}
  </pre>
</template>
