import { Routes } from "./src/routes";
import DateProvider from "./src/context/auth";
import { NavigationContainer } from "@react-navigation/native";

export default function App() {
    return(
        <DateProvider>
            <NavigationContainer>
                <Routes/>
            </NavigationContainer>
        </DateProvider>
    )
}
