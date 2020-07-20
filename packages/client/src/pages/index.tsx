import { NextPage } from "next";
import { foobar, bar } from "@root/shared";

const Home: NextPage = () => {
  return (
    <h1>
      Hello world {foobar} - {bar}
    </h1>
  );
};

export default Home;
