"use client";
import React, { useActionState } from "react";

import {updateProfileAction} from "@/lib/actions/profile-actions"

import { cn } from "@/lib/utils";

import { SubmitButton } from "@/components/ui/submit-button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {StrapiError} from "@/components/ui/strapi-error";

const INITIAL_STATE = {
    data: null,
    strapiError: null,
    message: null,
}

interface ProfileFormProps {
    id: string;
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    bio: string;
    credits: number;
}

export function ProfileForm({
                                data,
                                className,
                            }: {
    readonly data: ProfileFormProps;
    readonly className?: string;
}) {
    const updateUserWithId = updateProfileAction.bind(null, data.id)
    const [formState, formAction] = useActionState(
        updateUserWithId,
        INITIAL_STATE
    )

    return (
        <form action={formAction} className={cn("space-y-4", className)}>
            <div className="space-y-4 grid ">
                <div className="grid grid-cols-2 gap-4">
                    <Input
                        id="username"
                        name="username"
                        placeholder="Username"
                        defaultValue={data.username || ""}
                        disabled
                    />
                    <Input
                        id="email"
                        name="email"
                        placeholder="Email"
                        defaultValue={data.email || ""}
                        disabled
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <Input
                        id="firstName"
                        name="firstName"
                        placeholder="First Name"
                        defaultValue={data.firstName || ""}
                    />
                    <Input
                        id="lastName"
                        name="lastName"
                        placeholder="Last Name"
                        defaultValue={data.lastName || ""}
                    />
                </div>
                <Textarea
                    id="bio"
                    name="bio"
                    placeholder="Write your bio here..."
                    className="resize-none border rounded-md w-full h-[224px] p-2"
                    defaultValue={data.bio || ""}
                    required
                />
            </div>
            <div className="flex justify-end">
                <SubmitButton text="Update Profile" loadingText="Saving Profile"/>
            </div>
            <StrapiError error={formState?.strapiErrors}/>
        </form>
    );
}