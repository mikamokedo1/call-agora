import MaterialTable from 'material-table';
import { TablePagination, TablePaginationProps } from '@material-ui/core';
import AddBox from '@material-ui/icons/AddBox'
import React, { useState } from 'react';

interface LoaderProps { }

function PatchedPagination(props: TablePaginationProps) {
  const {
    ActionsComponent,
    onChangePage,
    onChangeRowsPerPage,
    ...tablePaginationProps
  } = props;

  return (
    <TablePagination
      {...tablePaginationProps}
      // @ts-expect-error onChangePage was renamed to onPageChange
      onPageChange={onChangePage}
      onRowsPerPageChange={onChangeRowsPerPage}
      ActionsComponent={(subprops) => {
        const { onPageChange, ...actionsComponentProps } = subprops;
        return (
          // @ts-expect-error ActionsComponent is provided by material-table
          <ActionsComponent
            {...actionsComponentProps}
            onChangePage={onPageChange}
          />
        );
      }}
    />
  );
}

const EditTable: React.FC<LoaderProps> = () => {
  const [data, setData] = useState([
    { id: 0, name: 'Hải', surname: 'Nguyễn', birthYear: 1999, birthCity: 63 },
    { id: 1, name: 'Tuyền', surname: 'Phạm', birthYear: 1998, birthCity: 34 },
    { id: 2, name: 'Tuyền', surname: 'Phạm', birthYear: 1998, birthCity: 34 },
    { id: 3, name: 'Tuyền', surname: 'Phạm', birthYear: 1998, birthCity: 34 },
    { id: 4, name: 'Tuyền', surname: 'Phạm', birthYear: 1998, birthCity: 34 },
    { id: 5, name: 'Tuyền', surname: 'Phạm', birthYear: 1998, birthCity: 34 },
    { id: 6, name: 'Tuyền', surname: 'Phạm', birthYear: 1998, birthCity: 34 },
  ]);

  return (
    <MaterialTable
      title="Thông tin sản phẩm"
      components={{
        Pagination: PatchedPagination,
      }}
      options={{
        exportButton: true,
      }}
      actions={[
        {
          icon: () => <AddBox />,
          onClick: (event: any, rowData: any) => {
            console.log(rowData);
          },
          isFreeAction: true,
          tooltip: 'Add Button',
        }
      ]}
      columns={[
        { title: 'Tên', field: 'name', editable: 'onUpdate' },
        { title: 'Họ', field: 'surname', editable: 'never' },
        { title: 'Năm sinh', field: 'birthYear', type: 'numeric' },
        {
          title: 'Địa chỉ',
          field: 'birthCity',
          lookup: { 34: 'Tiền Giang', 63: 'Long An' },
        },
      ]}
      data={data}
      editable={{
        onRowAdd: (newData) =>
          new Promise<void>((resolve, reject) => {
            setTimeout(() => {
              setData([...data, newData]);

              resolve();
            }, 1000);
          }),
        onRowUpdate: (newData, oldData) =>
          new Promise<void>((resolve, reject) => {
            setTimeout(() => {
              const dataUpdate = [...data];
              const index = oldData?.id;
              dataUpdate[index!] = newData;
              setData([...dataUpdate]);

              resolve();
            }, 1000);
          }),
        onRowDelete: (oldData) =>
          new Promise<void>((resolve, reject) => {
            setTimeout(() => {
              const dataDelete = [...data];
              const index = oldData?.id;
              dataDelete.splice(index, 1);
              setData([...dataDelete]);

              resolve();
            }, 1000);
          }),
      }}
    />
  )
}

export default EditTable;
