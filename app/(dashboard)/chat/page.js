import Chat from "./_components/Chat";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";

const page = () => {
  const queryClient = new QueryClient();
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Chat />
    </HydrationBoundary>
  );
};
export default page;
