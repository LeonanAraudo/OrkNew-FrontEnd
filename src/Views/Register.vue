<script setup>
import 'primeicons/primeicons.css'
import FormRegister from '../Components/forms/FormRegister.vue';

</script>

<template>
    <div class="conteiner">
        <FormRegister />
    </div>
</template>

<style >
*{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}
.conteiner{
    background-color: #E5F0FD;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100vw;
    height: 100vh;
    z-index: 1;
}
.voltar{
    position: absolute;
    display: flex;
    justify-content: baseline;
    margin: 20px;
}
</style>