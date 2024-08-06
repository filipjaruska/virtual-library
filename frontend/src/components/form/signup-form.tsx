"use client";

import Link from "next/link";
import { useFormState } from "react-dom";

import {
    CardTitle,
    CardDescription,
    CardHeader,
    CardContent,
    CardFooter,
    Card,
} from "@/components/ui/card";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { registerUserAction } from "@/lib/actions/auth-actions";
import { ZodError } from "@/components/ui/zod-error";
import { StrapiError } from "@/components/ui/strapi-error";
import { SubmitButton } from "@/components/ui/submit-button";

const INITIAL_STATE = {
    data: null,
    zodError: null,
    message: null,
};

export function SignupForm() {
    const [formState, formAction] = useFormState(registerUserAction, INITIAL_STATE);
    return (
        <div className="w-full max-w-md">
            <form action={formAction}>
                <Card>
                    <CardHeader className="space-y-1">
                        <CardTitle className="text-3xl font-bold">Sign Up</CardTitle>
                        <CardDescription>
                            Enter your details to create a new account
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="username">Username</Label>
                            <Input
                                id="username"
                                name="username"
                                type="text"
                                placeholder="username"
                            />
                            <ZodError error={formState?.zodError?.username}/>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                placeholder="name@example.com"
                            />
                            <ZodError error={formState?.zodError?.email}/>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password">Password</Label>
                            <Input
                                id="password"
                                name="password"
                                type="password"
                                placeholder="password"
                            />
                            <ZodError error={formState?.zodError?.password}/>
                        </div>
                    </CardContent>
                    <CardFooter className="flex flex-col">
                        <SubmitButton className="w-full bg-primary text-primary-foreground" text="Sign Up" loadingText="Loading" />
                        <StrapiError error={formState?.strapiError}/>
                    </CardFooter>
                </Card>
                <div className="mt-4 text-center text-sm">
                    Have an account?
                    <Link className="underline ml-2 text-primary" href="signin">
                        Sing In
                    </Link>
                </div>
            </form>
        </div>
    );
}
