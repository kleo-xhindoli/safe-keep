import React from "react";
import { Redirect, useHistory } from "react-router-dom";
import Button from "../components/ui/Button";
import Heading from "../components/ui/Heading";
import useAuth from "../hooks/useAuth";
import useSession from "../hooks/useSession";

interface AuthPageProps {}

const AuthPage: React.FC<AuthPageProps> = () => {
  const { isSigning, withGoogle, error } = useAuth();
  const { isAuthenticated } = useSession();
  const history = useHistory();

  const handleSignIn = async () => {
    try {
      await withGoogle();
      history.push("/");
    } catch {}
  };

  if (isAuthenticated) {
    return <Redirect to="/" />;
  }

  return (
    <div className="w-full bg-white rounded-md p-8 shadow">
      <Heading as="h2" className="text-center text-xl">
        Welcome to SafeKeep
      </Heading>
      <p className="text-center text-gray-500 mt-2">
        Please sign in with one of the following options
      </p>

      <div className="mt-8">
        <Button
          className="w-full"
          onClick={handleSignIn}
          isLoading={isSigning}
          leftIcon="Google"
        >
          Sign in with Google
        </Button>
      </div>
      {error && (
        <p className="text-center text-sm text-red-500 mt-2">{error}</p>
      )}
    </div>
  );
};

export default AuthPage;
