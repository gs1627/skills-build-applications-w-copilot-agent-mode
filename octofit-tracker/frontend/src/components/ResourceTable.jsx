function ResourceTable({
  title,
  description,
  items,
  loading,
  error,
  columns,
  emptyMessage,
}) {
  return (
    <section>
      <header className="mb-4">
        <p className="text-success fw-semibold text-uppercase mb-1">
          OctoFit Tracker
        </p>
        <h1 className="display-6 fw-bold">{title}</h1>
        <p className="text-body-secondary mb-0">{description}</p>
      </header>

      {loading && (
        <p className="text-body-secondary" role="status">
          Loading {title.toLowerCase()}…
        </p>
      )}
      {error && (
        <div className="alert alert-danger" role="alert">
          Could not load {title.toLowerCase()}: {error}
        </div>
      )}
      {!loading && !error && items.length === 0 && (
        <div className="alert alert-info" role="status">
          {emptyMessage}
        </div>
      )}
      {!loading && !error && items.length > 0 && (
        <div className="table-responsive shadow-sm rounded">
          <table className="table table-hover align-middle mb-0 bg-white">
            <thead className="table-success">
              <tr>
                {columns.map((column) => (
                  <th key={column.label} scope="col">
                    {column.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {items.map((item, index) => (
                <tr key={item._id || item.id || `${title}-${index}`}>
                  {columns.map((column) => (
                    <td key={column.label}>{column.render(item)}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}

export default ResourceTable;
