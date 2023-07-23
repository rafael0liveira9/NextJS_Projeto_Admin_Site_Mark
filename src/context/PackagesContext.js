// ** React Imports
import { createContext, useContext } from 'react'

export const PackagesContext = createContext({

})

export const PackagesProvider = ({ children }) => {
    const auth = useFirebaseAuth()

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
        ]
    }
    function returnStatus(data, value) {
        return status[data][value - 1]
    }

    const values = {
        status,
        returnStatus
    }

    return <PackagesContext.Provider value={values}>{children}</PackagesContext.Provider>
}

// custom hook to use the authUserContext and access authUser and loading
export const PackagesHooks = () => useContext(PackagesContext)