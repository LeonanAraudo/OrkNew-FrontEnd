<script setup lang="ts">
import type { imgTypes } from '../../../Types/img';
defineProps<imgTypes>()

const emit = defineEmits(['click'])
const handleClick = () => emit('click') //quando executada dispara o evento click pro pai
</script>
<template>
    <div
    class="headerIconBox"
    @click="handleClick"
    >
        <img
            :src="iconUrl"
            :width="60"
            :height="60"
        />
    </div>
</template>
<style scoped>
.headerIconBox{
    width: 60px;
    height: 60px;
}
</style>