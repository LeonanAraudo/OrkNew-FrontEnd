<script setup>
import ChatIcon from '../common/HeaderComponents/ChatIcon.vue';
import Notification from '../common/HeaderComponents/NotificationIcon.vue';
import ProfileIcon from '../common/HeaderComponents/ProfileIcon.vue';
import SearchUser from '../common/HeaderComponents/SearchUser.vue';
</script>
<template>
    <div class="containerHeader">
        <div class="tittleBox">
            <p class="tittle">OrkNew</p>
        </div>
        <div class="searchBox">
            <SearchUser/>
        </div>
        <div class="headerOptionsBox">
            <div class="headerOptions">
                <ChatIcon/>
                <Notification/>
                <ProfileIcon/>
            </div>
        </div>
    </div>
</template>
<style scoped>
    .containerHeader{
        width: 100%;
        height: 4rem;
        display: flex;
        align-items: center;
        justify-content: space-evenly;
    }
    .tittleBox{
        width: 20%;
        display: flex;
        align-items: center;
        justify-content:baseline;
    }
    .tittle{
        font-family: "Averia Sans Libre";
        font-size: 2.5em;
    }
    .searchBox{
        width: 35%;
    }
    .headerOptions{
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 50%;
    }
    .headerOptionsBox{
        display: flex;
        align-items: center;
        justify-content: end;
        flex-direction: row;
        width: 35%;
    }
</style>