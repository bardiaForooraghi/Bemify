<template>
<div class="row b-container">
    <div class="col-2">
        <img src="../../../images/back.png" id="goBack">
    </div>
    <div class="col-8" id="playlistBox">
        <div class="row">
            <div class="col-2">
                <router-link to="/profile"><img src="../../../images/playlist_image.png" id="playlistImage"></router-link>
            </div>
            <div class="col-10">
                <p id="playlistName">Playlist name</p>
                <p id="playlistCreator">Playlist creator</p>
            </div>
        </div>
        <div class="row">
            <b-button id="filterButton">Filter by genre</b-button>
        </div>
        <div class="row" id="track"></div>
    <div class="row " id="track"></div>
    <div class="row" id="track"></div>
    <div class="row" id="track"></div>
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
export default {
  name: 'profile',
  data() {
    return {
      message: 'none'
    }
  }
}
</script>
