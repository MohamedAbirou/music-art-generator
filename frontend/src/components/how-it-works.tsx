import { works } from "../utils/works";
import { Card } from "./card";

export const HowItWorks = () => {
  return (
    <div className="px-4 py-20 flex flex-col gap-y-10">
      <h1 className="text-center text-4xl sm:text-5xl lg:text-6xl py-10">
        How it works
      </h1>
      {works.map((work) => (
        <Card
          key={work.id}
          id={work.id}
          title={work.title}
          description={work.description}
          className={work.className}
        />
      ))}
    </div>
  );
};
