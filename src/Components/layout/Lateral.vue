<script setup>
import LateralIcons from '../common/LateralIcons.vue';
import { ref } from 'vue'
const activeItem = ref('Home')

function selectItem(itemId) {
  activeItem.value = itemId 
}
const data = [
    { iconUrl:"https://img.icons8.com/bubbles/100/home.png",label:"Home"},
    { iconUrl:"https://img.icons8.com/bubbles/100/search.png",label:"Explore"},
    { iconUrl:"https://img.icons8.com/bubbles/100/like.png",label:"Likes"},
    { iconUrl:"https://img.icons8.com/bubbles/100/gear.png",label:"Config"}
]
</script>
<template>
    <div class="containerLateral">
        <div class="lateralIcons">
            <LateralIcons
            v-for="(item,index) in data"
                :key="index"
                :icon-url="item.iconUrl"
                :label="item.label"
                :is-active="activeItem === item.label"
                @click="selectItem(item.label)"
                />
        </div>
    </div>
</template>
<style scoped>
</style>