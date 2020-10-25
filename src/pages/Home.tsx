import React from "react";
import { Redirect } from "react-router-dom";
import Loader from "../components/ui/Loader";
import { useSafes } from "../hooks/resources/safes";

interface HomeProps {}

const Home: React.FC<HomeProps> = () => {
  const [safes, loading] = useSafes();
  if (loading) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <Loader className="w-12 h-12" />
      </div>
    );
  }
  return <Redirect to={`/${safes?.[0].id}`} />;
};

export default Home;
