import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { TextInput, ScrollView } from 'react-native-gesture-handler';
import api from '../services/api';

function DetailsScreen({ navigation }) {
    const [siafi, setSiafi] = useState();
    const [desciption, setDesciption] = useState("");

    console.log('desciption', desciption)

        async function loadUsers() {
            const { data } = await api.get('api-de-dados/orgaos-siafi', {
                headers: {
                    'chave-api-dados': '620a40c59df35d7116c66de808294fba'
                },
                descricao: desciption,
                pagina: 1
            })

            setSiafi(data)

        }

    return (
        <ScrollView>
            <Text style={styles.title}>Orgãos SIAFI</Text>
            
            <TextInput
                autoCapitalize="none"
                autoCorrect={false}
                placeholder="Digite o nome do orgão"
                placeholderTextColor="#999"
                style={styles.input}
                value={desciption}
                onChangeText={setDesciption}
            ></TextInput>
            <Button title="Buscar" onPress={() => loadUsers() }/>
            <Button title="Viagens" onPress={() => navigation.navigate('Trip')} />

            {siafi && siafi.map((data) => (
                <>
                    <Text>Código: {data.codigo}</Text>
                    <Text>Código: {data.codigoDescricaoFormatado}</Text>
                    <Text>Código: {data.descricao}</Text>
                </>
            ))}
        </ScrollView>
    );
}

export default DetailsScreen;

const styles = StyleSheet.create({
    title: {
        fontSize: 50,
        textAlign: "center"
    },
    input: {
        height: 46,
        alignSelf: 'stretch',
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 4,
        marginTop: 20,
        paddingHorizontal: 15,
        width: 200,
        alignSelf: "center"
    }
})