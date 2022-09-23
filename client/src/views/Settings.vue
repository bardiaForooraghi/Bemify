<template>
    <div>
    <h1 id="SettingsHeader">Your account</h1>
    <form id="inputFields">
        <input type="text" id="username" placeholder="*Username">
    </form>
    </div>
</template>

<style>
    #SettingsHeader {
        font-family: "DM Sans", sans-serif;
        font-size: 36px;
        color:#E3D5CA;
        padding-right: 65%;
        padding-top: 4%;
    }
    #inputFields {
        padding-right: 47%;
        padding-top:2%;
    }

    #username {
        width:600px;
        height:70px;
        border-radius: 25px;
    }

    #username::placeholder{
        font-family:"DM Sans", sans-serif;
        font-size: 20px;
    }
</style>

<script>

export default {
  name: 'settings',
  data() {
    return {
      message: 'none'
    }
  }
}
</script>
