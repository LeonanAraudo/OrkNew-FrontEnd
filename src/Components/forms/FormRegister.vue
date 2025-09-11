<script setup>
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import Password from 'primevue/password';
import Stepper from 'primevue/stepper';
import StepList from 'primevue/steplist';
import StepPanels from 'primevue/steppanels';
import StepItem from 'primevue/stepitem';
import Step from 'primevue/step';
import StepPanel from 'primevue/steppanel';
</script>

<template>
        <Stepper value="1" class="progress">
            <StepList class="stepList">
                <Step class="step" value="1"> I</Step>
                <Step class="step" value="2"> II</Step>
                <Step class="step" value="3"> III</Step>
            </StepList>
            <StepPanels class="panelsBox">
                <StepPanel class="stepPanel" v-slot="{ activateCallback }" value="1">
                    <div class="input-box">
                        <div class="bloco-input">
                                 <label for="username" class="label">Username</label>
                                 <InputText 
                                     placeholder="Digite seu username" 
                                     id="username"  
                                     class="input" 
                                     type="text" 
                                 />
                         </div>
                          <div class="bloco-input">
                                 <label for="fistName" class="label">Fistname</label>
                                 <InputText 
                                     placeholder="Digite seu primeiro nome" 
                                     id="fistName"  
                                     class="input" 
                                     type="text" 
                                 />
                         </div>
                          <div class="bloco-input">
                                 <label for="lastNmae" class="label">Lastname</label>
                                 <InputText 
                                     placeholder="Digite seu ultimo nome" 
                                     id="lastNmae"  
                                     class="input" 
                                     type="text" 
                                 />
                         </div>
                    </div>
                        <Button label="Next" icon="pi pi-arrow-right" iconPos="right" @click="activateCallback('2')" />
                </StepPanel>
                <StepPanel class="stepPanel" v-slot="{ activateCallback }" value="2">
                    <div class="input-box">
                        <div class="bloco-input">
                              <label for="email" class="label">E-mail</label>
                                 <InputText 
                                     placeholder="Digite seu e-mail" 
                                     id="email"  
                                     class="input" 
                                     type="email" 
                                 />
                         </div>
                    </div>
                    <div class="flex pt-6 justify-between">
                        <Button label="Back" severity="secondary" icon="pi pi-arrow-left" @click="activateCallback('1')" />
                        <Button label="Next" icon="pi pi-arrow-right" iconPos="right" @click="activateCallback('3')" />
                    </div>
                </StepPanel>
                <StepPanel class="stepPanel" v-slot="{ activateCallback }" value="3">
                  <div class="input-box">
                      <div class="bloco-input">
                             <label for="senha" class="label">Senha</label>
                             <Password 
                               toggleMask 
                               placeholder="Digite sua senha" 
                               id="senha" 
                               class="password-field"
                               input-class="password-input"
                             />
                     </div>
                     <div class="bloco-input">
                             <label for="confirmarSenha" class="label">Confirmar senha</label>
                             <Password 
                               toggleMask 
                               placeholder="Confirme sua senha" 
                               id="confirmarSenha" 
                               class="password-field"
                               input-class="password-input"
                             />
                     </div>>
                  </div>
                    <div class="pt-6">
                        <Button label="Back" severity="secondary" icon="pi pi-arrow-left" @click="activateCallback('2')" />
                    </div>
                </StepPanel>
            </StepPanels>
        </Stepper>      
</template>

<style >
.progress{
    background-color: #FAFEFF;
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
.erro{
    color: red;
    padding-left: 10px;
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