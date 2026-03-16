import { getMeal } from "@/lib/meals";
import classes from "./page.module.css";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Meal } from "./types";

interface MealDetailsPageProps {
  params: Promise<{ mealSlug: string }>;
}

export default async function MealDetailsPage({ params }: MealDetailsPageProps) {
  const { mealSlug } = await params;
  const meal = getMeal(mealSlug) as Meal;

  if (!meal) {
    notFound();
  }

  const instructions = meal.instructions.replace(/\n/g, "<br/>");

  return (
    <>
      <header className={classes.header}>
        <div className={classes.image}>
          <Image fill src={meal.image} alt={meal.title} />
        </div>

        <div className={classes.headerText}>
          <h1>{meal.title}</h1>
          <p className={classes.creator}>
            by <a href={`mailto:${meal.creator_email}`}>{meal.creator}</a>
          </p>
          <p className={classes.summary}>{meal.summary}</p>
        </div>
      </header>

      <main>
        <p
          className={classes.instructions}
          dangerouslySetInnerHTML={{
            __html: instructions,
          }}
        />
      </main>
    </>
  );
}
