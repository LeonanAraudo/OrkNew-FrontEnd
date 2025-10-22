<script setup>
import { computed, onMounted } from 'vue';
import { useAuthStore } from '../../../Stores/authStore';
import BaseEditPerfil from './BaseEditPerfil.vue';

const authStore = useAuthStore();
const user = computed(() => authStore.user);
const isAuthenticated = computed(() => authStore.isAuthenticated);
const isLoading = computed(() => authStore.isLoading);

const loadUserData = async () => {
  try {
    const result = await authStore.getUsers();
    if (!result.success) {
      console.error('Erro ao carregar usuário:', result.error);
      return;
    }
    // Os dados já devem estar no authStore.user após getUsers()
    console.log('Dados do usuário carregados:', authStore.user);
  } catch (error) {
    console.error('Erro ao carregar dados do usuário:', error);
  }
};
onMounted(async () => {
  if (isAuthenticated.value && !user.value) {
    await loadUserData();
  }
});
</script>
<template>
    <div v-if="isLoading" class="loading-container">
        Carregando...
    </div>
    <div v-else-if="user" class="HeaderPerfilContainer">
        <div class="bannerImgBox">
             <img class="img" src="../../../assets/imagee.png" alt="banner"/>
        </div>
        <div class="infosUserBox">
            <div class="userBox">
                <div class="userImgBox">
                    <img class="img" src="../../../assets/image3.png" alt="banner"/>
                </div>
                <div class="userNameBox">
                    <p class="username">{{ user.username }}</p>
                    <p class="arroba">@LeonanReis199219238</p>
                    <div class="costumerBox">
                        <p>Estudante</p>
                        <p>20y</p>  
                    </div>
                </div>
            </div>
            <div class="followersBox">
                <div class="followersContent">
                   <p class="followersName">Seguindo</p>
                   <p class="followersAmount">{{ user.qtd_seguindo }}</p>
                </div>
                <div class="followersContent">
                    <p class="followersName">Seguidores</p>
                    <p class="followersAmount">{{ user.qtd_seguidores }}</p>
                </div>
                <div class="followersContent">
                    <p class="followersName">Postagens</p>
                    <p class="followersAmount">{{ user.qtd_publicacao }}</p>
                </div>
            </div>
            <div class="btnBox">
                <div class="spaceButtons">
                    <button class="btn">Mensagem</button>
                    <button class="btn">Seguir</button>
                </div>
                <div class="editPerfil">
                    <BaseEditPerfil/>
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped>
.HeaderPerfilContainer{
    width: 100%;
    height: 65%;
    border-bottom: 1px solid #BEBEBE;
    font-family: 'Roboto';
}
.bannerImgBox{
    width: 100%;
    height: 60%;
    border-top-left-radius: 19px;
    border-top-right-radius: 19px;
    position: relative;
    z-index: 1;
}
.userImgBox{
    width: 13rem;
    height: 13rem;
    position: relative;
    z-index: 2;
    bottom: 100px;
}
.btnBox{
    padding-top: 15px;
    display: flex;
    flex-direction: column;
    align-items: baseline;
    justify-content: baseline;
}
.userNameBox{
    padding-top: 10px;
    display: flex;
    align-items: baseline;
    justify-content: baseline;
    flex-direction: column;
}
.costumerBox{
    display: flex;
    align-items: baseline;
    justify-content: baseline;
    flex-direction: column;
    margin-top:15px ;
}
.followersBox{
    padding-top: 15px;
    gap: 30px;
    display: flex;
    align-content:baseline;
    justify-content: space-between;
    flex-direction: row;
}
.infosUserBox{
    height:40%;
    width: 100%;
    display: flex;
    justify-content: space-around;
    flex-direction: row;
}
.userBox{
    display: flex;
    gap:20px;
    justify-content: space-between;
    flex-direction: row;
}
.followersContent{
    display: flex;
    align-items: center;
    justify-content: baseline;
    flex-direction: column;
}
.username{
    font-size: 27px;
    font-weight: bold;
}
.arroba{
    font-size: 14px;
    color: #BEBEBE;
}
.followersName{
    font-size: 19px;
}
.followersAmount{
    font-weight: bold;
    font-size: 18px;
}
.btn{
    background-color: #3879F3;
    width: 150px;
    border: none;
    outline: none;
    color: #fff;
}
.btn:hover{
    transition: all 0.5s;
    background-color: #a8c3f5;
}
.spaceButtons{
    display: flex;
    height: 30%;
    flex-direction: row;
    gap: 20px;
}
.editPerfil{
    width: 100%;
    height: 60%;
    display: flex;
    align-items:end;
    justify-content: end;
}
.img{
    width: 100%;
    height: 100%;
    background-size: cover;
    background-position: center;  
    background-repeat: no-repeat;
}
</style>