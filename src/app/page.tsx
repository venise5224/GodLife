import CircularTimeline from "@/components/CircularTimeline";
import ActivityInputForm from "@/components/ActivityInputForm";
import ActivityStats from "@/components/ActivityStats";
import TodoList from "@/components/TodoList";

function HomePage() {
  return (
    <main className="min-h-screen p-4 md:flex md:gap-4">
      <section className="md:w-1/2 h-[calc(100vh-150px)] flex justify-center items-center">
        <CircularTimeline />
      </section>

      <section className="md:w-1/2 flex flex-col gap-4">
        <TodoList />
        <ActivityInputForm />
        <ActivityStats />
      </section>
    </main>
  );
}

export default HomePage;
