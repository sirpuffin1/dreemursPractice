import axios from "axios";
import { ChangeEvent, FC, useRef, useState } from "react";
import Router, { useRouter } from 'next/router';

export interface IWinkProps {
  createdAt: Date;
  transcription: string;
  winkId: string,
  setTranscription: (transcription: string) => void;
}

const NewWinkCard: FC<IWinkProps> = ({
  createdAt,
  transcription,
  winkId,
  setTranscription,
}) => {

    const [selectValue, setSelectValue ] = useState('Health')
    const router = useRouter()

  const textareaHandler = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = event.target;
    setTranscription(value);
  };

  const selectHandler = (event: ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target
    setSelectValue(value)
  }

  const updateWink = async () => {
    const updatedFields = {transcription, selectValue, winkId}
    const res = await axios.put("/api/updateWink", {
      updatedFields
    }, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    }).then(async () => {
      router.push('/home')
    }).catch((error) => console.log(error))

  };

  return (
    <div className="card w-96 bg-base-100 shadow-xl">
      <div className="card-body items-center text-center pb-1">
        <h2 className="card-title text-sleepy-purple">
          {createdAt.toDateString()}
        </h2>
        <textarea
          rows={7}
          className="w-full text-black textarea textarea-bordered textarea-primary resize-none"
          placeholder="Your newly transcribed dream!"
          value={transcription}
          onChange={textareaHandler}
        ></textarea>

        <div className="form-control w-full max-w-xs mt-0 pt-0 items-center mb-4">
          <label className="label">
            <span className="text-center mb-3">Select a dream category!</span>
          </label>
          <div className="flex justify-around gap-5">
            <select className="select select-primary w-full max-w-xs" value={selectValue} onChange={selectHandler}>
              <option>Health</option>
              <option>Wealth</option>
              <option>Romance</option>
              <option>Opportunities</option>
            </select>
            <button className="btn btn-circle btn-outline btn-primary" onClick={updateWink}>
              <svg
                width="24"
                height="24"
                xmlns="http://www.w3.org/2000/svg"
                fillRule="evenodd"
                clipRule="evenodd"
              >
                <path d="M21 6.285l-11.16 12.733-6.84-6.018 1.319-1.49 5.341 4.686 9.865-11.196 1.475 1.285z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewWinkCard;
