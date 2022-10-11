<template>
  <div>
    <b-row class="justify-content-center search">
      <b-row class="justify-content-center search-row">
        <b-col>
          <input
            type="search"
            v-model="searchInput"
            style="border: none"
            id="search-input"
            placeholder="Start looking for something!"
            autocomplete="off"
            required
          />
          <b-button @click="search" id="searchButton"
            ><img src="../../../images/search.png" id="search"
          /></b-button>
        </b-col>
      </b-row>
      <b-alert
        dismissible
        variant="danger"
        id="alreadyFollowing"
        v-model="showUnsuccessfulDismissibleAlert"
        >You are already following this user!
      </b-alert>
      <b-alert
        dismissible
        variant="success"
        id="alreadyFollowing"
        v-model="showSuccessfulDismissibleAlert"
        >You are now following this user!
      </b-alert>
      <b-alert
        dismissible
        variant="success"
        id="alreadyFollowing"
        v-model="showSuccessfulDismissibleAlertUnfollow"
        >Unfollowed successfully!
      </b-alert>
      <b-alert
        dismissible
        variant="danger"
        id="alreadyFollowing"
        v-model="showUnsuccessfulDismissibleAlertUnfollow"
        >You were not following this user!
      </b-alert>
    </b-row>
    <b-row class="justify-content-center mx-auto" id="resultRow">
      <b-col class="mx-auto" id="search-results">
        <b-row>
          <b-col class="col-5" id="user-results">
            <!-- <p>User results</p> -->
            <b-row
              class="mx-auto"
              id="userResult"
              v-for="User in users"
              :key="User"
            >
              <b-col class="col-7 mx-auto">
                <p>{{ User.profilePicture }}</p>
                <p id="user">{{ User.username }}</p>
              </b-col>
              <b-col class="col-5 ml-auto">
                <button class="followButton" @click="followAccount(User._id)">
                  Follow
                </button>
                <button class="unfollowButton" @click="unfollowAccount(User._id)">
                  Unfollow
                </button>
              </b-col>
            </b-row>
          </b-col>
          <b-col class="col-7" id="song-results">
            <!-- <p v-if="user =>1">Song results</p> -->
            <b-row
              class="mx-auto"
              id="songResult"
              v-for="Track in tracks"
              :key="Track"
            >
              <b-modal id="my-modal" hide-footer title="Select a Playlist to add the song to!">
                <b-button class="mt-3" block v-for="Playlist in playlists" :key="Playlist" @click="addToPlaylist(Playlist._id, Track._id);hideModal();">{{ Playlist.name }}</b-button>
              </b-modal>
                <b-col class="col-6 mr-auto">
                  <p id="user">{{ Track.name }}</p>
                </b-col>
              <b-col class="col-3 ml-auto">
                <button class="playButton" @click="play(song)">Play</button>
              </b-col>
              <b-col class="col-3 ml-auto">
                <b-button v-b-modal.my-modal id="searchButton" @click="showPlaylists()"
            ><img
                  class="button saveButton"
                  @click="save(song)"
                  src="../../../images/plus.png"
                  alt="saveButton"
                  id="plus"
                /></b-button>
              </b-col>
            </b-row>
          </b-col>
        </b-row>
      </b-col>
    </b-row>
  </div>
</template>

<style>
.search {
  padding-top: 5%;
}

.content {
  height: 100%;
}

.search-row {
  width: 100%;
  padding-bottom: 20px;
}

#searchButton {
  width: 10px;
  min-width: fit-content;
  background-color: #b9a291;
  border-radius: 20px;
}

#search {
  width: 30px;
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

#user {
  font-size: 20px;
  font-weight: bold;
  color: #e3d5ca;
}

#resultRow {
  width: 70%;
}

#userResult {
  width: 80%;
  background-color: #c5b0bb;
  height: 150px;
  border-radius: 20px;
  margin: 20px 0;
  padding: 10px;
}

#songResult {
  width: 80%;
  background-color: #cea874;
  height: 60px;
  border-radius: 20px;
  margin: 20px 0;
  padding: 10px;
}

#search-input:focus,
#search-input:valid {
  width: 50%;
  padding-left: 3%;
}

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

#search-results {
  background-color: #27416d;
  min-height: 0;
  height: fit-content;
  border-radius: 40px;
  margin-bottom: 150px;
}

#alreadyFollowing {
  width: 500px;
}

.followButton,
.unfollowButton {
  width: 100%;
  font-size: 16px;
  border-radius: 20px;
  border: none;
  margin-top: 15px;
  margin-bottom: 15px;
  color: #e3d5ca;
  height: 35px;
  min-width: fit-content;
}

.followButton {
  background-color: #689d6d;
}

.unfollowButton {
  background-color: #af5b5b;
}

#user-results,
#song-results {
  margin-top: 40px;
}

.playButton {
  width: 100%;
  font-size: 16px;
  border-radius: 20px;
  border: none;
  color: #0e1b3d;
  height: 35px;
  background-color: #e3d5ca;
  min-width: fit-content;
}

#plus {
  width: 50%;
}
</style>

<script>
import { Api } from '../Api'
import parseJwt from '../util/parse'

export default {
  name: 'search',
  data() {
    return {
      users: [],
      tracks: [],
      playlists: [],
      searchInput: '',
      divText: '',
      user: {},
      showUnsuccessfulDismissibleAlert: false,
      showSuccessfulDismissibleAlert: false,
      showUnsuccessfulDismissibleAlertUnfollow: false,
      showSuccessfulDismissibleAlertUnfollow: false
    }
  },
  methods: {
    search() {
      const token = localStorage.getItem('token')
      const user = parseJwt(token)
      Api.get(`/accounts/${user._id}/users`, {
        params: {
          username: this.searchInput
        }
      })
        .then((response) => {
          this.users = response.data
          console.log(response)
        })
        .catch((error) => {
          console.log(error.response)
        })
      Api.get(`/accounts/${user._id}/tracks`, {
        params: {
          name: this.searchInput
        }
      })
        .then((response) => {
          this.tracks = response.data
          // console.log(response)
        })
        .catch((error) => {
          console.log(error.response)
        })
    },
    followAccount(id) {
      const token = localStorage.getItem('token')
      const user = parseJwt(token)
      Api.patch(`/accounts/${user._id}/followers/` + id)
        .then((response) => {
          if (response.status === 200) {
            this.showSuccessfulDismissibleAlert = true
          }
        })
        .catch((error) => {
          console.log(error.response)
          if (error.response.status === 406) {
            this.showUnsuccessfulDismissibleAlert = true
          }
        })
    },
    unfollowAccount(id) {
      const token = localStorage.getItem('token')
      const user = parseJwt(token)
      Api.delete(`/accounts/${user._id}/following/` + id)
        .then((response) => {
          console.log(response)
          if (response.status === 200) {
            this.showSuccessfulDismissibleAlertUnfollow = true
          }
        })
        .catch((error) => {
          console.log(error.response)
          if (error.response.status === 406) {
            this.showUnsuccessfulDismissibleAlertUnfollow = true
          }
        })
    },
    showPlaylists() {
      const token = localStorage.getItem('token')
      const user = parseJwt(token)
      /* Getting all playlists from the user */
      Api.get(`/accounts/${user._id}/playlists`)
        .then((response) => {
          this.playlists = response.data
          console.log(response.data)
        })
        .catch((error) => {
          this.data.length = 0
          console.log(error)
        })
        .then(function () {})
    },
    addToPlaylist(id, id2) {
      const token = localStorage.getItem('token')
      const user = parseJwt(token)
      Api.patch(`/accounts/${user._id}/playlists/` + id + '/addTrack', {
        track_id: id2
      }).then(response => { console.log(response) }).catch(error => { console.log(error.response) })
    },
    hideModal() {
      console.log('hello')
      this.$refs['my-modal'].hide()
    }
  },
  created() {
    console.log(this.username)
  }
}
</script>
