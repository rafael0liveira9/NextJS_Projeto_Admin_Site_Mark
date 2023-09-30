// ** React Imports
import { createContext, useContext, useState } from "react";

export const PackagesContext = createContext({
  status: null,
  returnStatus: null,
  clientChoice: null,
  setClientChoice: null,
  newClient: null,
  setNewClient: null,
  checkCustom: null,
  setCheckCustom: null,
  checkPaywall: null,
  setCheckPaywall: null,
  finalClientData: null,
  setFinalClientData: null,
  isCreditCard: null,
  setIsCreditCard: null

});

export const PackagesProvider = ({ children }) => {
  const [checkCustom, setCheckCustom] = useState(false);
  const [isCreditCard, setIsCreditCard] = useState(true);
  const [checkPaywall, setCheckPaywall] = useState(false);
  const [finalClientData, setFinalClientData] = useState({
    clientName: "",
    document: "",
    email: "",
    company: 0,
    packageId: 0,
    packageName: "",
    packageType: "",
    services: [],
    totalValue: 0,
    maxInstallments: 0,
    ccName: "",
    ccExpiry: 0,
    ccNumber: 0,
    ccCode: 0,
  });

  const [clientChoice, setClientChoice] = useState({
    packageType: "",
    packageId: 0,
    packageName: "",
    totalValue: 0,
    maxInstallments: 0,
    services: {},
  });

  const [newClient, setNewClient] = useState({
    name: "",
    document: "",
    documentType: "",
    email: "",
    phone: null,
  });

  const status = {
    logo: [
      "Aguardando Briefing",
      "Briefing Recebido",
      "Em Criação",
      "Aguardando Retorno do Usuário",
      "Provas Recusadas",
      "Provas Aprovadas",
      "Aguardando Arquivos",
      "Serviço Concluido",
    ],
    social: [
      "Aguardando Briefing",
      "Briefing Recebido",
      "Em Criação",
      "Aguardando Retorno do Usuário",
      "Provas Recusadas",
      "Provas Aprovadas",
      "Aguardando Arquivos",
      "Arquivos Enviados",
      "Reprovado",
      "Mudar para Em Publicação",
      "Mudar para Publicado",
      "Publicado",
    ],
    site: [
      "Aguardando Briefing",
      "Briefing Recebido",
      "Em Planejamento",
      "Em Definição",
      "Proposta enviada",
      "Esperando Aprovação",
      "Reprovado",
      "Aprovado",
      "Aguardando Publicação",
      "Publicado",
    ],
  };

  function returnStatus(data, value) {
    return status[data][value - 1];
  }

  const values = {
    status,
    returnStatus,
    clientChoice,
    setClientChoice,
    newClient,
    setNewClient,
    checkCustom,
    setCheckCustom,
    checkPaywall,
    setCheckPaywall,
    finalClientData,
    setFinalClientData,
    isCreditCard,
    setIsCreditCard,
  };

  return (
    <PackagesContext.Provider value={values}>
      {children}
    </PackagesContext.Provider>
  );
};

// custom hook to use the authUserContext and access authUser and loading
export const PackagesHooks = () => useContext(PackagesContext);
