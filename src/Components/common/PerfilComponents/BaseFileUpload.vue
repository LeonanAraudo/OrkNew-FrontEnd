<script setup>
import { ref } from 'vue';

const backgroundImage = ref('');

const handleFileChange = (event) => {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      backgroundImage.value = e.target.result;
    };
    reader.readAsDataURL(file);
  }
};
</script>

<template>
    <div class="container">
        <label 
          class="imgBox" 
          for="fileUpload"
          :class="{ 'has-image': backgroundImage }"
        >
            <div 
              class="background-layer"
              :style="backgroundImage ? { 
                backgroundImage: `url(${backgroundImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'
              } : {}"
            ></div>
            
            <input 
              id="fileUpload" 
              type="file" 
              accept="image/*"
              @change="handleFileChange"
            />
            
            <div v-if="!backgroundImage" class="placeholder">
              📷 Selecionar foto
            </div>
        </label>
    </div>
</template>

<style scoped>
.container{
    width: 100%;
    height: 180px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.imgBox{
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 180px;
    height: 180px;
    background-color: #F2F2F2;
    border-radius: 50%;
    cursor: pointer;
    overflow: hidden;
    border:1px solid black;
}

.background-layer {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 50%;
}

input[type="file"] {
    position: absolute;
    opacity: 0;
    width: 100%;
    height: 100%;
    cursor: pointer;
}

.placeholder {
    color: #666;
    text-align: center;
    font-size: 14px;
}
</style>