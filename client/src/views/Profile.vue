<template>
  <div class="container">
    <div class="row align-items-start">
      <div class="col-8">
        <div class="row" id="profileInfo">
          <div class="col-3 align-self-center">
            <img src="../../../images/user_profile.png" id="userProfile" />
          </div>
          <div class="col-9 text-left align-self-center">
            Hello User!<br />Username
          </div>
        </div>
      </div>
      <div class="row col-4" id="follow">
        <div class="col-6 align-self-center">
          <b-link href="#foo" id="follow">0<br />followers</b-link>
        </div>
        <div class="col-6 align-self-center">
          <b-link href="#foo" id="follow">0<br />following</b-link>
        </div>
      </div>
    </div>
    <div class="row align-items-start">
      <div class="col">
        <div class="text-left align-self-end">My playlists</div>
      </div>
      <div class="col text-right">
        <b-button v-b-modal.modal-center id="newPlaylistButton"
          >Create new playlist</b-button
        >
        <b-button id="newPlaylistButton" @click="getPlaylists"
          >Load playlists</b-button
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
                @click="newPlaylist"
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
    <div class="row" id="playlist" v-for="playlist in playlists" :key="playlist">
      <p>{{ playlist.name }}</p>
    </div>
    <div class="b-row" id="track-playback-bar"></div>
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
  height: 150px;
  width: 600px;
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

#playlist {
  background-color: pink;
  height: 60px;
  border-radius: 20px;
  margin: 20px 0;
  font-size:20px;
}

#newPlaylistButton {
  background-color: #f76e45;
  border-radius: 15px;
}

/* New playlist modal styling */
#playlistNameInput {
  width: 400px;
  height: 50px;
  border-radius: 30px;
  padding-left: 20px;
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

#track-playback-bar {
  background-color: green;
}
</style>

<script>
import { Api } from '../Api'
export default {
  name: 'profile',
  data() {
    return {
      playlists: []
    }
  },
  methods: {
    async newPlaylist() {
      await Api.put('/accounts/632d796f4ccfeb0e5c45e77f/newPlaylist', {
        name: this.name
      })
        .then((response) => {
          console.log(response)
        })
        .catch((error) => {
          console.log(error.response)
        })
    },
    getPlaylists: async function () {
      await Api.get('/accounts/632d796f4ccfeb0e5c45e77f/playlists')
        .then((response) => {
          this.playlists = response.data
          console.log(response.data)
        })
        .catch((error) => {
          this.data.length = 0
          console.log(error)
        })
        .then(function () {})
    }
  }
}
</script>
