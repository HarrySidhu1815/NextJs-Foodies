import Link from "next/link";
import React, { Suspense } from "react";
import classes from "./page.module.css";
import MealGrid from "@/components/meals/meal-grid";
import { getMeals } from "@/lib/meals";

async function Meals() {
  const meals = await getMeals();
  return <MealGrid meals={meals} />;
}

const MealPage = () => {
  return (
    <>
      <header className={classes.header}>
        <h1>
          Delicious meals, created{" "}
          <span className={classes.highlight}>by you</span>
        </h1>
        <p>
          Choose your favourite recipe and cook it yourself. It is easy and fun!
        </p>
        <p className={classes.cta}>
          <Link href="/meals/share">Share your Favourite Recipe</Link>
        </p>
      </header>
      <main className={classes.main}>
        <Suspense
          fallback={<p className={classes.loading}>Fetching the Meals....</p>}
        >
          <Meals />
        </Suspense>
      </main>
    </>
  );
};

export default MealPage;
