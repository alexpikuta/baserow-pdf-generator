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

const updateField = (index, updatedField) => {
  selectedFields.value.splice(index, 1, updatedField)
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

  if (!dataStore.rows) {
    await dataStore.fetchRows()
  }

  const rows = dataStore.rows

  if (!rows?.length) {
    snackbar.text = messages.noRows
    snackbar.isShown = true
    return
  }

  rows.forEach((row) => {
    debugger
  })

  const hiddenElement = hidden.value
  const pdfDoc = await PDFDocument.create()
  const font = await pdfDoc.embedFont(StandardFonts.Courier)
  const page = pdfDoc.addPage()
  pdfDoc.setCreator(META_APPLICATION)
  pdfDoc.setProducer(META_PRODUCER)
  pdfDoc.setAuthor(META_CREATOR)

  const str = 'Š Š I ŠŠŠ ŠŠŠ  ŠŠŠ'
  const fontSize = 15
  const lineHeight = fontSize * 1.2

  // Emulate htmlElement to calculate final height and split text into rows
  const textElement = document.createElement('p')

  textElement.style.width = '100px'
  textElement.style.fontSize = fontSize + 'px'
  textElement.style.fontFamily = 'Courier'
  textElement.style.display = 'inline-block'
  textElement.style.lineHeight = lineHeight + 'px'
  textElement.textContent = str

  hiddenElement.append(textElement)
  textElement.innerHTML = wrapWords(textElement)

  const textLines = getLines(textElement)

  const { width, height } = page.getSize()
  //   const fontSize = 30
  //   const lineHeight = 30
  //   page.fontSize = fontSize
  //   page.lineHeight = lineHeight
  //   { "id": 1888343, "x": 20, "y": 20, "width": 60, "height": 60, "grid": 20, "title": "Name" }
  //   debugger
  //   page.moveTo(1, height - 60)
  const coefficient = 0.18 // a "magic" number, seems like a bug in pdf-lib ¯\_(ツ)_/¯
  //   debugger

  debugger

  page.drawText(textLines, {
    x: 20,
    y: height - 20 - fontSize + fontSize * coefficient,
    //  width: 10,
    size: fontSize,
    lineHeight: lineHeight - lineHeight * coefficient,
    font,
    color: rgb(0, 0, 0)
  })
  //   debugger
  //   page.drawRectangle({
  //     x: 1,
  //     y: height - 150 - 1,
  //     width: 150,
  //     height: 150,
  //     borderWidth: 1,
  //     color: rgb(0.75, 0.2, 0.2),
  //     opacity: 0.5,
  //     borderOpacity: 0.75
  //   })

  const pdfBytes = await pdfDoc.save()

  download(pdfBytes, 'pdf.pdf')
}

defineExpose({ generatePdf })

// onMounted(() => {
//   generatePdf()
// })
</script>

<template>
  <div ref="hidden" class="hidden1"></div>
  {{ selectedFields }}

  <div class="bg-grey-lighten-2">
    <v-responsive
      class="canvas"
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
