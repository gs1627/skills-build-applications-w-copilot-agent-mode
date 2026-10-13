import { useCallback } from 'react';
import { API_BASE_URL, parseCollectionResponse } from '../api.js';
import { useCollection } from '../hooks/useCollection.js';
import ResourceTable from './ResourceTable.jsx';
import { displayName } from '../utils/displayName.js';

function Leaderboard() {
  const loadLeaderboard = useCallback(
    async (signal) =>
      parseCollectionResponse(
        await fetch(`${API_BASE_URL}/api/leaderboard/`, { signal }),
      ),
    [],
  );
  const { items, loading, error } = useCollection(loadLeaderboard);

  return (
    <ResourceTable
      title="Leaderboard"
      description="Celebrate the members earning points this period."
      items={items}
      loading={loading}
      error={error}
      emptyMessage="The leaderboard is waiting for its first results."
      columns={[
        {
          label: 'Rank',
          render: (item) => Number.isFinite(item.rank) ? `#${item.rank}` : '—',
        },
        { label: 'Member', render: (item) => displayName(item.user) },
        { label: 'Team', render: (item) => displayName(item.team) },
        {
          label: 'Points',
          render: (item) => Number.isFinite(item.points) ? item.points : '—',
        },
        { label: 'Period', render: (item) => item.period || '—' },
      ]}
    />
  );
}

export default Leaderboard;
