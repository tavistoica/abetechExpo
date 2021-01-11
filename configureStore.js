import { createStore, applyMiddleware } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import reducers from "./reducers";
import reduxThunk from "redux-thunk";
import { AsyncStorage } from "react-native";
import { composeWithDevTools } from "redux-devtools-extension";

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  blacklist: ["navigation", "products"], // navigation will not be persisted
};

const persistedReducer = persistReducer(persistConfig, reducers);

let store = createStore(
  persistedReducer,
  undefined,
  composeWithDevTools(applyMiddleware(reduxThunk))
);

let persistor = persistStore(store);

export { store, persistor };
