import { useCallback } from 'react';
import { API_BASE_URL, parseCollectionResponse } from '../api.js';
import { useCollection } from '../hooks/useCollection.js';
import ResourceTable from './ResourceTable.jsx';

function Workouts() {
  const loadWorkouts = useCallback(
    async (signal) =>
      parseCollectionResponse(
        await fetch(`${API_BASE_URL}/api/workouts/`, { signal }),
      ),
    [],
  );
  const { items, loading, error } = useCollection(loadWorkouts);

  return (
    <ResourceTable
      title="Workouts"
      description="Pick a workout that fits your goals and energy."
      items={items}
      loading={loading}
      error={error}
      emptyMessage="No workout suggestions are available yet."
      columns={[
        { label: 'Workout', render: (item) => item.title || '—' },
        { label: 'Category', render: (item) => item.category || '—' },
        { label: 'Difficulty', render: (item) => item.difficulty || '—' },
        {
          label: 'Duration',
          render: (item) =>
            Number.isFinite(item.durationMinutes)
              ? `${item.durationMinutes} min`
              : '—',
        },
        { label: 'Description', render: (item) => item.description || '—' },
      ]}
    />
  );
}

export default Workouts;
