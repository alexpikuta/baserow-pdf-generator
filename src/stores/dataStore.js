import { defineStore } from 'pinia'

export const useDataStore = defineStore({
  id: 'dataStore',
  state: () => ({
    data: null,
    loading: false,
    error: null
  }),
  actions: {
    async fetchData() {
      try {
        this.loading = true
        const { apiKey, tableId } = $cookies.get('credentials')
        //   debugger
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
        debugger
        this.data = data
      } catch (error) {
        this.error = error.message
      } finally {
        this.loading = false
      }
    }
  }
})
