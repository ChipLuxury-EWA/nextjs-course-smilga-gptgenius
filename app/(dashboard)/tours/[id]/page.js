import { getSingleTour } from "@/utils/tour.actions";
import { redirect } from "next/dist/server/api-utils";
import Link from "next/link";
import TourInfo from "../new-tour/_components/TourInfo";
import TourImage from "../_components/TourImage";

const SingleTourPage = async ({ params }) => {
  const tour = await getSingleTour(params.id);
  if (!tour) redirect("/tours");

  return (
    <div>
      <Link className="btn btn-secondary mb-12" href="/tours">
        Back to tours
      </Link>
      <div className="flex flex-col-reverse gap-12 xl:flex-row">
        <TourInfo tourData={tour} />
        <TourImage city={tour.city} />
      </div>
    </div>
  );
};

export default SingleTourPage;
