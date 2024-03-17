<script setup>
import { ref, computed, watch } from 'vue'
import { useDataStore } from '@/stores/dataStore'

const dataStore = useDataStore()

const activeFieldIndex = computed(() =>
  dataStore.draggableFields.findIndex((field) => field.id === dataStore.configurableId)
)
let activeField = dataStore.draggableFields[activeFieldIndex.value]

const fontSize = ref()
const changeFontSize = (diff) => {
  fontSize.value = Number(fontSize.value) + diff
}
watch(fontSize, (newValue) => {
  dataStore.draggableFields[activeFieldIndex.value].fontSize = newValue
})

const fontWeight = ref()
const changeFontWeight = (diff) => {
  fontWeight.value = Number(fontWeight.value) + diff
}

const setInitialValues = () => {
  fontSize.value = activeField.fontSize
  fontWeight.value = activeField.fontWeight
}

watch(
  activeFieldIndex,
  () => {
    activeField = dataStore.draggableFields[activeFieldIndex.value]
    setInitialValues()
  },
  { immediate: true }
)
</script>

<template>
  <v-col class="inputs-row d-flex gc-2">
    <v-text-field
      v-model="fontSize"
      label="Font Size"
      type="number"
      density="compact"
      dense
      outlined
      hide-spin-buttons
      hide-details
    >
      <template #prepend-inner>
        <v-btn icon variant="plain" size="x-small" @click="changeFontSize(-1)">
          <v-icon>mdi-minus</v-icon>
        </v-btn>
      </template>
      <template #append-inner>
        <v-btn icon variant="plain" size="x-small" @click="changeFontSize(1)">
          <v-icon>mdi-plus</v-icon>
        </v-btn>
      </template>
    </v-text-field>

    <v-text-field
      v-model="fontWeight"
      label="Font Weight"
      type="number"
      density="compact"
      dense
      outlined
      hide-spin-buttons
      hide-details
    >
      <template #prepend-inner>
        <v-btn icon variant="plain" size="x-small" @click="changeFontWeight(-1)">
          <v-icon>mdi-minus</v-icon>
        </v-btn>
      </template>
      <template #append-inner>
        <v-btn icon variant="plain" size="x-small" @click="changeFontWeight(1)">
          <v-icon>mdi-plus</v-icon>
        </v-btn>
      </template>
    </v-text-field>
  </v-col>
</template>

<style>
.inputs-row > div {
  flex-grow: 0;
}
</style>
