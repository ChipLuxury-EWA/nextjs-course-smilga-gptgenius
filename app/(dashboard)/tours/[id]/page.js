import { getSingleTour } from "@/utils/tour.actions";
import { redirect } from "next/dist/server/api-utils";
import Link from "next/link";
import TourInfo from "../new-tour/_components/TourInfo";

const SingleTourPage = async ({ params }) => {
  const tour = await getSingleTour(params.id);
  if (!tour) redirect("/tours");

  return (
    <div>
      <Link className="btn btn-secondary mb-12" href="/tours">
        Back to tours
      </Link>
      <TourInfo tourData={tour} />
    </div>
  );
};
export default SingleTourPage;
