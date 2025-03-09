
import React from 'react';
import { AskMeProvider } from './AskMe';
import { CVPopupProvider } from './CVPopup';

export const Providers: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <AskMeProvider>
      <CVPopupProvider>
        {children}
      </CVPopupProvider>
    </AskMeProvider>
  );
};

export default Providers;
