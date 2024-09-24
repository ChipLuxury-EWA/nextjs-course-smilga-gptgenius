"use server";

export const getExistingTours = async ({ city, country }) => {
  const tours = await prisma.tour.findMany({ where: { city, country } });
  return tours;
};

export const generateTourResponse = async (tour) => {
  try {
    const response = await openai.chat.completions.create({
      messages: [
        { role: "system", content: "You are a helpful assistant." },
        { role: "user", content: tour },
      ],
      model: "gpt-3.5-turbo-0125",
      temperature: 0.8,
    });
    const { message } = response.choices[0];
    return message;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const createNewTour = async (tour) => {
  try {
    const response = await prisma.tour.create({ data: tour });
    return response;
  } catch (error) {
    console.error(error);
    return null;
  }
};
