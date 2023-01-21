import Image from "next/image";
import Link from "next/link";

const Hero = () => {
  return (
    <div className="flex justify-center items-center mt-4 flex-col relative">
      <Image
        src="/nightly-high-resolution-logo-white-on-transparent-background (1).png"
        alt="A very sleepy person"
        width={500}
        height={500}
      />
      <Image
        src="/nightly-website-favicon-color.png"
        alt="A very sleepy person"
        className="absolute top-6 md:top-12"
        width={200}
        height={200}
       
      />
    </div>
  );
};

export default Hero;
