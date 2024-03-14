<script setup>
import CanvasView from '@/views/CanvasView.vue'
import FieldsView from '@/views/FieldsView.vue'
import { ref } from 'vue'

const canvas = ref()

const generatePdf = () => {
  canvas.value.generatePdf()
}
</script>

<template>
  <v-container>
    <v-row>
      <v-col>
        <CanvasView ref="canvas" />
      </v-col>
      <v-col cols="3">
        <v-btn class="mb-2" color="success" size="x-large" block @click="generatePdf">
          Generate PDF
        </v-btn>
        <FieldsView />
      </v-col>
    </v-row>
  </v-container>
</template>
