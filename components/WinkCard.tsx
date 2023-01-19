import { FC } from "react";

export interface IWinkProps {
  createdAt: Date;
  transcription: string;
  category: string
}

const WinkCard: FC<IWinkProps> = ({ createdAt, transcription, category }) => {
  return (
    <div className="card w-96 bg-base-100 shadow-xl">
      <div className="card-body items-center text-center pb-1">
        <h2 className="card-title text-sleepy-purple">
          {createdAt.toDateString()}
        </h2>
        <p className="text-black">{transcription}</p>

        <div className="w-4/5 ">
          <div className="divider"></div>
        </div>
      </div>

      <div className="flex justify-center gap-7 mb-5">
        <div className="badge badge-lg badge-primary badge-outline">{category}</div>
      </div>
    </div>
  );
};

export default WinkCard;
