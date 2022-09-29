<template>
    <b-row class="justify-content-center search">
        <b-row class="justify-content-center search-row">
                <input type="text" id="search-input" placeholder="Start looking for something!" autocomplete="off" required>
                <!-- <img src="../../../images/search.jpg" id="search-icon"> -->
        </b-row>
        <b-row class="content">
        </b-row>
    </b-row>
</template>

<script>
export default {
  name: 'search',
  data() {
    return {
      message: 'none'
    }
  }
}
</script>

<style>
.search {
    padding-top: 5%;
}

.content{
    height:100%;
}

.search-row {
    width:500px;
}

.search:focus {
    background-color: white;
}

#search-input {
    height:70px;
    border-radius: 40px;
    background-color: #E3D5CA;
    transition: 2s;
    font-size: 20px;
    width:300px;
    padding-left:20px;
}

#search-input:focus, #search-input:valid {
    width:600px;
    padding-left:3%;
}

/* #search-input:not(:focus){ /
    / padding-left:3%; /
/ } */

#search-input::placeholder {
    color:black;
    font-family:"DM Sans", sans-serif;
    font-size:20px;
}

#search-icon {
    height:50px;
    width:50px;
    margin-top:10px;
    border-radius: 40px;
}
</style>
