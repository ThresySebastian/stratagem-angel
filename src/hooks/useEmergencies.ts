import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface Emergency {
  id: string;
  reporter_id: string | null;
  location_address: string;
  latitude: number;
  longitude: number;
  severity: 'critical' | 'high' | 'medium' | 'low';
  status: 'pending' | 'assigned' | 'en_route' | 'on_scene' | 'completed' | 'cancelled';
  description: string | null;
  assigned_ambulance_id: string | null;
  assigned_hospital_id: string | null;
  eta_minutes: number | null;
  created_at: string;
}

export const useEmergencies = () => {
  const [emergencies, setEmergencies] = useState<Emergency[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEmergencies();

    const channel = supabase
      .channel('emergencies-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'emergencies'
        },
        () => {
          fetchEmergencies();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchEmergencies = async () => {
    const { data, error } = await (supabase as any)
      .from('emergencies')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error && data) {
      setEmergencies(data as any);
    }
    setLoading(false);
  };

  return { emergencies, loading, refetch: fetchEmergencies };
};
