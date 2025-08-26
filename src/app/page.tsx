import CircularTimeline from "@/components/CircularTimeline";
import ActivityStats from "@/components/ActivityStats";
import TodoList from "@/components/TodoList";
import ActivityBoard from "@/components/ActivityBoard/ActivityBoard";

function HomePage() {
  return (
    <main className="h-[820px] flex flex-col md:flex-row">
      <section className="md:w-1/2">
        <CircularTimeline />
      </section>

      <section className="md:w-1/2 flex flex-col gap-4 p-4 pb-[100px] md:pb-[20px] md:overflow-y-auto">
        <TodoList />
        <ActivityBoard />
        {/* <ActivityStats /> */}
      </section>
    </main>
  );
}

export default HomePage;
