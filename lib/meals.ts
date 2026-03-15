import sql from "better-sqlite3";

const db = sql("meals.db");

export async function getMeals() {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  // throw new Error("Failed to fetch meals");
  return db.prepare("select * from meals").all();
}

export function getMeal(mealSlug: string) {
  return db.prepare("select * from meals where slug = ?").get(mealSlug);
}
