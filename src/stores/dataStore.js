import { defineStore } from 'pinia'
import { getRows, getFields } from '@/api/data.api'
import { defaultFieldOptions } from '@/helpers/constants'

export const useDataStore = defineStore({
  id: 'dataStore',
  state: () => ({
    fields: null,
    selectedFields: [],
    draggableFields: [],
    rows: [],
    configurableField: null,
    configurableId: 0,
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
        this.composeDraggableFields(fieldId)
      } else {
        this.selectedFields.splice(index, 1)

        // Remove item from draggableIndex
        const draggableIndex = this.draggableFields.findIndex((field) => {
          return field.id === fieldId
        })
        this.draggableFields.splice(draggableIndex, 1)
      }
    },
    composeDraggableFields(fieldId) {
      this.draggableFields.push({
        id: fieldId,
        title: this.fields.find((f) => f.id === fieldId).name,
        ...defaultFieldOptions
      })
    },
    setConfigurableId(id) {
      this.configurableId = id
    }
  }
})
