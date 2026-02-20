import { createContext, useContext, useState } from "react";

const PremiumContext = createContext();

export const PremiumProvider = ({ children }) => {
    const [premiumSelected, setPremiumSelected] = useState([]);

    return (
        <PremiumContext.Provider value={{ premiumSelected, setPremiumSelected }}>
            {children}
        </PremiumContext.Provider>
    );
};

export const usePremium = () => useContext(PremiumContext);