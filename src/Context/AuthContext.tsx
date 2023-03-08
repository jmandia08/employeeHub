import * as React from 'react';

interface AuthContextInterface {
  isAuthenticated: boolean;
  isLoggedIn: boolean;
  isLoading: boolean,
  version: string,
  login: (email: string, password: string) => void;
  signup: (email: string, password: string) => void;
  logout: () => void;
}
interface Props {
  children: React.ReactNode;
}
export const AuthContext = React.createContext<AuthContextInterface>({
  isAuthenticated: false,
  isLoggedIn: false,
  isLoading: false,
  version: "",
  login: () => { },
  signup: () => { },
  logout: () => { },
});

export const AuthProvider: React.FC<Props> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = React.useState<boolean>(
    sessionStorage.getItem('isAuthenticated') === 'true' || false
  );
  const [isLoggedIn, setIsLoggedIn] = React.useState(
    sessionStorage.getItem('isLoggedIn') === 'true' || false);

  const [isLoading, setIsLoading] = React.useState(false)
  const [version, setVersion] = React.useState("1.0.0.0")

  const login = (email: string, password: string) => {
    setIsAuthenticated(true);
    setIsLoggedIn(true);
  };

  const signup = (email: string, password: string) => {
    setIsAuthenticated(true);
    setIsLoggedIn(true);
  };
  const logout = () => {
    setIsAuthenticated(false);
    setIsLoggedIn(false);
  };

  React.useEffect(() => {
    sessionStorage.setItem('isAuthenticated', isAuthenticated.toString());
    sessionStorage.setItem('isLoggedIn', isLoggedIn.toString());
  }, [isAuthenticated, isLoggedIn]);


  return (
    <AuthContext.Provider value={{ isAuthenticated, isLoggedIn, isLoading, version, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};