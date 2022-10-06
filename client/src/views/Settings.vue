<template>
<div>
    <b-row id="content">
      <b-row id="">
        <h1 id="SettingsHeader">Your account</h1>
      </b-row>
      <b-row align-v="stretch">
        <b-col class="col-md-6 col-sm-12 col-xs-12 order-0" id="">
            <b-row id="inputFields" class="fourth justify-content-center">
                <!-- <input type="text" id="username" placeholder="*Username"> -->
                <b-form-input v-model="username" type="text" placeholder="Username" id="username"></b-form-input>
                <p class="d-none d-lg-block" id="accountText">Your username is what the display name in which other users will see you by, and what you use to login!</p>
            </b-row>
            <b-row id="" class="justify-content-center">
                <!-- <input type="text" id="password" placeholder="*Password"> -->
                <b-form-input v-model="password" type="password" placeholder="Password" id="password"></b-form-input>
                <p class="d-none d-lg-block" id="accountText">Your password should be kept secret, avoid sharing it with anyone and staff will never ask for these details.</p>
            </b-row>
            <b-row id="" class="justify-content-center">
                <!-- <input type="text" id="emailAddress" placeholder="*Email Address"> -->
                <b-form-input v-model="email" type="email" placeholder="Email address" id="password"></b-form-input>
            </b-row>
            <b-row id="" class="fourth justify-content-center">
              <b-button id="cancel">Cancel Changes</b-button>
              <b-button @click="update" id="save">Save Changes</b-button>
            </b-row>
        </b-col>
        <b-col class="col-md-6 col-sm-12 col-xs-12 order-1" id="profileCol">
            <b-row id=""><b-img class="src" :src="currentSrc" id="profile-pic" center></b-img></b-row>
            <b-row id="" class="fourth justify-content-center">
              <b-col class="col-sm-12">
                <b-button v-b-modal.modal-lg id="changeProfilePic">Change Profile Picture</b-button>
                <b-modal id="modal-lg" content-class="popup" title="Change Profile Picture">
          <b-container fluid>
            <b-row class="my-4" id="modal-body">
              <b-form-file v-model="file" ref="file-input" class="mb-2" id="file-default" accept=".jpeg, .png, .svg, .WebP, .apng, .gif, .avif" placeholder="Choose or drop file here"></b-form-file>
              <b-button @click="file = null">Reset</b-button>
            </b-row>
            <b-row class="my-4 align-self-center d-flex justify-content-left" id="modal-body">
              <!-- <b-button @click="clearFiles" class="mr-2">Reset via method</b-button> -->
              <p class="mt-2">Selected file: <b>{{ file ? file.name : '' }}</b></p>
            </b-row>
          </b-container>
          <template #modal-footer>
          <div class="w-100">
            <b-button
              variant="primary"
              size="sm"
              class="float-right"
              @click="onChange"
              id="uploadButton"
            >
              Change
            </b-button>
            <b-button
              variant="primary"
              size="sm"
              class="float-right"
              @click="show=false"
              id="closeButton"
            >
              Close
            </b-button>
          </div>
          </template>
        </b-modal>
              </b-col>
        </b-row>
        </b-col>
      </b-row>
    </b-row>
</div>
</template>

<style>
#content {
  padding: 30px 60px;
}
#profile-pic {
    width: 40%;
}

#SettingsHeader {
        font-family: "DM Sans", sans-serif;
        font-size: 36px;
        color:#E3D5CA;
        margin-top:8%;
        padding: 20px 70px 30px 70px;
    }

#username, #password, #emailAddress {
    width: 70%;
    background-color: #e3d5ca;
    border-radius: 30px;
    border: none;
    height: 55px;
    margin: 10px;
    font-family: "DM Sans", sans-serif;
    /* padding-left: 50px; */
}

#username::placeholder, #password::placeholder, #emailAddress::placeholder{
    font-family:"DM Sans", sans-serif;
    font-size: 18px;
    padding-left: 20px;
}

#accountText {
    color: #E3D5CA;
    font-family: "DM Sans", sans-serif;
    width: 70%;
    text-align: left;
    }

#save, #cancel, #changeProfilePic {
    border-radius: 40px;
    font-size: 18px;
    font-family: "DM Sans", sans-serif;
    height: 55px;
    min-width: fit-content;
}

#save {
    background-color:#F76E45 ;
    color:#E3D5CA;
    width: 30%;
    margin-right: 30px;
    border: none;
}

#cancel {
  background: none;
  border-width: 3px;
  border-color: #E3D5CA;;
  width: 30%;
  margin-left: 30px;
  color: #E3D5CA;
}

#profileCol {
  margin: 25px 0;
  vertical-align: middle;
}

#changeProfilePic{
    background-color: #F76E45;
    width: 40%;
    border: none;
}

#savePFPButton {
  background-color: #F76E45;
  border: none;
  width: 25%;
  height: 40px;
  margin: 10px;
  font-size: 17px;
  border-radius: 20px;
}

.fourth {
  padding-top: 2%;
}
</style>

<script>
import { Api } from '../Api'

export default {
  name: 'test',
  data() {
    return {
      username: '',
      email: '',
      password: '',
      currentSrc: require('../../../images/profile-pic.png')
    }
  },
  methods: {
    async update() {
      await Api.put('/accounts/:account_id', {
        username: this.username,
        password: this.password,
        email: this.email
      }).then(response => { console.log(response) }).catch(error => { console.log(error.response) })
    }
  }
}
</script>
