import React, { useState, useRef, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { GLOBALTYPES } from "../../redux/actions/globalTypes";
import { deletePost } from "../../redux/actions/postAction";

import {
  osdsDataColumns,
  columnOrderArray,
  columnWidthsArray,
  booleanColumnsArray,
  columnBandsArray,
  generateData,
} from "../../data/data";
import Popup from "./Popup";
import PopupEditing from "./PopupEditing";

// Material UI Components
import Paper from "@material-ui/core/Paper";
import Chip from "@material-ui/core/Chip";
import Input from "@material-ui/core/Input";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import {
  SelectionState,
  PagingState,
  IntegratedPaging,
  IntegratedSelection,
  SortingState,
  IntegratedSorting,
  EditingState,
  DataTypeProvider,
  FilteringState,
  IntegratedFiltering,
  SearchState,
} from "@devexpress/dx-react-grid";
import { GridExporter } from "@devexpress/dx-react-grid-export";
import {
  Grid,
  Table,
  TableBandHeader,
  DragDropProvider,
  TableHeaderRow,
  TableColumnResizing,
  TableEditColumn,
  TableSelection,
  PagingPanel,
  TableFilterRow,
  Toolbar,
  SearchPanel,
  TableColumnReordering,
  ColumnChooser,
  TableColumnVisibility,
  ExportPanel,
} from "@devexpress/dx-react-grid-material-ui";
import saveAs from "file-saver";
import CheckIcon from "@material-ui/icons/Check";
import CloseIcon from "@material-ui/icons/Close";

const styles = {
  waianae: {
    backgroundColor: "#f5f5f5",
  },
  nanakuli: {
    backgroundColor: "#a2e2a4",
  },
  waimanalo: {
    backgroundColor: "#b3e5fc",
  },
  energy: {
    backgroundColor: "#ffcdd2",
  },
  insurance: {
    backgroundColor: "#f0f4c3",
  },
};

const onSave = (workbook) => {
  workbook.xlsx.writeBuffer().then((buffer) => {
    saveAs(
      new Blob([buffer], { type: "application/octet-stream" }),
      "DataGrid.xlsx"
    );
  });
};

const BooleanFormatter = ({ value }) => (
  <Chip label={value === "Yes" ? "Yes" : "No"} />
);

const BooleanEditor = ({ value, onValueChange }) => (
  <Select
    input={<Input />}
    value={value ? "Yes" : "No"}
    onChange={(event) => onValueChange(event.target.value === "Yes")}
    style={{ width: "100%" }}
  >
    <MenuItem value="Yes">Yes</MenuItem>
    <MenuItem value="No">No</MenuItem>
  </Select>
);

const BooleanTypeProvider = (props) => (
  <DataTypeProvider
    formatterComponent={BooleanFormatter}
    editorComponent={BooleanEditor}
    {...props}
  />
);

const SurveyDataTable = ({ posts, load }) => {
  const { homePosts, auth, socket } = useSelector((state) => state);
  const dispatch = useDispatch();

  const [selection, setSelection] = useState([]);
  const [columns] = useState(osdsDataColumns);
  const [rows, setRows] = useState(generateData(posts));
  const [booleanColumns] = useState(booleanColumnsArray);

  const [sorting, setSorting] = useState([{ columnName: "", direction: "" }]);
  const [pageSizes] = useState([5, 10, 15, 0]);
  const [searchValue, setSearchState] = useState("");
  const [tableColumnExtensions] = useState([{ columnName: "id", width: "50" }]);
  const [columnBands] = useState(columnBandsArray);
  const [columnOrder, setColumnOrder] = useState(columnOrderArray);
  const [columnWidths, setColumnWidths] = useState(columnWidthsArray);
  const [hiddenColumnNames, setHiddenColumnNames] = useState([]);

  const TableRow = ({ row, ...restProps }) => (
    <Table.Row
      {...restProps}
      // eslint-disable-next-line no-alert
      onClick={() => alert(JSON.stringify(row))}
      style={{
        cursor: "pointer",
        ...styles[row.sector.toLowerCase()],
      }}
    />
  );

  const commitChanges = ({ added, changed, deleted }) => {
    let changedRows;
    if (added) {
      const startingAddedId =
        rows.length > 0 ? rows[rows.length - 1].id + 1 : 0;
      changedRows = [
        ...rows,
        ...added.map((row, index) => ({
          id: startingAddedId + index,
          ...row,
        })),
      ];
    }

    if (changed) {
      changedRows = rows.map((row) =>
        changed[row.id] ? { ...row, ...changed[row.id] } : row
      );
    }

    if (deleted) {
      const deletedSet = new Set(deleted);
      changedRows = rows.filter((row) => !deletedSet.has(row.id));

      console.log(deleted);
      console.log(changedRows);

      // if (window.confirm("Are you sure you want to delete this post?")) {
      // dispatch(deletePost({ post, auth, socket }));
      // }
    }

    setRows(changedRows);
  };

  const exporterRef = useRef(null);

  const startExport = useCallback(
    (options) => {
      exporterRef.current.exportGrid(options);
    },
    [exporterRef]
  );

  const getRowId = (row) => row.id;

  return (
    <div>
      <span>Total rows selected: {selection.length}</span>
      <Paper>
        <Grid rows={rows} columns={columns} getRowId={getRowId}>
          <BooleanTypeProvider for={booleanColumns} />
          <SearchState value={searchValue} onValueChange={setSearchState} />
          <EditingState
            onCommitChanges={commitChanges}
            defaultEditingRowIds={[0]}
          />
          <PagingState defaultCurrentPage={0} defaultPageSize={5} />
          <IntegratedPaging />
          <SelectionState
            selection={selection}
            onSelectionChange={setSelection}
          />
          <IntegratedSelection />
          <FilteringState defaultFilters={[]} />
          <IntegratedFiltering />
          <SortingState sorting={sorting} onSortingChange={setSorting} />
          <IntegratedSorting />
          <DragDropProvider />
          <Table
            columnExtensions={tableColumnExtensions}
            rowComponent={TableRow}
          />

          <TableColumnReordering
            order={columnOrder}
            onOrderChange={setColumnOrder}
          />
          <TableColumnResizing
            columnWidths={columnWidths}
            onColumnWidthsChange={setColumnWidths}
          />
          <TableHeaderRow showSortingControls />
          <TableColumnVisibility
            hiddenColumnNames={hiddenColumnNames}
            onHiddenColumnNamesChange={setHiddenColumnNames}
          />
          <Toolbar />

          <TableFilterRow />
          {/* <TableEditRow /> */}
          <TableEditColumn showAddCommand showEditCommand showDeleteCommand />
          <PopupEditing popupComponent={Popup} />
          <TableSelection showSelectAll highlightRow selectByRowClick />

          <TableBandHeader columnBands={columnBands} />
          <SearchPanel />
          <ColumnChooser />
          <PagingPanel pageSizes={pageSizes} />
          <ExportPanel startExport={startExport} />
        </Grid>

        <GridExporter
          ref={exporterRef}
          rows={rows}
          columns={columns}
          // grouping={grouping}
          // totalSummaryItems={totalSummaryItems}
          // groupSummaryItems={groupSummaryItems}
          selection={selection}
          onSave={onSave}
        />
        {/* {loading && <Loading />} */}
      </Paper>
    </div>
  );
};

export default SurveyDataTable;
