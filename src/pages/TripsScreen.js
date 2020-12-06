import React, {useState, useEffect} from 'react';
import { View, Text, Button, StyleSheet, TextInput } from 'react-native';
import api from '../services/api';
import { ScrollView } from 'react-native-gesture-handler';

function HomeScreen({ navigation, route }) {
    const [dataIdaDe, setDataIdaDe] = useState();
    const [dataIdaAte, setDataIdaAte] = useState();
    const [dataRetornoDe, setDataRetornoDe] = useState();
    const [dataRetornoAte, setDataRetornoAte] = useState();

    const [trips, setTrips] = useState([]);
    const [loading, setLoading] = useState(false);

        async function loadTrips() {

            setLoading(true)
            const { data } = await api.get('api-de-dados/viagens', {
                headers: {
                    'chave-api-dados': '7a4820bdd1eb922a556121f3d7a8e582'
                },
                params: {
                    dataIdaDe: dataIdaDe,
                    dataIdaAte: dataIdaAte,
                    dataRetornoDe: dataRetornoDe,
                    dataRetornoAte: dataRetornoAte,
                    codigoOrgao: route.params.codigo,
                    pagina: 1
                }

            })

            setTrips(data)
            setLoading(false)

        }

    let tripsTotal = trips.reduce(function (tot, arr) {
        return tot + arr.valorTotalViagem;
    }, 0);

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>

            <TextInput
                autoCapitalize="none"
                autoCorrect={false}
                placeholder="Data ida de"
                placeholderTextColor="#999"
                style={styles.input}
                value={dataIdaDe}
                onChangeText={setDataIdaDe}
            ></TextInput>

            <TextInput
                autoCapitalize="none"
                autoCorrect={false}
                placeholder="Data ida até"
                placeholderTextColor="#999"
                style={styles.input}
                value={dataIdaAte}
                onChangeText={setDataIdaAte}
            ></TextInput>

            <TextInput
                autoCapitalize="none"
                autoCorrect={false}
                placeholder="Data retorno de"
                placeholderTextColor="#999"
                style={styles.input}
                value={dataRetornoDe}
                onChangeText={setDataRetornoDe}
            ></TextInput>

            <TextInput
                autoCapitalize="none"
                autoCorrect={false}
                placeholder="Data retorno até"
                placeholderTextColor="#999"
                style={styles.input}
                value={dataRetornoAte}
                onChangeText={setDataRetornoAte}
            ></TextInput>

            {!loading ? (
                <>
                <Text style={styles.tripTotal}>Total gasto em viagens: R$ {tripsTotal}</Text>
                <ScrollView>
                    {trips && trips.map(trip => (
                        <View key={trip.id} style={styles.items}>
                            <Text style={styles.text}>{trip.pessoa.nome}</Text>
                            <Text style={styles.text}>dataInicioAfastamento: {trip.dataInicioAfastamento}</Text>
                            <Text style={styles.text}>dataFimAfastamento: {trip.dataFimAfastamento}</Text>
                        </View>
                    ))}
            </ScrollView>
            </>
            ) : (<Text>Carregando...</Text>)}

            <Button
                title="Mostrar Viagens"
                onPress={() => loadTrips()}
            />
        </View>
    );
}

export default HomeScreen;

const styles = StyleSheet.create({
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
    },
    inputIdaError: {
        height: 46,
        alignSelf: 'stretch',
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: 'red',
        borderRadius: 4,
        marginTop: 20,
        paddingHorizontal: 15,
        width: 200,
        alignSelf: "center"
    },
    tripTotal: {
        margin: 10,
        padding: 10,
        color: '#000',
        fontSize: 15,
        textAlign: "center"
    },
    items: {
        margin: 10,
        padding: 10,
        backgroundColor: '#000',
    },
    text: {
        color: '#fff'
    }
})