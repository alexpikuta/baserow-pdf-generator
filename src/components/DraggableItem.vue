<script setup>
import { ref, onMounted, watch, nextTick } from 'vue'
import VueDraggableResizable from 'vue-draggable-resizable'
import { useDataStore } from '@/stores/dataStore'

const dataStore = useDataStore()

const props = defineProps({
  index: Number,
  options: Object,
  updateField: Function
})

const element = ref()

const onDragStop = (x, y) => {
  emitUpdateField({ x, y })
}
const onResizeStop = (x, y, width, height) => {
  emitUpdateField({ x, y, width, height })
}
const emitUpdateField = (values) => {
  props.updateField(props.index, { ...props.options, ...values })
}

const onActivated = () => {
  dataStore.setConfigurableId(props.options.id)
}

// Changing fontSize lead to changing inner block height/width
// This may cause the block to go out of bounds
// To prevent this, we watch for font changes and call emitUpdateField with new values if needed
const elementInner = ref()
watch(
  () => props.options.fontSize,
  async () => {
    const initialGrid = props.options.grid
    const { width, height } = elementInner.value.getClientRects()[0]

    if (props.options.width <= width && props.options.height <= height) {
      await emitUpdateField({ width, height, grid: 1 })
      emitUpdateField({ grid: initialGrid })

      return
    }

    if (props.options.width <= width) {
      await emitUpdateField({ width, grid: 1 })
    }
    if (props.options.height <= height) {
      await emitUpdateField({ height, grid: 1 })
    }

    emitUpdateField({ grid: initialGrid })
  }
)

onMounted(() => {
  nextTick(() => {
    emitUpdateField({
      width: element.value.width * 2, // assign 2x more space by-default
      height: element.value.height
    })
  })
})
</script>

<template>
  <vue-draggable-resizable
    ref="element"
    :style="{
      fontSize: options.fontSize + 'px',
      color: options.color
    }"
    :parent="true"
    :x="options.x"
    :y="options.y"
    :w="options.width"
    :h="options.height"
    :grid="[options.grid, options.grid]"
    @dragStop="onDragStop"
    @resizeStop="onResizeStop"
    @activated="onActivated"
  >
    <span ref="elementInner" class="no-select">{{ options.title }}</span>
  </vue-draggable-resizable>
</template>

<style>
.no-select {
  -webkit-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
</style>
