import { registerRestaurant } from "@/api/register-restaurant";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

import { toast } from "sonner";
import { z } from "zod";

export function SignUp() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<SignUpForm>();

  const signUpForm = z.object({
    restaurantName: z.string(),
    managerName: z.string(),
    phone: z.string(),
    email: z.string().email(),
  });

  type SignUpForm = z.infer<typeof signUpForm>;

  const { mutateAsync: registerRestaurantFn } = useMutation({
    mutationFn: registerRestaurant,
  });

  async function handleSignUp(data: SignUpForm) {
    try {
      await registerRestaurantFn({
        restaurantName: data.restaurantName,
        managerName: data.managerName,
        email: data.email,
        phone: data.phone,
      });

      toast.success("Restaurante cadastrado com sucesso!", {
        action: {
          label: "Login",
          onClick: () => navigate(`/sign-in?email=${data.email}`),
        },
      });
    } catch {
      toast.error("Erro ao cadastrar restaurante.");
    }
  }

  return (
    <div className="p-8">
      <Button asChild variant="ghost" className="absolute top-8 right-8">
        <Link to="/sign-in">Fazer login</Link>
      </Button>
      <div className="flex w-[320px] flex-col justify-center gap-6">
        <div className="flex flex-col gap-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            Criar conta grátis
          </h1>
          <p className="text-muted-foreground text-sm">
            Seja um parceiro e começe suas vendas!
          </p>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit(handleSignUp)}>
          <div className="space-y-2">
            <Label htmlFor="restaurantName">Nome do estabelecimento</Label>
            <Input
              id="restaurantName"
              type="text"
              {...register("restaurantName")}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="managerName">Seu nome</Label>
            <Input
              id="managerName"
              type="text"
              {...register("managerName")}
            ></Input>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Seu e-mail</Label>
            <Input id="email" type="email" {...register("email")}></Input>
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Seu celular</Label>
            <Input id="phone" type="tel" {...register("phone")}></Input>
          </div>

          <Button className="w-full" type="submit" disabled={isSubmitting}>
            Finalizar cadastro
          </Button>

          <p className="text-muted-foreground px-6 text-center text-sm leading-relaxed">
            Ao continuar, você concorda com nossos{" "}
            <a className="text-red-800 underline underline-offset-4" href="">
              Termos de serviço
            </a>{" "}
            e{" "}
            <a className="text-red-800 underline underline-offset-4" href="">
              políticas de privacidade
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}
