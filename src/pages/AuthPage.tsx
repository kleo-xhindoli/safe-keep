import React from "react";
import { Redirect, useHistory } from "react-router-dom";
import Button from "../components/ui/Button";
import Heading from "../components/ui/Heading";
import useAuth from "../hooks/useAuth";
import useSession from "../hooks/useSession";

interface AuthPageProps {}

const AuthPage: React.FC<AuthPageProps> = () => {
  const {
    isGoogleSigning,
    isGithubSigning,
    withGoogle,
    withGithub,
    error,
  } = useAuth();
  const { isAuthenticated } = useSession();
  const history = useHistory();

  const handleSignIn = async (providerSignIn: () => Promise<any>) => {
    try {
      await providerSignIn();
      history.push("/");
    } catch {}
  };

  if (isAuthenticated) {
    return <Redirect to="/" />;
  }

  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-full bg-white rounded-md px-8 py-12 -mt-16 shadow max-w-md">
        <div className="flex justify-center mb-8">
          <img
            alt="SafeKeep Logo"
            src={process.env.PUBLIC_URL + "/LogoSymbol.png"}
            className="w-20"
          />
        </div>
        <Heading
          as="h2"
          className="text-center text-xl font-medium text-gray-900"
        >
          Welcome to SafeKeep
        </Heading>
        <p className="text-center text-gray-500 mt-2">
          Please sign in with one of the following options
        </p>

        <div className="mt-8 space-y-4">
          <Button
            className="w-full"
            onClick={() => handleSignIn(withGoogle)}
            isLoading={isGoogleSigning}
            leftIcon="Google"
          >
            Sign in with Google
          </Button>
          <Button
            className="w-full"
            onClick={() => handleSignIn(withGithub)}
            isLoading={isGithubSigning}
            leftIcon="Github"
          >
            Sign in with Github
          </Button>
        </div>
        {error && (
          <p className="text-center text-sm text-red-500 mt-2">{error}</p>
        )}
      </div>
    </div>
  );
};

export default AuthPage;
