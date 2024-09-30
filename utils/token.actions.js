"use server";

import { revalidatePath } from "next/cache";
import prisma from "./db";

export const fetchUserTokenById = async (clerkId) => {
  const userTokens = await prisma.token.findUnique({ where: { clerkId: clerkId } });
  return userTokens?.tokens;
};

export const generateUserTokensForId = async (clerkId) => {
  const userTokens = await prisma.token.create({ data: { clerkId } });
  return userTokens?.tokens;
};

export const fetchOrGenerateUserTokensForId = async (clerkId) => {
  const userTokens = await fetchUserTokenById(clerkId);
  if (userTokens) {
    return userTokens.tokens;
  } else {
    return (await generateUserTokensForId(clerkId)).tokens;
  }
};

export const subtractTokens = async (clerkId, usedTokens) => {
  const userTokens = await prisma.token.update({ where: { clerkId }, data: { tokens: { decrement: usedTokens } } });
  revalidatePath("/profile");
  return userTokens.tokens;
};
