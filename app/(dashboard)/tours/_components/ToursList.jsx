import TourCard from "./TourCard";

const ToursList = ({ tours }) => {
  if (tours?.length === 0 || !tours) return <h4 className="text-lg">No tours found</h4>;

  const ToursList = () => {
    return tours.map((tour) => {
      return <TourCard key={tour.id} tour={tour} />;
    });
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
      <ToursList />
    </div>
  );
};
export default ToursList;
