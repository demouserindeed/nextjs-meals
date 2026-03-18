"use server";

import { redirect } from "next/navigation";
import { saveMeal } from "./meals";
import { revalidatePath } from "next/cache";

export default async function shareMeal(prevData: any, formData: FormData) {
  const isInvalidText = (text: string) => {
    return !text || text.trim() === "";
  };

  const meal = {
    title: formData.get("title") as string,
    summary: formData.get("summary") as string,
    instructions: formData.get("instructions") as string,
    image: formData.get("image") as File,
    creator: formData.get("name") as string,
    creator_email: formData.get("email") as string,
    slug: "", // Initialize slug property
  };

  if (
    isInvalidText(meal.title) ||
    isInvalidText(meal.summary) ||
    isInvalidText(meal.instructions) ||
    isInvalidText(meal.creator) ||
    isInvalidText(meal.creator_email) ||
    !meal.image ||
    meal.image.size === 0 ||
    !meal.creator_email.includes("@")
  ) {
    return {
      message: "Invalid input. Please fill in all fields correctly.",
    };
  }
  await saveMeal(meal);
  revalidatePath("/meals");
  redirect("/meals");
}
