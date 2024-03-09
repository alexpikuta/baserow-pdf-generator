<script setup>
import DraggableItem from '@/components/DraggableItem.vue'
import { ref } from 'vue'

const fields = ref([
  {
    x: 20,
    y: 20,
    width: 'auto',
    height: 'auto',
    grid: 20,
    title: 'Field #1'
  },
  {
    x: 20,
    y: 20,
    width: 'auto',
    height: 'auto',
    grid: 20,
    title: 'Field #2'
  }
])

const updateField = (index, updatedField) => {
  fields.value.splice(index, 1, updatedField)
}
</script>

<template>
  <v-container>
    <v-row>
      <v-col>
        <div class="bg-grey-lighten-2">
          <v-responsive
            class="canvas"
            :style="{
              backgroundSize: '20px 20px, 20px 20px'
            }"
            :aspect-ratio="9 / 16"
          >
            <DraggableItem
              v-for="(field, index) in fields"
              :key="index"
              :index="index"
              :options="field"
              :updateField="updateField"
            />
          </v-responsive>
        </div>
      </v-col>
    </v-row>
  </v-container>
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
