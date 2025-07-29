import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SplashScreen from './Starting/SplashScreen';
import GetStarted from './Starting/GetStarted';
import Home from './Screens/Home';
import SelectCity from "./Screens/SelectCity";
import SelectApartment from "./Screens/SelectApartment";
import FlatRegistration from "./Screens/FlatRegistration";
import Dashboard from "./Society/Dashboard";
import PollsScreen from "./Society/Features/PollsScreen";
import MembersScreen from "./Society/Features/MembersScreen";
import VisitorsScreen from "./Society/Features/VisitorsScreen";
import Expense from "./Society/Features/Expense"; 
import Maintenance from "./Society/Features/Maintenance"; 
import Shopping from "./Society/Features/Shopping";
import ServiceProviderScreen from "./Society/Features/ServiceProvider";
import NoticeBoard from "./Society/Features/NoticeBoard";
import Parking from "./Society/Features/Parking";
import Complaints from "./Society/Features/Complaints";
const Stack = createNativeStackNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Splash" screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Splash" component={SplashScreen} />
                <Stack.Screen name="GetStarted" component={GetStarted} />
                <Stack.Screen name="Home" component={Home} />
                <Stack.Screen name="SelectCity" component={SelectCity} />
                <Stack.Screen name="SelectApartment" component={SelectApartment} />
                <Stack.Screen name="FlatRegistration" component={FlatRegistration} />
                <Stack.Screen name="Dashboard" component={Dashboard} />
                <Stack.Screen name="Members" component={MembersScreen} />
                <Stack.Screen name="PollsScreen" component={PollsScreen} />
                <Stack.Screen name="VisitorsScreen" component={VisitorsScreen} />
                <Stack.Screen name="Maintenance" component={Maintenance} />
                <Stack.Screen name="Shopping" component={Shopping} />
                <Stack.Screen name="Expense" component={Expense} />
                <Stack.Screen name="NoticeBoard" component={NoticeBoard} />
                <Stack.Screen name="Parking" component={Parking} />
                <Stack.Screen name="Complaints" component={Complaints} />
                <Stack.Screen name="ServiceProvider" component={ServiceProviderScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
