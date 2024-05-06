import { RiDoubleQuotesL } from "react-icons/ri";

type TestimCardProps = {
  testimonial: { color: string; feedback: string; person: string };
};

export const TestimCard = ({ testimonial }: TestimCardProps) => {
  const { color, feedback, person } = testimonial;
  return (
    <div
      style={{ backgroundColor: color }}
      className="w-[430px] h-[450px] border flex flex-col gap-y-10 p-16 rounded-3xl"
    >
      <div>
        <RiDoubleQuotesL size={40} />
      </div>
      <div className="text-2xl">{feedback}</div>
      <div>{person}</div>
    </div>
  );
};
