import React from 'react';
import SocietyActions from "./Screens/SocietyActions";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const App = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Home">
                <Stack.Screen name="Home" component={SocietyActions} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default App;
