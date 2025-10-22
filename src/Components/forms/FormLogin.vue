<script setup lang="ts">
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import Password from 'primevue/password';
import { useAuthStore } from '../../Stores/authStore';
import { onUnmounted, reactive } from 'vue';
import { type LoginForm, formLogin } from '../../Schemas/validationLoginForm';
import { useValidation } from '../../Composables/useFormValidation';
import { useRouter } from 'vue-router';

const router = useRouter()
const authStore = useAuthStore()

const { errors, validate} = useValidation<LoginForm>(formLogin)
const form = reactive<LoginForm>({
    email: '',
    password: ''
})

function handleClickRegister(){ 
  router.push('/Register')
}

async function handleLogin(): Promise<void> {
    try {
        const credentials = validate(form)
        if (!credentials) return
        console.log('🚀 Iniciando processo de login...')
        const result = await authStore.login(credentials)
        if (!result) {
            console.error("❌ Login falhou: resultado indefinido")
            return
        }
        if (result.success) {
            console.log("✅ Login realizado com sucesso")
            router.push( '/Home')
        }
    } catch (error) {
        console.error("❌ Erro inesperado durante o login:", error)
    }
}
onUnmounted(() => {
    form.email = ''
    form.password = ''
    for (const key in errors) delete errors[key];
})
</script>

<template>
      <form @submit.prevent="handleLogin" class="formularioLogin" >
                <p class="titulo">Entre e sinta-se à vontade</p>
                <div class="grupoInput">
                    <div class="bloco-input">
                            <label for="email" class="label">E-mail</label>
                            <InputText 
                                v-model="form.email"
                                placeholder="seu@email.com"
                                id="email"  
                                class="input" 
                                type="text"
                                :disabled="authStore.isLoading"
                            />
                    <p v-if="errors.email" class="error">{{ errors.email }}</p>
                    </div>
                   <div class="bloco-input">
                            <label for="senha" class="label">Senha</label>
                            <Password 
                             v-model="form.password"
                              toggleMask 
                              placeholder="Digite sua senha" 
                              id="senha" 
                              class="password-field"
                              input-class="password-input"
                             :disabled="authStore.isLoading"
                            />
                    <p v-if="errors.password" class="error">{{ errors.password }}</p>
                    </div>
                </div>
                <div class="containerBotao">
                  <Button 
                  type="submit"
                   class="botaoEntrar" 
                   label="Entrar" 
                   :loading="authStore.isLoading"
                   :disabled="authStore.isLoading"
                   />
                </div>
                <div>
                    <p class="textoBaixo">Ainda não tem conta?<span @click="handleClickRegister" class="textoBaixoPT2">Cadastre-se</span></p>
                </div>
            </form> 
</template>

<style scoped>
.formularioLogin{
    background-color: #FAFEFF;
    display: flex;
    width: 85%;
    height: 80%;
    align-items: center;
    justify-content:space-around;
    flex-direction: column;
    border-radius: 16px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    font-family: "Montserrat";
}
.containerBotao{
    width: 100%;
}
.titulo{
    font-size: clamp(1rem, 2vw, 1.365rem);
    font-weight: bold;
    color: #333333;
    margin-top: 20px;
}
.label{
    font-weight:600;
    color: #333333;
}
.botaoEntrar{
    width: 40% !important;
    background-color: #A8D5BA !important;
    border: none !important;
    outline: none !important;
    color:#333333 !important;
    border-radius: 10px !important;
}
.botaoEntrar:hover{
    transform: scale(1.05) !important;
    transition: all 0.5s !important;
}
.textoBaixo{
    font-size: clamp(1rem, 2vw, 1rem);
    font-weight: 500;
    color: #000;
}
.textoBaixoPT2{
    font-weight: 600;
    color: #2D9CDB;
    cursor: pointer;
}
.textoBaixoPT2:hover{
    color: #084061;
    transition:all 0.5s;
}
.grupoInput{
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 20px;
}
.bloco-input{
    width: 70%;
    display: flex;
    align-items:baseline;
    justify-content:baseline;
    flex-direction: column;
}

input{
    border: none !important;
    background-color: #E3E5ED !important;
    width: 100% !important;
}

.password-field {
    width: 100% !important;
}

.password-field :deep(.p-password) {
    width: 100% !important;
    background-color: #E3E5ED !important;
}

.password-field :deep(.p-password-input) {
    border: none !important;
    background-color: #E3E5ED !important;
    width: 100% !important;
}

.password-field :deep(.p-password-panel) {
    margin-top: 5px;
}
.error{
    color: red;
    padding-left: 10px;
}
@media(max-width: 768px){
.formularioLogin{
    width: 90%;
    height: 60%;
    margin-bottom: 100px;
}
.input{
    color: #000;
}

}
</style>