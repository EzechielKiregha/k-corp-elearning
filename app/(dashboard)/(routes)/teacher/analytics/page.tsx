import { getAnalytics } from "@/actions/get-analytics";
import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation";
import DataCard from "./_components/data-card";
import Chart from "./_components/chart";

const AnalyticsPage = async () => {

  const { userId } = auth();

  if (!userId){
    return redirect("/dashboard");
  }

  const {
    data,
    totalRevenue,
    totalSales,
  } = await getAnalytics(userId);

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <DataCard
          label="Total sales"
          value={totalSales}
        />
        <DataCard
          label="Total Revenue"
          value={totalRevenue}
          shouldFormat
        />
      </div>
      <Chart
        data={data}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 mt-4">
        <DataCard
          label="Students Enrolled OverAll"
          value={2400}
        />
        <DataCard
          label="Graduate Students"
          value={600}
          // shouldFormat
        />
      </div>
      <Chart
        data={data}
      />
    </div>
  )
}

export default AnalyticsPage