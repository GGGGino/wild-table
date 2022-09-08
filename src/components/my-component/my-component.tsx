import { Component, Prop, h } from '@stencil/core';
import { ColumnDef, getCoreRowModel } from '@tanstack/table-core';
import { createStencilTable, flexRender } from '../../utils/stencil-adapter';

type Person = {
  firstName: string
  lastName: string
  age: number
  visits: number
  status: string
  progress: number
}

const defaultData: Person[] = [
  {
    firstName: 'tanner',
    lastName: 'linsley',
    age: 24,
    visits: 100,
    status: 'In Relationship',
    progress: 50,
  },
  {
    firstName: 'tandy',
    lastName: 'miller',
    age: 40,
    visits: 40,
    status: 'Single',
    progress: 80,
  },
  {
    firstName: 'joe',
    lastName: 'dirte',
    age: 45,
    visits: 20,
    status: 'Complicated',
    progress: 10,
  },
]

const defaultColumns: ColumnDef<Person>[] = [
  {
    accessorKey: 'firstName',
    cell: info => info.getValue(),
    footer: info => info.column.id,
  },
  {
    accessorFn: row => row.lastName,
    id: 'lastName',
    cell: info => <i>{info.getValue<string>()}</i>,
    header: () => <span>Last Name</span>,
    footer: info => info.column.id,
  },
  {
    accessorKey: 'age',
    header: () => 'Age',
    footer: info => info.column.id,
  },
  {
    accessorKey: 'visits',
    header: () => <span>Visits</span>,
    footer: info => info.column.id,
  },
  {
    accessorKey: 'status',
    header: 'Status',
    footer: info => info.column.id,
  },
  {
    accessorKey: 'progress',
    header: 'Profile Progress',
    footer: info => info.column.id,
  },
]

@Component({
  tag: 'my-component',
  styleUrl: 'my-component.css',
  shadow: true,
})
export class MyComponent {
  /**
   * The first name
   */
  @Prop() first: string;

  /**
   * The middle name
   */
  @Prop() middle: string;

  /**
   * The last name
   */
  @Prop() last: string;

  render() {
    const table = createStencilTable({
      data: defaultData,
      columns: defaultColumns,
      getCoreRowModel: getCoreRowModel(),
    });

    return <table
          {...{
            style: {
              width: table.getCenterTotalSize().toString(),
            },
          }}
        >
          <thead>
            {table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <th
                    {...{
                      key: header.id,
                      colSpan: header.colSpan,
                      style: {
                        width: header.getSize().toString(),
                      },
                    }}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                    <div
                      {...{
                        onMouseDown: header.getResizeHandler(),
                        onTouchStart: header.getResizeHandler(),
                        className: `resizer ${
                          header.column.getIsResizing() ? 'isResizing' : ''
                        }`,
                        style: {
                          transform: `translateX(${
                            table.getState().columnSizingInfo.deltaOffset
                          }px)`,
                        },
                      }}
                    />
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map(row => (
              <tr key={row.id}>
                {row.getVisibleCells().map(cell => (
                  <td
                    {...{
                      key: cell.id,
                      style: {
                        width: cell.column.getSize().toString(),
                      },
                    }}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>;
  }
}
