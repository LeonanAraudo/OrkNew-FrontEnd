<script setup lang="ts">
   import type { imgTypes } from '../../Types/img';
    defineProps<imgTypes>()

    const emit = defineEmits(['click'])
    const handleClick = () => emit('click')
</script>

<template >
  <div 
    class="sidebar-icon"
    @click="handleClick"
  >
  <div 
  class="iconsLateralBox"
  :class="{ 'sidebar-icon--active': isActive }">
    <img 
      :src="iconUrl" 
      :alt="label"
      :width="50"
      :height="50"
      class="imgIcon"
    />
  </div>
    <span class="sidebar-icon__label">{{label }}</span>
  </div>
</template>
<style scoped>
    .sidebar-icon{
      width: 100%;
      height: 10%;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
}
    .imgIcon{
      cursor: pointer;
    }
    .sidebar-icon--active{
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 50%;
      cursor: pointer;
      background-color: #167BFF ;
    }
    .sidebar-icon__label{
      font-family: "Montserrat";
      color: #4B4B4B;
      font-size: 14px;
    }
    .iconsLateralBox{
      width: 45px;
      height: 45px;
      margin-top: 10px;
    }
</style>