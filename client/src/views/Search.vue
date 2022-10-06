<template>
    <div>
        <b-row class="justify-content-center search">
            <b-row class="justify-content-center search-row">
                <input type="text" v-model="username" id="search-input" placeholder="Start looking for something!"
                    autocomplete="off" required />
                <!-- <img src="../../../images/search.jpg" id="search-icon"> -->
            </b-row>
            <b-row class="content">
                <b-button @click="search"> search </b-button>
            </b-row>
            <b-alert dismissible variant="danger" id="alreadyFollowing" v-model="showUnsuccessfulDismissibleAlert">You
                are already following this user!</b-alert>
            <b-alert dismissible variant="success" id="alreadyFollowing" v-model="showSuccessfulDismissibleAlert">You
                are now following this user!</b-alert>
        </b-row>
        <b-row class="justify-content-center">
            <div class="row" id="searchResult" v-for="User in users" :key="User">
                <p>{{ User.username }}</p>
                <button class="followButton" @click="followAccount(User._id)">Follow</button>
            </div>
        </b-row>
    </div>
</template>

<script>
import { Api } from '../Api'

export default {
  name: 'search',
  data() {
    return {
      users: [],
      username: '',
      divText: '',
      showUnsuccessfulDismissibleAlert: false,
      showSuccessfulDismissibleAlert: false
    }
  },
  methods: {
    search() {
      Api.get('/accounts', {
        params: {
          username: this.username
        }
      })
        .then((response) => {
          this.users = response.data
          // console.log(response)
        })
        .catch((error) => {
          console.log(error.response)
        })
    },
    followAccount(id) {
      Api.patch('/accounts/:account_id/followers/' + id)
        .then(response => {
          if (response.status === 200) {
            this.showSuccessfulDismissibleAlert = true
          }
        })
        .catch(error => {
          console.log(error.response)
          if (error.response.status === 406) {
            this.showUnsuccessfulDismissibleAlert = true
          }
        })
    }
  },
  created() {
    console.log(this.username)
  }
}
</script>

<style>
.search {
    padding-top: 5%;
}

.content {
    height: 100%;
}

.search-row {
    width: 500px;
}

.search:focus {
    background-color: white;
}

#search-input {
    height: 70px;
    border-radius: 40px;
    background-color: #e3d5ca;
    transition: 2s;
    font-size: 20px;
    width: 300px;
    padding-left: 20px;
}

#searchResult {
    width: 800px;
    background-color: pink;
    height: 60px;
    border-radius: 20px;
    margin: 20px 0;
    /* line-height: 60px; */
}

#search-input:focus,
#search-input:valid {
    width: 600px;
    padding-left: 3%;
}

/* #search-input:not(:focus){ /
        / padding-left:3%; /
    / } */

#search-input::placeholder {
    color: black;
    font-family: 'DM Sans', sans-serif;
    font-size: 20px;
}

#search-icon {
    height: 50px;
    width: 50px;
    margin-top: 10px;
    border-radius: 40px;
}

#alreadyFollowing {
    width: 500px;
}
</style>
