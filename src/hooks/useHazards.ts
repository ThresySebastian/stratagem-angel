import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface Hazard {
  id: string;
  hazard_type: string;
  severity: string;
  latitude: number;
  longitude: number;
  radius_km: number;
  description: string | null;
  is_active: boolean;
  created_at: string;
  expires_at: string | null;
}

export const useHazards = () => {
  const [hazards, setHazards] = useState<Hazard[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHazards();

    const channel = supabase
      .channel('hazards-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'hazards'
        },
        () => {
          fetchHazards();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchHazards = async () => {
    const { data, error } = await (supabase as any)
      .from('hazards')
      .select('*')
      .eq('is_active', true)
      .order('created_at', { ascending: false });

    if (!error && data) {
      setHazards(data as any);
    }
    setLoading(false);
  };

  return { hazards, loading, refetch: fetchHazards };
};
