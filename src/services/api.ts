import axios from 'axios';

const api = axios.create({
  baseURL: 'http://192.168.0.108:8000/api',
});

const buildEndpoint = (endpoint: string, id?: string) => {
  return id ? `${endpoint}/${id}` : endpoint;
};

export const fetchData = async (endpoint: string) => {
  try {
    const response = await api.get(buildEndpoint(endpoint));
    return response.data;
  } catch (error) {
    console.error(`Erro ao buscar dados do endpoint ${endpoint}:`, error);
    throw error;
  }
};

export const fetchDataById = async (endpoint: string, id: string) => {
  try {
    const response = await api.get(buildEndpoint(endpoint, id));
    return response.data;
  } catch (error) {
    console.error(`Erro ao buscar dados do endpoint ${endpoint} com id ${id}:`, error);
    throw error;
  }
};

export const createData = async (endpoint: string, data: unknown) => {
  try {
    const response = await api.post(buildEndpoint(endpoint), data);
    return response.data;
  } catch (error) {
    console.error(`Erro ao criar dados no endpoint ${endpoint}:`, error);
    throw error;
  }
};

// troquei any para unknown, 0% de confiança
export const updateData = async (endpoint: string, id: string, data: unknown) => {
  try {
    const response = await api.put(buildEndpoint(endpoint, id), data);
    return response.data;
  } catch (error) {
    console.error(`Erro ao atualizar dados no endpoint ${endpoint} com id ${id}:`, error);
    throw error;
  }
};

export const deleteData = async (endpoint: string, id: string) => {
  try {
    await api.delete(buildEndpoint(endpoint, id));
  } catch (error) {
    console.error(`Erro ao deletar dados no endpoint ${endpoint} com id ${id}:`, error);
    throw error;
  }
};