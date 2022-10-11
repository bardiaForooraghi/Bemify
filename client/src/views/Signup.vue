<template>
  <div class="signup-page">
    <!-- <b-card bg-variant="light"></b-card> -->
      <b-row class="justify-content-center mx-auto" id="container">
        <b-col>
          <b-row class="justify-content-center">
            <b-col class="mx-auto">
              <h1 id="headerSignup">Create An Account</h1>
            </b-col>
          </b-row>
          <b-row class="justify-content-center mx-auto" id="signupInput">
            <b-col class="mx-auto">
              <b-form-group label-for="nested-street">
                <b-form-input id="input" v-model="email" class="email mx-auto" type="email" placeholder="Email Address"></b-form-input>
            </b-form-group>
            </b-col>
          </b-row>
          <b-row class="justify-content-center mx-auto" id="signupInput">
            <b-col class="mx-auto">
              <b-form-group label-for="nested-city">
                <b-form-input id="input" v-model="username" type="text" class="a username mx-auto" placeholder="Username"></b-form-input>
            </b-form-group>
            </b-col>
          </b-row>
          <b-row class="justify-content-center mx-auto" id="signupInput">
            <b-col class="mx-auto">
              <b-form-group label-for="nested-state">
                <b-form-input id="input" v-model="password" class="password mx-auto" type="password" placeholder="Password"></b-form-input>
            </b-form-group>
            </b-col>
          </b-row>
          <b-row class="justify-content-center mx-auto" id="signupInput">
            <b-col class="mx-auto">
              <b-form-group label-for="nested-country">
                <b-form-input id="input" v-model="confirmPassword" class="confirmPassword mx-auto" type="password" placeholder="Confirm Password"></b-form-input>
            </b-form-group>
            </b-col>
          </b-row>
          <b-row class="mx-auto">
            <b-col class="mx-auto">
              <b-button id="clearSignupbtn" @click="clear" class="btn" type="reset">Clear</b-button>
            </b-col>
            <b-col class="mx-auto">
              <button id="createAccountbtn" @click="signup" class="btn" pill variant="primary" type="submit">Create</button>
            </b-col>
          </b-row>
        </b-col>
      </b-row>
  </div>
</template>

<style>
.signup-page {
  font-family: "DM Sans", sans-serif;
  background-image: url('../../../images/stacked-waves-haikei.svg');
  aspect-ratio: 960/300;
  width: 100%;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
}

#container {
  width: 60%;
  height: fit-content;
  background-color: #27406D;
  margin: 60px;
  border-radius: 30px;
  padding: 3% 5% 2% 5%;
}

#headerSignup {
  padding-top: 40px;
  color: #E3D5CA;
  margin-bottom: 20px;
  font-size: 45px;
}

#clearSignupbtn {
  background: none;
  border-width: 3px;
  border-color: #E3D5CA;;
  width: 60%;
  color: #E3D5CA;
  border-radius: 30px;
  min-width: fit-content;
  height: 60px;
  margin-top: 25px;
}

#createAccountbtn {
  background-color: #F76E45;
  width: 60%;
  color: #E3D5CA;
  border-radius: 30px;
  height: 30px;
  min-width: fit-content;
  height: 60px;
  margin-top: 25px;
}

#input {
  border-radius: 30px;
  margin: 20px;
  height: 50px;
  min-width: 100%;
  width: 80%;
  padding-left: 6%;
}
</style>

<script>
import { Api } from '../Api'

export default {
  data() {
    return {
      email: '',
      username: '',
      password: '',
      confirmPassword: '',
      profilePicture: ''
    }
  },
  methods: {
    async signup() {
      if (this.password !== this.confirmPassword) {
        return 0
      }

      await Api.post('/signup', {
        username: this.username,
        password: this.password,
        email: this.email
      }).then(response => {
        console.log(response)
        const token = response.data.token
        localStorage.token = token
        this.$router.push('/profile')
      }).catch(error => { console.log(error.response) })
    },

    //  Method to clear input fields
    async clear() {
      this.email = ''
      this.username = ''
      this.password = ''
      this.confirmPassword = ''
    }
  }
}
</script>
