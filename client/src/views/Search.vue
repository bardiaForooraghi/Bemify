<template>
  <div>
    <b-row class="justify-content-center search">
      <b-row class="justify-content-center search-row">
        <b-col>
          <input
            type="search"
            v-model="searchInput"
            id="search-input"
            placeholder="Start looking for something!"
            autocomplete="off"
            required
          />
          <b-button @click="search" id="searchButton"><img src="../../../images/search.png" id="search"/></b-button>
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
      <b-alert
        dismissible
        variant="success"
        id="addingSong"
        v-model="showSuccessfulDismissibleAlertAddSong"
        >Added!
      </b-alert>
      <b-alert
        dismissible
        variant="danger"
        id="alreadyAddingSong"
        v-model="showSuccessfulDismissibleAlertAlreadyAddSong"
        >Already Added!
      </b-alert>
    </b-row>
    <b-row class="mx-auto" id="resultRow">
      <b-col class="col-md-12 mb-4 mx-auto" id="search-results">
        <div class="card example-1 scrollbar-ripe-malinka  mx-auto">
          <div id="card-body1" class="mx-auto">
            <b-row class="justify-content-center mx-auto" id="resultRow">
          <b-col class="col-lg-4 col-md-12 col-sm-12 col-xs-12 col-12 mx-auto" id="user-results">
            <b-row
              class="mx-auto"
              id="userResult"
              v-for="User in users"
              :key="User"
            >
              <b-col class="col-7 mx-auto">
                <b-row class="order-sm=0" id=""><b-img v-bind="mainPic" class="src" :src="profilePicture" id="user-pic" center/></b-row>
                <p id="user">{{ User.username }}</p>
                <b-row class="mx-auto">
                  <button class="followButton" @click="followAccount(User._id)">
                    Follow
                  </button>
                </b-row>
                <b-row class="mx-auto">
                  <button class="unfollowButton" @click="unfollowAccount(User._id)">
                    Unfollow
                  </button>
                </b-row>
              </b-col>
            </b-row>
            <b-row
              class="mx-auto"
              id="noUserResult"
            >
              <b-col class="col-7 mx-auto">
                <p id="user">No Users Found</p>
              </b-col>
            </b-row>
          </b-col>
          <b-col class="col-lg-8 col-md-12 col-sm-12 col-xs-12 col-12 mx-auto" id="song-results">
            <b-row
              class="mx-auto"
              id="artistSongResult"
              v-for="Track in artisttracks"
              :key="Track"
            >
              <b-modal v-bind:id="Track.name" hide-footer title="Select a Playlist to add the song to!">
                <b-button class="mt-3" block v-for="Playlist in playlists" :key="Playlist" @click="addArtistTrackToPlaylist(Playlist._id, Track._id);$bvModal.hide(Track.name);">{{ Playlist.name }}</b-button>
              </b-modal>
              <b-col class="col-8 mr-auto d-flex" id="trackCol">
                  <p id="trackName">{{ Track.name }}</p>
                </b-col>
              <b-col class="col-2 mx-auto" id="trackCol">
                <p id="trackMins">{{ Track.duration }}</p>
                <!-- <button class="playButton" @click="play(song)">Play</button> -->
              </b-col>
              <b-col class="col-2 mx-auto" id="trackCol">
                <b-button v-b-modal="Track.name" id="saveTrackButton" @click="showPlaylists()">
                  <img
                  class="button saveButton"
                  @click="save(song)"
                  src="../../../images/plus.png"
                  alt="saveButton"
                  id="plus"
                /></b-button>
              </b-col>
            </b-row>
            <b-row
              class="mx-auto"
              id="songResult"
              v-for="Track in tracks"
              :key="Track"
            >
              <b-modal v-bind:id="Track.name" hide-footer title="Select a Playlist to add the song to!">
                <b-button class="mt-3" block v-for="Playlist in playlists" :key="Playlist" @click="addToPlaylist(Playlist._id, Track._id); $bvModal.hide(Track.name);">{{ Playlist.name }}</b-button>
              </b-modal>
                <b-col class="col-8 mr-auto d-flex" id="trackCol">
                  <p id="trackName">{{ Track.name }}</p>
                </b-col>
              <b-col class="col-2 mx-auto" id="trackCol">
                <p id="trackMins">{{ Track.duration }}</p>
                <!-- <button class="playButton" @click="play(song)">Play</button> -->
              </b-col>
              <b-col class="col-2 mx-auto" id="trackCol">
                <b-button v-b-modal="Track.name" id="saveTrackButton" @click="showPlaylists()">
                  <img
                  class="button saveButton"
                  @click="save(song)"
                  src="../../../images/plus.png"
                  alt="saveButton"
                  id="plus"
                /></b-button>
              </b-col>
            </b-row>
            <b-row
              class="mx-auto"
              id="noSongResult"
            >
              <b-col class="col-7 mx-auto">
                <p id="user">No Tracks Found</p>
              </b-col>
            </b-row>
          </b-col>
    </b-row>
          </div>
        </div>
      </b-col>
    </b-row>
  </div>
</template>

<style>

#test {
  width: 100%;
}

div.card.example-1.scrollbar-ripe-malinka {
  background-color: #27416d;
  height: 450px;
  border-radius: 40px;
  width: 80%;
  margin: 5px 10px 10px 10px;
  min-height: 0;
  padding: 50px;
  border: none;
}

.scrollbar-ripe-malinka::-webkit-scrollbar {
    width: 12px;
    background-color: none;
}

.scrollbar-ripe-malinka::-webkit-scrollbar-thumb {
    border-radius: 10px;
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.1);
    background-image: -webkit-linear-gradient(330deg, #f76f45c6 0%, #f76e45 100%);
    background-image: linear-gradient(120deg, #f4977bc6 0%, #f76e45 100%);
}

.example-1 {
    position: relative;
    overflow-y: scroll;
}

#card-body {
  background-color: #27416d;
  height: 300px;
  border-radius: 40px;
  width: 80%;
}

div#card-body1.mx-auto {
  padding: 0;
  margin: 0;
  width: 100%;
}

.search {
  padding-top: 30px;
}

.content {
  height: 100%;
}

.search-row {
  width: 100%;
  padding-bottom: 20px;
  padding-top: 20px;
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
  border: none;
  background-color: #e3d5ca;
  transition: 2s;
  font-size: 20px;
  width: 300px;
  padding-left: 20px;
}

#user, #trackName {
  font-size: 20px;
  font-weight: bold;
  color: #e3d5ca;
}

#trackMins {
  font-weight: bold;
  color: #e3d5ca;
  text-align: end;
  margin-top: 5px;
}

div.col-7.mx-auto.col {
  margin: 0;
}

#search-results {
  margin-top: 20px;
}

#resultRow {
  width: 100%;
}

#trackCol {
  margin-top: 0;
  margin-bottom: 0;
  padding: 0;
}

#user-results, #song-results {
  padding-top: 0;
  margin-top: 0;
}

#userResult {
  width: 90%;
  background-color: #b094a2;
  height: 235px;
  border-radius: 20px;
  margin: 20px 0;
  padding: 10px;
}

#noUserResult {
  width: 90%;
  background-color: #c5b0bb;
  height: 230px;
  border-radius: 20px;
  margin: 20px 0;
  padding: 10px;
  visibility: hidden;
}

#user-pic {
  width: 45%;
}

#songResult {
  width: 100%;
  background-color: #cea874;
  height: 60px;
  border-radius: 20px;
  margin: 20px 0;
  padding: 15px 10px;
  padding-left: 20px;
}

#noSongResult {
  width: 100%;
  background-color: #cea874;
  height: 230px;
  border-radius: 20px;
  margin: 20px 0;
  padding: 10px;
  padding-top: 15px;
  padding-bottom: 15px;
  visibility: hidden;
}

#artistSongResult {
  width: 100%;
  background-color: #F76E45;
  height: 60px;
  border-radius: 20px;
  margin: 20px 0;
  padding: 10px;
  padding-top: 15px;
  padding-bottom: 15px;
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

#saveTrackButton {
  width: 40px;
  padding: 0;
  background: none;
  border: none;
  margin: 0;
  /* margin-top: 8px; */
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
  color: #e3d5ca;
  height: 35px;
  min-width: fit-content;
  margin: 5px;
}

.followButton {
  background-color: #689d6d;
}

.unfollowButton {
  background-color: #af5b5b;
}

.playButton {
  width: 100%;
  font-size: 16px;
  border-radius: 20px;
  border: none;
  color: #cea874;
  font-weight: 900;
  height: 35px;
  background-color: #e3d5ca;
  min-width: fit-content;
}

#plus {
  width: 35px;
}

#addingSong {
  width: 500px;
}

#alreadyAddingSong {
  width: 500px;
}

div.col-7.mx-auto.col {
  padding: 10px;
}

@media (max-width: 992px) {
  #userResult {
    width: 250px;
    height: 230px;
  }
  #songResult {
  width: 100%;
  background-color: #cea874;
  height: 60px;
  margin: 20px 0;
  padding: 5px;
  padding-left: 20px;
}
div.card.example-1.scrollbar-ripe-malinka {
  background-color: #27416d;
  height: 450px;
  border-radius: 40px;
  width: 80%;
  margin: 5px 10px 10px 10px;
  min-height: 0;
  padding: 30px;
}

#trackName {
  font-size: 100%;
  min-width: 50px;
  padding-left: 0px;
  margin-top: 10px;
}
}

@media (max-width: 488px) {
  #songResult {
    width: 250px;
  }
}

@media (max-width: 10480px) {
  #temporary {
    font-size: 10px;
  }
}

@media (max-width: 992px) {
  #saveTrackButton {
  margin: 0;
  margin-top: 8px;
}
#trackMins {
  margin-top: 13px;
}
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
      profilePicture: require('../../public/profile-pic.png'),
      tracks: [],
      artisttracks: [],
      playlists: [],
      searchInput: '',
      divText: '',
      user: {},
      dismissSecs: 3,
      dismissCountDown: 0,
      showUnsuccessfulDismissibleAlert: false,
      showSuccessfulDismissibleAlert: false,
      showUnsuccessfulDismissibleAlertUnfollow: false,
      showSuccessfulDismissibleAlertUnfollow: false,
      showSuccessfulDismissibleAlertAddSong: false,
      showSuccessfulDismissibleAlertAlreadyAddSong: false
    }
  },
  methods: {
    async search() {
      const elem = document.getElementById('noUserResult')
      const elem2 = document.getElementById('noSongResult')
      const token = localStorage.getItem('token')
      const user = parseJwt(token)
      await Api.get(`/accounts/${user._id}/users`, {
        params: {
          username: this.searchInput
        }
      })
        .then((response) => {
          this.users = response.data
          console.log(this.users.length)
          if (this.users.length === 0) {
            elem.style.visibility = 'visible'
          } else {
            elem.style.visibility = 'hidden'
          }
          console.log(response)
        })
        .catch((error) => {
          console.log(error)
        })
      await Api.get('/tracks', {
        params: {
          name: this.searchInput
        }
      })
        .then((response) => {
          this.tracks = response.data
        })
        .catch((error) => {
          console.log(error.response)
        })
      await Api.get('/artistTracks', {
        params: {
          name: this.searchInput
        }
      })
        .then((response) => {
          this.artisttracks = response.data
        })
        .catch((error) => {
          console.log(error.response)
        })
      if (this.tracks.length === 0 && this.artisttracks.length === 0) {
        elem2.style.visibility = 'visible'
      } else {
        elem2.style.visibility = 'hidden'
      }
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
          this.playlists = response.data[0].playlists
          console.log(response.data)
        })
        .catch((error) => {
          this.data.length = 0
          console.log(error)
        })
        .then(function () {})
    },
    addToPlaylist(id, id2) {
      Api.patch('/playlists/' + id + '/addTrack', {
        track_id: id2
      }).then(response => {
        console.log(response)
        if (response.status === 200) {
          this.showSuccessfulDismissibleAlertAddSong = true
        }
      }).catch(error => {
        console.log(error.response)
        if (error.response.status !== 200) {
          this.showSuccessfulDismissibleAlertAlreadyAddSong = true
        }
      })
    },
    addArtistTrackToPlaylist(id, id2) {
      Api.patch('/playlists/' + id + '/addArtistTrack', {
        track_id: id2
      }).then(response => {
        console.log(response)
        if (response.status === 200) {
          this.showSuccessfulDismissibleAlertAddSong = true
        }
      }).catch(error => {
        console.log(error.response)
        if (error.response.status !== 200) {
          this.showSuccessfulDismissibleAlertAlreadyAddSong = true
        }
      })
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
