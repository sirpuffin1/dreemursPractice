import axios from "axios";
import { ChangeEvent, useState } from "react";

const RegistrationModal = () => {
  const [checked, setChecked] = useState(true);
  const [username, setUsername] = useState("");

  const handleModalButton = () => {
    setChecked(false);
    handleUpdateUsername()
  };
  console.log('rendered')
  const handleUpdateUsername = async () => {
    const res = await axios.put("/api/post", {
        username
      }, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      }).catch((error) => console.log(error))
  
  }

  const handleUsername = (event: ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
    
  };

  return (
    <>
      {/* The button to open modal */}

      {/* Put this part before </body> tag */}
      <input
        type="checkbox"
        id="my-modal"
        className="modal-toggle"
        checked={checked}
        readOnly={true}
      />
      <div className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg text-black mb-3">
            You'll need a username!
          </h3>
          <input
            type="text"
            placeholder="BigStepper45"
            className="input input-bordered input-primary w-full max-w-xs text-black"
            onChange={handleUsername}
          />
          <div className="modal-action">
            <button className="btn btn-primary" onClick={handleModalButton}>
              Submit
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default RegistrationModal;
