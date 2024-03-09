<script setup>
import VueDraggableResizable from 'vue-draggable-resizable'

const props = defineProps({
  index: Number,
  options: Object,
  updateField: Function
})

const onDragStop = (x, y) => {
  emitUpdateField({ x, y })
}
const onResizeStop = (x, y, width, height) => {
  emitUpdateField({ x, y, width, height })
}
const emitUpdateField = (values) => {
  props.updateField(props.index, { ...props.options, ...values })
}
</script>

<template>
  <vue-draggable-resizable
    :parent="true"
    :x="options.x"
    :y="options.y"
    :w="options.width"
    :h="options.height"
    :grid="[options.grid, options.grid]"
    @dragStop="onDragStop"
    @resizeStop="onResizeStop"
  >
    <span>{{ options.title }}</span>
  </vue-draggable-resizable>
</template>
