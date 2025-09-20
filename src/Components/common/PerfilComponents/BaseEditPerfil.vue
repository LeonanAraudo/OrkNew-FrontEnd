<script setup>
import { ref } from "vue";
import Dialog from 'primevue/dialog';
import { Avatar, Button, Textarea } from "primevue";
import BaseFileUpload from "./BaseFileUpload.vue";

const visible = ref(false);
</script>
<template>
    <div>
        <a class="abrir" label="Show" @click="visible = true">Editar Perfil</a>
        <Dialog v-model:visible="visible" modal header="Editar Perfil" class="dialog"  :style="{ width: '25rem' }">
            <div class="editFileBox">
                <BaseFileUpload/>
            </div>
            <div class="inputBox">
                <div class="labelBox">
                    <label for="username">Biografia</label>
                </div>
                <Textarea v-model="value" rows="2" cols="30" />
            </div>
            <template #footer>
                <Button label="Cancel" text severity="secondary" @click="visible = false" autofocus />
                <Button label="Save" variant="outlined" severity="secondary" @click="visible = false" autofocus />
            </template>
        </Dialog>
    </div>
</template>
<style>
.dialog{
    display: flex;
    flex-direction: column;
    gap: 30px;
    font-family: "Roboto";
}
.inputBox{
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 2px;
}
.labelBox{
    width: 78%;
    display: flex;
    justify-content: baseline;
}
.editFileBox{
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 30px;
}
.abrir{
    color: black;
    cursor: pointer;
    text-decoration: underline;
}
.abrir:hover{
    color: #000;
}
</style>

