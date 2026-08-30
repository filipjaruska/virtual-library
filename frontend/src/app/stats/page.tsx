import type { Metadata } from "next";
import { BookOpen, MessageSquare, Tags, Users } from "lucide-react";
import { AreaChartComponent } from "@/components/custom-ui/area-chart";
import PieChartComponent from "@/components/custom-ui/pie-chart";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getLibraryStats } from "@/lib/content";

export const metadata: Metadata = {
  title: "Library statistics",
  description: "Aggregate figures for the collection.",
};

export const revalidate = 3600;

function StatCard({
  title,
  value,
  hint,
  icon,
}: {
  title: string;
  value: string | number;
  hint: string;
  icon: React.ReactNode;
}) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <span className="text-primary">{icon}</span>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground">{hint}</p>
      </CardContent>
    </Card>
  );
}

export default async function StatsPage() {
  const stats = await getLibraryStats();

  const commentsPerBook =
    stats.totalBooks > 0 ? (stats.totalComments / stats.totalBooks).toFixed(1) : "0";

  // The oldest title is Meditations (c. 180), so the era marker keeps the range
  // from reading like a typo.
  const span =
    stats.yearRange.from && stats.yearRange.to
      ? `${stats.yearRange.from} CE to ${stats.yearRange.to}`
      : null;

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-6">
        <h1 className="text-3xl font-bold">Library statistics</h1>
        <p className="mt-1 text-muted-foreground">
          Aggregates computed over the whole collection
          {span ? `, spanning ${span}` : ""}.
        </p>
      </header>

      <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Books"
          value={stats.totalBooks}
          hint="Titles in the collection"
          icon={<BookOpen className="h-4 w-4" />}
        />
        <StatCard
          title="Authors"
          value={stats.uniqueAuthors}
          hint="Distinct authors"
          icon={<Users className="h-4 w-4" />}
        />
        <StatCard
          title="Comments"
          value={stats.totalComments}
          hint={`${commentsPerBook} per book on average`}
          icon={<MessageSquare className="h-4 w-4" />}
        />
        <StatCard
          title="Genres"
          value={stats.uniqueTags}
          hint="Distinct tags in use"
          icon={<Tags className="h-4 w-4" />}
        />
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Genres</CardTitle>
            <CardDescription>How the collection breaks down by tag</CardDescription>
          </CardHeader>
          <CardContent className="h-80">
            <PieChartComponent data={stats.tagDistribution} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Activity</CardTitle>
            <CardDescription>Books added and comments left, by month</CardDescription>
          </CardHeader>
          <CardContent className="h-80">
            <AreaChartComponent data={stats.monthly} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
