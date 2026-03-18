import { Meal, MealInput } from "@/app/meals/[mealSlug]/types";
import sql from "better-sqlite3";
import slugify from "slugify";
import xss from "xss";
import fs from "node:fs";

const db = sql("meals.db");

export async function getMeals() {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  // throw new Error("Failed to fetch meals");
  return db.prepare("select * from meals").all();
}

export function getMeal(mealSlug: string) {
  return db.prepare("select * from meals where slug = ?").get(mealSlug);
}

export async function saveMeal(meal: MealInput) {
  meal.slug = slugify(meal.title, { lower: true });
  meal.instructions = xss(meal.instructions);

  const extension = meal.image.name.split(".").pop();
  const fileName = `${meal.slug}.${extension}`;
  const filePath = `public/images/${fileName}`;

  const stream = fs.createWriteStream(filePath);
  const bufferedImage = await meal.image.arrayBuffer();
  stream.write(Buffer.from(bufferedImage), (error) => {
    if (error) {
      throw new Error("Failed to save image");
    }
  });

  const finalMeal: Meal = {
    ...meal,
    image: `/images/${fileName}`,
  };

  db.prepare(
    `Insert into meals 
    (title,summary,instructions,creator,creator_email,image,slug) 
    values(
      @title,   @summary,   @instructions,   @creator,   @creator_email,   @image,   @slug)`
  ).run(finalMeal);
}
