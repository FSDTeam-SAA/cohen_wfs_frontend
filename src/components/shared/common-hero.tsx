import React from "react";

export default function CommonHero({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <section className="py-10 lg:py-24 bg-primary">
      <div className="container mx-auto space-y-5">
        <h1 className="headline text-white">{title}</h1>
        <p className="text-white/80 max-w-2xl">{description}</p>
      </div>
    </section>
  );
}
