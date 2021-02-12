import React, { useState, createContext } from 'react';


export const StateContext = createContext();

export default function StateContextProvider(props) {
  const [selectTask, setSelectTask] = useState({ id: 0, title: '' });
  return (
    <StateContext.Provider value={{ selectTask, setSelectTask }}>
      {props.children}
    </StateContext.Provider>
  );
}
