import ActivityBoard from "@/components/ActivityBoard/ActivityBoard";
import ActivityList from "@/components/ActivityList/ActivityList";
import ActivityRender from "@/components/ActivityRender/AcitivityRender";

function HomePage() {
  return (
    <main className="flex flex-col md:flex-row">
      <section className="md:w-1/2">
        <ActivityRender />
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
