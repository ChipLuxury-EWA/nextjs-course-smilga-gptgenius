"use client";

import TourInfo from "./TourInfo";

const NewTour = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const destination = Object.fromEntries(formData.entries());
    console.log(destination);
  };

  return (
    <>
      <form className="max-w-2xl" onSubmit={handleSubmit}>
        <h2 className="mb-4">Select your dream destination:</h2>
        <div className="join w-full">
          <input className="input input-bordered join-item w-full" placeholder="country" name="country" type="text" required />
          <input className="input input-bordered join-item w-full" placeholder="city" name="city" type="text" required />
          <button className="btn btn-primary join-item" type="submit">
            Generate tour
          </button>
        </div>
      </form>
      <div className="mt-16">
        <TourInfo />
      </div>
    </>
  );
};
export default NewTour;
