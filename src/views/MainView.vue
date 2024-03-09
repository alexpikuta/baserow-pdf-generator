<script setup>
import CanvasView from '@/views/CanvasView.vue'
import FieldsView from '@/views/FieldsView.vue'
</script>

<template>
  <v-container>
    <v-row>
      <v-col>
        <CanvasView />
      </v-col>
      <v-col cols="3">
        <FieldsView />
      </v-col>
    </v-row>
  </v-container>
</template>
