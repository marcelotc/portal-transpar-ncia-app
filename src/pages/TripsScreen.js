import React from 'react';
import { View, Text, Button } from 'react-native';

function HomeScreen({ navigation }) {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Viagens</Text>
            <Button
                title="Siafi"
                onPress={() => navigation.navigate('Siafi')}
            />
        </View>
    );
}

export default HomeScreen;