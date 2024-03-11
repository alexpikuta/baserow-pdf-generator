<script setup>
import { computed } from 'vue'
import DraggableItem from '@/components/DraggableItem.vue'
import { useDataStore } from '@/stores/dataStore'
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib'
import download from 'downloadjs'

const dataStore = useDataStore()

const draggableFields = computed(() => dataStore.draggableFields)

const updateField = (index, updatedField) => {
  draggableFields.value.splice(index, 1, updatedField)
}
const generatePdf = async () => {
  const pdfDoc = await PDFDocument.create()
  const font = await pdfDoc.embedFont(StandardFonts.Courier)
  const page = pdfDoc.addPage()

  const { width, height } = page.getSize()
  const fontSize = 30

  const str = 'Some text that could be a long string'

  page.drawText(str, {
    x: 100,
    y: height - 30,
    width: 10,
    size: fontSize,
    font,
    color: rgb(0, 0.53, 0.71)
  })

  const pdfBytes = await pdfDoc.save()

  download(pdfBytes, 'pdf.pdf')
}
</script>

<template>
  {{ draggableFields }}

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
