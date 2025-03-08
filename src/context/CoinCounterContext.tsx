
import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../integrations/supabase/client';
import { toast } from '@/components/ui/use-toast';

interface CoinCounterContextType {
  count: number;
  incrementCount: () => Promise<void>;
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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch the current count from Supabase when the component mounts
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
        setLoading(false);
      }
    };

    fetchCount();

    // Set up a subscription to listen for changes
    const subscription = supabase
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
      subscription.unsubscribe();
    };
  }, []);

  const incrementCount = async () => {
    try {
      // Call the RPC function to increment the count
      const { data, error } = await supabase
        .rpc('increment_coin_counter', { row_id: 1 });
      
      if (error) {
        console.error('Error incrementing count:', error);
        toast({
          title: "Error",
          description: "Failed to increment count. Please try again.",
          variant: "destructive"
        });
        return;
      }
      
      // Update state with the new count returned from the function
      if (data !== null) {
        console.log('New count from increment function:', data);
        setCount(data);
      }
    } catch (error) {
      console.error('Error in incrementCount:', error);
    }
  };

  return (
    <CoinCounterContext.Provider value={{ count, incrementCount }}>
      {!loading && children}
    </CoinCounterContext.Provider>
  );
};
