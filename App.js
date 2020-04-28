import React, { useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';

import { Button, TextInput } from 'react-native-paper';

export default function App() {
  const [peso, setPeso] = useState();
  const [altura, setAltura] = useState();
  const [imc, setImc] = useState();
  const [legenda, setLegenda] = useState('Indeterminado');
  const [cor, setCor] = useState('#808080');

  const handlerCalcular = () => {
    if (!peso || !altura) {
      alert('Por favor, preencha os campos necessarios!');
      setImc(0);
      setCor('#808080');
      return;
    }

    const result = peso / (altura * altura);
    const valor = Math.round(result);

    if (valor < 18.5) {
      setLegenda('Magreza');
      setCor('#26ABE3');
    } else if (valor >= 18.5 && valor < 25) {
      setLegenda('Normal');
      setCor('#259E4D');
    } else if (valor >= 25 && valor < 30) {
      setLegenda('Sobrepeso');
      setCor('#6B7F37');
    } else if (valor >= 30 && valor < 40) {
      setLegenda('Obesidade');
      setCor('#F0A91D');
    } else if (valor >= 40) {
      setLegenda('Obesidade Grave');
      setCor('#9A0000');
    }

    setImc(valor);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.textImc}>Seu IMC</Text>
      <View style={[styles.containerIndece, { backgroundColor: cor }]}>
        <Text style={styles.textValue}>{imc}</Text>
        <Text style={styles.textIndice}>{legenda}</Text>
      </View>
      <View style={styles.containerInputs}>
        <TextInput
          mode="outlined"
          style={styles.input}
          label="Informr o seu peso"
          placeholder="Informr o seu peso"
          keyboardType="numeric"
          value={peso}
          onChangeText={text => setPeso(text.replace(',', '.'))}
        />

        <TextInput
          mode="outlined"
          style={styles.input}
          label="Informr a sua Altura"
          placeholder="Informr a sua Altura"
          keyboardType="numeric"
          value={altura}
          onChangeText={text => setAltura(text.replace(',', '.'))}
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button
          mode="contained"
          style={styles.buttonCalcular}
          onPress={handlerCalcular}>
          Calcular
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginTop: 20,
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  textImc: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  containerIndece: {
    width: 330,
    height: 120,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textValue: {
    fontSize: 50,
    fontWeight: 'bold',
    color: 'white',
  },
  textIndice: {
    color: 'white',
  },
  containerInputs: {
    marginTop: 5,
  },
  input: {
    height: 60,
    width: 330,
    marginTop: 10,
    borderRadius: 8,
  },
  buttonContainer: {
    flex: 1,
    marginTop: 10,
  },
  buttonCalcular: {
    marginTop: 5,
    height: 50,
    width: 330,
    justifyContent: 'center',
  },
});
