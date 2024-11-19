import Link from "next/link";

export default function Home() {
  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content text-center">
        <div className="max-w-3xl">
          <h1 className="text-6xl font-bold text-primary">Trip-AI</h1>
          <p className="py-6 text-xs leading-none sm:text-lg sm:leading-loose">
            Your AI travel companion, powered by OpenAI, designed to simplify your trip planning! <br/>
            Select a country and city, specify the number of days and attractions you'd like, <br/>
            and receive a curated list of must-visit places and activities. <br/>
            Plus, you'll get an estimated cost for the attractions!
          </p>
          <Link href="/tours/new-tour" className="btn btn-secondary">
            Plan Trip
          </Link>
        </div>
      </div>
    </div>
  );
}
