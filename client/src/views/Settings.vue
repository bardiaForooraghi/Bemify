<template>
<div>
    <b-row id="content">
      <b-row id="">
        <!-- account col -->
          <b-col class="col-lg-3 col-md-3 col-sm-6 col-xs-6 col-6 order-lg-1 order-md-1" id="headerCol">
            <b-row>
              <b-col>
                <h1 id="header">Your account</h1>
              </b-col>
            </b-row>
            <b-row>
              <b-col>
                <hr/>
                <b-row>
                  <b-button class="mx-auto" id="logoutButton" @click="logout"><img src="../../../images/logout.png" id="logoutImage">Log out</b-button>
                </b-row>
                <b-row>
                  <b-button v-b-modal.modal-center2 class="mx-auto" id="deleteAccButton"><img src="../../../images/delete.png" id="deleteImage">Delete account</b-button>
                  <b-modal
                    id="modal-center2"
                    content-class="popup"
                    title="Are you sure?"
                  >
                    <b-container fluid>
                      <b-row
                        class="my-4 align-self-center d-flex justify-content-center"
                        id="modal-body"
                      >
                        Please confirm that you want to delete your account
                      </b-row>
                    </b-container>
                    <template #modal-footer border-0>
                      <div class="w-100">
                        <b-button
                          variant="primary"
                          size="sm"
                          class="float-right"
                          @click="deleteAccount()"
                          id="closeButton1"
                        >
                          Delete
                        </b-button>
                        <b-button
                          variant="primary"
                          size="sm"
                          class="float-right"
                          @click="$bvModal.hide('modal-center2')"
                          id="closeModalButton"
                        >
                          Close
                        </b-button>
                      </div>
                    </template>
                  </b-modal>
                </b-row>
              </b-col>
            </b-row>
          </b-col>
        <!-- Profile pic col -->
        <b-col class="col-lg-3 col-md-3 col-sm-6 col-xs-6 col-6 order-lg-3 order-md-3" id="profileCol">
            <b-row class="order-sm=0" id=""><b-img v-bind="mainPic" class="src" :src="profilePicture" id="profile-pic" center/></b-row>
            <b-row id="" class="fourth justify-content-center">
              <b-col class="col-sm-12">
                <b-button v-b-modal.modal-lg class="btn d-none d-sm-block mx-auto" id="changeProfilePic">Change Profile Picture</b-button>
                <b-button v-b-modal.modal-lg class="btn d-sm-none" id="changeProfilePic">Change</b-button>
                <b-modal id="modal-lg" content-class="popup" title="Change Profile Picture">
          <b-container fluid>
            <b-row class="my-4" id="modal-body">
              <b-col-11>
                <b-form-file v-model="file" ref="file-input" class="mb-2" id="file-default" accept=".jpeg, .png, .svg, .WebP, .apng, .gif, .avif" placeholder="Choose or drop file here"></b-form-file>
              </b-col-11>
              <b-col-1 class="ml-auto">
                <b-button id="resetButton" @click="file = null">Reset</b-button>
              </b-col-1>
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
              @click="onChange(); $bvModal.hide('modal-lg')"
              id="uploadButton"
            >
              Change
            </b-button>
            <b-button
              variant="primary"
              size="sm"
              class="float-right"
              @click="$bvModal.hide('modal-lg')"
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
        <!-- input fields col -->
          <b-col class="col-lg-6 col-md-6 col-sm-12 col-xs-12 col-12 order-lg-2 order-md-2" align-self="center" id="inputColumn">
            <b-row id="inputFields" class="fourth justify-content-center">
                <b-form-input v-model="username" type="text" v-bind:placeholder="usernamePlaceholder" id="username"></b-form-input>
                <p class="d-none d-lg-block" id="accountText">Your username is what the display name in which other users will see you by, and what you use to login!</p>
            </b-row>
            <b-row id="" class="justify-content-center">
                <b-form-input v-model="password" type="password" placeholder="Password" id="password"></b-form-input>
                <p class="d-none d-lg-block" id="accountText">Your password should be kept secret, avoid sharing it with anyone and staff will never ask for these details.</p>
            </b-row>
            <b-row id="" class="justify-content-center">
                <b-form-input v-model="email" type="email" v-bind:placeholder="emailPlaceholder" id="password"></b-form-input>
            </b-row>
            <b-row id="buttons" class="fourth justify-content-center mx-auto">
              <b-button class="mx-auto btn" @click="clear" id="clear">Clear fields</b-button>
              <b-button class="mx-auto btn" @click="update" id="save">Save Changes</b-button>
              <b-alert variant="success" id="saveChanges" v-model="showSuccessfulAlert">Your changes have been successfully saved!</b-alert>
            </b-row>
          </b-col>
      </b-row>
    </b-row>
</div>
</template>

<style>
#content {
  padding-top: 50px;
  padding-right: 10%;
  padding-left: 10%;
  min-height: fit-content;
}

#profile-pic {
    width: 80%;
}

.btn {
  margin: 10px;
}

#header {
  font-family: "DM Sans", sans-serif;
  font-size: 50px;
  color:#E3D5CA;
  font-weight: bold;
}

hr {
  margin-top: 1rem;
  margin-bottom: 1rem;
  background-color: #E3D5CA;
  height: 1px;
  border: none;
}

#logoutButton, #deleteAccButton {
  background: none;
  border: none;
  font-weight: bold;
  font-size: 18px;
}

#logoutImage {
  height: 20px;
  margin-right: 8px;
}

#deleteImage {
  height: 30px;
  margin-right: 2px;
}

#logoutButton {
  color: #E3D5CA;
}

#deleteAccButton {
  color: red;
}

#inputColumn, #profileCol {
  padding-top: 50px;
}

#username, #password, #emailAddress {
    width: 70%;
    background-color: #e3d5ca;
    border-radius: 30px;
    border: none;
    height: 55px;
    margin: 10px;
    font-family: "DM Sans", sans-serif;
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

#save, #clear, #changeProfilePic {
    border-radius: 40px;
    font-size: 18px;
    font-family: "DM Sans", sans-serif;
    height: 55px;
    min-width: fit-content;
    padding: 10px;
}

#saveChanges {
  font-size: 18px;
  font-family: "DM Sans", sans-serif;
  height: 65px;
  min-width: fit-content;
  padding: 10px;
}

#save {
    background-color:#F76E45;
    color:#E3D5CA;
    width: 40%;
    /* margin-left: 20px; */
    border: none;
}

#clear {
  background: none;
  border-width: 3px;
  border-color: #E3D5CA;;
  width: 40%;
  /* margin-right: 20px; */
  color: #E3D5CA;
}

#buttons {
  width: 70%;
}

#profileCol {
  margin: 25px 0;
  vertical-align: middle;
}

#changeProfilePic{
    background-color: #F76E45;
    width: 40%;
    min-width: fit-content;
    height: 60px;
    min-height: fit-content;
    border: none;
    color: #E3D5CA;
}

#modal-lg___BV_modal_content_.modal-content.popup {
  background-color: #E3D5CA;
  width: 80%;
  margin: 50px;
  max-width: 70vw;

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

#uploadButton {
  min-width: fit-content;
}

.fourth {
  padding-top: 2%;
}

@media (max-width: 992px) and (min-width: 768px) {
  #buttons {
  width: 90%;
}
}

@media (max-width: 768px) {
#profileCol {
  padding-top: 0px;
}
#profile-pic {
    width: 60%;
}
#changeProfilePic {
    border-radius: 40px;
    font-size: 17px;
    height: 60px;
    min-width: fit-content;
    width: 30%;
}
#inputColumn {
  margin-top: 0;
  padding-top: 10px;
}
#headerCol, #profileCol {
  margin-bottom: 0;
}
#header {
  font-size: 45px;
  padding-left: 20px;
  padding-right: 20px;
}

#logoutButton, #deleteAccButton {
  margin: 5px;
}
#buttons {
  width: 80%;
}
}
</style>

<script>
import { Api } from '../Api'
import parseJwt from '../util/parse'

export default {
  name: 'test',
  data() {
    return {
      username: '',
      usernamePlaceholder: '',
      email: '',
      emailPlaceholder: '',
      password: '',
      profilePicture: require('../../public/profile-pic.png'),
      file: '',
      showSuccessfulAlert: false
    }
  },
  methods: {
    async update() {
      const token = localStorage.getItem('token')
      const user = parseJwt(token)
      await Api.put(`/accounts/${user._id}`, {
        username: this.username,
        password: this.password,
        email: this.email
      }).then(response => {
        console.log(response)
        if (response.status === 200) {
          this.showSuccessfulAlert = true
        }
      }).catch(error => { console.log(error.response) })
    },
    //  Method to clear input fields
    async clear() {
      this.username = ''
      this.password = ''
      this.email = ''
    },
    logout() {
      localStorage.removeItem('token')
      sessionStorage.removeItem('token')
      this.$router.push('/')
    },
    deleteAccount() {
      const token = localStorage.getItem('token')
      const user = parseJwt(token)
      Api.delete(`/accounts/${user._id}`)
        .then(response => {
          console.log(response)
          const token = response.data.token
          localStorage.token = token
          this.$router.push('/')
        }).catch(error => { console.log(error.response) })
    }
    // async onChange() {
    //   const token = localStorage.getItem('token')
    //   const user = parseJwt(token)
    //   await Api.patch(`/accounts/${user._id}`, {
    //     profilePicture: this.file
    //     // this.profilePicture = this.file
    //   }).then(response => { console.log(response) }).catch(error => { console.log(error.response) })
    // }
  // },
  },
  created() {
    const token = localStorage.getItem('token')
    const user = parseJwt(token)
    Api.get(`/accounts/${user._id}`)
      .then(response => {
        // this.profilePicture = response.data.profilePicture
        this.usernamePlaceholder = response.data.username
        this.emailPlaceholder = response.data.email
      })
      .catch(error => {
        console.log(error.response)
      })
  }
}
</script>
