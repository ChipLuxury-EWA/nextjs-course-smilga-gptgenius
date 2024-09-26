import Link from "next/link";

const TourCard = ({ tour }) => {
  const {
    id,
    createdAt,
    updatedAt,
    city,
    country,
    title,
    description,
    image,
    stops,
    attractions,
    attractionsDurations,
    estimatedCost,
  } = tour;

  return (
    <Link className="card card-compact rounded-xl bg-base-100 shadow-xl" href={`/tours/${id}`}>
      <div className="card-body items-center text-center">
        <h2 className="card-title text-center">{city}, {country}</h2>
      </div>
    </Link>
  );
};
export default TourCard;
