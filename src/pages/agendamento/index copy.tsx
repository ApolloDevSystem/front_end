import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView, SafeAreaView } from "react-native";
import Header from "../../components/header";
import Input from "../../components/Input";
import Button from "../../components/Button";
import DatePicker from "../../components/date-picker";
import TimePicker from "../../components/time-picker";
import AgendamentoModal from "../../components/agendamento-modal";
import CheckboxList from "../../components/checkbox-list";
import AutocompleteDropdownInput from "../../components/autocomplete-input";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../pages/types";
import { createData, fetchData } from "../../services/api";

const Agendamento: React.FC = () => {
  type NavigationProps = StackNavigationProp<RootStackParamList, "AgendamentoScreen">;
  const navigation = useNavigation<NavigationProps>();

  const [step, setStep] = useState(1);
  const [modalVisible, setModalVisible] = useState(false);

  const [formData, setFormData] = useState({
    cliente: "",
    endereco: "",
    linkGoogleMaps: "",
    data: "",
    horario: "",
    servicos: {
      instalacao: false,
      limpeza: false,
      manutencaoEletrica: false,
    },
  });

  // Carregar dados para autocomplete
  const [todosClientes, setTodosClientes] = useState<string[]>([]);
  const [todosEnderecos, setTodosEnderecos] = useState<string[]>([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const clientesData = await fetchData("clientes");
        const enderecosData = await fetchData("enderecos");

        setTodosClientes(clientesData.map((c: any) => c.nome));
        setTodosEnderecos(enderecosData.map((e: any) => e.logradouro));
      } catch (error) {
        console.error("Erro ao carregar dados:", error);
      }
    };
    
    loadData();
  }, []);

  const handleNext = () => {
    if (step === 1) setStep(2);
    else setModalVisible(true);
  };

  const handleSubmit = async () => {
    try {
      const response = await createData("agendamentos", formData);
      console.log("Dados enviados com sucesso:", response);
      navigation.navigate("Home");
    } catch (error) {
      console.error("Erro ao enviar os dados:", error);
    }
  };

 

  const serviceOptions = [
    { label: "Instalação", value: "instalacao" },
    { label: "Limpeza", value: "limpeza" },
    { label: "Manutenção Elétrica", value: "manutencaoEletrica" },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>AGENDAMENTO</Text>
        <Text style={styles.pageIndicator}>Página {step} de 2</Text>

        {step === 1 ? (
          <View style={styles.form}>
            <AutocompleteDropdownInput
              label="Cliente:"
              placeholder="Digite o nome do cliente"
              value={formData.cliente}
              onChangeText={(text) => setFormData(prev => ({...prev, cliente: text}))}
              suggestions={todosClientes}
              onSelectSuggestion={(sugestao) => setFormData(prev => ({...prev, cliente: sugestao}))}
            />
            
            <AutocompleteDropdownInput
              label="Endereço:"
              placeholder="Digite o endereço do cliente"
              value={formData.endereco}
              onChangeText={(text) => setFormData(prev => ({...prev, endereco: text}))}
              suggestions={todosEnderecos}
              onSelectSuggestion={(sugestao) => setFormData(prev => ({...prev, endereco: sugestao}))}
            />
            <Input
              label="Link Google Maps:"
              placeholder="Insira o link do Google Maps"
              value={formData.linkGoogleMaps}
              onChangeText={(text) =>
                setFormData({ ...formData, linkGoogleMaps: text })
              }
              labelColor="#142952"
            />
            <Text style={styles.label}>Data:</Text>
            <DatePicker
              selectedDate={formData.data}
              onDateSelect={(date: string) =>
                setFormData({ ...formData, data: date })
              }
            />
            <Text style={styles.label}>Horário:</Text>
            <TimePicker
              selectedTime={formData.horario}
              onTimeSelect={(time) =>
                setFormData({ ...formData, horario: time })
              }
            />
          </View>
        ) : (
          <View style={styles.form}>
            <Text style={styles.label}>Serviços:</Text>
            <CheckboxList
              options={serviceOptions}
              selectedValues={Object.entries(formData.servicos)
                .filter(([, isSelected]) => isSelected)
                .map(([key]) => key)}
              onChange={(selected) =>
                setFormData((prev) => ({
                  ...prev,
                  servicos: {
                    instalacao: selected.includes("instalacao"),
                    limpeza: selected.includes("limpeza"),
                    manutencaoEletrica: selected.includes("manutencaoEletrica"),
                  },
                }))
              }
            />
          </View>
        )}
      </ScrollView>
      <View style={styles.buttonContainer}>
        <Button title={step === 1 ? "Próximo" : "Confirmar"} onPress={handleNext} />
      </View>

      <AgendamentoModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onConfirm={() => {
          setModalVisible(false);
          console.log("Enviando dados ao backend", formData);
          handleSubmit();
        }}
        formData={formData}
        serviceOptions={serviceOptions}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F5F5F5" },
  scrollContent: { paddingBottom: 80, padding: 20 },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    color: "#142952",
    marginVertical: 20,
  },
  pageIndicator: { textAlign: "right", color: "#7A869A", marginBottom: 15 },
  form: {
    marginBottom: 20,
    borderWidth: 1,
    borderRadius: 15,
    borderColor: "rgba(199, 199, 200, 0.678)",
    padding: 20,
  },
  label: { fontSize: 16, fontWeight: "bold", marginBottom: 5, color: "#142952" },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    padding: 20,
  },
});

export default Agendamento;
