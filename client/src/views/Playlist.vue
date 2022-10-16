<template>
<div class="row b-container">
    <div class="col-2">
        <img src="../../../images/back.png" id="goBack" @click="returnToProfile">
    </div>
    <div class="col-8" id="playlistBox">
        <b-row id="playlistname-row">
            <div class="col-3 d-none d-md-block">
                <router-link to="/profile"><img src="../../../images/playlist_image.png" id="playlistImage"></router-link>
            </div>
            <div class="col-9">
              <p id="playlistName">{{ playlistName }}</p>
              <p id="playlistCreator">Created by {{ username }}</p>
            </div>
          </b-row>
        <b-row id="button-row">
          <b-col class="ml-auto d-flex">
            <b-row class="ml-auto d-flex">
              <b-dropdown id="filterButto" dropleft text="Filter by genre" class="m-md-2">
                <b-dropdown-item>Pop</b-dropdown-item>
                <b-dropdown-item>Hip-hop/Rap</b-dropdown-item>
                <b-dropdown-item>Rock/Metal</b-dropdown-item>
                <b-dropdown-item>Dance/Electronic</b-dropdown-item>
                <b-dropdown-item>Latin</b-dropdown-item>
                <b-dropdown-item>Indie/Aletrnative rock</b-dropdown-item>
                <b-dropdown-item>Classical</b-dropdown-item>
                <b-dropdown-item>K-pop</b-dropdown-item>
                <b-dropdown-item>Country</b-dropdown-item>
                <b-dropdown-item>R&B</b-dropdown-item>
              </b-dropdown>
            </b-row>
          </b-col>
        </b-row>
        <b-row class="mx-auto" id="playlistRow">
          <b-col class="col-md-12 mb-4 mx-auto" id="song-list">
            <div class="card example-1 scrollbar-dusty-grass mx-auto">
              <div id="card-body" class="mx-auto">
                <b-row id="track" v-for="Song in tracks" :key="Song">
                  <b-col class="col-md-10 col-sm-10 col-xs-9 col-9 mr-auto d-flex">
                    {{ Song.name }} - {{Song.duration}}
                  </b-col>
                  <b-col class="col-md-2 col-sm-2 col-xs-3 col-3 ml-auto">
                    <b-button id="deleteButton" @click="deleteFromPlaylist(Song._id);">
                      <img
                          class="button deleteButton"
                          src="../../../images/delete-playlist.png"
                          alt="deleteButton"
                          id="deleteSong"
                      /></b-button>
                  </b-col>
                </b-row>
          <!-- <div class="row" id="song"></div> -->
              </div>
            </div>
          </b-col>
        </b-row>
        <b-row class="mx-auto d-flex">
          <b-col>
            <b-button id="deletePlaylistButton" class="m-md-2" @click="deletePlaylist()">Delete Playlist</b-button>
          </b-col>
        </b-row>
    </div>
    <!-- <div class="col-2"></div> -->
</div>
</template>

<style>
.b-container {
  margin-top: 10px;
}

#deleteSong {
  width: 20%;
  height: 10%;
}

/* #editSong{
  width:4%;
  height:4%;
  margin-right: 20px;
  margin-top: 50px;
} */

#goBack {
  height: 60px;
  margin-top: 30px;
  margin-right: 30px;
  cursor:pointer;
}

#playlistname-row {
  height: 170px;
}

#button-row {
  margin-top: 0;
  padding-top: 0;
  height: 60px;
}

#playlistBox {
  background-color: rgb(153, 90, 100);
  min-height: fit-content;
  height: 580px;
  border-radius: 30px;
  color: #e3d5ca;
  margin-top: 30px;
}

#playlistImage {
  width: 10vw;
  text-align: center;
  margin: 40px;
  margin-top: 50px;
}

#playlistName {
  text-align: left;
  margin: 70px 60px 0 0px;
  font-size: 30px;
  font-weight: bold;
}

#playlistCreator {
  text-align: left;
  margin: 0px 0px;
  font-size: 21px;
}

#playlistRow {
  height: 265px;
}

#deletePlaylistButton {
  background-color: #f76e45;
  border-radius: 25px;
  height: 50px;
  width: fit-content;
  font-size: 100%;
  font-weight: bold;
  margin-bottom: 30px;
  color:#E3D5CA;
  border: none;
  width: 10%;
}

button#filterButto__BV_toggle_.btn.dropdown-toggle.btn-secondary {
  background-color:#E3D5CA;
  color: #f76e45;
  /* width: 170px; */
  /* margin-left: 30px; */
  font-weight: bold;
  border: none;
  border-radius: 30px;
  height: 50px;
  margin-right: 40px;
}

#track {
  background-color: #cea874;
  height: 60px;
  border-radius: 10px;
  margin: 20px 20px;
  height: 60px;
  cursor: pointer;
  padding-top: 15px;
  padding-bottom: 15px;
  padding-left: 20px;
  font-size: 20px;
  color: #e3d5ca;
  font-weight: bold;
}

#deleteButton {
  width: 70px;
  padding: 0;
  background: none;
  border: none;
  margin: 0;
}

.deleteButton {
  width: 100%;
}

#song-list {
  margin-top: 0;
}

@media (max-width: 768px) {
  #playlistName {
    margin-left: 15%;
  }

  #playlistCreator {
    margin-left: 15%;
  }

  #track {
  font-size: 2.5vw;
  min-width: 50px;
  padding-left: 0px;
}

#playlistBox {
  padding-left: 0px;
  padding-right: 0px;
}

#deleteButton {
  width: 40px;
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
      username: '',
      playlistName: '',
      tracks: []
    }
  },
  methods: {
    returnToProfile() {
      this.$router.push('/profile')
    },
    deletePlaylist() {
      const token = localStorage.getItem('token')
      const user = parseJwt(token)
      Api.delete(`/accounts/${user._id}/playlists/` + this.$route.params.playlist_id)
      this.$router.push('/profile')
      window.location.reload()
    },
    deleteFromPlaylist(id) {
      Api.delete('/playlists/' + this.$route.params.playlist_id + '/tracks/' + id)
      window.location.reload()
    }
  },
  created() {
    const token = localStorage.getItem('token')
    const user = parseJwt(token)

    this.username = user.username

    Api.get('/playlists/' + this.$route.params.playlist_id + '/tracks')
      .then((response) => {
        this.playlistName = response.data[0].name
        this.tracks = response.data[0].tracks
      })
      .catch((error) => {
        this.data.length = 0
        console.log(error)
      })
      .then(function () {})
  }
}
</script>
