<script setup>
import { computed } from 'vue'
import DraggableItem from '@/components/DraggableItem.vue'
import { useDataStore } from '@/stores/dataStore'

const dataStore = useDataStore()

const draggableFields = computed(() => dataStore.draggableFields)

const updateField = (index, updatedField) => {
  draggableFields.value.splice(index, 1, updatedField)
}
</script>

<template>
  <div class="bg-grey-lighten-2">
    <v-responsive
      class="canvas"
      :style="{
        backgroundSize: '20px 20px, 20px 20px'
      }"
      :aspect-ratio="9 / 16"
    >
      <DraggableItem
        v-for="(field, index) in draggableFields"
        :key="index"
        :index="index"
        :options="field"
        :updateField="updateField"
      />
    </v-responsive>
  </div>
</template>

<style>
@import 'vue-draggable-resizable/style.css';

.canvas {
  background: linear-gradient(-90deg, rgba(0, 0, 0, 0.1) 1px, transparent 1px),
    linear-gradient(rgba(0, 0, 0, 0.1) 1px, transparent 1px);
}
.draggable {
  cursor: grab;
}
</style>
