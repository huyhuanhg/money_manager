import { Dispatch, ReactNode, createContext, useReducer } from "react";
import {
  ACTION_AUTH_LOGIN,
  ACTION_AUTH_LOGOUT,
  ACTION_GET_ALL_OWNED_WALLETS,
  MUTATION_SET_OWNED_WALLETS,
} from "./constant";
import StoreType from "@/types/StoreType";
import {
  collection,
  doc,
  getDocs,
  query,
  serverTimestamp,
  setDoc,
  where,
} from "firebase/firestore";
import { db } from "@/configs/firebase";

const initialState: StoreType = {
  loggedInUser: {},
  wallet: {
    data: [],
  },
  category: {
    data: [],
  },
  transaction: {
    data: [],
  },
  dispatch: () => {},
};
const store = createContext(initialState);
const { Provider } = store;

interface ProviderProps {
  children: ReactNode;
}

const getUserLoggedIn = async ({ email, displayName, photoURL }: any) => {
  try {
    await setDoc(
      doc(db, "users", email as string),
      {
        email: email as string,
        full_name: displayName as string,
        last_seen: serverTimestamp(),
        photo_url: photoURL as string,
      },
      { merge: true }
    );
  } catch (error) {
    console.error("ERROR SET USER INFO IN DB", error);
  }
};

const getAllOwnedWallet = async ({ email }: any) => {
  const q = query(collection(db, "wallets"), where("user", "==", email));
  const querySnapshot = await getDocs(q);

  const wallets = querySnapshot.docs.map((doc) => {
    const { money, icon, title } = doc.data();

    return {
      id: doc.id,
      money,
      icon,
      title,
    };
  });
};

const StateProvider = ({ children }: ProviderProps) => {
  const [stores, dispatch]: [StoreType, Dispatch<any>] = useReducer(
    (state: any, { type, payload }: any) => {
      switch (type) {
        case ACTION_AUTH_LOGIN:
          let { email, displayName, photoURL } = payload.user;
          getUserLoggedIn({ email, displayName, photoURL });
          return {
            ...state,
            loggedInUser: {
              email,
              full_name: displayName,
              photo_url: photoURL,
            },
          };
        case ACTION_GET_ALL_OWNED_WALLETS:
          let { user } = payload;
          let wallets = getAllOwnedWallet({ email: user.email });
          return {
            ...state,
            wallet: {
              data: wallets
            }
          };
        default:
          throw new Error("Action is not defined!");
      }
    },
    initialState
  );

  return <Provider value={{ ...stores, dispatch }}>{children}</Provider>;
};

export { store, StateProvider };
