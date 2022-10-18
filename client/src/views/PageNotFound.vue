<template>
    <div>
        <h1 class="notFound">404 Page Not Found!</h1>
        <b-button variant="outline-primary" @click="loginPage">Login Page</b-button>
    </div>
</template>

<style>
.notFound {
    color: #f76e45;
    font-size: 40px;
    font-family: 'DM Sans', sans-serif;
}
</style>

<script>
export default {
  methods: {
    loginPage() {
      this.$router.push('/')
    }
  }
}
</script>
