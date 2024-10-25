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
import { useRegiser } from "@/features/auth/useRegister";
import ButtonSubmit from "@/components/ButtonSubmit";
import toast, { Toaster } from "react-hot-toast";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import Link from "next/link";

const registerFormSchema = z.object({
  username: z.string().min(5, "username minimal 5 karakter"),
  email: z.string().email(),
  password: z.string(),
});

type RegisterFormSchema = z.infer<typeof registerFormSchema>;

const Register = () => {
  const { mutate, isPending } = useRegiser({
    onSuccess: () => {
      toast.success("Login successful!", {
        duration: 4000,
        position: "top-center",
      });
      // router.push("/");
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
          duration: 4000,
          position: "top-center",
        }
      );
    },
  });

  const form = useForm<RegisterFormSchema>({
    resolver: zodResolver(registerFormSchema),
  });

  const { handleSubmit, control } = form;

  const onSubmit = (data: RegisterFormSchema) => {
    console.log("Submitted Data: ", data);
    mutate(data);
  };

  return (
    <Card className="w-[350px]">
      <Toaster />
      <CardHeader>
        <CardTitle className="text-3xl">Register</CardTitle>
        {/* <CardDescription></CardDescription> */}
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid w-full items-center gap-4">
              <FormField
                control={control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor={field.name}>Username</FormLabel>
                    <FormControl>
                      <Input id={field.name} placeholder="Username" type="text" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor={field.name}>Email</FormLabel>
                    <FormControl>
                      <Input id={field.name} placeholder="email" type="email" {...field} />
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

              <ButtonSubmit isLoading={isPending} title="Register" />
              {/* {isPending && <p>loading</p>} */}
            </div>
            <div className="mt-5 flex justify-center">
              <Link
                href={"/login"}
                className="text-xs hover:text-gray-600 hover:font-bold cursor-pointer"
              >
                already have an account? Login
              </Link>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default Register;
