import NewTour from "./_components/NewTour";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";

const NewTourPage = () => {
  const queryClient = new QueryClient();
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NewTour />
    </HydrationBoundary>
  );
};
export default NewTourPage;
