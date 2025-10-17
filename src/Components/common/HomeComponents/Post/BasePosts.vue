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
                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.
                </p>
            </div>
            <div>

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