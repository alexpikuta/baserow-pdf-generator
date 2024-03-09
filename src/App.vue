<script setup>
import { useDataStore } from '@/stores/dataStore'
import TokenView from '@/views/TokenView.vue'
import MainView from '@/views/MainView.vue'

const dataStore = useDataStore()
</script>

<template>
  <TokenView />
  <MainView />
  <br />
  <pre>
   {{ dataStore.fields }}
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
