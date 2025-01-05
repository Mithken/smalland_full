import { useState, useEffect } from 'react';
import { getNexus, createNexus, NexusError } from '@lib/services/nexus';
import type { Nexus } from '@types/nexus';

export function useNexus(nexusId?: string) {
  const [nexus, setNexus] = useState<Nexus | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<NexusError | null>(null);

  useEffect(() => {
    if (!nexusId) {
      setNexus(null);
      setLoading(false);
      return;
    }

    async function loadNexus() {
      try {
        const data = await getNexus(nexusId);
        setNexus(data);
        setError(null);
      } catch (err) {
        setError(err instanceof NexusError ? err : new NexusError('Failed to load nexus'));
      } finally {
        setLoading(false);
      }
    }

    loadNexus();
  }, [nexusId]);

  const createNewNexus = async (data: Partial<Nexus>) => {
    try {
      const created = await createNexus(data);
      setNexus(created);
      setError(null);
      return created;
    } catch (err) {
      const error = err instanceof NexusError ? err : new NexusError('Failed to create nexus');
      setError(error);
      throw error;
    }
  };

  return {
    nexus,
    loading,
    error,
    createNexus: createNewNexus
  };
}