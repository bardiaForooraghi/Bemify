<template>
<div class="row b-container">
    <div class="col-2">
        <img src="../../../images/back.png" id="goBack" @click="returnToProfile">
    </div>
    <div class="col-8" id="playlistBox">
        <div class="row">
            <div class="col-2 d-none d-md-block">
                <router-link to="/profile"><img src="../../../images/playlist_image.png" id="playlistImage"></router-link>
            </div>
            <div class="col-10">
              <p id="playlistName">{{ playlistName }}</p>
              <p id="playlistCreator">Created by {{ username }}</p>
            </div>
        </div>
        <b-row>
          <b-col class="ml-auto">
            <div>
              <b-dropdown id="filterButto" dropright text="Filter by genre" class="m-md-2">
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
              <b-button id="deletePlaylistsButton" dropright text="Filter by genre" class="m-md-2" @click="deletePlaylist();">Delete Playlist</b-button>
            </div>
          </b-col>
        </b-row>
        <div class="row" id="track" v-for="Song in tracks" :key="Song">
          <b-col class="col-9 ml-auto">
            {{ Song.name }} - {{Song.duration}}
          </b-col>
          <b-col class="col-3 ml-auto">
                <b-button id="searchButton"
                @click="deleteFromPlaylist(Song._id);"
            ><img
                  class="button saveButton"
                  src="../../../images/delete.png"
                  alt="saveButton"
                  id="deleteSong"
                /></b-button>
              </b-col>
        </div>
        <div class="row" id="song"></div>
    </div>
    <div class="col-2"></div>
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

#playlistBox {
  background-color: rgb(153, 90, 100);
  height: fit-content;
  border-radius: 30px;
  color: #e3d5ca;
}

#playlistImage {
  height: 140px;
  text-align: center;
  margin: 40px;
}

#playlistName {
  text-align: left;
  margin: 50px 60px 0 60px;
  font-size: 30px;
  font-weight: bold;
}

#playlistCreator {
  text-align: left;
  margin: 0px 60px;
  font-size: 25px;
}

#filterRow {
  align-content: right;
}

#filterButton {
  background-color:#E3D5CA;
  color: #F76E45;
  width: 170px;
  margin-left: 30px;
  font-weight: bold;
  border: none;
  border-radius: 30px;
  height: 50px;
}

button#filterButto__BV_toggle_.btn.dropdown-toggle.btn-secondary {
  background-color:#E3D5CA;
  color: #F76E45;
  width: 170px;
  margin-left: 30px;
  font-weight: bold;
  border: none;
  border-radius: 30px;
  height: 50px;
}

#track {
  background-color: #cea874;
  height: 60px;
  border-radius: 10px;
  margin: 20px 20px;
  height: 60px;
  cursor: pointer;
  padding: 15px;
  font-size: 20px;
  color: #e3d5ca;
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
