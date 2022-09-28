<template>
  <div class="login-page">
    <b-row>
      <b-col class="first">
        <vue-typer :text="greet" type-delay="200" caret-animation="smooth" :repeat="0"></vue-typer>
      </b-col>
      <b-col class="second">
        <b-img :src="require('../../../images/bemify_logo.png')" alt="Bemify's logo" center class="logo" id="A3" />
        <b-row class="third justify-content-center" id="bemify">
          <p class="app-name">Bemify</p>
        </b-row>
        <b-row class="fourth justify-content-center">
          <div class="login">
            <b-form-input type="text" placeholder="Username" id="input"></b-form-input>
          </div>
          <div class="login">
            <b-form-input type="password" placeholder="Password" id="input"></b-form-input>
          </div>
          <div class="login">
            <b-button id="loginButton">Log in</b-button>
          </div>
          <div class="registeration">
            <p class="registeration-text">Don't have an account?</p>
            <div class="registeration-button">
              <router-link to="/signup">
                <b-button id="registration-button" block variant="primary">Create an Account</b-button>
              </router-link>
            </div>
          </div>
        </b-row>
      </b-col>
    </b-row>
  </div>
</template>

<script>
export default {
  name: 'login',
  data() {
    return {
      greet: 'WELCOME \nTO \nBEMIFY'
    }
  }
}
</script>

<style>
.login-page {
  background-color: #183059;
  overflow: hidden;
}

.vue-typer {
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
  padding: 10rem;
  font-size: 4rem;
  font-family: "DM Sans", sans-serif;
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
  color: #E3D5CA;
  font-size: 40px;
  font-family: "DM Sans", sans-serif;
}

#bemify {
  color: #f76e45;
  font-size: 45px;
  text-align: center;
  font-family: "DM Sans", sans-serif;
  height: 60px;
  font-weight: 550;
}

.fourth {
  padding-top: 50px;
}

#input {
  width: 500px;
  background-color: #e3d5ca;
  border-radius: 30px;
  height: 45px;
  margin: 20px;
  margin: 10px;
  font-family: "DM Sans", sans-serif;
  padding-left: 50px;
}

#note {
  color: #e3d5ca;
  font-family: "DM Sans", sans-serif;
}

#loginButton {
  width: 500px;
  background-color: #f76e45;
  border-radius: 30px;
  height: 45px;
  margin: 10px;
  font-family: "DM Sans", sans-serif;
}

.logo {
  transform: rotate(-9deg);
}

.login {
  margin: 0.1rem;
}

.registration {
  margin: 2.5rem;
  color: #F76E45;
}

#registration-button {
  width: 500px;
  background-color: #f76e45;
  border-radius: 30px;
  height: 45px;
  /* margin: 1rem; */
  font-family: "DM Sans", sans-serif;
}

.registeration-text {
  color: #E3D5CA;
}
</style>
