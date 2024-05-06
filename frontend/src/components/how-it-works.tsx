import { works } from "../utils/works";
import { Card } from "./card";

export const HowItWorks = () => {
  return (
    <div className="px-4 py-20 flex flex-col gap-y-10">
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
