
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

export const CoinCounterProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [count, setCount] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(true);

  // Hämta räknaren från databasen när komponenten monteras
  useEffect(() => {
    const fetchCount = async () => {
      try {
        const { data, error } = await supabase
          .from('coin_counter')
          .select('count')
          .eq('id', 1)
          .single();

        if (error) {
          console.error('Error fetching coin count:', error);
          return;
        }

        if (data) {
          console.log('Initial count from database:', data.count);
          setCount(data.count);
        }
      } catch (error) {
        console.error('Error in fetchCount:', error);
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
        }
      })
      .subscribe();

    return () => {
      channel.unsubscribe();
    };
  }, []);

  const incrementCount = async () => {
    try {
      // Anropa RPC-funktionen för att öka räknaren
      const { data, error } = await supabase
        .rpc('increment_coin_counter', { row_id: 1 });
      
      if (error) {
        console.error('Error incrementing count:', error.message);
        toast({
          title: "Error",
          description: "Kunde inte öka räknaren. Försök igen.",
          variant: "destructive"
        });
        return;
      }
      
      // Uppdatera state med det nya antalet som returneras från funktionen
      if (data !== null) {
        console.log('New count from increment function:', data);
        setCount(data);
        
        // Bekräftelse toast (frivilligt)
        toast({
          title: "Räknaren ökad",
          description: `Ny räkning: ${data}`,
          variant: "default"
        });
      }
    } catch (error: any) {
      console.error('Error in incrementCount:', error);
      toast({
        title: "Error",
        description: error?.message || "Ett fel uppstod. Försök igen.",
        variant: "destructive"
      });
    }
  };

  return (
    <CoinCounterContext.Provider value={{ count, incrementCount, isLoading }}>
      {!isLoading && children}
    </CoinCounterContext.Provider>
  );
};
