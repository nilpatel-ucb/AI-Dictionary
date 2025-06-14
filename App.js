import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { EventRegister } from "react-native-event-listeners";
import { colors } from "./config/theme";
import themeContext from "./config/themeContext";
import { createStore } from "redux";
import { Provider } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { persistStore, persistReducer } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import rootReducer from "./src/reducers";

import HomeScreen from "./screens/HomeScreen";
import VocabwordScreen from "./screens/VocabwordScreen";

const Stack = createNativeStackNavigator();

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(persistedReducer);
const persistor = persistStore(store);

export default function App() {
  // --------------------------Set colors globally around the whole app--------------------------
  const [darkMode, setDarkMode] = React.useState(false);

  React.useEffect(() => {
    const listener = EventRegister.addEventListener("ChangeTheme", (data) => {
      setDarkMode(data);
    });
    return () => {
      EventRegister.removeAllListeners(listener);
    };
  }, [darkMode]);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <themeContext.Provider
          value={darkMode === true ? colors.dark : colors.light}
        >
          <NavigationContainer>
            <Stack.Navigator>
              <Stack.Screen
                options={{ headerShown: false }}
                name="Home"
                component={HomeScreen}
              />
              <Stack.Screen
                options={{ headerShown: false }}
                name="Vocabword"
                component={VocabwordScreen}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </themeContext.Provider>
      </PersistGate>
    </Provider>
  );
}
