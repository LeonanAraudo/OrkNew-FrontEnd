<script setup lang="ts">
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import Password from 'primevue/password';
import Stepper from 'primevue/stepper';
import StepList from 'primevue/steplist';
import StepPanels from 'primevue/steppanels';
import Step from 'primevue/step';
import StepPanel from 'primevue/steppanel';
import { reactive, ref } from 'vue';
import { useRegister } from '../../Composables/useRegister';
import { useRouter } from 'vue-router';
import { goToLogin } from '../../Utils/goToRoutes';
import { useValidation } from '../../Composables/useFormValidation';
import { stepOneSchema, stepTwoSchema } from '../../Schemas/validationRegisterForm';

const router = useRouter()
const { register, isLoading } = useRegister()

const { errors: step1Errors, validate: validateStep1 } = useValidation(stepOneSchema)
const { errors: step2Errors, validate: validateStep2 } = useValidation(stepTwoSchema)

const currentStep = ref('1')
const confirmPassword = ref('')
const formData = reactive({
  userName: '',
  email: '',
  password: ''
})

const validateStep = (step: string): boolean => {
  switch(step) {
    case '1':
      const step1Data = {
        userName: formData.userName,
        email: formData.email
      }
      return validateStep1(step1Data) !== null
      
    case '2':
      const step2Data = {
          password: formData.password,
          confirmPassword: confirmPassword.value
      }
      return validateStep2(step2Data) !== null
      
    default:
      return true
  }
}

const goToStep = (targetStep: string, activateCallback: Function) => {
  if (parseInt(targetStep) > parseInt(currentStep.value)) {
    if (!validateStep(currentStep.value)) return
  }
  currentStep.value = targetStep
  activateCallback(targetStep)
}

const toLogin = () => goToLogin(router)

const handleSubmit = async (): Promise<void> => {
  const allStepsValid = ['1', '2'].every(step => validateStep(step))
  
  if (!allStepsValid) return
  
  const result = await register(formData)
  if (result.success) toLogin()
}
</script>

<template>
  <Stepper :value="currentStep" class="progress">
    <StepList class="stepList">
      <Step class="step" value="1">I</Step>
      <Step class="step" value="2">II</Step>
    </StepList>
    <StepPanels class="panelsBox">
      <form @submit.prevent="handleSubmit" class="formPanelsBox">
        <StepPanel class="stepPanel" v-slot="{ activateCallback }" value="1">
          <div class="input-box">
            <div class="bloco-input">
              <label for="username" class="label">Username</label>
              <InputText 
                id="username" 
                v-model="formData.userName"
                placeholder="Digite seu username" 
                class="input" 
                :disabled="isLoading"
              />
              <p v-if="step1Errors.userName" class="error">{{ step1Errors.userName }}</p>
            </div>
            <div class="bloco-input">
              <label for="email" class="label">E-mail</label>
              <InputText 
                id="email" 
                v-model="formData.email"
                placeholder="Digite seu e-mail" 
                type="email"
                class="input" 
                :disabled="isLoading"
              />
              <p v-if="step1Errors.email" class="error">{{ step1Errors.email }}</p>
            </div>
          </div>
          <Button 
            label="Next" 
            icon="pi pi-arrow-right" 
            iconPos="right" 
            @click="goToStep('2', activateCallback)" 
          />
        </StepPanel>

        <StepPanel class="stepPanel" v-slot="{ activateCallback }" value="2">
          <div class="input-box">
            <div class="bloco-input">
              <label for="senha" class="label">Senha</label>
              <Password 
                id="senha" 
                v-model="formData.password"
                toggleMask 
                placeholder="Digite sua senha" 
                class="password-field"
                input-class="password-input"
                :disabled="isLoading"
              />
              <p v-if="step2Errors.password" class="error">{{ step2Errors.password }}</p>
            </div>
            <div class="bloco-input">
              <label for="confirmarSenha" class="label">Confirmar senha</label>
              <Password 
                id="confirmarSenha" 
                v-model="confirmPassword"
                toggleMask 
                placeholder="Confirme sua senha" 
                class="password-field"
                input-class="password-input"
                :disabled="isLoading"
              />
              <p v-if="step2Errors.confirmPassword" class="error">{{ step2Errors.confirmPassword }}</p>
            </div>
          </div>
          <div class="buttonsBoxStep">
            <Button 
              label="Back" 
              severity="secondary" 
              icon="pi pi-arrow-left" 
              @click="goToStep('1', activateCallback)" 
              :disabled="isLoading"
            />
            <Button 
              type="submit" 
              class="buttonRegister" 
              label="Cadastrar"
              :loading="isLoading"
              :disabled="isLoading"
            />
          </div>
        </StepPanel>
      </form>
    </StepPanels>
  </Stepper>      
</template>

<style>
.progress{
    display: flex;
    width: 40%;
    height: 80%;
    align-items: center;
    justify-content:space-evenly;
    flex-direction: column;
    border-radius: 16px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    font-family: "Montserrat";
    background-color: #ffffff;
}
.stepList{
    width: 90%;
    height: 10%;
}
.panelsBox{
    width: 100%;
    height: 90%;
    display: flex;
    align-items: center;
    justify-content: center;
}
.formPanelsBox{
    width: 100%;
    height: 100%;
}
.input-box{
    width: 100%;
    height: 100%;
    gap: 30px;
    margin-bottom: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
}
.stepPanel{
    width: 100%;
    height: 100%;
     display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
}
.buttonsBoxStep{
    width: 90%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-direction: row;
}
.label{
    font-weight:600;
    color: #333333;
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
.error{
    color: red;
    padding-left: 10px;
}
.buttonRegister{
    background-color: #097233 !important;
    border: none !important;
    outline: none !important;
    color: #fff !important;
}
@media(max-width: 768px){
.formulario{
    width: 90%;
    height: 60%;
    margin-bottom: 100px;
}
.input{
    color: #000;
}
}
</style>