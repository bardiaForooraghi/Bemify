<template>
  <div class="signup-page">
    <!-- <b-card bg-variant="light"></b-card> -->
      <b-row class="justify-content-center mx-auto" id="container">
        <b-col>
          <b-row class="justify-content-center">
            <b-col class="mx-auto">
              <h1 id="headerSignup">Create an Account</h1>
            </b-col>
          </b-row>
          <b-row class="justify-content-center mx-auto" id="signupInput">
            <b-col class="mx-auto">
              <b-form-group label-for="nested-street">
                <b-form-input id="input" v-model="email" class="email mx-auto" type="email" placeholder="Email Address"></b-form-input>
                <span v-if="msg.email" style="color:red;">{{msg.email}}</span>
            </b-form-group>
            </b-col>
          </b-row>
          <b-row class="justify-content-center mx-auto" id="signupInput">
            <b-col class="mx-auto">
              <b-form-group label-for="nested-city">
                <b-form-input id="input" v-model="username" type="text" class="a username mx-auto" placeholder="Username"></b-form-input>
                <span v-if="msg.username" style="color:red;">{{msg.username}}</span>
            </b-form-group>
            </b-col>
          </b-row>
          <b-row class="justify-content-center mx-auto" id="signupInput">
            <b-col class="mx-auto">
              <b-form-group label-for="nested-state">
                <b-form-input id="input" v-model="password" class="password mx-auto" type="password" placeholder="Password"></b-form-input>
                <span v-if="msg.password" style="color:red;">{{msg.password}}</span>
            </b-form-group>
            </b-col>
          </b-row>
          <b-row class="justify-content-center mx-auto" id="signupInput">
            <b-col class="mx-auto">
              <b-form-group label-for="nested-country">
                <b-form-input id="input" v-model="confirmPassword" class="confirmPassword mx-auto" type="password" placeholder="Confirm Password"></b-form-input>
                <span v-if="msg.confirmPassword" style="color:red;">{{msg.confirmPassword}}</span>
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
  font-size: 5vw;
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

@media (min-width: 769px) {
  #headerSignup {
  padding-top: 40px;
  font-size: 5vw;
}
}

@media (max-width: 768px) {
  #headerSignup {
  padding-bottom: -10px;
  font-size: 38px;
}
#container {
  width: 60%;
  height: fit-content;
  background-color: #27406D;
  margin-left: 20px;
  border-radius: 30px;
  padding: 3% 5% 2% 5%;
}
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
      profilePicture: '',
      msg: []
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
    },

    async validateEmail(value) {
      if ((/^\w+(\.-?\w+)*@\w+(\.-?\w+)*(\.\w{2,3})+$/).test(value)) {
        this.msg.email = ''
      } else if (value === '') {
        this.msg.email = ''
      } else {
        this.msg.email = 'Invalid Email Address'
        return 0
      }
    },

    async validateUsername(value) {
      if (value.length >= 3) {
        this.msg.password = ''
      } else if (value === '') {
        this.msg.password = ''
      } else {
        this.msg.password = 'At least 3 characters are required!'
      }
    },

    async validatePassword(value) {
      if (value.length >= 4) {
        this.msg.password = ''
      } else if (value === '') {
        this.msg.password = ''
      } else {
        this.msg.password = 'At least 4 characters are required!'
      }
    },

    async validateConfirmPassword(value) {
      if (this.password === value) {
        this.msg.password = ''
      } else if (value.length < 4) {
        this.msg.password = 'At least 4 characters are required!'
      } else if (value === '') {
        this.msg.password = ''
      } else {
        this.msg.password = 'Passwords must be identical!'
      }
    }
  },
  watch: {
    email(value) {
      this.email = value
      this.validateEmail(value)
    },

    username(value) {
      this.username = value
      this.validateUsername(value)
    },

    password(value) {
      this.password = value
      this.validatePassword(value)
    },

    confirmPassword(value) {
      this.confirmPassword = value
      this.validateConfirmPassword(value)
    }
  }
}
</script>
