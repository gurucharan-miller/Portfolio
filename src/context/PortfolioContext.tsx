import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { PortfolioData } from '../types/portfolio';
import { INITIAL_PORTFOLIO_DATA } from '../data/portfolioData';

interface PortfolioContextType {
  data: PortfolioData;
  isLoading: boolean;
  isSaving: boolean;
  error: string | null;
  saveData: (updated: PortfolioData) => Promise<{ success: boolean; error?: string }>;
  resetToDefault: () => Promise<{ success: boolean; error?: string }>;
  refreshData: () => Promise<void>;
  updateDataLocally: (updater: (prev: PortfolioData) => PortfolioData) => void;
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

export const PortfolioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [data, setData] = useState<PortfolioData>(INITIAL_PORTFOLIO_DATA);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPortfolio = useCallback(async () => {
    try {
      const res = await fetch('/api/portfolio');
      if (res.ok) {
        const json = await res.json();
        if (json && json.personalInfo) {
          setData(json);
        }
      }
    } catch (err) {
      console.warn('Could not fetch latest portfolio from API, using fallback data:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPortfolio();
  }, [fetchPortfolio]);

  const saveData = async (updated: PortfolioData): Promise<{ success: boolean; error?: string }> => {
    setIsSaving(true);
    setError(null);
    try {
      const res = await fetch('/api/portfolio', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updated)
      });

      if (!res.ok) {
        const errJson = await res.json().catch(() => ({}));
        const errMsg = errJson.error || `Save failed with status ${res.status}`;
        setError(errMsg);
        setIsSaving(false);
        return { success: false, error: errMsg };
      }

      setData(updated);
      setIsSaving(false);
      return { success: true };
    } catch (err: any) {
      const errMsg = err?.message || 'Network error while saving data';
      setError(errMsg);
      setIsSaving(false);
      return { success: false, error: errMsg };
    }
  };

  const resetToDefault = async (): Promise<{ success: boolean; error?: string }> => {
    setIsSaving(true);
    setError(null);
    try {
      const res = await fetch('/api/portfolio/reset', {
        method: 'POST'
      });

      if (!res.ok) {
        const errJson = await res.json().catch(() => ({}));
        const errMsg = errJson.error || 'Reset failed';
        setIsSaving(false);
        return { success: false, error: errMsg };
      }

      const resData = await res.json();
      setData(resData.data || INITIAL_PORTFOLIO_DATA);
      setIsSaving(false);
      return { success: true };
    } catch (err: any) {
      const errMsg = err?.message || 'Failed to reset portfolio';
      setIsSaving(false);
      return { success: false, error: errMsg };
    }
  };

  const updateDataLocally = (updater: (prev: PortfolioData) => PortfolioData) => {
    setData((prev) => updater(prev));
  };

  return (
    <PortfolioContext.Provider
      value={{
        data,
        isLoading,
        isSaving,
        error,
        saveData,
        resetToDefault,
        refreshData: fetchPortfolio,
        updateDataLocally
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
};

export function usePortfolio(): PortfolioContextType {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return context;
}
