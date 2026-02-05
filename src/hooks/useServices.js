import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';

export function useServices() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      setLoading(true);
      setError(null);

      const { data, error: fetchError } = await supabase
        .from('services')
        .select('*')
        .eq('is_active', true)
        .order('display_order', { ascending: true });

      if (fetchError) throw fetchError;

      setServices(data || []);
    } catch (err) {
      console.error('Error fetching services:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const getServicesByCategory = (category) => {
    if (category === 'all') return services;
    return services.filter(service => service.category === category);
  };

  return {
    services,
    loading,
    error,
    refetch: fetchServices,
    getServicesByCategory
  };
}
