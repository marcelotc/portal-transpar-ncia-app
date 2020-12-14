import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import api from '../services/api';

/*nesse arquivo é onde mostramos os detalhes da viagem do usuário, o useEffect serve como
    um ciclo de vida do componente, nesse caso quando o componente for renderizado na tela a função
     loadTrips() será chamada, setamos também um estado de loading como true antes da
        requisição ser feita e false quando ela terminar,*/

function TripScreenDetail({ route }) {
/* Pegamos como prop o route, na tela tripScreen utlizamos o
   navigate do react navigation para passar o cpf como query param na requsição
    */

    const [loading, setLoading] = useState(false);
    const [tripDetail, setTripDetail] = useState([]);


    useEffect(() => {
        setLoading(true)

        async function loadTrips() {

            setLoading(true)
            const { data } = await api.get('api-de-dados/viagens-por-cpf', {
                headers: {
                    'chave-api-dados': '7a4820bdd1eb922a556121f3d7a8e582'
                },
                params: {
                    cpf: route.params.cpf,
                    pagina: 1
                }

            })

            setTripDetail(data)//passamos os datos trazidos da requsição para o estado de tripDetail para que na linha 51 possamos fazer o map com as informações que precisamos
            setLoading(false)

        }

        loadTrips()
    }, [])

    return (
        <View>
            {!loading ? (
                <ScrollView>
                    {tripDetail && tripDetail.map((trip,i) => (
                        <>
                            {i === 0 ? <Text style={[styles.text, {color: 'black', fontWeight: 'bold', textAlign: 'center', margin: 30}]}>{trip.pessoa.nome}</Text> : <></>}

                            <View key={trip.id} style={styles.items}>
                                <Text style={[styles.text, {color: 'black',backgroundColor: 'white', fontSize: 20, fontWeight: 'bold', marginBottom: 10, padding: 20}]}>Motivo: {trip.dimViagem.motivo}</Text>
                                <Text style={styles.text}>dataInicioAfastamento: {trip.dataInicioAfastamento}</Text>
                                <Text style={styles.text}>dataFimAfastamento: {trip.dataFimAfastamento}</Text>
                                <Text style={styles.text}>valorTotalRestituicao: {trip.valorTotalRestituicao}</Text>
                                <Text style={styles.text}>valorTotalTaxaAgenciamento: {trip.valorTotalTaxaAgenciamento}</Text>
                            </View>
                        </>
                    ))}
                </ScrollView>
            )
            : (<Text>Carregando...</Text>)
}
        </View>
    );
}

export default TripScreenDetail;

const styles = StyleSheet.create({
    items: {
        margin: 10,
        padding: 10,
        backgroundColor: '#000',
    },
    text: {
        color: '#fff',
        fontSize: 20
    }
})