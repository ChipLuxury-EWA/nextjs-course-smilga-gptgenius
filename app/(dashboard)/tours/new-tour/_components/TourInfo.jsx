const TourInfo = ({ tourData }) => {
  const { city, country, title, description, attractions, attractionsDurations, stops, estimatedCost } = tourData;

  const DynamicStopsList = () => {
    return stops.map((stop, index) => {
      return (
        <li className="mb-4 bg-base-100 p-4 rounded-xl " key={stop + index}>
          <h2 className="text-2xl font-semibold mb-2">
            Stop {index + 1} - {attractions[index]} ({attractionsDurations[index]})
          </h2>
          <p>{stop}</p>
        </li>
      );
    });
  };

  return (
    <div className="max-w-full">
      <div className="join flex justify-between items-center">
        <h1 className="text-4xl font-semibold mb-4 join-item">{title} </h1>
        <h6 className="text-md font-semibold join-item">Estimated Cost: {estimatedCost}</h6>
      </div>
      <p className="leading-loose mb-6 ">{description}</p>
      <ul>
        <DynamicStopsList />
      </ul>
    </div>
  );
};
export default TourInfo;
