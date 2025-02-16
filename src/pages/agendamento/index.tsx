import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import Header from '../../components/header';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { useNavigation } from '@react-navigation/native';

const Agendamento: React.FC = () => {
  const navigation = useNavigation();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    cliente: '',
    endereco: '',
    linkGoogleMaps: '',
    data: '',
    horario: '',
    servicos: {
      instalacao: false,
      limpeza: false,
      manutencaoEletrica: false,
    },
  });

  const handleNext = () => {
    if (step === 1) setStep(2);
    //else navigation.navigate('ResumoAgendamento'); // Ajuste para sua estrutura de navegação
  };

  const toggleServico = (servico: keyof typeof formData.servicos) => {
    setFormData((prev) => ({
      ...prev,
      servicos: {
        ...prev.servicos,
        [servico]: !prev.servicos[servico],
      },
    }));
  };

  return (
    <ScrollView style={styles.container}>
      <Header />
      <Text style={styles.title}>AGENDAMENTO</Text>
      <Text style={styles.pageIndicator}>Página {step} de 2</Text>

      {step === 1 ? (
        <View style={styles.form}>
          <Input label="Cliente:" placeholder="Digite o nome do cliente" value={formData.cliente} onChangeText={(text) => setFormData({ ...formData, cliente: text })} />
          <Input label="Endereço:" placeholder="Digite o endereço do cliente" value={formData.endereco} onChangeText={(text) => setFormData({ ...formData, endereco: text })} />
          <Input label="Link Google Maps:" placeholder="Insira o link do Google Maps" value={formData.linkGoogleMaps} onChangeText={(text) => setFormData({ ...formData, linkGoogleMaps: text })} />
          <Input label="Data:" placeholder="MM/DD/YYYY" value={formData.data} onChangeText={(text) => setFormData({ ...formData, data: text })} />
          <Input label="Horário:" placeholder="HH:MM" value={formData.horario} onChangeText={(text) => setFormData({ ...formData, horario: text })} />
        </View>
      ) : (
        <View style={styles.form}>
          <Text style={styles.label}>Serviços:</Text>
          {['INSTALAÇÃO', 'LIMPEZA', 'MANUTENÇÃO ELÉTRICA'].map((servico, index) => {
            const key = servico.toLowerCase().replace(' ', '') as keyof typeof formData.servicos;
            return (
              <View key={index} style={styles.checkboxContainer}>
                <Text style={styles.checkboxLabel}>{servico}</Text>
                <Text style={styles.checkbox} onPress={() => toggleServico(key)}>
                  {formData.servicos[key] ? '✔️' : '⬜'}
                </Text>
              </View>
            );
          })}
        </View>
      )}

      <Button title="Próximo" onPress={handleNext} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#142952',
    marginVertical: 20,
  },
  pageIndicator: {
    textAlign: 'center',
    color: '#7A869A',
    marginBottom: 15,
  },
  form: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#142952',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
  checkboxLabel: {
    fontSize: 16,
    color: '#142952',
  },
  checkbox: {
    fontSize: 18,
    padding: 5,
  },
});

export default Agendamento;
