<template>
<div>
    <b-row id="content" align-v="stretch">
        <b-col id="">
            <b-row id="">
                <h1 id="SettingsHeader">Your account</h1>
            </b-row>
            <b-row id="inputFields" class="fourth justify-content-center">
                <!-- <input type="text" id="username" placeholder="*Username"> -->
                <b-form-input v-model="username" type="text" placeholder="Username" id="username"></b-form-input>
                <p id="accountText">Your username is what the display name in which other users will see you by, and what you use to login!</p>
            </b-row>
            <b-row id="" class="justify-content-center">
                <!-- <input type="text" id="password" placeholder="*Password"> -->
                <b-form-input v-model="password" type="password" placeholder="Password" id="password"></b-form-input>
                <p id="accountText">Your password should be kept secret, avoid sharing it with anyone and staff will never ask for these details.</p>
            </b-row>
            <b-row id="" class="justify-content-center">
                <!-- <input type="text" id="emailAddress" placeholder="*Email Address"> -->
                <b-form-input v-model="email" type="email" placeholder="Email Address" id="password"></b-form-input>
            </b-row>
            <b-row id="" class="fourth justify-content-center">
                    <button @click="update" id="save">Save Changes</button>
                    <button id="cancel">Cancel Changes</button>
            </b-row>
        </b-col>
        <b-col id="">
            <b-row id=""><b-img :src="require('../../../images/profile-pic.png')" id="profile-pic" center></b-img></b-row>
            <b-row id="" class="fourth justify-content-center">
                <b-button v-b-modal.modal-lg id="changeProfilePic">Change Profile Picture</b-button>
                <b-modal id="modal-lg" content-class="popup" title="Change Profile Picture">
          <b-container fluid>
            <b-row class="my-4 align-self-center d-flex justify-content-center" id="modal-body">
              <form id="inputFields">
                <input type="text" id="trackNameInput" placeholder="*Track name" required>
              </form>
            </b-row>
            <b-row class="my-4" id="modal-body">
              <b-form-file v-model="file" ref="file-input" class="mb-2" id="file-default" accept=".mp3, .WAV, .AIF, .mp4, .OGG, webM, .AAC, .aup3" placeholder="Choose or drop file here"></b-form-file>
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
              @click="show=false"
              id="uploadButton"
            >
              Upload
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
        </b-row>
        </b-col>
    </b-row>
</div>
</template>

<script>
import { Api } from '../Api'

export default {
  name: 'test',
  data() {
    return {
      username: '',
      email: '',
      password: ''
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

<style>
#profile-pic {
    max-height:350px;
    max-width: 350px;
    margin-top:150px;
}

#SettingsHeader {
        font-family: "DM Sans", sans-serif;
        font-size: 36px;
        color:#E3D5CA;
        margin-top:8%;
        padding-left:12%;
    }

#username, #password, #emailAddress {
    width:600px;
    height:70px;
    border-radius: 30px;
    padding-left: 20px;
    background-color: #E3D5CA;
    border: none;
}

#username::placeholder, #password::placeholder, #emailAddress::placeholder{
    font-family:"DM Sans", sans-serif;
    font-size: 20px;
}

#accountText {
    color: #E3D5CA;
    font-family: "DM Sans", sans-serif;
    max-width: 600px;
    text-align: left;
    }

#save, #cancel, #changeProfilePic {
    border-radius: 25px;
    font-size: 18px;
    font-family: "DM Sans", sans-serif;
    height: 55px;
    border: none;
    margin-top:50px;
}

#save {
    background-color:#F76E45 ;
    color:#E3D5CA;
    width:150px;
    margin-right: 30px;
}

#cancel {
    background-color:#E3D5CA;
    color: #F76E45;
    width:170px;
    margin-left: 30px;
}

#changeProfilePic{
    background-color: #F76E45;
    width: 250px;
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
</style>
