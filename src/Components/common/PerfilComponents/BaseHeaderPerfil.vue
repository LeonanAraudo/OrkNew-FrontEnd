<script setup>
</script>
<template>
    <div class="HeaderPerfilContainer">
        <div class="bannerImgBox">
             <img class="img" src="../../../assets/imagee.png" alt="banner"/>
        </div>
        <div class="infosUserBox">
            <div class="userBox">
                <div class="userImgBox">
                    <img class="img" src="../../../assets/image3.png" alt="banner"/>
                </div>
                <div class="userNameBox">
                    <p class="username">Leonan Reis</p>
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
                   <p class="followersAmount">20</p>
                </div>
                <div class="followersContent">
                    <p class="followersName">Seguidores</p>
                    <p class="followersAmount">5600</p>
                </div>
                <div class="followersContent">
                    <p class="followersName">Postagens</p>
                    <p class="followersAmount">20</p>
                </div>
            </div>
            <div class="btnBox">
                <button class="btn">Mensagem</button>
                <button class="btn">Seguir</button>
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
    flex-direction: row;
    align-items: baseline;
    justify-content: baseline;
    gap: 20px;
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
.img{
    width: 100%;
    height: 100%;
    background-size: cover;
    background-position: center;  
    background-repeat: no-repeat;
}
</style>