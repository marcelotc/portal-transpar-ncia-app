import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const AppStack = createStackNavigator();

import Siafi from './pages/SiafiScreen';
import Trip from './pages/TripsScreen';
import TripDetail from './pages/TripScreenDetail';

export default function Routes() {
    return (
        <NavigationContainer>
            <AppStack.Navigator screenOptions={{ headerShown: true }}>
                <AppStack.Screen name="Siafi" component={Siafi} />
                <AppStack.Screen name="Viagens" component={Trip} />
                <AppStack.Screen name="ViagensDetalhe" component={TripDetail} />
            </AppStack.Navigator>
        </NavigationContainer>
    );
}