import CircularTimeline from "@/components/CircularTimeline";
import ActivityInputForm from "@/components/ActivityInputForm";
import ActivityStats from "@/components/ActivityStats";

function HomePage() {
  return (
    <main className="flex-1 p-4 flex flex-col items-center gap-4">
      <CircularTimeline />
      <ActivityInputForm />
      <ActivityStats />
    </main>
  );
}

export default HomePage;
