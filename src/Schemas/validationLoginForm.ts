import { z } from "zod";

export const formLogin = z.object({
        email:z.string().min(1,"Email obrigatório").email('Digite um email válido'),
        password: z.string().min(1,"Senha obrigatória")
})

export type LoginForm = z.infer<typeof formLogin>