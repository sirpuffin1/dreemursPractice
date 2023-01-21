import Link from "next/link";
import LoginBtn from "./LoginBtn";
import Image from "next/image";
import nightlyLogo from "../public/nightly.svg";

const Navbar = () => {
  return (
    <div className="navbar bg-gradient-to-t from-sleepy-purple to-nightly-purple text-primary-content">
      <div className="navbar-start">
        <Link className="btn btn-ghost flex gap-2" href="/home">
          <Image src={nightlyLogo} alt="Nightly Logo" height={50} width={50} />
          <p className="text-2xl font-light capitalize">Nightly</p>
        </Link>
      </div>
      <div className="navbar-end">
        <LoginBtn />
      </div>
    </div>
  );
};

export default Navbar;
