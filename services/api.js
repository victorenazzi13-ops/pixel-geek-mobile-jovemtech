function renderCliente({ item }) {
    return (
        <View style={styles.cardCliente}>
            <Text style={styles.nomeCliente}>{item.nome}</Text>

            <Text style={styles.info}>🐻‍❄️ {item.email}</Text>
            <Text style={styles.info}>📞 {item.telefone}</Text>

            <View style={styles.areaBotoes}>
                <TouchableOpacity
                    style={styles.botaoEditar}
                    onPress={() => editarCliente(item)}
                >
                    <Text style={styles.textoBotao}>Editar</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.botaoExcluir}
                    onPress={() => excluirCliente(item.id)}
                >
                    <Text style={styles.textoBotao}>Excluir</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

return (
    <ScrollView style={styles.container}>
        <Text style={styles.titulo}>Cadastro de Clientes</Text>

        <View style={styles.formulario}>
            <TextInput
                style={styles.input}
                placeholder="Nome"
                value={nome}
                onChangeText={setNome}
            />

            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
            />

            <TextInput
                style={styles.input}
                placeholder="Telefone"
                value={telefone}
                onChangeText={setTelefone}
            />

            (!modoEdicao ? (
                <TouchableOpacity style={styles.botaoSalvar} onPress={salvarCliente}>
                    <Text style={styles.textoBotao}>Salvar</Text>
                </TouchableOpacity>

            ) : null)

            <TouchableOpacity style={styles.botaoAtualizar} onPress={atualizarCliente}>
                <Text style={styles.textoBotao}>Atualizar</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.botaoCancelar} onPress={limparFormulario}>
                <Text style={styles.textoBotao}>Cancelar</Text>
            </TouchableOpacity>

        </View>

        <Text style={styles.subtitulo}>Clientes Cadastrados</Text>
        <Flatlist
            data={clientes}
            renderItem={renderCliente}
            keyExtractor={(item) => item.id.toString()}

            scrollEnabled={false}
        />

    </ScrollView>
);

// jp parou aqui

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1f6786',
    },
    titulo: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#fff',
        textAlign: 'center',
        marginTop: 20,
    },
    formulario: {
        backgroundColor: '#fff',
        margin: 20,
        padding: 20,
        borderRadius: 15,
        elevation: 5,
   },

    input: {
        borderWidth: 1,
        borderColor: '#d1c4e9',
        borderRadius: 10,
        padding: 12,
        marginBottom: 15,
        backgroundColor: '#f3e5f5',
    },
    
    botaoAtualizar: {
        backgroundColor: '#4caf50',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginBottom: 10,
    },

    botaoCancelar: {
        backgroundColor: '#f44336',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
    },

    textoBotao: {
        color: '#fff',
        fontWeight: 'bold',
    },

    subtitulo: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#21417d',
        marginHorizontal: 20,
        marginBottom: 10,
     },

     cardCliente: {
        backgroundColor: '#fff',
        marginHorizontal: 20,
        marginBottom: 10,
        padding: 15,
        borderRadius: 15,
        elevation: 3,
    },

    nomeCliente: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 5,
    },

    info: {
        color: '#555',
        marginBottom: 3,
    },

    areaBotoes: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 12,
    },

    botaoEditar: {
        backgroundColor: '#2196f3',
        flex: 1,
        padding: 10,
        borderRadius: 10,
        marginRight: 5,
        alignItems: 'center',        
    },

    botaoExcluir: {
        backgroundColor: '#f44336',
        flex: 1,
        padding: 12,
        borderRadius: 10,
        marginLeft: 5,
        alignItems: 'center',
    },
});