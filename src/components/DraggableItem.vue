<script setup>
import { ref, onMounted, nextTick } from 'vue'
import VueDraggableResizable from 'vue-draggable-resizable'

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
  debugger
}

const onDeactivated = () => {
  debugger
}

onMounted(() => {
  nextTick(() => {
    emitUpdateField({
      width: element.value.width,
      height: element.value.height
    })
  })
})
</script>

<template>
  <vue-draggable-resizable
    ref="element"
    :parent="true"
    :x="options.x"
    :y="options.y"
    :w="options.width"
    :h="options.height"
    :grid="[options.grid, options.grid]"
    @dragStop="onDragStop"
    @resizeStop="onResizeStop"
    @activated="onActivated"
    @deactivated="onDeactivated"
  >
    <span>{{ options.title }}</span>
  </vue-draggable-resizable>
</template>
