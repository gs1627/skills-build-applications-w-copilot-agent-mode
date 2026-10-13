import { useCallback } from 'react';
import { API_BASE_URL, parseCollectionResponse } from '../api.js';
import { useCollection } from '../hooks/useCollection.js';
import ResourceTable from './ResourceTable.jsx';
import { displayName } from '../utils/displayName.js';

function Users() {
  const loadUsers = useCallback(
    async (signal) =>
      parseCollectionResponse(
        await fetch(`${API_BASE_URL}/api/users/`, { signal }),
      ),
    [],
  );
  const { items, loading, error } = useCollection(loadUsers);

  return (
    <ResourceTable
      title="Members"
      description="Meet the people in the OctoFit community."
      items={items}
      loading={loading}
      error={error}
      emptyMessage="No members have joined yet."
      columns={[
        { label: 'Name', render: (item) => displayName(item) },
        {
          label: 'Username',
          render: (item) => item.username ? `@${item.username}` : '—',
        },
        { label: 'Email', render: (item) => item.email || '—' },
        {
          label: 'Team',
          render: (item) => displayName(item.team),
        },
      ]}
    />
  );
}

export default Users;
