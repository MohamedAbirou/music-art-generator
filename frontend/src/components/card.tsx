type CardProps = {
  id: number;
  title: string;
  description: string;
  className: string;
};

export const Card = ({ id, title, description, className }: CardProps) => {
  return (
    <div
      className={`flex justify-between gap-10 lg:w-1/2 bg-[#F9F5F0] border border-black border-b-2 rounded-3xl p-16 ${className}`}
    >
      <span className="text-6xl pt-5">{id}</span>
      <div className="flex flex-col space-y-3">
        <h1 className="text-xl">{title}</h1>
        <p>{description}</p>
      </div>
    </div>
  );
};
