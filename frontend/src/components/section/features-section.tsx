import { FaBook, FaBookmark, FaClock } from "react-icons/fa";
import type { FeaturesBlock } from "@/lib/types/site";

function getIcon(name: string) {
  switch (name) {
    case "ICON_1":
      return <FaBook className="h-12 w-12 text-primary" />;
    case "ICON_2":
      return <FaBookmark className="h-12 w-12 text-primary" />;
    case "ICON_3":
      return <FaClock className="h-12 w-12 text-primary" />;
    default:
      return null;
  }
}

export function FeatureSection({ data }: { readonly data: FeaturesBlock }) {
  const { title, feature } = data;

  return (
    <section className="container mx-auto px-4 py-16 md:px-6 lg:py-24">
      {title && (
        <h2 className="mb-12 text-center text-3xl font-bold">{title}</h2>
      )}
      <div className="grid gap-10 md:grid-cols-3">
        {feature.map((item) => (
          <div key={item.id} className="flex flex-col items-center text-center">
            {getIcon(item.icon)}
            <h3 className="mb-3 mt-5 text-xl font-bold">{item.heading}</h3>
            <p className="text-muted-foreground">{item.subHeading}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
