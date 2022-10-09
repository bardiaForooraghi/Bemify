<template>
<div class="row b-container">
    <div class="col-2">
        <img src="../../../images/back.png" id="goBack" @click="returnToProfile">
    </div>
    <div class="col-8" id="playlistBox">
        <div class="row">
            <div class="col-2">
                <router-link to="/profile"><img src="../../../images/playlist_image.png" id="playlistImage"></router-link>
            </div>
            <div class="col-10">
                <p id="playlistName">{{ playlistName }}</p>
                <p id="playlistCreator">Made by: {{ username }}</p>
            </div>
        </div>
        <div class="row">
            <b-button id="filterButton">Filter by genre</b-button>
        </div>
        <div class="row" id="track" v-for="Song in tracks" :key="Song">{{ Song.name }} - {{Song.duration}}</div>
        <div class="row" id="song"></div>
    </div>
    <div class="col-2"></div>
</div>
</template>

<style>
.b-container {
    margin-top: 10px;
}
#goBack {
    height: 60px;
    margin-top: 30px;
    margin-right: 30px;
}

#playlistBox {
    background-color: #E3D5CA;
    height: fit-content;
    border-radius: 30px;
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

#filterButton {
    background-color:#E3D5CA;
    color: #F76E45;
    width: 170px;
    margin-left: 30px;
}

#track {
    background-color: rgb(126, 186, 144);
    height: 60px;
    border-radius: 20px;
    margin: 20px 20px;
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
      trackIds: [],
      tracks: []
    }
  },
  methods: {
    returnToProfile() {
      this.$router.push('/profile')
    }
  },
  created() {
    const token = localStorage.getItem('token')
    const user = parseJwt(token)

    this.username = user.username

    Api.get(`/accounts/${user._id}/playlists/` + this.$route.params.playlist_id)
      .then((response) => {
        this.trackIds = response.data[0].tracks
        this.playlistName = response.data[0].name
        for (let i = 0; i < this.trackIds.length; i++) {
          Api.get('/tracks/' + this.trackIds[i]._id)
            .then((response) => {
              this.tracks.push(response.data)
            })
            .catch((error) => {
              this.data.length = 0
              console.log(error)
            })
            .then(function () {})
        }
        console.log(this.trackIds.length)
      })
      .catch((error) => {
        this.data.length = 0
        console.log(error)
      })
      .then(function () {})
  }
}
</script>
