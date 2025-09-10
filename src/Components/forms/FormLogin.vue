<script setup lang="ts">
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import Password from 'primevue/password';
import { z, ZodError} from 'zod'
import { useAuthStore } from '../../Stores/authStore';
import { onUnmounted, reactive, ref, watch } from 'vue';

const formLogin = z.object({
        email:z.string().min(1,"Email obrigatório").email({message: "Email inválido"}),
        password: z.string().min(6,"Senha obrigatória")
})

type FormLogin =z.infer<typeof formLogin>

const form = reactive<FormLogin>({
    email: '',
    password: ''
})

const loginError = ref('')
const authStore = useAuthStore()
async function handleLogin (): Promise<void> {
    loginError.value = ''
    if(!formLogin) return
    try{
        const credentials = formLogin.parse(form)  
        const result = await authStore.login(credentials)
        if(result.success){
                console.log("Login realizado com sucesso")
            }else{
                console.log("Erro ao realizar Login", result.error);
            }
    }catch(err){
        if (err instanceof ZodError) {
            loginError.value = err.issues[0]?.message || "Erro no formulário"
        }
}
}
watch(
  [() => form.email, () => form.password], 
  () => {
    loginError.value = '' 
  }
)

onUnmounted(() => {
    form.email = ''
    form.password = ''
})
</script>

<template>
      <Form @submit.prevent="handleLogin" class="formularioLogin" >
                <p class="titulo">Entre e sinta-se à vontade</p>
                <div class="grupoInput">
                    <div class="bloco-input">
                            <label for="email" class="label">E-mail</label>
                            <InputText 
                                v-model="form.email"
                                placeholder="seu@email.com"
                                id="email"  
                                class="input" 
                                type="email"
                                required
                                :disabled="authStore.isLoading"
                            />
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
                              required
                             :disabled="authStore.isLoading"
                            />
                    </div>
                </div>
                <div class="containerBotao">
                  <Button type="submit" class="botaoEntrar" label="Entrar" />
                </div>
                <div>
                    <p class="textoBaixo">Ainda não tem conta?<router-link to="/Cadastro" class="textoBaixoPT2">Cadastre-se</router-link></p>
                </div>
            </Form> 
</template>

<style>
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

.password-field .p-password-input {
    border: none !important;
    background-color: #E3E5ED !important;
    width: 100% !important;
}
.erro{
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