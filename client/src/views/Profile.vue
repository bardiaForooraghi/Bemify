<template>
  <div class="container">
    <div class="row align-items-start">
      <div class="col-8">
        <div class="row" id="profileInfo">
          <div class="col-3 align-self-center">
            <img src="../../../images/user_profile.png" id="userProfile">
          </div>
          <div class="col-9 text-left align-self-center">
            Hello User!<br>Username
          </div>
        </div>
      </div>
      <div class="row col-4" id="follow">
        <div class="col-6 align-self-center">
          <b-link href="#foo" id="follow">0<br>followers</b-link>
        </div>
        <div class="col-6 align-self-center">
          <b-link href="#foo" id="follow">0<br>following</b-link>
        </div>
      </div>
    </div>
    <div class="row align-items-start">
      <div class="col">
        <div class="text-left align-self-end">
          My playlists
        </div>
      </div>
      <div class="col text-right">
        <b-button v-b-modal.modal-center id="newPlaylistButton">Create new playlist</b-button>
        <b-modal id="modal-center" content-class="popup" title="Create playlist">
          <b-container fluid>
            <b-row class="my-4 align-self-center d-flex justify-content-center" id="modal-body">
              <form id="inputFields">
                <input type="text" id="playlistNameInput" placeholder="Playlist name" required>
              </form>
            </b-row>
          </b-container>
        </b-modal>
      </div>
    </div>
    <div class="row" id="playlist"></div>
    <div class="row" id="playlist"></div>
    <div class="row" id="playlist"></div>
    <div class="row" id="playlist"></div>
    <div class="row" id="playlist"></div>
    <div class="b-row" id="track-playback-bar"></div>
  </div>
</template>

<style>
  .col-8, .col-4 {
    margin: 50px 0;
  }

  #profileInfo {
    background-color: #E3D5CA;
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
    color: #E3D5CA;
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
  }

  #newPlaylistButton {
    background-color: #F76E45;
    border-radius: 15px;
  }

  /* New playlist modal styling */
  #playlistNameInput {
    width: 400px;
  height: 50px;
  border-radius: 30px;
  padding-left: 20px;
  }

  #track-playback-bar {
    background-color: green;
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
