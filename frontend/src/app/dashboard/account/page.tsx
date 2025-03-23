import { ProfileForm } from "@/components/form/profile-form";
import { ProfileImageForm } from "@/components/form/profile-image-form";
import { getUserMeLoader } from "@/lib/services/get-user-me-loader";

export default async function AccountRoute() {
    const user = await getUserMeLoader();
    const userData = user.data;
    const userImage = userData?.image;

    return (
        <div className="container max-w-6xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
            <h1 className="text-2xl font-semibold tracking-tight mb-6">Account Settings</h1>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                    <div className="bg-card text-card-foreground rounded-lg border shadow-sm">
                        <div className="p-6">
                            <h2 className="text-lg font-medium leading-none mb-4">Profile Information</h2>
                            <ProfileForm data={userData} />
                        </div>
                    </div>
                </div>
                <div className="lg:col-span-1">
                    <div className="bg-card text-card-foreground rounded-lg border shadow-sm">
                        <div className="p-6">
                            <h2 className="text-lg font-medium leading-none mb-4">Profile Image</h2>
                            <ProfileImageForm data={userImage} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}