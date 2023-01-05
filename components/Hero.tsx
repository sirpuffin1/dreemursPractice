import Image from "next/image";
import Link from "next/link";

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
        <Link href="/register">
          <button className="btn btn-wide bg-sleepy-purple text-nightly-purple hover:bg-nightly-purple">
            Register
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Hero;
