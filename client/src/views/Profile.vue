<template>
  <div class="container">
    <div class="row align-items-start">
      <div class="col-8">
        <div class="row" id="profileInfo">
          <div class="col-3 align-self-center">
            <img
              src="../../../images/user_profile.png"
              id="userProfile"
            />
          </div>
          <div class="col-9 text-left align-self-center">
            Hello {{ username }}!<br />
          </div>
        </div>
      </div>
      <div class="row col-4" id="follow">
        <div class="col-6 align-self-center">
          <b-link href="#foo" id="follow"
            >{{ followers_no }}<br />followers</b-link
          >
        </div>
        <div class="col-6 align-self-center">
          <b-link href="#foo" id="follow"
            >{{ followings_no }}<br />following</b-link
          >
        </div>
      </div>
    </div>
    <div class="row align-items-start">
      <div class="text-left align-self-end" id="h1MyPlaylists">
        My playlists
      </div>
      <div class="col text-right">
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
              <form id="inputFields">
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
          <template #modal-footer>
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
                id="closeButton"
              >
                Close
              </b-button>
            </div>
          </template>
        </b-modal>
      </div>
    </div>
    <div
      class="row"
      id="playlist"
      v-for="playlist in playlists"
      :key="playlist"
    >
      <p>{{ playlist.name }}</p>
    </div>
    <footer
      class="text-center text-lg-start fixed-bottom"
      id="trackPlaybackBar"
    >
      <!-- Grid container -->
      <div class="b-container p-4">
        <!--Grid row-->
        <div class="row">
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
              /></b-button>
              <b-button id="pause" v-else @click="pause"
                ><img src="../../../images/pause.png" id="pauseButton"
              /></b-button>
              <b-button id="next" @click="next">Next</b-button>
            </div>
          </div>
          <div class="col-5">
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
        </div>
        <!--Grid row-->
      </div>
      <!-- Grid container -->
    </footer>
  </div>
</template>

<style>
.col-8,
.col-4 {
  margin: 50px 0;
}

#profileInfo {
  background-color: #e3d5ca;
  border-radius: 35px;
  height: 120px;
  width: 550px;
  color: black;
  font-size: 20px;
  font-weight: 800;
}

#userProfile {
  height: 80px;
  margin-left: 20px;
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

#h1MyPlaylists {
  color: #e3d5ca;
  font-size: 18px;
  margin-bottom: 0;
}

#playlist {
  background-color: pink;
  height: 60px;
  border-radius: 20px;
  margin: 20px 0;
}

#newPlaylistButton {
  background-color: #f76e45;
  border-radius: 25px;
  height: 50px;
  width: 200px;
  font-size: 18px;
  margin-bottom: 0;
}

/* Create new playlist modal styling */
#playlistNameInput {
  width: 400px;
  height: 50px;
  border-radius: 30px;
  padding-left: 20px;
}

#playlistNameInput {
  width: 400px;
  height: 50px;
  border-radius: 30px;
  padding-left: 20px;
  background-color: #e3d5ca;
  border: none;
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
  background-color: #0b1330;
}

#listeningTo {
  font-size: 14px;
}

#prev,
#play,
#pause,
#next,
#demoTrack {
  background-color: #e3d5ca;
  color: black;
}

#playButton,
#pauseButton {
  height: 15px;
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
</style>

<script>
import { Api } from '../Api'
export default {
  name: 'profile',
  data() {
    return {
      playlists: [],
      followers_no: 0,
      followings_no: 0,
      username: '',
      current: {},
      index: 0,
      isPlaying: false,
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
      await Api.put('/accounts/6321bd4df073f117ca2e3510/newPlaylist', {
        name: this.name
      })
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
    }
  },
  created() {
    this.current = this.songs[this.index]
    this.player.src = this.current.src
    /* Getting all playlists from the user */
    Api.get('/accounts/:account_id/playlists')
      .then((response) => {
        this.playlists = response.data
        console.log(response.data)
      })
      .catch((error) => {
        this.data.length = 0
        console.log(error)
      })
      .then(function () {})
    /* Getting followers no from the user */
    Api.get('/accounts/:account_id/followers')
      .then((response) => {
        this.followers_no = response.data.length
        console.log(response)
      })
      .catch((error) => {
        this.data.length = 0
        console.log(error)
      })
      .then(function () {})
    /* Getting followings no from the user */
    Api.get('/accounts/:account_id/followings')
      .then((response) => {
        this.followings_no = response.data.length
        console.log(response)
      })
      .catch((error) => {
        this.data.length = 0
        console.log(error)
      })
      .then(function () {})
    /* Getting username from the user */
    Api.get('/accounts/:account_id/')
      .then((response) => {
        this.username = response.data.username
        console.log(response.data)
      })
      .catch((error) => {
        console.log(error)
      })
      .then(function () {})
  }
}
</script>
