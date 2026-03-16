import { Meal } from "@/app/meals/[mealSlug]/types";
import sql from "better-sqlite3";
import slugify from "slugify";
import xss from "xss";

const db = sql("meals.db");

export async function getMeals() {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  // throw new Error("Failed to fetch meals");
  return db.prepare("select * from meals").all();
}

export function getMeal(mealSlug: string) {
  return db.prepare("select * from meals where slug = ?").get(mealSlug);
}

export function saveMeal(meal: Meal) {
  meal.slug = slugify(meal.title, { lower: true });
  meal.instructions = xss(meal.instructions);
}
