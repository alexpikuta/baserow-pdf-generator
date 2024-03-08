<script setup>
import { reactive, onMounted } from 'vue'
import { useVuelidate } from '@vuelidate/core'
import { required, numeric } from '@vuelidate/validators'
import { useDataStore } from '@/stores/dataStore'

const dataStore = useDataStore()

const initialState = {
  apiKey: '',
  tableId: ''
}

const formState = reactive({
  ...initialState
})

const snackbarState = reactive({
  isSnackbarShown: false,
  snackbarText: '',
  typeColor: 'success'
})

const rules = {
  apiKey: { required },
  tableId: { required, numeric }
}

const v$ = useVuelidate(rules, formState)

const clear = () => {
  v$.value.$reset()

  for (const [key, value] of Object.entries(initialState)) {
    formState[key] = value
  }
}

const set = async () => {
  const isValid = await v$.value.$validate()

  if (isValid) {
    await fetchData()
    saveCredentials()
  }
}

const fetchData = async () => {
  await dataStore.fetchData(formState)
}

const saveCredentials = () => {
  if (!dataStore.error) {
    $cookies.set('credentials', formState, 0)
  }

  showNotification()
}

const showNotification = () => {
  if (dataStore.error) {
    snackbarState.snackbarText = dataStore.error
    snackbarState.isSnackbarShown = true
    snackbarState.typeColor = 'red-darken-2'

    return
  }
  snackbarState.snackbarText = 'API key was successfully saved'
  snackbarState.isSnackbarShown = true
}

const getCredentialsFromStore = () => {
  const credentials = $cookies.get('credentials')

  if (credentials) {
    formState.apiKey = credentials?.apiKey
    formState.tableId = credentials?.tableId

    return true
  }
}

onMounted(() => {
  if (getCredentialsFromStore()) {
    fetchData(formState)
  }
})
</script>

<template>
  <form>
    <v-container>
      <v-row>
        <v-col cols="12" md="5">
          <v-text-field
            v-model="formState.apiKey"
            :error-messages="v$.apiKey.$errors.map((e) => e.$message)"
            :counter="1"
            label="API key"
            type="password"
            required
            @input="v$.apiKey.$touch"
            @blur="v$.apiKey.$touch"
          />
        </v-col>

        <v-col cols="12" md="7" class="d-flex ga-5">
          <v-text-field
            v-model="formState.tableId"
            :error-messages="v$.tableId.$errors.map((e) => e.$message)"
            label="Table ID"
            required
            @input="v$.tableId.$touch"
            @blur="v$.tableId.$touch"
          />

          <v-btn size="x-large" color="indigo-darken-2" @click="set"> Connect </v-btn>
          <v-btn size="x-large" variant="outlined" color="danger" @click="clear"> Clear </v-btn>
        </v-col>
      </v-row>

      <v-snackbar v-model="snackbarState.isSnackbarShown" :color="snackbarState.typeColor">
        {{ snackbarState.snackbarText }}
      </v-snackbar>
    </v-container>
  </form>
</template>
