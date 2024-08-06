import { getUserMeLoader } from "@/lib/services/get-user-me-loader"
import { ProfileForm } from "@/components/form/profile-form";
import { ProfileImageForm } from "@/components/form/profile-image-form";

export default async function AccountRoute() {
    const user = await getUserMeLoader();
    const userData = user.data;
    const userImage = userData?.image;

    return (
        <div className="mx-auto flex flex-col gap-4 p-4 w-1/3 min-w-fit">
            <ProfileForm data={userData} className="col-span-3" />
            <ProfileImageForm data={userImage} className="col-span-2" />
        </div>
    );
}