import { User } from "@supabase/supabase-js";
import React, { createContext, useContext, useState } from "react";

type ContextType = {
  user?: User;
  profile?: Profile;
  handleSetUser: (user: User) => void;
  handleSetProfile: (profile: Profile) => void;
  handleSetAuth: (user: User, profile: Profile) => void;
};

const AuthContext = createContext<ContextType>({
  handleSetUser: () => {},
  handleSetProfile: () => {},
  handleSetAuth: () => {},
});

function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User>();
  const [profile, setProfile] = useState<Profile>();

  function handleSetUser(user: User) {
    setUser(user);
  }

  function handleSetProfile(profile: Profile) {
    setProfile(profile);
  }

  function handleSetAuth(user: User, profile: Profile) {
    setUser(user);
    setProfile(profile);
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        handleSetProfile,
        handleSetUser,
        handleSetAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("AuthContext called outside of Provider");
  }
  return context;
}

export default AuthProvider;
