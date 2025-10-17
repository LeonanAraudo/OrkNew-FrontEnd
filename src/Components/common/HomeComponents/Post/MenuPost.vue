<script setup>
import { ref } from "vue"
import TieredMenu from "primevue/tieredmenu"

const menu = ref()

const items = ref([
  {
    label: "Arquivo",
    icon: "pi pi-file",
    items: [
      {
        label: "Novo",
        icon: "pi pi-plus",
        items: [
          { label: "Documento", icon: "pi pi-file" },
          { label: "Imagem", icon: "pi pi-image" },
          { label: "Vídeo", icon: "pi pi-video" },
        ],
      },
      { label: "Abrir", icon: "pi pi-folder-open" },
      { label: "Imprimir", icon: "pi pi-print" },
    ],
  },
  {
    label: "Editar",
    icon: "pi pi-file-edit",
    items: [
      { label: "Copiar", icon: "pi pi-copy" },
      { label: "Excluir", icon: "pi pi-times" },
    ],
  },
  { label: "Pesquisar", icon: "pi pi-search" },
  { separator: true },
  {
    label: "Compartilhar",
    icon: "pi pi-share-alt",
    items: [
      { label: "Slack", icon: "pi pi-slack" },
      { label: "Whatsapp", icon: "pi pi-whatsapp" },
    ],
  },
])

const toggle = (event) => {
  menu.value.toggle(event)
}
</script>

<template>
  <div class="menu-container">
    <i
      class="pi pi-ellipsis-v menu-icon"
      @click="toggle($event)"
      aria-haspopup="true"
      aria-controls="overlay_tmenu"
    ></i>

    <TieredMenu ref="menu" id="overlay_tmenu" :model="items" popup appendTo="self" />
  </div>
</template>

<style scoped>
.menu-container {
  display: flex;
  justify-content: center;
  align-items: center;
}
.menu-icon {
  font-size: 17px;
  cursor: pointer;
  color: #333;
  transition: color 0.2s ease;
}
.menu-icon:hover {
  color: #000;
}
</style>
