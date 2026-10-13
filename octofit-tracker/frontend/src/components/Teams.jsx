import { useCallback } from 'react';
import { API_BASE_URL, parseCollectionResponse } from '../api.js';
import { useCollection } from '../hooks/useCollection.js';
import ResourceTable from './ResourceTable.jsx';

function Teams() {
  const loadTeams = useCallback(
    async (signal) =>
      parseCollectionResponse(
        await fetch(`${API_BASE_URL}/api/teams/`, { signal }),
      ),
    [],
  );
  const { items, loading, error } = useCollection(loadTeams);

  return (
    <ResourceTable
      title="Teams"
      description="Find your crew and see who's moving together."
      items={items}
      loading={loading}
      error={error}
      emptyMessage="No teams have been created yet."
      columns={[
        { label: 'Team', render: (item) => item.name || '—' },
        { label: 'About', render: (item) => item.description || '—' },
        {
          label: 'Members',
          render: (item) =>
            Array.isArray(item.members) ? item.members.length : 0,
        },
      ]}
    />
  );
}

export default Teams;
