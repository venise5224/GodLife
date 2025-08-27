import CircularTimeline from "@/components/CircularTimeline/CircularTimeline";
import ActivityStats from "@/components/ActivityStats";
import ActivityBoard from "@/components/ActivityBoard/ActivityBoard";
import ActivityList from "@/components/ActivityList/ActivityList";

function HomePage() {
  return (
    <main className="h-[820px] flex flex-col md:flex-row">
      <section className="md:w-1/2">
        <CircularTimeline />
      </section>

      <section className="md:w-1/2 flex flex-col gap-4 p-4 pb-[100px] md:pb-[20px] md:overflow-y-auto">
        <ActivityList />
        <ActivityBoard />
        {/* <ActivityStats /> */}
      </section>
    </main>
  );
}

export default HomePage;
