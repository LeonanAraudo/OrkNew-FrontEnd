<script setup>
import Header from './Header.vue';
</script>
<template>
    <div class="containerBackground">
        <header class="headerBox">
            <Header/>
        </header>
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
        height: 3rem; 
    }
   
</style>