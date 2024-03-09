import { defineStore } from 'pinia'
import { getRows, getFields } from '@/api/data.api'

export const useDataStore = defineStore({
  id: 'dataStore',
  state: () => ({
    fields: null,
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
    }
  }
})
