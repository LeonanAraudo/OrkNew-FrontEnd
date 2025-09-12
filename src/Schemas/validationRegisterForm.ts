import { z } from 'zod'

export const stepOneSchema = z.object({
  userName: z.string()
    .min(5, 'Username deve ter pelo menos 5 caracteres')
    .max(20, 'Username deve ter no máximo 20 caracteres')
    .regex(/^[a-zA-Z0-9_]+$/, 'Username pode conter apenas letras, números e underscore'),
  email: z.string()
    .min(1, 'Email obrigatório')
    .email('Digite um email válido')
})

export const stepTwoSchema = z.object({
  password: z.string()
    .min(8, 'Senha deve ter pelo menos 8 caracteres')
    .max(50, 'Senha deve ter no máximo 50 caracteres')
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, 'Senha deve ter: 1 letra minúscula, 1 maiúscula e 1 número'),
  confirmPassword: z.string()
    .min(1, 'Confirmação de senha é obrigatória')

}).refine((data) => data.password === data.confirmPassword, {
  message: 'As senhas não coincidem',
  path: ['confirmPassword']
})



export type StepOneForm = z.infer<typeof stepOneSchema>
export type StepTwoForm = z.infer<typeof stepTwoSchema>  
