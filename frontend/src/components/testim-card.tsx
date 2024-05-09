import { RiDoubleQuotesL } from "react-icons/ri";

type TestimCardProps = {
  testimonial: { color: string; feedback: string; person: string };
};

export const TestimCard = ({ testimonial }: TestimCardProps) => {
  const { color, feedback, person } = testimonial;
  return (
    <div
      style={{ backgroundColor: color }}
      className="w-[310px] h-[430px] sm:w-[420px] sm:h-[430px] md:w-[430px] md:h-[460px] border flex flex-col gap-y-10 p-10 sm:p-16 rounded-3xl"
    >
      <div>
        <RiDoubleQuotesL size={40} />
      </div>
      <div className="text-2xl">{feedback}</div>
      <div>{person}</div>
    </div>
  );
};
