"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useLogin } from "@/features/auth/useLogin";
import { useRouter } from "next/navigation";
import { VscLoading } from "react-icons/vsc";
import toast, { Toaster } from "react-hot-toast";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import Link from "next/link";
import ButtonSubmit from "@/components/ButtonSubmit";

const loginFormSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

type LoginFormSchema = z.infer<typeof loginFormSchema>;

const Login = () => {
  const router = useRouter();
  // const { toast } = useToast();

  const { mutate, isPending } = useLogin({
    onSuccess: () => {
      toast.custom(
        (t) => (
          <Alert
            variant="destructive"
            className={`${
              t.visible ? "animate-enter" : "animate-leave"
            } bg-green-600 text-white w-72`}
          >
            <AlertTitle className="text-white">Success</AlertTitle>
            <AlertDescription className="text-white">Login Success</AlertDescription>
          </Alert>
        ),
        {
          duration: 3000,
          position: "top-center",
        }
      );
      router.push("/");
    },
    onError: (error: string) => {
      toast.custom(
        (t) => (
          <Alert
            variant="destructive"
            className={`${
              t.visible ? "animate-enter" : "animate-leave"
            } bg-red-500 text-white w-72`}
          >
            <AlertTitle className="text-white">Error</AlertTitle>
            <AlertDescription className="text-white">
              {error || "An error occurred during login"}
            </AlertDescription>
          </Alert>
        ),
        {
          duration: 3000,
          position: "top-center",
        }
      );
    },
  });

  const form = useForm<LoginFormSchema>({
    resolver: zodResolver(loginFormSchema),
  });

  const { handleSubmit, control } = form;

  const onSubmit = (data: LoginFormSchema) => {
    console.log("Submitted Data: ", data);
    mutate(data);
  };

  return (
    <Card className="w-[350px]">
      <Toaster />
      <CardHeader>
        <CardTitle className="text-3xl">Login</CardTitle>
        <CardDescription>Welcome to SIRKEL!</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid w-full items-center gap-4">
              <FormField
                control={control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor={field.name}>Email</FormLabel>
                    <FormControl>
                      <Input id={field.name} placeholder="Email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor={field.name}>Password</FormLabel>
                    <FormControl>
                      <Input id={field.name} type="password" placeholder="Password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex justify-between mt-4">
              {/* <Button variant="outline">Cancel</Button> */}
              {/* <Button type="submit" className="w-full font-bold gap-2" disabled={isPending}>
                {isPending && <VscLoading className="animate-spin" size={15} />}
                Login
              </Button> */}
              <ButtonSubmit isLoading={isPending} title="Login" />
            </div>
            <div className="mt-5 flex justify-center">
              <Link
                href={"/register"}
                className="text-xs hover:text-gray-600 hover:font-bold cursor-pointer"
              >
                don't have an account? Register
              </Link>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default Login;
