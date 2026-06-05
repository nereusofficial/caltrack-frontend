import DashboardLayout from "../../components/auth/DashboardLayout";
import StatusWindow from "../../components/auth/StatusWindow";
import HunterCard from "../../components/auth/HunterCard";
import NutritionPanel from "../../components/auth/NutritionPanel";
import QuestList from "../../components/auth/QuestList";
import WorkoutPanel from "../../components/auth/WorkoutPanel";
import SystemMessages from "../../components/auth/SystemMessages";

const DashboardView = () => (
  <DashboardLayout>
    <div className="flex h-full gap-5 overflow-hidden">

      {/* LEFT — fills height, no scroll */}
      <div className="flex flex-1 min-w-0 flex-col gap-3 overflow-hidden">

        {/* Row 1: Status boxes */}
        <div className="flex gap-3 flex-shrink-0">
          <StatusWindow />
        </div>

        {/* Row 2: Nutrition */}
        <div className="flex-shrink-0">
          <NutritionPanel />
        </div>

        {/* Row 3: System Messages + Quests + Workout — fills remaining height */}
        <div className="flex flex-1 min-h-0 gap-3">

          {/* Left column: SystemMessages grows, QuestList pinned at bottom */}
          <div className="flex flex-col gap-3 w-[45%] flex-shrink-0 min-h-0">
            <div className="flex-1 min-h-0 overflow-hidden">
              <SystemMessages stretch />
            </div>
            <div className="flex-shrink-0">
              <QuestList />
            </div>
          </div>

          {/* Right column: Workout stretches full height */}
          <div className="flex flex-1 min-w-0 flex-col min-h-0">
            <WorkoutPanel />
          </div>

        </div>

      </div>

      {/* RIGHT — Hunter Card fills full height */}
      <div className="w-[320px] flex-shrink-0 overflow-hidden">
        <HunterCard />
      </div>

    </div>
  </DashboardLayout>
);

export default DashboardView;