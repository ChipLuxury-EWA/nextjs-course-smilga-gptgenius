import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import Providers from "./providers";

export const metadata = {
  title: "TRIP-AI",
  description: `Trip-AI: Your AI travel companion, powered by OpenAI, designed to simplify your trip planning!
    Just select a country and city, specify the number of days and attractions you'd like, and receive a curated list of must-visit places and activities.
    Plus, you'll get an estimated cost for the attractions!`,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ClerkProvider>
          <Providers>{children}</Providers>
        </ClerkProvider>
      </body>
    </html>
  );
}
