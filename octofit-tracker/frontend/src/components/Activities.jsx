import { useCallback } from 'react';
import { API_BASE_URL, parseCollectionResponse } from '../api.js';
import { useCollection } from '../hooks/useCollection.js';
import ResourceTable from './ResourceTable.jsx';
import { displayName } from '../utils/displayName.js';

function Activities() {
  const loadActivities = useCallback(
    async (signal) =>
      parseCollectionResponse(
        await fetch(`${API_BASE_URL}/api/activities/`, { signal }),
      ),
    [],
  );
  const { items, loading, error } = useCollection(loadActivities);

  return (
    <ResourceTable
      title="Activities"
      description="Recent movement logged by the OctoFit community."
      items={items}
      loading={loading}
      error={error}
      emptyMessage="No activities have been logged yet."
      columns={[
        { label: 'Member', render: (item) => displayName(item.user) },
        { label: 'Activity', render: (item) => item.activityType || '—' },
        {
          label: 'Duration',
          render: (item) =>
            Number.isFinite(item.durationMinutes)
              ? `${item.durationMinutes} min`
              : '—',
        },
        {
          label: 'Distance',
          render: (item) =>
            Number.isFinite(item.distanceKm) ? `${item.distanceKm} km` : '—',
        },
        {
          label: 'Points',
          render: (item) => Number.isFinite(item.points) ? item.points : '—',
        },
      ]}
    />
  );
}

export default Activities;
