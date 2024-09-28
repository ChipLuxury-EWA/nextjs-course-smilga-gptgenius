"use client";

import { getAllTours } from "@/utils/tour.actions";
import { useQuery } from "@tanstack/react-query";
import ToursList from "./ToursList";
import { useState } from "react";

const ToursPage = () => {
  const [searchValue, setSearchValue] = useState("");
  const { data: tours, isPending } = useQuery({
    queryKey: ["tours", searchValue],
    queryFn: () => getAllTours(searchValue),
  });

  return (
    <>
      <form className="max-w-lg mb-12" action="">
        <div className="join w-full ">
          <input
            className="input input-bordered join-item w-full"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            type="text"
            placeholder="Search for city or country"
            required
          />
          <button className="btn btn-primary join-item" onClick={() => setSearchValue("")} type="button" disabled={isPending}>
            Reset
          </button>
        </div>
      </form>
      {isPending ? <div className="loading loading-bars loading-lg" /> : <ToursList tours={tours} />}
    </>
  );
};
export default ToursPage;
