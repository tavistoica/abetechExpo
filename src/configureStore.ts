import { createStore, applyMiddleware } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import reducers from "./reducers";
import reduxThunk from "redux-thunk";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { composeWithDevTools } from "redux-devtools-extension";

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  blacklist: ["navigation", "products"], // navigation and products will not be persisted
};

const persistedReducer = persistReducer(persistConfig, reducers);

let store = createStore<any, any, any, any>(
  persistedReducer,
  undefined,
  composeWithDevTools(applyMiddleware(reduxThunk))
);

let persistor = persistStore(store);

export { store, persistor };
