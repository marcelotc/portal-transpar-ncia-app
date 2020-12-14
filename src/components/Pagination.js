import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';


function Pagination({ itemsPerPage, totalPosts, paginate }) {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalPosts / itemsPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <View>
            <View style={styles.container}>
                {pageNumbers.map(number => (
                    <View style={styles.numbersContainer} key={number}>
                        <TouchableOpacity key={number} onPress={() => paginate(number)}>
                            <Text key={number} style={styles.numbers}>{number}</Text>
                        </TouchableOpacity>
                    </View>
                ))}
            </View>
        </View>
    );
}

export default Pagination;  

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
    },
    numbersContainer: {
        margin: 10,
        padding: 10,
        backgroundColor: 'red'
    },
    numbers: {
        color: '#fff'
    }
})