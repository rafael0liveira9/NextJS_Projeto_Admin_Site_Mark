// ** React Imports
import { createContext, useContext, useState } from 'react'

export const PackagesContext = createContext({
    status: null,
    returnStatus: null,
    clientChoice: null,
    setClientChoice: null
})

export const PackagesProvider = ({ children }) => {
    const [clientChoice, setClientChoice] = useState({
        packageType: "",
        packageId: 0,
        packageName: "",
        totalValue: 0,
        maxInstallments: 0,
        services: {}
    });

    const status = {
        logo: [
            "Aguardando Briefing",
            "Briefing Enviado",
            "Em Criação",
            "Provas enviadas",
            "Provas Recusadas",
            "Provas Aprovadas",
            "Aguardando Arquivos",
            "Arquivos Enviados"
        ],
        social: [
            "Aguardando Briefing",
            "Briefing Enviado",
            "Em Criação",
            "Provas enviadas",
            "Provas Recusadas",
            "Provas Aprovadas",
            "Aguardando Arquivos",
            "Arquivos Enviados"
        ],
        site: [
            "Aguardando Briefing",
            "Briefing Enviado",
            "Em Criação",
            "Provas enviadas",
            "Provas Recusadas",
            "Provas Aprovadas",
            "Aguardando Arquivos",
            "Arquivos Enviados"
        ]
    }

    function returnStatus(data, value) {
        return status[data][value - 1]
    }

    const values = {
        status,
        returnStatus,
        clientChoice,
        setClientChoice
    }

    return <PackagesContext.Provider value={values}>{children}</PackagesContext.Provider>
}

// custom hook to use the authUserContext and access authUser and loading
export const PackagesHooks = () => useContext(PackagesContext)