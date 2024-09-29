import axios from "axios";
import Image from "next/image";

const url = `https://api.unsplash.com/search/photos?client_id=${process.env.UNSPLASH_API_KEY}&query=`;

const TourImage = async ({ city }) => {
  const { data } = await axios(`${url}${city}`);
  const tourImage = data?.results[0]?.urls?.raw;

  return (
    <>
      {tourImage ? (
        <div>
          <Image
            src={tourImage}
            width={300}
            height={300}
            className="rounded-xl shadow-xl mb-16 h-96 w-96 object-cover"
            alt={`picture of ${city} city`}
            priority
          />
        </div>
      ) : null}
    </>
  );
};
export default TourImage;
