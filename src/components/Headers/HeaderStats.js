import React, { useEffect, useState } from "react";
import CardStats from "components/Cards/CardStats.js";
import { getAllStats } from "../../Services/ApiStats"; // Assurez-vous que le chemin est correct

export default function HeaderStats() {
  const [stats, setStats] = useState({
    totalUsersCount: 0,
    totalVisitsCount: 0,
    totalLogsCount: 0,
    totalFormationsCount: 0
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await getAllStats();
        setStats(data);
      } catch (error) {
        console.error("Erreur lors de la récupération des statistiques:", error);
      }
    };

    fetchStats();
  }, []);

  return (
    <>
      {/* Header */}
      <div className="relative bg-lightBlue-600 md:pt-32 pb-32 pt-12">
        <div className="px-4 md:px-10 mx-auto w-full">
          <div>
            {/* Card stats */}
            <div className="flex flex-wrap">
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                <CardStats
                  statSubtitle="Connexions"
                  statTitle={stats.totalVisitsCount.toLocaleString()}
                  statArrow="up"
                  statPercentColor="text-emerald-500"
                  statIconName="far fa-chart-bar"
                  statIconColor="bg-red-500"
                />
              </div>
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                <CardStats
                  statSubtitle="D'utilisateurs"
                  statTitle={stats.totalUsersCount.toLocaleString()}
                  statArrow="down"
                  statPercentColor="text-red-500"
                  statIconName="fas fa-users"
                  statIconColor="bg-orange-500"
                />
              </div>
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                <CardStats
                  statSubtitle="Formations"
                  statTitle={stats.totalFormationsCount.toLocaleString()}
                  statArrow="down"
                  statPercentColor="text-orange-500"
                  statIconName="fas fa-chart-pie"
                  statIconColor="bg-pink-500"
                />
              </div>
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                <CardStats
                  statSubtitle="Logs"
                  statTitle={stats.totalLogsCount.toLocaleString()}
                  statArrow="up"
                  statPercentColor="text-emerald-500"
                  statIconName="fa fa-align-center"
                  statIconColor="bg-lightBlue-500"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
