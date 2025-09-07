import ActivityBoard from "@/components/ActivityBoard/ActivityBoard";
import ActivityList from "@/components/ActivityList/ActivityList";
import ActivityRender from "@/components/ActivityRender/AcitivityRender";

function HomePage() {
  return (
    <div className="flex flex-col md:flex-row h-full overflow-auto">
      <section className="h-full md:w-1/2 flex items-center justify-center">
        <ActivityRender />
      </section>

      <section className="md:w-1/2 flex flex-col gap-4 p-4">
        <div className="hidden md:block flex-grow">
          <ActivityList />
        </div>
        <ActivityBoard />
      </section>
    </div>
  );
}

export default HomePage;
