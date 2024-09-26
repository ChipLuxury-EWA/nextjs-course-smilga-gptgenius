"use client";

import { getAllTours } from "@/utils/tour.actions";
import { useQuery } from "@tanstack/react-query";
import ToursList from "./ToursList";

const ToursPage = () => {
  const { data: tours, isPending } = useQuery({
    queryKey: ["tours"],
    queryFn: () => getAllTours(),
  });

  return <>{isPending ? <div className="loading loading-bars loading-lg" /> : <ToursList tours={tours} />}</>;
};
export default ToursPage;
