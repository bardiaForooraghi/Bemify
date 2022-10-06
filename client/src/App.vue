<template>
  <div id="app">
    <nav class="navbar navbar-expand-md justify-content-center" id="navbar" v-if="!['signup', 'login'].includes(this.$route.name)">
      <!-- <a class="navbar-brand" href="#"><img src="../../images/bemify_logo.png" alt="logo" id="logo"></a> -->
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarToggler01" aria-controls="navbarToggler01" aria-expanded="false" aria-label="Toggle navigation">
      <img src="../../images/bemify_logo.png" alt="logo-toggle" id="logo">
  </button>
  <div class="nav-item collapse navbar-collapse" id="navbarToggler01">
    <ul class="navbar-nav mt-2 mx-auto mt-md-0 align-items-center">
      <li class="nav-item">
        <div v-b-modal.modal-1 id="navtext"><img src="../../images/upload.png" id="icon">Upload</div>
        <b-modal id="modal-1" content-class="popup" title="Upload your track">
          <b-container fluid>
            <b-row class="my-4 align-self-center d-flex justify-content-center" id="modal-body">
              <form id="inputFields">
                <input type="text" id="trackNameInput" placeholder="Track name" required>
              </form>
            </b-row>
            <b-row class="my-4" id="modal-body">
              <b-form-file v-model="file" ref="file-input" class="mb-2" id="file-default" accept=".mp3, .WAV, .AIF, .mp4, .OGG, webM, .AAC, .aup3" placeholder="Choose or drop audio file here"></b-form-file>
              <b-button @click="file = null">Reset</b-button>
            </b-row>
            <b-row class="my-4 align-self-center d-flex justify-content-left" id="modal-body">
              <p class="mt-2">Selected file: <b>{{ file ? file.name : '' }}</b></p>
            </b-row>
          </b-container>
          <template #modal-footer>
          <div class="w-100">
            <b-button
              variant="primary"
              size="sm"
              class="float-right"
              @click="show=false"
              id="uploadButton">
              Upload
            </b-button>
            <b-button
              variant="primary"
              size="sm"
              class="float-right"
              @click="show=false"
              id="closeButton">
              Close
            </b-button>
          </div>
          </template>
        </b-modal>
      </li>
      <li class="nav-item">
        <router-link to="/profile" id="navtext"><img src="../../images/user.png" id="icon">My Profile</router-link>
      </li>
      <li class="nav-item collapse navbar-collapse" id="navbarToggler01">
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
</nav>
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
#navbar {
  background-color: #0E1B3D;
}

.nav-item {
  font-family: "DM Sans", sans-serif;
  font-size: 20px;
  margin-left: 35px;
  margin-right: 35px;
}

#navtext {
  color: #E3D5CA;
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
}

#logo-toggle {
  margin: 0 0 20px 0;
  height:90px;
  transform:rotate(-9deg);
}

#icon {
  height: 25px;
  padding-right: 10px;
}
/* Navbar styling */

/* Modal (popup) styling */
.modal-content  {
    -webkit-border-radius: 0px !important;
    -moz-border-radius: 0px !important;
    border-radius: 30px !important;
    font-family: "DM Sans", sans-serif;
}

#modal-1___BV_modal_content_.modal-content.popup {
  width: 550px;
}

#modal-body {
  padding: 0px;
  margin: auto;
  text-align: center;
}

#trackNameInput {
  width: 90%;
  height: 50px;
  border-radius: 30px;
  padding-left: 20px;
  background-color: #E3D5CA;
  border: none;
}

#file-default.custom-file-input {
  width: 40%;
  height: 50px;
  border-radius: 30px;
  background-color: #E3D5CA;
  border: none;
}

.mb-2 {
  width: 400px;
  height: 50px;
  border-radius: 30px;
}

.modal-header {
  padding-left: 200px;
}

#file-default__BV_file_outer_.custom-file b-form-file mb-2 {
  width: 40px;
}

#closeButton {
  background: none;
  border-width: 3px;
  border-color: #E3D5CA;;
  width: 25%;
  height: 40px;
  margin: 10px;
  color: #E3D5CA;
  font-size: 17px;
  border-radius: 20px;
}

#uploadButton {
  background-color: #F76E45;
  border: none;
  width: 25%;
  height: 40px;
  margin: 10px;
  font-size: 17px;
  border-radius: 20px;
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
