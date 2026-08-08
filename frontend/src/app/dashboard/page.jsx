import BalanceHeroCard from "@/components/organisms/BalanceHeroCard";
export default function dashboardPage() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4  gap-4 max-w-7xl mx-auto p-4 md:p-8">
      <div className="md:col-span-2 md:row-span-2">
        <BalanceHeroCard />
      </div>
    </div>
  );
}
