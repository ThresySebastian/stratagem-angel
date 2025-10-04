import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface Ambulance {
  id: string;
  vehicle_id: string;
  driver_id: string | null;
  status: 'idle' | 'en_route' | 'on_scene' | 'returning';
  current_latitude: number | null;
  current_longitude: number | null;
  hospital_id: string | null;
}

export const useAmbulances = () => {
  const [ambulances, setAmbulances] = useState<Ambulance[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAmbulances();

    const channel = supabase
      .channel('ambulances-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'ambulances'
        },
        () => {
          fetchAmbulances();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchAmbulances = async () => {
    const { data, error } = await (supabase as any)
      .from('ambulances')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error && data) {
      setAmbulances(data as any);
    }
    setLoading(false);
  };

  return { ambulances, loading, refetch: fetchAmbulances };
};
