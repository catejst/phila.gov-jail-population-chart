<template>
  <div id="vue-app">
    <jail-population />
  </div>
</template>

<script>
import JailPopulation from './components/JailPopulation.vue'

export default {
  name: 'app',
  components: {
    JailPopulation
  }
}
</script>

<style>
/* #app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
} */
</style>
