<script setup>
import VueDraggableResizable from 'vue-draggable-resizable'
import { ref } from 'vue'

const element = ref({
  x: 20,
  y: 20,
  width: 'auto',
  height: 'auto'
})
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
            <vue-draggable-resizable
              :parent="true"
              :x="element.x"
              :y="element.y"
              :w="element.width"
              :h="element.height"
              :grid="[20, 20]"
            >
              <span>
                Hello! I'm a flexible component. You can drag me around and you can resize me.
              </span>
            </vue-draggable-resizable>
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
