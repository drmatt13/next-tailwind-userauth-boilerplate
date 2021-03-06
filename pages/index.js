import { useContext } from "react";
import Link from "next/link";

// components
import ProtectedPage from "../components/ProtectedPage";

// context
import _appContext from "../context/_appContext";

// utils
import service from "../utils/service";

// styles
import styles from "../styles/Home.module.scss";

const Home = () => {
  const { user, logout } = useContext(_appContext);

  const loguser = () => {
    console.log(user);
  };

  return (
    <ProtectedPage>
      <div className="h-full w-full flex flex-col justify-center items-center">
        <div className="flex flex-col items-center animate-fade-in">
          <Link href="/unprotected-test">
            <a className="mb-6 text-blue-500 hover:underline hover:text-purple-500">
              unprotected page link
            </a>
          </Link>
          <div
            className="select-none mb-3 bg-gray-300 rounded py-2 px-8 inline-block border shadow cursor-pointer hover:bg-sky-500 hover:text-white hover:border-sky-400 transition-colors"
            onClick={loguser}
          >
            Log User
          </div>
          <div
            className="select-none bg-gray-300 rounded py-2 px-10 inline-block border shadow cursor-pointer hover:bg-red-500 hover:text-white hover:border-red-400 transition-colors"
            onClick={logout}
          >
            logout
          </div>
        </div>
      </div>
    </ProtectedPage>
  );
};

export default Home;
