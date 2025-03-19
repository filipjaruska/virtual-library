"use client";
import { useActionState } from "react";

import Link from "next/link";
import { loginUserAction } from "@/lib/actions/auth-actions";

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
import { ZodError } from "@/components/ui/zod-error";
import { StrapiError } from "@/components/ui/strapi-error";
import { SubmitButton } from "@/components/ui/submit-button";

const initialState = {
    zodError: null,
    strapiError: null,
    data: null,
    message: null,
};

export function SigninForm() {
    const [formState, formAction] = useActionState(loginUserAction, initialState);
    return (
        <div className="w-full max-w-md">
            <form action={formAction}>
                <Card>
                    <CardHeader className="space-y-1">
                        <CardTitle className="text-3xl font-bold">Sign In</CardTitle>
                        <CardDescription>
                            Enter your details to sign in to your account
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="identifier"
                                name="identifier"
                                type="text"
                                placeholder="username or email"
                            />
                            <ZodError error={formState?.zodErrors?.identifier} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password">Password</Label>
                            <Input
                                id="password"
                                name="password"
                                type="password"
                                placeholder="password"
                            />
                            <ZodError error={formState.zodErrors?.password} />
                        </div>
                    </CardContent>
                    <CardFooter className="flex flex-col">
                        <SubmitButton
                            className="w-full bg-primary text-primary-foreground"
                            text="Sign In"
                            loadingText="Loading"
                        />
                        <StrapiError error={formState?.strapiErrors} />
                    </CardFooter>
                </Card>
                <div className="mt-4 text-center text-sm">
                    Don't have an account?
                    <Link className="underline ml-2 text-primary" href="signup">
                        Sign Up
                    </Link>
                </div>
            </form>
        </div>
    );
}
