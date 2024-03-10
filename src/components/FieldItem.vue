<script setup>
import { computed } from 'vue'
import { useDataStore } from '@/stores/dataStore'

const dataStore = useDataStore()

const props = defineProps({
  field: Object,
  selected: Array
})

const toggleSelection = () => {
  dataStore.toggleSelection(props.field.id)
}

const isActive = computed(() => {
  return dataStore.selectedFields.includes(props.field.id)
})
</script>

<template>
  <v-list-item
    :value="field.id"
    color="primary"
    :variant="isActive ? 'tonal' : 'plain'"
    :appendIcon="isActive ? 'mdi-close' : null"
    @click="toggleSelection"
  >
    <v-list-item-title>{{ field.name }}</v-list-item-title>
  </v-list-item>
</template>
