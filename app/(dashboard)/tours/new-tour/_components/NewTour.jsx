"use client";

import TourInfo from "./TourInfo";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createNewTour, getExistingTour, generateTourResponse } from "@/utils/tour.actions";
import toast from "react-hot-toast";
import { useAuth } from "@clerk/nextjs";
import { fetchUserTokenById, subtractTokens } from "@/utils/token.actions";

const NewTour = () => {
  const { userId } = useAuth();
  const queryClient = useQueryClient();
  const {
    mutate,
    isPending,
    data: tourData,
  } = useMutation({
    mutationFn: async (destination) => {
      const existingTour = await getExistingTour(destination);
      if (existingTour) return existingTour;
      //checking if user have enough tokens:
      const currentUserTokens = await fetchUserTokenById(userId);
      if (currentUserTokens < 300) {
        toast.error("Not enough tokens");
        return null;
      }
      const { tour: newTour, usedTokens } = await generateTourResponse(destination);
      if (newTour) {
        await createNewTour(newTour);
        queryClient.invalidateQueries({ queryKey: ["tours"] });
        const newTokens = await subtractTokens(userId, usedTokens);
        toast.success(`Tour created successfully. You have ${newTokens} tokens left.`);
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
    // TODO solve the bug case if user entering lowercase values .charAt(0).toUpperCase()
    // console.log(destination);
    mutate(destination);
  };

  return (
    <>
      <form className="max-w-full" onSubmit={handleSubmit}>
        <h2 className="mb-4">Select your dream destination:</h2>
        <div className="join w-full">
          <input className="input input-bordered join-item w-full" placeholder="country" name="country" type="text" required />
          <input className="input input-bordered join-item w-full" placeholder="city" name="city" type="text" required />
          <input
            className="input input-bordered join-item w-full"
            placeholder="days"
            name="daysAmount"
            type="number"
            min={1}
            max={30}
          />
          <input
            className="input input-bordered join-item w-full"
            placeholder="attractions"
            name="attractionsAmount"
            type="number"
            min={1}
            max={30}
          />
          <button className="btn btn-primary join-item min-w-24" disabled={isPending} type="submit">
            {isPending ? <div className="loading loading-dots" /> : "Generate tour"}
          </button>
        </div>
      </form>
      <div className="mt-16">{tourData ? <TourInfo tourData={tourData} /> : null}</div>
    </>
  );
};
export default NewTour;
