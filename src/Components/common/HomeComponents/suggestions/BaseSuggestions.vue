<script setup>
import { Avatar } from 'primevue';
import BaseButtonPublic from './BaseButtonPublic.vue';
</script>
<template>
    <div class="containerSuggestions">
        <div class="postagem">
            <BaseButtonPublic/>
        </div>
        <div class="sugesBox">
            <div class="title">
                <p>Sugestões para seguir</p>
            </div>
            <div class="sugesItem">
                <div class="avatarBox">
                    <Avatar image="https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png" class="mr-2" size="large" shape="circle" />
                    <p>Nome</p>
                </div>
                <div>
                    <button class="but">Seguir</button>
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped>
.containerSuggestions{
    width: 350px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    font-family: "Roboto";
}
.sugesBox{
    width: 100%;
    border: 1px solid #BEBEBE;
    border-radius: 5px;
}
.sugesItem{
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-direction: row;
    padding: 10px;
}
.title{
    width: 100%;
    border-bottom: 1px solid #BEBEBE;
    padding: 10px;
    text-align: left;
    font-weight: bold;
}
.but{
    background-color: #001A4A;
    color: #ffffff;
    height: 30px;       /* altura fixa */
    line-height: 30px;  /* centraliza o texto verticalmente */
    padding: 0 50px;
    border: none;
    outline: none;
}
.avatarBox{
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: row;
    gap: 10px;
}
</style>
