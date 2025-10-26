import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";
import authReducer from "./slices/authSlice";
import patientReducer from "./slices/patientSlice"
import blogReducer from "./slices/blogSlice"
import departmentReducer from "./slices/departmentSlice"
import specialtyReducer from "./slices/specialtySlice"
import accountReducer from "./slices/accountSlice"
import patientAccountReducer from "./slices/patientAccountSlice"
import doctorAccountReducer from "./slices/doctorAccountSlice"
import drugTypeReducer from "./slices/drugTypeSlice"
import supplierReducer from "./slices/supplierSlice"
import manufacturerReducer from "./slices/manufacturerSlice"
import appointmentReducer from "./slices/appointmentSlice"

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  whitelist: ["auth"], // chỉ lưu auth
};

const rootReducer = combineReducers({
  auth: authReducer,
  patient: patientReducer,
  blog: blogReducer,
  department: departmentReducer,
  specialty: specialtyReducer,
  account: accountReducer,
  patientAccount: patientAccountReducer,
  doctorAccount: doctorAccountReducer,
  drugType: drugTypeReducer,
  supplier: supplierReducer,
  manufacturer: manufacturerReducer,
  appointment: appointmentReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
