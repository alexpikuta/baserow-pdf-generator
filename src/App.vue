<script setup>
import TokenView from '@/components/TokenView.vue'
import { useDataStore } from '@/stores/dataStore'

const dataStore = useDataStore()
</script>

<template>
  <TokenView />

  <br />
  <pre>
   {{ dataStore.data }}
  </pre>
  <!-- <header>
    <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />

    <div class="wrapper">
      <HelloWorld msg="You did it!" />

      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav>
    </div>
  </header> -->

  <!-- <RouterView /> -->
</template>
