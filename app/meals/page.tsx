import Link from "next/link";
import classes from "./page.module.css";
import MealsGrid from "@/components/meals/meals-grid";
import { getMeals } from "@/lib/meals";
import { Suspense } from "react";

async function Meals() {
  const meals = await getMeals();
  return <MealsGrid meals={meals} />;
}

const MealsPage = async () => {
  return (
    <header className={classes.header}>
      <h1>
        Delicious meals created {""}
        <span className={classes.highlight}>by you </span>
      </h1>

      <p>Choose your favourite recipe and cook it yourself</p>
      <p className={classes.cta}>
        <Link href="/meals/share">Share your favourite recipe</Link>
      </p>
      <main className={classes.main}>
        <Suspense fallback={<p className={classes.loading}>Fetching meals...</p>}>
          <Meals />
        </Suspense>
      </main>
    </header>
  );
};
export default MealsPage;
