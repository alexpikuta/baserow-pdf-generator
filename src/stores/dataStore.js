import { defineStore } from 'pinia'
import { getRows, getFields } from '@/api/data.api'

export const useDataStore = defineStore({
  id: 'dataStore',
  state: () => ({
    fields: null,
    selectedFields: [],
    draggableFields: [],
    rows: null,
    loading: false,
    error: null
  }),
  actions: {
    async getFields(formData) {
      try {
        this.error = null
        this.loading = true

        const response = await getFields(formData)

        this.fields = response
      } catch (error) {
        this.error = error.message
      } finally {
        this.loading = false
      }
    },
    async fetchRows(formData) {
      try {
        this.error = null
        this.loading = true

        const response = await getRows(formData)

        this.rows = response.results
      } catch (error) {
        this.error = error.message
      } finally {
        this.loading = false
      }
    },
    toggleSelection(fieldId) {
      const index = this.selectedFields.indexOf(fieldId)

      if (index === -1) {
        this.selectedFields.push(fieldId)
        this.createDraggableFields(fieldId)
      } else {
        this.selectedFields.splice(index, 1)
      }
    },
    createDraggableFields(fieldId) {
      this.draggableFields.push({
        id: fieldId,
        x: 20,
        y: 20,
        width: 'auto',
        height: 'auto',
        grid: 20,
        title: this.fields.find((f) => f.id === fieldId).name
      })
    }
  }
})
