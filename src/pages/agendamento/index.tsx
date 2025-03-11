import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView, SafeAreaView } from "react-native";
import Header from "../../components/headerSecondary";
import Input from "../../components/Input";
import Button from "../../components/Button";
import DatePicker from "../../components/date-picker";
import TimePicker from "../../components/time-picker";
import AgendamentoModal from "../../components/agendamento-modal";
import Select from "../../components/select";
import colors from "../../components/colors";
import Item from "../../components/item";
import { fetchData, createData } from "../../services/api";
import { AgendamentoScreenProps, cliente, endereco, servico } from "../../pages/types";


interface FormData {
  cliente: cliente;
  endereco: endereco;
  linkGoogleMaps: string;
  data: string;
  horario: string;
  servicos: servico[];
}

const Agendamento: React.FC<AgendamentoScreenProps> = ({ navigation }) => {
  const [step, setStep] = useState(1);
  const [modalVisible, setModalVisible] = useState(false);
  const [clientes, setClientes] = useState<cliente[]>([]);
  const [enderecos, setEnderecos] = useState<endereco[]>([]);
  const [servicos, setServicos] = useState<servico[]>([]);
  const [selectedTasks, setSelectedTasks] = useState<
    { id: number; quantidade: number; customPrice?: number; preco?: number }[]
  >([]);

  // Estado do formulário com tipos corretos
  const [formData, setFormData] = useState<FormData>({
    cliente: {} as cliente,
    endereco: {} as endereco,
    linkGoogleMaps: "",
    data: "",
    horario: "",
    servicos: [],
  });

  useEffect(() => {
    const loadData = async () => {
      try {
        const clientesData = await fetchData("clientes");
        const enderecosData = await fetchData("enderecos");
        setClientes(clientesData);
        setEnderecos(enderecosData);
      } catch (error) {
        console.error("Erro ao carregar dados:", error);
      }
    };

    loadData();
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const response = await fetchData("servicos");
      const servicosData = response.map((servico: any) => ({
        ...servico,
        descricao: servico.descricao || "",
      }));
      setServicos(servicosData);
    } catch (error) {
      console.error("Erro ao buscar serviços:", error);
    }
  };

  const handleNext = () => {
    if (step === 1) setStep(2);
    else setModalVisible(true);
  };

  const handleSubmit = async () => {
    try {
      if (!formData.cliente || !formData.endereco) {
        console.error("Cliente e endereço são obrigatórios.");
        return;
      }

      const response = await createData("agendamentos", formData);
      console.log("Dados enviados com sucesso:", response);
      navigation.navigate("Home");
    } catch (error) {
      console.error("Erro ao enviar os dados:", error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header navigation={navigation} />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>AGENDAMENTO</Text>
        <Text style={styles.pageIndicator}>Página {step} de 2</Text>

        {step === 1 ? (
          <View style={styles.form}>
            {/* Seleção de Cliente */}
            <View style={styles.autocompleteContainer}>
              <Select
                label="Cliente"
                objeto={clientes}
                keyLabel="nome"
                keyPost="id"
                selectedValue={formData.cliente?.id || ""}
                onValueChange={(id) =>
                  setFormData({
                    ...formData,
                    cliente: clientes.find((c) => c.id === id) || ({} as cliente),
                  })
                }
              />
            </View>

            {/* Seleção de Endereço */}
            <View style={styles.autocompleteContainer}>
              <Select
                label="Endereço"
                objeto={enderecos}
                keyLabel="logradouro"
                keyPost="id"
                selectedValue={formData.endereco?.id || ""}
                onValueChange={(id) =>
                  setFormData({
                    ...formData,
                    endereco: enderecos.find((e) => e.id === id) || ({} as endereco),
                  })
                }
              />
            </View>

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
              onDateSelect={(date) => setFormData({ ...formData, data: date })}
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
            {servicos.map((task) => (
              <Item
                key={task.id}
                task={task}
                selectedItems={selectedTasks}
                setSelectedItems={setSelectedTasks}
              />
            ))}
          </View>
        )}

        <View style={styles.buttonContainer}>
          <Button
            title={step === 1 ? "Próximo" : "Confirmar"}
            onPress={handleNext}
          />
        </View>

        <AgendamentoModal
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
          onConfirm={() => {
            setModalVisible(false);
            handleSubmit();
          }}
          formData={formData}
          serviceOptions={servicos}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f0f0f0" },
  scrollContent: { paddingBottom: 80, padding: 20 },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    color: "#142952",
  },
  pageIndicator: { textAlign: "right", color: "#7A869A", marginBottom: 15 },
  form: {
    borderRadius: 15,
    backgroundColor: "#FFFFFF",
    padding: 20,
    shadowColor: colors.text,
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  label: { fontSize: 16, fontWeight: "bold", color: "#142952" },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    padding: 20,
  },
  autocompleteContainer: {
    marginBottom: 15,
    zIndex: 1,
  },
});

export default Agendamento;
