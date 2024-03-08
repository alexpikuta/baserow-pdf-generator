import { defineStore } from 'pinia'

export const useDataStore = defineStore({
  id: 'dataStore',
  state: () => ({
    data: null,
    loading: false,
    error: null
  }),
  actions: {
    async fetchData(formData) {
      try {
        this.loading = true
        const { apiKey, tableId } = formData
        const response = await fetch(`https://api.baserow.io/api/database/rows/table/${tableId}/`, {
          headers: {
            Authorization: `Token ${apiKey}`,
            'Content-Type': 'application/json'
          }
        })

        const data = await response.json()

        if (data.error) {
          throw new Error(data.detail)
        }

        this.data = data.results
      } catch (error) {
        this.error = error.message
      } finally {
        this.loading = false
      }
    }
  }
})
