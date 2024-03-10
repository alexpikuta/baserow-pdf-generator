<script setup>
import { computed } from 'vue'
import { useDataStore } from '@/stores/dataStore'
import FieldItem from '@/components/FieldItem.vue'

const dataStore = useDataStore()

const fields = computed(() => {
  return dataStore.fields
})
</script>

<template>
  <v-list>
    <FieldItem v-for="field in fields" :key="field.id" :field="field" />
  </v-list>
</template>
