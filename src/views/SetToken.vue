<script setup>
import { reactive } from 'vue'
import { useVuelidate } from '@vuelidate/core'
import { required, numeric } from '@vuelidate/validators'

const initialState = {
  apiKey: '',
  tableId: ''
  // select: null,
  // checkbox: null
}

const state = reactive({
  ...initialState
})

// const items = ['Item 1', 'Item 2', 'Item 3', 'Item 4']

const rules = {
  apiKey: { required },
  tableId: { required, numeric }

  // select: { required },
  // items: { required },
  // checkbox: { required }
}

const v$ = useVuelidate(rules, state)

const clear = () => {
  v$.value.$reset()

  for (const [key, value] of Object.entries(initialState)) {
    state[key] = value
  }
}
const set = async () => {
  const isValid = await v$.value.$validate()

  if (isValid) {
    debugger
  }
}
</script>

<template>
  <form>
    <v-container>
      <v-row>
        <v-col cols="5">
          <v-text-field
            v-model="state.apiKey"
            :error-messages="v$.apiKey.$errors.map((e) => e.$message)"
            :counter="1"
            label="API key"
            required
            @input="v$.apiKey.$touch"
            @blur="v$.apiKey.$touch"
          />
        </v-col>

        <v-col cols="4">
          <v-text-field
            v-model="state.tableId"
            :error-messages="v$.tableId.$errors.map((e) => e.$message)"
            label="Table ID"
            required
            @input="v$.tableId.$touch"
            @blur="v$.tableId.$touch"
          />
        </v-col>

        <v-col cols="3" class="d-flex justify-space-around">
          <v-btn size="x-large" color="indigo-darken-2" class="me-4" @click="set"> Set </v-btn>
          <v-btn size="x-large" variant="outlined" color="danger" @click="clear"> Clear </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </form>
</template>
