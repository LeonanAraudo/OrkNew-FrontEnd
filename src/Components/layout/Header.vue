<script setup>
import HeaderIcons from '../common/HeaderComponents/HeaderIcons.vue';
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
                <HeaderIcons 
                    icon-url="https://img.icons8.com/bubbles/100/alarm.png"
                />
                <HeaderIcons 
                    icon-url="https://img.icons8.com/bubbles/100/chat.png"
                />
            </div>
        </div>
    </div>
</template>
<style scoped>
    .containerHeader{
        width: 100%;
        height: 100%;
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
        font-size: 3em;
    }
    .searchBox{
        width: 38%;
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