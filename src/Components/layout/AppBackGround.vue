<script setup>
import { provide, ref } from 'vue';
import AppHeader from './AppHeader.vue';
import AppLateral from './AppLateral.vue';
import BaseHeaderPerfil from '../common/PerfilComponents/BaseHeaderPerfil.vue'
const activeItem = ref('Home')
provide('activeItem',activeItem)
const components = {
    Home: BaseHeaderPerfil,
    explore:'',
    Likes:'',
    Config:''
}
</script>
<template>
    <div class="containerBackground">
        <header class="headerBox">
            <AppHeader/>
        </header>
        <div class="midBox">
            <div class="lateralBox">
                <AppLateral/>
            </div>
            <div class="whiteBox">
                <component :is="components[activeItem]"/>
            </div>
        </div>
    </div>
</template>
<style scoped>
    .containerBackground{
       width: 100vw;
       height: 100vh;
       background-color: #C2DBF8;
    }
    .headerBox{ 
        width: 100%; 
        height: 10%; 
    }
    .midBox{
        height: 90%;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    .lateralBox{
        width: 4.5rem;
        height: 90%;
    }
    .whiteBox{
        width: 93%;
        height: 97%;
        border-radius: 19px;
        margin-right: 15px;
        margin-bottom: 10px;
        background-color: #ffffff;
    }
   
</style>