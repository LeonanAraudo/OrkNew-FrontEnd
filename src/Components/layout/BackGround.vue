<script setup>
import Header from './Header.vue';
import Lateral from './Lateral.vue';
</script>
<template>
    <div class="containerBackground">
        <header class="headerBox">
            <Header/>
        </header>
        <div class="lateralBox">
            <Lateral/>
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
    .lateralBox{
        width: 4.5rem;
        height: 90%;
        padding-top: 20px;
    }
   
</style>