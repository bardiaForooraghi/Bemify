<template>
  <div id="app">
    <div id="nav"  v-if="!['signup', 'login'].includes(this.$route.name)">
      <router-link to="/upload" id="navtext"><img src="../../images/upload.png" id="icon">Upload</router-link>
      <router-link to="/profile" id="navtext"><img src="../../images/user.png" id="icon">My Profile</router-link>
      <router-link to="/"><img src="../../images/bemify_logo.png" id="logo"></router-link>
      <router-link to="/settings" id="navtext"><img src="../../images/settings.png" id="icon">Settings </router-link>
      <router-link to="/search" id="navtext"><img src="../../images/search.png" id="icon">Search</router-link>
    </div>
    <div id="body"></div>
    <!-- Render the content of the current page view -->
    <router-view/>
  </div>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=DM+Sans&display=swap');

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  min-height: 970px;
  background-color: #183059;
}

#nav, #navtext {
  font-family: "DM Sans", sans-serif;
  font-size: 20px;
  color: #E3D5CA;
  background-color: #0E1B3D;
  height:105px;
  padding-left: 100px;
  padding-right: 100px;
}

#navtext {
  line-height: 105px;
}

#logo {
  height:90px;
  transform:rotate(-9deg);
  padding-left: 100px;
  padding-right: 100px;
}

#icon {
  height: 25px;
  padding-right: 10px;
}

#body {
  font-family: "DM Sans", sans-serif;
  font-size: 20px;
  color: #E3D5CA;
  display: flex;
}
</style>
