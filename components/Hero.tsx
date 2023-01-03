import Image from "next/image";

const Hero = () => {
  return (
    <div className="flex justify-center gap-5 mt-4 flex-col lg:flex-row">
      <Image
        src="/cozy-bedroom.png"
        alt="A very sleepy person"
        width={500}
        height={500}
      />
        <div className="flex items-center flex-col justify-around">
        <h1 className="text-white text-6xl">Let all your dreams come true</h1>
        <button className="btn btn-wide bg-sleepy-purple text-nightly-purple hover:bg-nightly-purple">Register</button>
      </div>
    </div>
  );
};

export default Hero;
