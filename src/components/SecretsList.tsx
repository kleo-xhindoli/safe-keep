import React from "react";
import { Secret } from "../types/secret";
import SecretListItem from "./SecretListItem";

interface SecretsListProps {
  secrets: Secret[];
}

const SecretsList: React.FC<SecretsListProps> = ({ secrets }) => {
  return (
    <div className="flex flex-col bg-white rounded-lg shadow divide-y divide-gray-200">
      {secrets.map((item) => (
        <SecretListItem secret={item} key={item.id} />
      ))}
    </div>
  );
};

export default SecretsList;
