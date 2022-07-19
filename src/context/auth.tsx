import React, { createContext, useState } from 'react';

export const DateContext = createContext({});

function DateProvider({children}){

    const [date, setDate] = useState({});

    function armazenarData(mes:number, ano:number){
        setDate({
            mes: mes,
            ano: ano
        })
    }

    return(
        <DateContext.Provider value={{armazenarData, date}}>
            {children}
        </DateContext.Provider>
    )
}

export default DateProvider;