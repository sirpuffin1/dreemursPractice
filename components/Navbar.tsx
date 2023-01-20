import Link from "next/link";
import LoginBtn from "./LoginBtn"
import Image from 'next/image';
import nightlyLogo from "../public/nightly.svg"

const Navbar = () => {
    return (
        <div className="navbar bg-gradient-to-t from-sleepy-purple to-nightly-purple text-primary-content">
  <div className="navbar-start">
    <div className="dropdown">
      <label tabIndex={0} className="btn btn-ghost btn-circle">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" /></svg>
      </label>
      <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-nightly-purple rounded-box w-52">
        <li><a>Homepage</a></li>
        <li><a>Portfolio</a></li>
        <li><a>About</a></li>
        <Link href="/home"><li>Me</li></Link>
      </ul>
    </div>
  </div>
  <div className="navbar-center">
    <Link className="btn btn-ghost normal-case text-xl" href="/">
      <Image src={nightlyLogo}  alt="Nightly Logo" height={50} width={50}/>
    </Link>
  </div>
  <div className="navbar-end">
    <LoginBtn/>
  </div>
</div>
    );
}

export default Navbar;