<template>
  <div id="app">
    <prison-population />
  </div>
</template>

<script>
import PrisonPopulation from './components/PrisonPopulation.vue'

export default {
  name: 'app',
  components: {
    PrisonPopulation
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
