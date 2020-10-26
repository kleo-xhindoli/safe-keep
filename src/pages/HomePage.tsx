import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import Loader from "../components/ui/Loader";
import { useAddSafe, useSafes } from "../hooks/resources/safes";
import useSession from "../hooks/useSession";

interface HomePageProps {}

const HomePage: React.FC<HomePageProps> = () => {
  const { currentUser } = useSession();
  const [initialized, setInitialized] = useState(false);
  const [defaultSafeId, setDefaultSafeId] = useState("");

  const [safes, loading] = useSafes();
  const [addSafe] = useAddSafe();

  useEffect(() => {
    const init = async () => {
      // if there aren't any safes for this user, create a default one
      if (!loading && !safes?.length) {
        debugger;
        const newSafeId = await addSafe({
          name: `${currentUser?.displayName}'s default Safe`,
          secrets: {},
        });
        setDefaultSafeId(newSafeId || "");
      } else if (!loading) {
        setInitialized(true);
        setDefaultSafeId(safes?.[0].id || "");
      }
    };

    init();
  }, [loading, safes, currentUser, addSafe]);

  if (!initialized) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <Loader className="w-12 h-12" />
      </div>
    );
  }
  return <Redirect to={`/${defaultSafeId}`} />;
};

export default HomePage;
