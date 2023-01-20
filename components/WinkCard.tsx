import { FC } from "react";

export interface IWinkProps {
  createdAt: Date;
  transcription: string;
  category: string
  winkCount: number
}

const WinkCard: FC<IWinkProps> = ({ createdAt, transcription, category, winkCount }) => {
  return (
    <div className={`card  bg-white shadow-xl ${(winkCount == 1) ? "w-full lg:w-2/6" : "w-auto"}`}>
      <div className="card-body items-center text-center pb-1">
        <h2 className="card-title text-sleepy-purple">
          {createdAt.toDateString()}
        </h2>
        <textarea rows={8} className="text-black bg-white text-lg textarea textarea-bordered textarea-primary resize-none w-full" value={transcription}></textarea>

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
