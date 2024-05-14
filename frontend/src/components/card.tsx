type CardProps = {
  id: number;
  title: string;
  description: string;
  className: string;
};

export const Card = ({ id, title, description, className }: CardProps) => {
  return (
    <div
      className={`flex flex-col md:flex-row text-center md:text-left justify-center md:justify-between gap-10 lg:w-1/2 bg-[#F9F5F0] border-[1px] border-black border-b-4 rounded-3xl p-10 md:p-16 ${className}`}
    >
      <span className="text-5xl md:text-6xl md:pt-5">{id}</span>
      <div className="flex flex-col space-y-3">
        <h1 className="text-2xl">{title}</h1>
        <p style={{ fontFamily: "Athletics" }}>{description}</p>
      </div>
    </div>
  );
};
