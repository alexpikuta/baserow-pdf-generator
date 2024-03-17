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
  dataStore.draggableFields[activeFieldIndex.value].fontSize = Number(newValue)
})

const lineHeight = ref()
const changeLineHeight = (diff) => {
  lineHeight.value = Number(lineHeight.value) + diff
}
watch(lineHeight, (newValue) => {
  dataStore.draggableFields[activeFieldIndex.value].lineHeight = Number(newValue)
})

const setInitialValues = () => {
  fontSize.value = activeField.fontSize
  lineHeight.value = activeField.lineHeight
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
      v-model="lineHeight"
      label="Line Height"
      type="number"
      density="compact"
      dense
      outlined
      hide-spin-buttons
      hide-details
    >
      <template #prepend-inner>
        <v-btn icon variant="plain" size="x-small" @click="changeLineHeight(-1)">
          <v-icon>mdi-minus</v-icon>
        </v-btn>
      </template>
      <template #append-inner>
        <v-btn icon variant="plain" size="x-small" @click="changeLineHeight(1)">
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
