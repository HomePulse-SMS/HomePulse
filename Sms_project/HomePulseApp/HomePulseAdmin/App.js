import React from 'react';
import SocietyActions from "./Screens/SocietyActions";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AddLocation from "./Screens/AddLocation";

const Stack = createNativeStackNavigator();

const App = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Home">
                <Stack.Screen name="Home" component={SocietyActions} />
                <Stack.Screen name="AddLocation" component={AddLocation} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default App;
