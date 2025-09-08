<script setup>
import Header from './Header.vue';
import Lateral from './Lateral.vue';
</script>
<template>
    <div class="containerBackground">
        <header class="headerBox">
            <Header/>
        </header>
        <div class="midBox">
            <div class="lateralBox">
                <Lateral/>
            </div>
            <div class="whiteBox">

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