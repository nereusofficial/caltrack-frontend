import DashboardLayout from "../../components/auth/DashboardLayout";
import StatusWindow from "../../components/auth/StatusWindow";
import HunterCard from "../../components/auth/HunterCard";
import NutritionPanel from "../../components/auth/NutritionPanel";
import QuestList from "../../components/auth/QuestList";
import WorkoutPanel from "../../components/auth/WorkoutPanel";
import SystemMessages from "../../components/auth/SystemMessages";

const DashboardView = () => (
  <DashboardLayout>
    {/* Mobile/Tablet: vertical stack with scroll */}
    {/* Desktop: original side-by-side layout */}
    <div className="flex flex-col gap-4 lg:flex-row lg:h-full lg:gap-5 lg:overflow-hidden">

      {/* LEFT COLUMN */}
      <div className="flex flex-col gap-3 lg:flex-1 lg:min-w-0 lg:overflow-hidden">

        {/* Status boxes */}
        <div className="flex flex-col sm:flex-row gap-3">
          <StatusWindow />
        </div>

        {/* Nutrition */}
        <NutritionPanel />

        {/* System Messages + Quests + Workout */}
        <div className="flex flex-col gap-3 lg:flex-row lg:flex-1 lg:min-h-0">

          {/* Messages + Quests */}
          <div className="flex flex-col gap-3 lg:w-[45%] lg:flex-shrink-0 lg:min-h-0">
            <SystemMessages />
            <QuestList />
          </div>

          {/* Workout */}
          <div className="lg:flex-1 lg:min-w-0">
            <WorkoutPanel />
          </div>
        </div>
      </div>

      {/* RIGHT COLUMN — Hunter Card */}
      <div className="lg:w-[320px] lg:flex-shrink-0 lg:overflow-hidden">
        <HunterCard />
      </div>
    </div>
  </DashboardLayout>
);

export default DashboardView;