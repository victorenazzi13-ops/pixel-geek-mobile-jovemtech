import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Image
} from 'react-native';

export default function HomeScreen({ navigation }) {
    return (
        <View style={styles.container}>

            <Image
                source={require('../assets/logo.png')}
                style={styles.logo}
            />

            <Text style={styles.titulo}>
                Pixel Geek
            </Text>

            <Text style={styles.subtitulo}>
                Seu universo de tecnologia e cultura geek
            </Text>


            <TouchableOpacity
                style={styles.botao}
                onPress={() => navigation.navigate('Clientes')}
            >
                <Text style={styles.textoBotao}>
                    🤖 Clientes
                </Text>
            </TouchableOpacity>


            <TouchableOpacity
                style={styles.botao}
                onPress={() => navigation.navigate('Curriculos')}
            >
                <Text style={styles.textoBotao}>
                    💻 Currículos
                </Text>
            </TouchableOpacity>

        </View>
    );
}


const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#0f172a',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 25,
    },


    logo: {
        width: 180,
        height: 180,
        resizeMode: 'contain',
        marginBottom: 10,
    },


    titulo: {
        fontSize: 35,
        fontWeight: '900',
        color: '#facc15',
        marginBottom: 10,
    },


    subtitulo: {
        color: '#cbd5e1',
        textAlign: 'center',
        fontSize: 16,
        marginBottom: 40,
    },


    botao: {
        width: '90%',
        maxWidth: 300,
        backgroundColor: '#1e293b',
        padding: 15,
        borderRadius: 999,
        borderWidth: 1,
        borderColor: '#7c3aed',
        marginBottom: 15,
    },


    textoBotao: {
        color: '#f8fafc',
        textAlign: 'center',
        fontSize: 17,
        fontWeight: 'bold',
    }

});