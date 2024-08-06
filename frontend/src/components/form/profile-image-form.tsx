"use client";
import React from "react";
import { useFormState } from "react-dom";

import { cn } from "@/lib/utils";

import {uploadProfileImageAction} from "@/lib/actions/profile-actions";

import {SubmitButton} from "@/components/ui/submit-button";
import ImagePicker from "@/components/ui/image-picker";
import {ZodError} from "@/components/ui/zod-error";
import {StrapiError} from "@/components/ui/strapi-error";

interface ProfileImageFormProps {
    id: string;
    url: string;
    alternativeText: string;
}

const initialState = {
    message: null,
    data: null,
    strapiErrors: null,
    zodErrors: null,
};

export function ProfileImageForm({
                                     data,
                                     className,
                                 }: {
    data: Readonly<ProfileImageFormProps>,
    className?: string,
}) {
    const uploadProfileImageWithIdAction = uploadProfileImageAction.bind(
      null,
      data?.id
    );

    const [formState, formAction] = useFormState(
      uploadProfileImageWithIdAction,
      initialState
    );

    return (
        <form action={formAction} className={cn("space-y-4", className)}>
            <div className="">
                <ImagePicker
                    id="image"
                    name="image"
                    label="Profile Image"
                    defaultValue={data?.url || ""}
                />
                 <ZodError error={formState.zodErrors?.image} />
                <StrapiError error={formState.strapiErrors} />
            </div>
            <div className="flex justify-end">
                <SubmitButton text="Update Image" loadingText="Saving Image" />
            </div>
        </form>
    );
}