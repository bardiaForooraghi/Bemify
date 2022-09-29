<template>
  <div id="app">
    <div>
    <ul class="nav justify-content-center sticky-top" id="navbar" v-if="!['signup', 'login'].includes(this.$route.name)">
      <li class="nav-item">
        <div v-b-modal.modal-1 id="navtext"><img src="../../images/upload.png" id="icon">Upload</div>
        <b-modal id="modal-1" content-class="popup" title="Upload your track">
          <b-container fluid>
            <b-row class="my-4 align-self-center d-flex justify-content-center" id="modal-body">
              <form id="inputFields">
                <input type="text" id="trackNameInput" placeholder="*Track name" required>
              </form>
            </b-row>
            <b-row class="my-4" id="modal-body">
              <b-form-file v-model="file" ref="file-input" class="mb-2" id="file-default" accept=".mp3, .WAV, .AIF, .mp4, .OGG, webM, .AAC, .aup3" placeholder="Choose or drop audio file here"></b-form-file>
              <b-button @click="file = null">Reset</b-button>
            </b-row>
            <b-row class="my-4 align-self-center d-flex justify-content-left" id="modal-body">
              <!-- <b-button @click="clearFiles" class="mr-2">Reset via method</b-button> -->
              <p class="mt-2">Selected file: <b>{{ file ? file.name : '' }}</b></p>
            </b-row>
          </b-container>
        </b-modal>
      </li>
      <li class="nav-item">
        <router-link to="/profile" id="navtext"><img src="../../images/user.png" id="icon">My Profile</router-link>
      </li>
      <li class="nav-item">
        <img src="../../images/bemify_logo.png" alt="logo" id="logo">
      </li>
      <li class="nav-item">
        <router-link to="/settings" id="navtext"><img src="../../images/settings.png" id="icon">Settings</router-link>
      </li>
      <li class="nav-item">
        <router-link to="/search" id="navtext"><img src="../../images/search.png" id="icon">Search</router-link>
      </li>
    </ul>
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

#body {
  font-family: "DM Sans", sans-serif;
  font-size: 20px;
  color: #E3D5CA;
  display: flex;
}

/* Navbar styling */

#navbar, .nav-item {
  font-family: "DM Sans", sans-serif;
  font-size: 20px;
  background-color: #0E1B3D;
  height:100px;
  line-height: 100px;
}

#navtext {
  color: #E3D5CA;
  padding: 0 65px;
  line-height: 100px;
  font-size: 20px;
  transition: color 0.4s ease-in-out;
}

#navtext:hover {
    text-decoration: none;
    color: #F76E45;

  }

#logo {
  height:90px;
  transform:rotate(-9deg);
  padding: 0 65px;
}

#icon {
  height: 25px;
  padding-right: 10px;
}

/* Modal (popup) styling */

.modal-content  {
    -webkit-border-radius: 0px !important;
    -moz-border-radius: 0px !important;
    border-radius: 30px !important;
    font-family: "DM Sans", sans-serif;
    /* width: 800px; */
}

#modal-body {
  padding: 0px;
  margin: auto;
  text-align: center;
}

#trackNameInput {
  width: 400px;
  height: 50px;
  border-radius: 30px;
  padding-left: 20px;
}

.mb-2 {
  width: 400px;
  height: 50px;
  border-radius: 30px;
}

.modal-header {
  padding-left: 200px;
}
</style>

<script>

/* JS for file upload reset */
export default {
  data() {
    return {
      file: null
    }
  },
  methods: {
    clearFiles() {
      this.$refs['file-input'].reset()
    }
  }
}
</script>
