<script setup>
import Avatar from 'primevue/avatar';
import MenuPost from './MenuPost.vue';
import ComentsPost from './ComentsPost.vue';
import LikePost from './LikePost.vue';
</script>
<template>
    <div>
        <div class="postBox">
            <div class="userBox">
                <div class="infoBox">
                    <div>
                        <Avatar image="https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png" class="mr-2" size="large" shape="circle" />
                    </div>
                    <div class="userNameBox">
                        <div class="nameBox">
                            <h3>Leonan </h3>
                            <div class="pontoBox">
                                <div class="ponto"></div>
                            </div>
                            <p class="horas">5h</p>
                        </div>
                        <p class="arroba">@leonardo</p>
                    </div>  
                </div>
               <div >
                    <MenuPost/>
                </div>
            </div>
            <div class="textBox">
                <div class="textContent">
                    <p >
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.
                    </p>
                </div>
            </div>
            <div class="imgBox">
                <img class="imagem" src="https://embratur.com.br/wp-content/uploads/2022/07/Embratur-Brasil-ultrapassa-marca-de-1-milhao-de-turistas-estrangeiros-recebidos-pela-primeira-vez-desde-2020-1.png" alt="" srcset="">
            </div>
            <div class="iconsBox">
                <div>
                    <ComentsPost/>
                </div> 
                <div>
                    <LikePost/>
                </div>   
            </div>
        </div>
    </div>
</template>
<style scoped>
.postBox{
    width: 45%;
    border: 1px solid #BEBEBE;
    display: flex;
    flex-direction: column;
    margin-left: 60px;
    margin-top: 30px;
    font-family: "Roboto";
}
.userBox{
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-direction: row;
    padding: 10px;
}
.textBox{
   width: 100%;
   display: flex;
   align-items: center;
   justify-content: center;
   text-align: left;
}
.textContent{
    width: 95%;
}
.infoBox{
    display: flex;
    align-items: center;
    flex-direction: row;
    gap: 15px;
}
.pontoBox{
    display: flex;
    align-items: center;
    justify-content: center;
    padding-top: 3px;
}
.ponto{
    width: 5px;
    height: 5px;
    background-color: #9A9A9A;
    border-radius: 50%;
}
.horas{
    color: #9A9A9A;
    font-size: 14px;
    margin-top: 3px;
}
.arroba{
    color: #9A9A9A;
    font-size: 14px;
}
.userNameBox{
    width: 20%;
    display: flex;
    align-items: start;
    justify-items:baseline;
    flex-direction: column;
}
 .imgBox {
  width: 100%;
  max-height: 500px; 
  overflow: hidden;  
  display: flex;
  justify-content: center; 
  align-items: center;     
  margin-top: 15px;
}

.imagem {
  width: 97%;       
  height: auto;      
  max-height: 500px; 
  object-fit: cover; 
  border-radius: 5px;
}
.nameBox{
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: row;
    gap: 5px;
}
.iconsBox{
    display: flex;
    align-items: center;
    justify-content: start;
    flex-direction: row;
    gap: 25%;
    padding: 10px;
}
</style>