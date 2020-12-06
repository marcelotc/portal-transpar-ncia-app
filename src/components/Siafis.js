import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

export default function Siafis({ navigation, siafis, loading }) {
    if (loading) {
        return <Text>Carregando...</Text>
    }

    return (
        <View>
            {siafis.map(siafi => (<View style={styles.container} key={siafi.codigo}>
                <TouchableOpacity onPress={() => navigation.navigate('Viagens', {
                    codigo: siafi.codigo,
                    descricao: siafi.descricao,
                })} key={siafi.codigo}><Text style={styles.items}>{siafi.codigoDescricaoFormatado}</Text></TouchableOpacity>
            </View>))}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    items: {
        margin: 10,
        padding: 10,
        backgroundColor: '#000',
        color: '#fff'
    }
})