
import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../integrations/supabase/client';
import { toast } from '@/components/ui/use-toast';

interface CoinCounterContextType {
  count: number;
  incrementCount: () => Promise<void>;
  isLoading: boolean;
}

const CoinCounterContext = createContext<CoinCounterContextType | undefined>(undefined);

export const useCoinCounter = () => {
  const context = useContext(CoinCounterContext);
  if (!context) {
    throw new Error('useCoinCounter must be used within a CoinCounterProvider');
  }
  return context;
};

// Konstant för lokal lagring
const LOCAL_STORAGE_KEY = 'coin_counter_value';

export const CoinCounterProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [count, setCount] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(true);
  const [useLocalStorage, setUseLocalStorage] = useState(false);

  // Hämta räknaren från databasen när komponenten monteras
  useEffect(() => {
    const fetchCount = async () => {
      try {
        // Försök först att hämta värdet från localStorage om det finns
        const localCount = localStorage.getItem(LOCAL_STORAGE_KEY);
        if (localCount) {
          setCount(parseInt(localCount, 10));
        }

        const { data, error } = await supabase
          .from('coin_counter')
          .select('count')
          .eq('id', 1)
          .single();

        if (error) {
          console.error('Error fetching coin count:', error);
          setUseLocalStorage(true);
          return;
        }

        if (data) {
          console.log('Initial count from database:', data.count);
          setCount(data.count);
          // Spara även i localStorage
          localStorage.setItem(LOCAL_STORAGE_KEY, data.count.toString());
          setUseLocalStorage(false);
        }
      } catch (error) {
        console.error('Error in fetchCount:', error);
        setUseLocalStorage(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCount();

    // Sätt upp en prenumeration för att lyssna på ändringar
    const channel = supabase
      .channel('coin_counter_changes')
      .on('postgres_changes', { 
        event: 'UPDATE', 
        schema: 'public', 
        table: 'coin_counter',
        filter: 'id=eq.1'
      }, (payload) => {
        console.log('Received update from subscription:', payload);
        if (payload.new && typeof payload.new.count === 'number') {
          setCount(payload.new.count);
          // Uppdatera även i localStorage
          localStorage.setItem(LOCAL_STORAGE_KEY, payload.new.count.toString());
        }
      })
      .subscribe();

    return () => {
      channel.unsubscribe();
    };
  }, []);

  const incrementCount = async () => {
    try {
      // Öka värdet optimistiskt lokalt först
      const newCount = count + 1;
      setCount(newCount);
      
      // Spara lokalt oavsett
      localStorage.setItem(LOCAL_STORAGE_KEY, newCount.toString());
      
      // Om vi använder lokal lagring på grund av tidigare fel, gör inget mer
      if (useLocalStorage) {
        return;
      }

      // Försök uppdatera i Supabase
      const { data, error } = await supabase
        .rpc('increment_coin_counter', { row_id: 1 });
      
      if (error) {
        console.error('Error incrementing count:', error.message);
        // Använd lokal lagring vid fel
        setUseLocalStorage(true);
        return;
      }
      
      // Uppdatera state med det nya antalet som returneras från funktionen
      if (data !== null) {
        console.log('New count from increment function:', data);
        setCount(data);
        localStorage.setItem(LOCAL_STORAGE_KEY, data.toString());
      }
    } catch (error) {
      console.error('Error in incrementCount:', error);
      // Använd lokal lagring vid fel
      setUseLocalStorage(true);
    }
  };

  return (
    <CoinCounterContext.Provider value={{ count, incrementCount, isLoading }}>
      {!isLoading && children}
    </CoinCounterContext.Provider>
  );
};
