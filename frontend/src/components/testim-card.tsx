import { RiDoubleQuotesL } from "react-icons/ri";

type TestimCardProps = {
  testimonial: { color: string; feedback: string; person: string };
};

export const TestimCard = ({ testimonial }: TestimCardProps) => {
  const { color, feedback, person } = testimonial;
  return (
    <div
      style={{ backgroundColor: color, fontFamily: "Athletics" }}
      className="w-[310px] h-[430px] sm:w-[420px] sm:h-[430px] md:w-[430px] md:h-[460px] border flex flex-col space-y-10 md:space-y-14 p-10 sm:p-16 rounded-3xl cursor-grab"
    >
      <div>
        <RiDoubleQuotesL size={40} />
      </div>
      <div className="text-2xl">{feedback}</div>
      <div className="bg-white w-fit px-6 py-3 rounded-full border-[1px] border-b-4 border-black">
        {person}
      </div>
    </div>
  );
};
