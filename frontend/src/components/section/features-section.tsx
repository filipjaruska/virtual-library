import {FaBook, FaBookmark, FaClock} from "react-icons/fa";

function getIcon(name: string) {
    switch (name) {
        case "ICON_1":
            return <FaBook className="h-16 w-16 p-2 text-primary"/>
        case "ICON_2":
            return <FaBookmark className="h-16 w-16 p-2 text-primary"/>
        case "ICON_3":
            return <FaClock className="h-16 w-16 p-2 text-primary"/>
        default:
            return null;
    }
}

interface FeatureProps {
    id: number;
    heading: string;
    subHeading: string;
    icon: string;
}

interface FeatureSectionProps {
    id: number;
    __component: string;
    title: string;
    description: string;
    feature: FeatureProps[];
}

export function FeatureSection({data}: { readonly data: FeatureSectionProps }) {
    const {feature} = data;
    return (
        <div className="flex-1">
            <section className="container px-4 py-6 mx-auto md:px-6 lg:py-24">
                <div className="grid gap-8 md:grid-cols-3">
                    {feature.map((feature) => (
                        <div
                            key={feature.id}
                            className="flex flex-col items-center text-center"
                        >
                            {getIcon(feature.icon)}
                            <h2 className="mb-4 text-2xl font-bold text-foreground">{feature.heading}</h2>
                            <p className="text-secondary-foreground">
                                {feature.subHeading}
                            </p>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}
