import { z } from "zod";

export const formRegister = z.object({
    userName: z.string().min(1, "Username obrigatório"),
    firstName: z.string().min(1, "Firstname obrigatório"),
    lastName: z.string().min(1, "Lastname obrigatório"),
    password: z.string().min(6,"A senha deve ter pelo menos 6 digitos"),
    email:z.string().min(1,"Email obrigatório").email({message: "Email inválido"}),

}) 

export type RegisterForm = z.infer<typeof formRegister>