import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import ToursPage from "./_components/ToursPage";
import { getAllTours } from "@/utils/tour.actions";

const AllToursPage = async () => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({ queryKey: ["tours", ""], queryFn: getAllTours });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ToursPage />
    </HydrationBoundary>
  );
};
export default AllToursPage;
