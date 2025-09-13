import { z } from "zod";

export const formLogin = z.object({
        username:z.string().min(1,"Email obrigatório"),
        password: z.string().min(1,"Senha obrigatória")
})

export type LoginForm = z.infer<typeof formLogin>