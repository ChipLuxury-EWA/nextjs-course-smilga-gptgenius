"use client";

import TourInfo from "./TourInfo";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createNewTour, getExistingTours, generateTourResponse } from "@/utils/tour.actions";
import toast from "react-hot-toast";
import { FaF } from "react-icons/fa6";

const NewTour = () => {
  const {
    mutate,
    isPending,
    data: tour,
  } = useMutation({
    mutationFn: async (destination) => {
      const newTour = await generateTourResponse(destination);
      if (newTour) {
        return newTour;
      } else {
        toast.error(`No matching city found for ${destination.city}...`);
        return null;
      }
    },
    onSuccess: (data) => {
      console.log(data);
    },
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const destination = Object.fromEntries(formData.entries());
    mutate(destination);
  };

  return (
    <>
      <form className="max-w-2xl" onSubmit={handleSubmit}>
        <h2 className="mb-4">Select your dream destination:</h2>
        <div className="join w-full">
          <input className="input input-bordered join-item w-full" placeholder="country" name="country" type="text" required />
          <input className="input input-bordered join-item w-full" placeholder="city" name="city" type="text" required />
          <button className="btn btn-primary join-item min-w-24" disabled={isPending} type="submit">
            {isPending ? <div className="loading loading-dots" /> : "Generate tour"}
          </button>
        </div>
      </form>
      <div className="mt-16">{tour ? <TourInfo tour={tour} /> : null}</div>
    </>
  );
};
export default NewTour;
