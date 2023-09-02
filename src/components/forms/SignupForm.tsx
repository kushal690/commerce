"use client";
import React, { FC, useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { PasswordInput } from "../auth/PasswordInput";
import { z } from "zod";
import { authSchema } from "@/lib/validations/auth";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { trpc } from "@/trpc-server";
import Icon from "@/lib/DynamicIcon";
import { toast } from "../ui/use-toast";

interface SignupProps {
  children?: React.ReactNode;
}

type Inputs = z.infer<typeof authSchema>;

const SignupForm: FC<SignupProps> = ({ children }) => {
  const [isPending, setIsPending] = useState<boolean>(false);

  const mutation = trpc.signUp.useMutation()

  const form = useForm<Inputs>({
    resolver: zodResolver(authSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: Inputs) {
    try {
      setIsPending(true);
      await mutation.mutateAsync(data)
      toast({
        variant: "default", title: "Successfully created account. Please proceed to sign in."
      })


    } catch (err: any) {
      const unknownError = "Something went wrong, please try again.";
      toast({ variant: "destructive", title: "Failed to sign up", description: err.message || unknownError, duration: 5000 })

    } finally {
      setIsPending(false);
    }
  }

  return (
    <Form {...form}>
      <form autoFocus={false} onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="joe@gmail.com"
                  className=""
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <PasswordInput {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          disabled={isPending}
          className="w-full"
        >
          {isPending && <Icon name="loader-2" className="mr-2 w-4 h-4 animate-spin" />}
          {isPending ? "Signing up" : "Sign up"}
        </Button>
      </form>
    </Form>

  );
};

export default SignupForm;
