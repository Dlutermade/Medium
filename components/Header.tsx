import Link from "next/link";
import Image from "next/image";

const Header = () => {
  return (
    <header className="flex justify-between p-5 mx-auto max-w-7xl">
      <div className="flex items-center gap-5">
        <Link href="/">
          <Image
            height={254}
            width={1024}
            className="object-contain w-44"
            src="https://deanlife.blog/wp-content/uploads/2021/02/medium-1024x254.png"
            alt=""
          />
        </Link>
        <div className="hidden md:inline-flex md:items-center md:gap-5">
          <h3>About</h3>
          <h3>Contact</h3>
          <h3 className="px-4 py-1 text-white bg-green-600 rounded-full">
            Follow
          </h3>
        </div>
      </div>

      <div className="flex items-center gap-5 text-green-600">
        <h3>Sign In</h3>
        <h3 className="px-4 py-1 border border-green-600 rounded-full">
          Get Started
        </h3>
      </div>
    </header>
  );
};

export default Header;
