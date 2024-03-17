<script setup>
import { ref, computed, reactive } from 'vue'
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib'
import download from 'downloadjs'
import { useDataStore } from '@/stores/dataStore'
import { wrapWords, getLines } from '@/helpers'
import { META_APPLICATION, META_PRODUCER, META_CREATOR } from '@/helpers/constants'
import messages from '@/helpers/messages'

import DraggableItem from '@/components/DraggableItem.vue'

const dataStore = useDataStore()

const selectedFields = computed(() => dataStore.draggableFields)

const updateField = async (index, updatedField) => {
  await dataStore.draggableFields.splice(index, 1, updatedField)
}

const snackbar = reactive({
  isShown: false,
  text: ''
})

const hidden = ref()
const generatePdf = async () => {
  if (!selectedFields.value.length) {
    snackbar.text = messages.emptyCanvas
    snackbar.isShown = true
    return
  }

  if (!dataStore.rows.length) {
    await dataStore.fetchRows()
  }

  const rows = dataStore.rows

  if (!rows?.length) {
    snackbar.text = messages.noRows
    snackbar.isShown = true
    return
  }

  rows.forEach(async (row) => {
    // Create PDF for each row
    const pdfDoc = await PDFDocument.create()
    const font = await pdfDoc.embedFont(StandardFonts.Courier)
    const page = pdfDoc.addPage()
    pdfDoc.setCreator(META_APPLICATION)
    pdfDoc.setProducer(META_PRODUCER)
    pdfDoc.setAuthor(META_CREATOR)

    selectedFields.value.forEach(async (field) => {
      const { x, y, width, fontSize, lineHeight } = field
      const { height } = page.getSize()

      const rowText = row['field_' + field.id]

      // Emulate htmlElement to calculate block's height and split text into rows
      const textElement = document.createElement('p')

      const coefficient = 0.18 // a "magic" number, seems like a bug in pdf-lib ¯\_(ツ)_/¯

      textElement.style.fontFamily = 'Courier'
      textElement.style.display = 'inline-block'
      textElement.style.width = width + 'px'
      textElement.style.fontSize = fontSize + 'px'
      textElement.style.lineHeight = lineHeight + 'px'
      textElement.textContent = rowText

      hidden.value.append(textElement)
      textElement.innerHTML = wrapWords(textElement)

      const textLines = getLines(textElement)

      page.drawText(textLines, {
        x,
        y: height - y - fontSize + fontSize * coefficient,
        lineHeight: lineHeight - lineHeight * coefficient,
        size: fontSize,
        font,
        color: rgb(0, 0, 0)
      })

      // Clear hidden block with temporary text
      hidden.value.textContent = ''
    })

    const pdfBytes = await pdfDoc.save()

    download(pdfBytes, `Baserow_${$cookies.get('credentials').tableId}_${row.id}.pdf`)
  })
}

defineExpose({ generatePdf })
</script>

<template>
  <div ref="hidden" class="hidden"></div>
  <div class="canvas bg-grey-lighten-2">
    <v-responsive
      class="canvas__inner"
      :style="{
        backgroundSize: '20px 20px, 20px 20px'
      }"
      :aspect-ratio="9 / 16"
    >
      <DraggableItem
        v-for="(field, index) in selectedFields"
        :key="index"
        :index="index"
        :options="field"
        :updateField="updateField"
      />
    </v-responsive>
  </div>
  <v-snackbar v-model="snackbar.isShown" color="warning">
    {{ snackbar.text }}
  </v-snackbar>
</template>

<style>
@import 'vue-draggable-resizable/style.css';

.canvas {
  height: 842px; /* PDF's height and width */
  width: 595px;
  margin: auto;
}

.canvas__inner {
  font-family: Courier;
  background: linear-gradient(-90deg, rgba(0, 0, 0, 0.1) 1px, transparent 1px),
    linear-gradient(rgba(0, 0, 0, 0.1) 1px, transparent 1px);
}

.draggable {
  cursor: grab;
}

.hidden {
  position: absolute;
  top: -9999px;
  left: -9999px;
}
</style>
