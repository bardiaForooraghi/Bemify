<template>
  <div class="login-page">
    <b-row>
      <b-col class="first d-none d-lg-block">
        <vue-typer
          :text="greet"
          type-delay="200"
          caret-animation="smooth"
          :repeat="0"
        ></vue-typer>
      </b-col>
      <b-col class="second">
        <b-img
          :src="require('../../../images/bemify_logo.png')"
          alt="Bemify's logo"
          center
          class="logo"
          id="A3"
        />
        <b-row class="third justify-content-center" id="bemify">
          <p class="app-name">Bemify</p>
        </b-row>
        <div class="fourth justify-content-center">
          <b-row class="login justify-content-center">
            <b-form-input @keydown.space.prevent
              v-model="username"
              type="text"
              placeholder="Username"
              id="loginInput"
            ></b-form-input>
          </b-row>
          <b-row class="login justify-content-center">
            <b-form-input @keydown.space.prevent
              v-model="password"
              type="password"
              placeholder="Password"
              id="loginInput"
            ></b-form-input>
          </b-row>
          <b-row class="login justify-content-center">
            <b-button @click="login" id="loginButton">Log in</b-button>
            <b-alert  variant="danger" id="loginFailure" v-model="showUnsuccessfulLogin">Invalid username or password!</b-alert>
          </b-row>
          <b-row class="justify-content-center">
            <p id="createAccount-text">Don't have an account?</p>
          </b-row>
          <router-link
            style="text-decoration: none; color: inherit"
            to="/signup"
          >
            <b-row class="justify-content-center">
              <b-button id="createAccButton">Create an Account</b-button>
            </b-row>
          </router-link>
        </div>
      </b-col>
    </b-row>
  </div>
</template>

<style>
.login-page {
  overflow: hidden;
}

.vue-typer {
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding-left: 110px;
  font-size: 4rem;
  font-family: 'DM Sans', sans-serif;
  font-weight: 500;
  text-align: left;
}

.vue-typer .custom.char.typed {
  color: #e3d5ca;
}

.vue-typer .custom.char.selected {
  color: #f76e45;
  background-color: transparent;
  text-decoration: line-through;
}

.vue-typer .custom.caret {
  display: none;
}

#A3 {
  height: 220px;
  margin-top: 10px;
}

.app-name {
  color: #f76e45;
  font-size: 40px;
  font-family: 'DM Sans', sans-serif;
}

#bemify {
  color: #f76e45;
  font-size: 45px;
  text-align: center;
  font-family: 'DM Sans', sans-serif;
  height: 60px;
  font-weight: 550;
}

.second {
  padding-top: 50px;
}

.fourth {
  padding-top: 50px;
}

#loginInput {
  width: 70%;
  background-color: #e3d5ca;
  border-radius: 30px;
  height: 45px;
  margin: 20px;
  margin: 10px;
  font-family: 'DM Sans', sans-serif;
  padding-left: 50px;
}

#createAccount-text {
  color: #e3d5ca;
  font-family: 'DM Sans', sans-serif;
}

#loginButton,
#createAccButton {
  background-color: #f76e45;
  border-radius: 30px;
  height: 45px;
  margin: 10px;
  font-family: 'DM Sans', sans-serif;
  width: 70%;
  text-decoration: none;
}

#loginButton:hover,
#createAccButton:hover {
  background-color: #f38e6f;
  text-decoration: none;
}

.logo {
  transform: rotate(-9deg);
}

#loginFailure {
  height: 45px;
  margin: 10px;
  font-family: 'DM Sans', sans-serif;
  width: 70%;
  text-decoration: none;
}
</style>

<script>
import { Api } from '../Api'

export default {
  name: 'login',
  data() {
    return {
      greet: 'WELCOME \nTO \nBEMIFY',
      username: '',
      password: '',
      showUnsuccessfulLogin: false
    }
  },
  methods: {
    login() {
      Api.post('/auth', {
        username: this.username,
        password: this.password
      })
        .then((response) => {
          this.$router.push('/profile')
          const token = response.data
          localStorage.token = token
        })
        .catch((error) => {
          if (error.response.status !== 200) {
            this.showUnsuccessfulLogin = true
          }
          console.log(error.response)
        })
    }
  }
}
</script>
