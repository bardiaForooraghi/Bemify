<template>
  <div class="container">
    <b-row class="align-items-start" id="row1">
      <div class="col-md-8 col-sm-12 col-xs-12 col-12">
        <b-row class="col-md-12 col-sm-12 col-xs-12 col-12" id="profileInfo">
          <div class="col-3 align-self-center">
            <img
              src="../../../images/user_profile.png"
              id="userProfile"
            />
          </div>
          <div class="col-9 text-left align-self-center" id="profile-username">
            Hello <strong>{{ username }}</strong>!
          </div>
        </b-row>
        <b-row class="d-md-none" id="follow-hidden">
          <b-col class="col-6 text-right">
              <b-button id="followersButton-hidden" v-b-modal.modal-scrollable><b-link href="#foo" id="follow-hidden">{{ followers_no }} followers</b-link></b-button>
          </b-col>
          <b-col class="col-6 text-left">
              <b-button id="followingButton-hidden" v-b-modal.modal-scrollable2><b-link href="#foo" id="follow-hidden">{{ followings_no }} following</b-link></b-button>
          </b-col>
        </b-row>
      </div>
      <b-row class="follow" id="follow">
        <b-col class="col-6 align-self-center d-none d-md-block">
          <div>
            <b-button id="followersButton" v-b-modal.modal-scrollable><b-link href="#foo" id="follow">{{ followers_no }}<br />followers</b-link></b-button>
            <b-modal centered hide-footer="true" id="modal-scrollable" scrollable title="Followers">
              <b-row
                id="followers"
                v-for="follower in followers_name"
                :key="follower"
                >
                <hr class="hr" />
                <div>
                  <img src="../../../images/user_profile.png" id="followProfile"/>{{ follower }} <br>
                </div>
                <hr/>
            </b-row>
            </b-modal>
          </div>
        </b-col>
        <div class="col-6 align-self-center d-none d-md-block">
          <div>
            <b-button id="followingButton" v-b-modal.modal-scrollable2><b-link href="#foo" id="follow">{{ followings_no }}<br />following</b-link></b-button>
            <b-modal centered hide-footer="true" id="modal-scrollable2" scrollable title="Following">
              <b-row
                class="row"
                id="following"
                v-for="following in followings_name"
                :key="following"
                >
                <hr class="hr" />
                <div>
                  <img src="../../../images/user_profile.png" id="followProfile"/>{{ following }} <br>
                </div>
              <hr/>
            </b-row>
            </b-modal>
          </div>
        </div>
      </b-row>
    </b-row>
    <b-row class="align-items-start" id="row2">
      <div class="text-left align-self-end" id="h1MyPlaylists">
      My playlists
      </div>
      <div class="col text-right d-none d-md-block">
        <b-button v-b-modal.modal-center1 id="deletePlaylistsButton">
          Delete all playlists
        </b-button>
        <b-modal
          id="modal-center1"
          content-class="popup"
          title="Are you sure?"
        >
          <b-container fluid>
            <b-row
              class="my-4 align-self-center d-flex justify-content-center"
              id="modal-body"
            >
              Please confirm that you want to delete your playlists
            </b-row>
          </b-container>
          <template #modal-footer border-0>
            <div class="w-100">
              <b-button
                variant="primary"
                size="sm"
                class="float-right"
                @click="deleteAllPlaylists();reloadPage();"
                id="closeButton1"
              >
                Delete
              </b-button>
              <b-button
                variant="primary"
                size="sm"
                class="float-right"
                @click="$bvModal.hide('modal-center1')"
                id="closeModalButton"
              >
                Close
              </b-button>
            </div>
          </template>
        </b-modal>
        <b-button v-b-modal.modal-center id="newPlaylistButton"
          >Create new playlist</b-button
        >
        <b-modal
          id="modal-center"
          content-class="popup"
          title="Create playlist"
        >
          <b-container fluid>
            <b-row
              class="my-4 align-self-center d-flex justify-content-center"
              id="modal-body"
            >
              <form id="inputFields1">
                <input
                  type="text"
                  id="playlistNameInput"
                  placeholder="Playlist name"
                  v-model="name"
                  required
                />
              </form>
            </b-row>
          </b-container>
          <template #modal-footer border-0>
            <div class="w-100">
              <b-button
                variant="primary"
                size="sm"
                class="float-right"
                @click="newPlaylist();reloadPage();"
                id="createButton"
              >
                Create
              </b-button>
              <b-button
                variant="primary"
                size="sm"
                class="float-right"
                @click="$bvModal.hide('modal-center')"
                id="closeButton1"
              >
                Close
              </b-button>
            </div>
          </template>
        </b-modal>
      </div>
      <div class="col text-right d-md-none">
        <b-button v-b-modal.modal-center1 id="deletePlaylistsButton">
          Delete All
        </b-button>
        <b-button v-b-modal.modal-center id="newPlaylistButton"
          >Create</b-button
        >
      </div>
    </b-row>
    <!-- Playlist container -->
    <b-row class="mx-auto" id="playlistRow">
        <b-col class="col-md-12 mb-4 mx-auto" id="search-results">
          <div class="card example-1 scrollbar-dusty-grass mx-auto">
            <div id="card-body" class="mx-auto">
                <b-col id="playlist-results">
                  <div
                    class="row"
                    id="playlist"
                    v-for="playlist in playlists"
                    :key="playlist"
                    @click="viewPlaylist(playlist._id)"
                  >
                    <p>{{ playlist.name }}</p>
                  </div>
                </b-col>
            </div>
          </div>
        </b-col>
    </b-row>
    <!-- Playbar -->
    <footer class="text-center text-lg-start fixed-bottom" id="trackPlaybackBar">
      <div class="b-container p-4">
        <b-row>
          <div class="col-3">
            <h2 id="listeningTo">You're listening to</h2>
            <h2 class="song-title">
              {{ current.title }} - <span>{{ current.artist }}</span>
            </h2>
          </div>
          <div class="col-4" id="currentButtons">
            <div class="controls">
              <b-button id="prev" @click="prev">Prev</b-button>
              <b-button id="play" v-if="!isPlaying" @click="play"
                ><img src="../../../images/play.png" id="playButton"
              />
              </b-button>
              <b-button id="pause" v-else @click="pause"
                ><img src="../../../images/pause.png" id="pauseButton"
              />
              </b-button>
              <b-button id="next" @click="next">Next</b-button>
            </div>
          </div>
          <div class="col-5 d-none d-lg-block">
            Playlist1:
            <b-button
              id="demoTrack"
              v-for="song in songs"
              :key="song.src"
              @click="play(song)"
              :class="song.src == current.src ? 'song playing' : 'song'"
            >
              {{ song.title }} - {{ song.artist }}
            </b-button>
          </div>
        </b-row>
      </div>
    </footer>
  </div>
</template>

<style>

#playlistRow {
  width: 100%;
}

div.card.example-1.scrollbar-dusty-grass.mx-auto {
  height: 230px;
  border-radius: 40px;
  width: 100%;
  margin: 20px 10px 10px 10px;
  min-height: 0;
  padding: 0;
  border: none;
  background: none;
}

.scrollbar-dusty-grass::-webkit-scrollbar {
  width: 12px;
  background-color: none;
}

.scrollbar-dusty-grass::-webkit-scrollbar-thumb {
  border-radius: 10px;
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.1);
  background-image: -webkit-linear-gradient(330deg, #f76f45c6 0%, #f76e45 100%);
  background-image: linear-gradient(120deg, #f4977bc6 0%, #f76e45 100%);
}

.example-1 {
  position: relative;
  overflow-y: scroll;
  width: 100%;
}

#card-body {
  height: 300px;
  border-radius: 40px;
  width: 100%;
  background: none;
  margin: 0;
  padding: 0;
}

div#card-body.mx-auto {
  width: 100%;
  background: none;
  padding-top: 0;
}

.col-md-12,
.follow {
  margin: 50px 0 10px;
}

#profileInfo {
  background-color: #e3d5ca;
  border-radius: 35px;
  height: 120px;
  width: 600px;
  color: #2C3D4E;
  font-size: 25px;
}

#userProfile {
  height: 80px;
  margin-left: 20px;
}

/* Hidden follow bar */
#follow-hidden {
  height: 25px;
  width: 100%;
  color: #e3d5ca;
  margin-bottom: 20px;
}

#followersButton-hidden, #followingButton-hidden {
  color: #e3d5ca;
  font-size: 16px;
  margin: 0;
  padding: 0;
  border: none;
  text-decoration: none;
  background: none;
  font-weight: 800;
}

#follow {
  height: 150px;
  font-size: 22px;
  color: #e3d5ca;
  font-weight: 700;
}

#follow:hover {
  text-decoration: none;
}

#followersButton, #followingButton {
  background: none;
  border: none;
}

div#modal-scrollable2___BV_modal_content_.modal-content {
  margin: 0px;
  width: 35vw;
  min-width: 300px;
  background-color: #385181;
  color: #e3d5ca;
}

div#modal-scrollable___BV_modal_content_.modal-content {
  margin: 0px;
  width: 35vw;
  min-width: 300px;
  background-color: #385181;
  color: #e3d5ca;
}

button.close {
  color: #e3d5ca;
}

header#modal-scrollable2___BV_modal_header_.modal-header {
  padding-left: 40px;
}

header#modal-scrollable___BV_modal_header_.modal-header {
  padding-left: 40px;
}

#followProfile {
  width: 40px;
  margin-right: 10px;
}

#followers, #following {
  color: #F76E45;
  font-size: 25px;
}

div#modal-center___BV_modal_content_.modal-content.popup {
  width: 80%;
  margin: 50px;
  max-width: 70vw;
}

#h1MyPlaylists {
  color: #e3d5ca;
  font-size: 22px;
  margin-bottom: 0;
  font-weight: 400;
}

#closeButton1 {
  background: none;
  border-width: 3px;
  border-color: #e3d5ca;
  width: 25%;
  height: 40px;
  margin: 10px;
  color: #e3d5ca;
  font-size: 17px;
  border-radius: 20px;
}

#closeModalButton {
  border: none;
  width: 25%;
  height: 40px;
  margin: 10px;
  color: #e3d5ca;
  font-size: 17px;
  border-radius: 20px;
  background-color: #F76E45;
}

#playlist {
  background-color: rgb(153, 90, 100);
  height: 60px;
  border-radius: 20px;
  margin: 15px 0;
  cursor: pointer;
  width: 100%;
  padding: 15px;
  padding-left: 50px;
  font-size: 20px;
  color: #e3d5ca;
  font-weight: 800;
}

#newPlaylistButton, #deletePlaylistsButton {
  background-color: #f76e45;
  border-radius: 25px;
  height: 50px;
  width: 90px;
  font-size: 16px;
  margin-bottom: 0;
}

/* Create new playlist modal styling */

#playlistNameInput {
  width: 100%;
  height: 50px;
  border-radius: 30px;
  padding-left: 20px;
  background-color: #e3d5ca;
  border: none;
}

#inputFields1 {
  width: 100%;
}

#createButton {
  background-color: #f76e45;
  border: none;
  width: 25%;
  height: 40px;
  margin: 10px;
  font-size: 17px;
  border-radius: 20px;
}

#trackPlaybackBar {
  background-color: #E3D5CA;
}

#listeningTo {
  font-size: 14px;
}

#prev,
#play,
#pause,
#next,
#demoTrack {
  background-color:#f76e45;
  color: #E3D5CA;
  border: none;
  font-weight: bold;
}

#play, #pause {
  border-radius: 40px;
  height: 50px;
  width: 50px;
}

#playButton,
#pauseButton {
  height: 20px;
}

#currentButtons {
  margin-top: 0;
}

footer {
  height: 110px;
  padding: 0px;
  padding-left: 20px;
  padding-bottom: 50px;
  margin: 0;
  line-height: 10px;
}

h2 {
  text-align: left;
}

@media (max-width: 992px) {
  #profileInfo {
    background-color: #e3d5ca;
    border-radius: 35px;
    height: 120px;
    width: 100%;
  }

  #row1, #row2, #playlistRow {
    padding-left: 7%;
    padding-right: 10px;
  }

}

@media (max-width: 992px) {
  #profileInfo {
    background-color: #e3d5ca;
    border-radius: 35px;
    height: 120px;
    width: 100%;
  }

  #followingButton, #followersButton, #follow {
    margin-left: -10px;
    margin-right: -10px;
    text-align: center;
  }

  #follow {
    font-size: 20px;
    text-align: center;
  }

  #profile-username {
  padding-left: 42px;
}
}

@media (max-width: 768px) {
  #userProfile {
    margin-left: 0;
  }
}

@media (max-width: 576px) {
  #deletePlaylistsButton, #newPlaylistButton {
    font-size: 15px;
    width: fit-content;
  }
  #deletePlaylistsButton {
    margin-right: 5px;
  }
  #newPlaylistButton {
    margin-left: 5px;
  }
}
</style>

<script>
import { Api } from '../Api'
import parseJwt from '../util/parse'
export default {
  name: 'profile',
  data() {
    return {
      playlists: [],
      followers: [],
      followers_name: [],
      followings: [],
      followings_name: [],
      followers_no: 0,
      followings_no: 0,
      username: '',
      current: {},
      index: 0,
      isPlaying: false,
      name: '',
      songs: [
        {
          title: 'Milkshake',
          artist: 'Demo1',
          src: require('../tracks/milk-shake-116330.mp3')
        },
        {
          title: 'Atmospheric',
          artist: 'Demo2',
          src: require('../tracks/atmospheric-hip-hop-instrumental-120988.mp3')
        }
      ],
      player: new Audio()
    }
  },
  methods: {
    reloadPage() {
      window.location.reload()
    },
    async newPlaylist() {
      const token = localStorage.getItem('token')
      const user = parseJwt(token)
      await Api.put(`/accounts/${user._id}/newPlaylist`, {
        name: this.name
      })
        .then((response) => {
          console.log(response)
        })
        .catch((error) => {
          console.log(error.response)
        })
    },
    async deleteAllPlaylists() {
      const token = localStorage.getItem('token')
      const user = parseJwt(token)
      await Api.delete(`/accounts/${user._id}/playlists`)
        .then((response) => {
          console.log(response)
        })
        .catch((error) => {
          console.log(error.response)
        })
    },
    play(song) {
      if (typeof song.src !== 'undefined') {
        this.current = song
        this.player.src = this.current.src
      }
      this.player.play()
      this.player.addEventListener(
        'ended',
        function () {
          this.index++
          if (this.index > this.songs.length - 1) {
            this.index = 0
          }
          this.current = this.songs[this.index]
          this.play(this.current)
        }.bind(this)
      )
      this.isPlaying = true
    },
    pause() {
      this.player.pause()
      this.isPlaying = false
    },
    next() {
      this.index++
      if (this.index > this.songs.length - 1) {
        this.index = 0
      }
      this.current = this.songs[this.index]
      this.play(this.current)
    },
    prev() {
      this.index--
      if (this.index < 0) {
        this.index = this.songs.length - 1
      }
      this.current = this.songs[this.index]
      this.play(this.current)
    },
    viewPlaylist(id) {
      this.$router.push('/playlist/' + id)
    }
  },
  created() {
    const token = localStorage.getItem('token')
    const user = parseJwt(token)
    this.username = user.username
    this.current = this.songs[this.index]
    this.player.src = this.current.src
    /* Getting all playlists from the user */
    Api.get(`/accounts/${user._id}/playlists`)
      .then((response) => {
        this.playlists = response.data[0].playlists
      })
      .catch((error) => {
        this.data.length = 0
        console.log(error)
      })
      .then(function () {})
    /* Getting followers no from the user */
    Api.get(`/accounts/${user._id}/followers`)
      .then((response) => {
        this.followers_no = response.data.length
        this.followers = response.data
        for (let i = 0; i < this.followers.length; i++) {
          Api.get('/accounts/' + this.followers[i])
            .then((response) => {
              this.followers_name.push(response.data.username)
            })
            .catch((error) => {
              this.data.length = 0
              console.log(error)
            })
            .then(function () {})
        }
      })
      .catch((error) => {
        this.data.length = 0
        console.log(error)
      })
      .then(function () {})
    /* Getting followings no from the user */
    Api.get(`/accounts/${user._id}/followings`)
      .then((response) => {
        this.followings_no = response.data.length
        this.followings = response.data
        for (let i = 0; i < this.followings.length; i++) {
          Api.get('/accounts/' + this.followings[i])
            .then((response) => {
              this.followings_name.push(response.data.username)
            })
            .catch((error) => {
              this.data.length = 0
              console.log(error)
            })
            .then(function () {})
        }
      })
      .catch((error) => {
        this.data.length = 0
        console.log(error)
      })
      .then(function () {})
  },
  deactivated() {
    this.player.pause()
  }
}
</script>
