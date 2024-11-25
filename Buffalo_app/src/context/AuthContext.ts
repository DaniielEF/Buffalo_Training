import { createContext } from "react";
import { Provider } from "react-redux";

export const AuthContext = (createContext<T>(Provider<T>));