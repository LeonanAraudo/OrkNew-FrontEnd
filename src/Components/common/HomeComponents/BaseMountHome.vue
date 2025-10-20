<script setup>
import BasePosts from './Post/BasePosts.vue';
import BaseSuggestions from './suggestions/BaseSuggestions.vue';
</script>
<template>
    <div class="container">
        <div>
            <BasePosts/>
        </div>
        <div>
            <BaseSuggestions/>
        </div>
    </div>
</template>
<style scoped>
.container{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}
</style>