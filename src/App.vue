<script>
export default {
  methods: {
    goTo(path) {
      this.$router.replace({path: path, query: {}})
    },
  },
}
</script>

<template>
  <v-container class="text-center">
  <v-row justify="center">
    <v-col cols="12" sm="6" md="4">
      <v-btn block rounded="xl" size="large" @click="goTo('/')">CRUD TEST</v-btn>
    </v-col>

    <v-col cols="12" sm="6" md="4">
      <v-btn block rounded="xl" size="large" @click="goTo('/api')">API TEST</v-btn>
    </v-col>
  </v-row>
</v-container>
  <br>
  <router-view />
</template>

<style scoped>
</style>