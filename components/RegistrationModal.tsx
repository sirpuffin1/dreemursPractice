import { useRef, useState } from "react";

const RegistrationModal = () => {
    const buton = useRef<HTMLInputElement>(null)
    const [ checked, setChecked ] = useState(true)
    if(buton) {
        console.log(buton.current?.checked)
    }

    const handleModalButton = () =>  {
        setChecked(false)
    }
    
    return (
        <>
            {/* The button to open modal */}

{/* Put this part before </body> tag */}
<input type="checkbox" id="my-modal" className="modal-toggle" ref={buton} checked={checked} readOnly={true}/>
<div className="modal">
  <div className="modal-box">
    <h3 className="font-bold text-lg text-black mb-3">You'll need a username!</h3>
    <input type="text" placeholder="BigStepper45" className="input input-bordered input-primary w-full max-w-xs text-black" />
    <div className="modal-action">
      <button className="btn btn-primary" onClick={handleModalButton}>Submit</button>
    </div>
  </div>
</div>
        </>
    );
}

export default RegistrationModal;