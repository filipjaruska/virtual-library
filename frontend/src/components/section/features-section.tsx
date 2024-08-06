function getIcon(name: string) {
    switch (name) {
        case "ICON_1":
            return <div>ICON 1</div>
        case "ICON_2":
            return <div>ICON 2</div>
        case "ICON_3":
            return <div>ICON 3</div>
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

export function FeatureSection({ data }: { readonly data: FeatureSectionProps }) {
    const { feature } = data;
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
