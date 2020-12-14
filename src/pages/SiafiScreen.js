import React, { useState } from 'react';
import { Text, Button, StyleSheet } from 'react-native';
import { TextInput, ScrollView } from 'react-native-gesture-handler';
import Pagination from '../components/Pagination';
import Siafis from '../components/Siafis';
import api from '../services/api';

function SiafiScreen({ navigation }) {
    const [descricao, setDescricao] = useState("");

    const [siafis, setSiafis] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);

        async function loadSiafis() {
            setLoading(true);
            const { data } = await api.get('api-de-dados/orgaos-siafi', {
                headers: {
                    'chave-api-dados': '7a4820bdd1eb922a556121f3d7a8e582'
                },
                params: {
                    descricao: descricao,
                    pagina: 1
                }
                
            })

            setSiafis(data)
            setLoading(false);

        }

    const indexOfLastPost = currentPage * itemsPerPage;
    const indexOfFirstPost = indexOfLastPost - itemsPerPage;
    const currentSiafis = siafis.slice(indexOfFirstPost, indexOfLastPost);

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
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
                value={descricao}
                onChangeText={setDescricao}
            ></TextInput>
            <Button title="Buscar" onPress={() => loadSiafis() }/>
            <Siafis navigation={navigation} siafis={currentSiafis} loading={loading}></Siafis>
            <Pagination itemsPerPage={itemsPerPage} totalPosts={siafis.length} paginate={paginate}></Pagination>
        </ScrollView>
    );
}

export default SiafiScreen;

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