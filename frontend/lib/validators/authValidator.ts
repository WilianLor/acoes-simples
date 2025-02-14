import { z } from "zod";

export const registerValidator = z
  .object({
    name: z
      .string()
      .min(1, "O nome é obrigatório")
      .regex(/^[A-Za-z\s]+$/, "O nome só pode conter letras e espaços"),
    mail: z
      .string()
      .email("Por favor, insira um e-mail válido")
      .min(1, "O e-mail é obrigatório"),
    password: z
      .string()
      .min(8, "A senha deve ter pelo menos 8 caracteres")
      .regex(
        /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        "A senha precisa ter pelo menos uma letra maiúscula, um número e um caractere especial"
      )
      .min(1, "A senha é obrigatória"),
    confirmPassword: z.string().min(1, "A confirmação de senha é obrigatória"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"],
  });

export const loginValidator = z.object({
  mail: z
    .string()
    .email("Por favor, insira um e-mail válido")
    .min(1, "O e-mail é obrigatório"),
  password: z
    .string()
    .min(8, "A senha deve ter pelo menos 8 caracteres")
    .regex(
      /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "A senha precisa ter pelo menos uma letra maiúscula, um número e um caractere especial"
    )
    .min(1, "A senha é obrigatória"),
});
