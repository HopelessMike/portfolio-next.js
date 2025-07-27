"use client"

import React, { createContext, useState, useContext, ReactNode } from 'react';
import LoadingScreen from '@/components/loading-screen';

interface LoadingContextType {
  isReady: boolean;
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

export const LoadingProvider = ({ children }: { children: ReactNode }) => {
  const [isReady, setIsReady] = useState(false);

  return (
    <LoadingContext.Provider value={{ isReady }}>
      <LoadingScreen onLoadingComplete={() => setIsReady(true)} />
      {/* Mostra i figli solo quando il caricamento è completo */}
      {isReady && children}
    </LoadingContext.Provider>
  );
};

export const useLoading = () => {
  const context = useContext(LoadingContext);
  if (context === undefined) {
    throw new Error('useLoading must be used within a LoadingProvider');
  }
  return context;
};