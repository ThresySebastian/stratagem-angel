import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface Hospital {
  id: string;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  capacity: number;
  available_beds: number;
  contact_phone: string | null;
  created_at: string;
}

export const useHospitals = () => {
  const [hospitals, setHospitals] = useState<Hospital[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHospitals();
  }, []);

  const fetchHospitals = async () => {
    const { data, error } = await (supabase as any)
      .from('hospitals')
      .select('*')
      .order('name');

    if (!error && data) {
      setHospitals(data as any);
    }
    setLoading(false);
  };

  return { hospitals, loading, refetch: fetchHospitals };
};
