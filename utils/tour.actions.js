"use server";

import OpenAI from "openai";
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
import prisma from "./db";

const buildPromptHelper = ({ city, country, daysAmount, attractionsAmount }) => {
  return `Find the city ${city} in this country ${country}.
  If the city ${city} exists in this ${country}, create a list of ${attractionsAmount} attractions families can do in this ${city},${country}. 
  Once you have a list, create a ${daysAmount}-day tour. Response should be in the following JSON format: 
  {
    "tour": {
    "city": "${city}",
    "country": "${country}",
    "title": "title of the tour",
    "description": "description of the city and tour",
    "attractions": ["attraction 1 name", "attraction 2 name", "attraction 3 name"],
    "attractionsDurations": ["attraction 1 estimated duration", "attraction 2 estimated duration", "attraction 3 estimated duration"],
    "stops": ["short paragraph on the stop 1 ", "short paragraph on the stop 2","short paragraph on the stop 3"],
    "estimatedCost": "the total estimated cost of the tour in dollars",
    }
  }
  If you can't find info on exact ${city}, or ${city} does not exist, or it's population is less than 1, or it is not located in the following ${country} return { "tour": null }, with no additional characters.`;
};

export const getExistingTour = async ({ city, country }) => {
  const tour = prisma.tour.findUnique({ where: { city_country: { city, country } } });
  return tour;
};

export const generateTourResponse = async ({ city, country, daysAmount, attractionsAmount }) => {
  const query = buildPromptHelper({ city, country, daysAmount, attractionsAmount });
  try {
    const response = await openai.chat.completions.create({
      messages: [
        { role: "system", content: "You are a tour guide" },
        { role: "user", content: query },
      ],
      model: "gpt-3.5-turbo-0125",
      temperature: 0.8,
    });
    const tourData = JSON.parse(response.choices[0].message.content);
    if (!tourData.tour) {
      return null;
    }

    return tourData.tour;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const createNewTour = async (tour) => {
  console.log(tour);
  try {
    const response = await prisma.tour.create({ data: tour });
    return response;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const getAllTours = async (searchTerm) => {
  const tours = await prisma.tour.findMany({
    ...(searchTerm && { where: { OR: [{ city: { contains: searchTerm } }, { country: { contains: searchTerm } }] } }),
    orderBy: { city: "asc" },
  });
  return tours;
};
