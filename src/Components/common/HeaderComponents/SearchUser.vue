<script setup lang="ts">
import InputText from 'primevue/inputtext';
import IconField from 'primevue/iconfield';
import InputIcon from 'primevue/inputicon'; 
import { ref } from 'vue'

const value1 = ref('')
</script>

<template>
    <IconField>
        <InputIcon class="pi pi-search" />
        <InputText v-model="value1" placeholder="Search" class="searchButton"  />
    </IconField>
</template>
<style scoped>
    .searchButton{
        width: 100% !important;
    }
</style>