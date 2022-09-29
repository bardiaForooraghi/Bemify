<template>
<div>
    <b-row id="content" align-v="stretch">
        <b-col id="">
            <b-row id="">
                <h1 id="SettingsHeader">Your account</h1>
            </b-row>
            <b-row id="inputFields" class="fourth justify-content-center">
                <input type="text" id="username" placeholder="*Username">
                <p id="accountText">Your username is what the display name in which other users will see you by, and what you use to login!</p>
            </b-row>
            <b-row id="" class="justify-content-center"><input type="text" id="password" placeholder="*Password">
                <p id="accountText">Your password should be kept secret, avoid sharing it with anyone and staff will never ask for these details.</p>
            </b-row>
            <b-row id="" class="justify-content-center"><input type="text" id="emailAddress" placeholder="*Email Address"></b-row>
            <b-row id="" class="fourth justify-content-center">
                    <button id="save">Save Changes</button>
                    <button id="cancel">Cancel Changes</button>
            </b-row>
        </b-col>
        <b-col id="">
            <b-row id=""><b-img :src="require('../../../images/profile-pic.png')" id="profile-pic" center></b-img></b-row>
            <b-row id="" class="fourth justify-content-center"><b-button id="changeProfilePic">Change Profile Picture</b-button></b-row>
        </b-col>
    </b-row>
</div>
</template>

<script>
export default {
  name: 'test',
  data() {
    return {
      message: 'none'
    }
  }
}
</script>

<style>
#profile-pic {
    max-height:350px;
    max-width: 350px;
    margin-top:150px;
}

#SettingsHeader {
        font-family: "DM Sans", sans-serif;
        font-size: 36px;
        color:#E3D5CA;
        margin-top:8%;
        padding-left:12%;
    }

#username, #password, #emailAddress {
    width:600px;
    height:70px;
    border-radius: 25px;
    padding-left: 20px;
}

#username::placeholder, #password::placeholder, #emailAddress::placeholder{
    font-family:"DM Sans", sans-serif;
    font-size: 20px;
}

#accountText {
    color: #E3D5CA;
    font-family: "DM Sans", sans-serif;
    max-width: 600px;
    text-align: left;
    }

#save, #cancel, #changeProfilePic {
    border-radius: 25px;
    font-size: 18px;
    font-family: "DM Sans", sans-serif;
    height: 55px;
    border: none;
    margin-top:50px;
}

#save {
    background-color:#F76E45 ;
    color:#E3D5CA;
    width:150px;
    margin-right: 30px;
}

#cancel {
    background-color:#E3D5CA;
    color: #F76E45;
    width:170px;
    margin-left: 30px;
}

#changeProfilePic{
    background-color: #F76E45;
    width: 250px;
}
</style>
