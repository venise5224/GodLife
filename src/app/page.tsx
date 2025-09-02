import CircularTimeline from "@/components/CircularTimeline/CircularTimeline";
import ActivityBoard from "@/components/ActivityBoard/ActivityBoard";
import ActivityList from "@/components/ActivityList/ActivityList";

function HomePage() {
  return (
    <main className="md:h-[820px] flex flex-col md:flex-row">
      <section className="md:w-1/2">
        <CircularTimeline />
      </section>

      <section className="md:w-1/2 flex flex-col gap-4 p-4">
        <div className="hidden md:block">
          <ActivityList />
        </div>
        <ActivityBoard />
      </section>
    </main>
  );
}

export default HomePage;
