import { createContext, useContext } from "react";
import type { AccountInfoRef } from "../components/CreateAccount/CreateAccount";

export type CreateNewAccountContextType = {
  isNewAccountCreated: boolean;
  setIsNewAccountCreated: (value: boolean) => void;
  accountInfo: AccountInfoRef | null;
  setAccountInfo: (info: AccountInfoRef) => void;
};

export const CreateNewAccountContext =
  createContext<CreateNewAccountContextType | null>(null);

export const useCreateNewAccountContext = () => {
  const context = useContext(CreateNewAccountContext);

  if (!context) {
    throw new Error(
      "useCreateNewAccountContext must be used within CreateNewAccountContext.Provider",
    );
  }

  return context;
};
