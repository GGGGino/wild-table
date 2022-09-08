import {
  RowData,
  createTable,
  TableOptions,
  TableOptionsResolved,
} from '@tanstack/table-core';

export function flexRender<TProps extends object>(
  Comp: ((props: TProps) => string) | string | undefined,
  props: TProps,
) {
  if (!Comp) {
    return '';
  }

  return typeof Comp == 'function' ? Comp(props) : Comp;
}

export function createStencilTable<TData extends RowData>(
  options: TableOptions<TData>
) {
  let resolvedOptions: TableOptionsResolved<TData> = {
    state: {}, // Dummy state
    onStateChange: () => { }, // noop
    renderFallbackValue: null,
    ...options
  };

  let table = createTable(resolvedOptions);

  table.setOptions(prev => ({
    ...prev,
    state: {
      ...options.state,
      ...table.initialState
    },
    // Similarly, we'll maintain both our internal state and any user-provided
    // state.
    onStateChange: updater => {
      console.log('ciao');
    },
  }))

  return table;
}