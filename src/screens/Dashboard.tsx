import React from 'react';
import { gql, useQuery } from '@apollo/client';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { startCase, uniq } from 'lodash';
import Box from '@mui/material/Box';
import { SubmissionsQuery } from '../gql/graphql';

const Dashboard: React.FC = () => {
  const { data, loading, error } = useQuery<SubmissionsQuery>(gql`
    query Submissions {
      submissions {
        id
        submittedAt
        data
      }
    }
  `);

  if (loading) return <div>Loading...</div>;

  if (error) return <div>Error: {error.message}</div>;

  const submissions = data?.submissions || []; // Handle potential undefined submissions

  const dynamicColumns = uniq(
    submissions.flatMap((s) => Object.keys(s?.data || {}))
  ).map((field) => ({
    field,
    headerName: startCase(field),
    width: 300,
    valueGetter: (params: GridValueGetterParams) => `${params.row.data[field]}`,
  }));

  const staticColumns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 300 },
    { field: 'submittedAt', headerName: 'Submitted', width: 300 },
  ];

  const columns: GridColDef[] = [...staticColumns, ...dynamicColumns];

  return (
    <Box sx={{ height: 800, width: '100%' }}>
      <DataGrid
        rows={submissions}
        columns={columns}
        disableRowSelectionOnClick
      />
    </Box>
  );
};

export default Dashboard;
