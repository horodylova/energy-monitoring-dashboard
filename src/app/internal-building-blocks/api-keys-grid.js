import {
  Grid,
  GridColumn,
} from '@progress/kendo-react-grid';
import { Button } from '@progress/kendo-react-buttons';
import { checkIcon, pencilIcon, trashIcon } from '@progress/kendo-svg-icons';
import React from 'react';

import { creatorData } from '../data';
import { Checkbox, Input } from '@progress/kendo-react-inputs';
import { Badge } from '@progress/kendo-react-indicators';
import { DropDownList } from '@progress/kendo-react-dropdowns';
import { DateTimePicker } from '@progress/kendo-react-dateinputs';
const data = [...creatorData];

export const getItems = () => {
  return data;
};
export const updateItem = (item) => {
  const index = data.findIndex((record) => record.name === item.name);
  data[index] = item;
  return data;
};
export const deleteItem = (item) => {
  const index = data.findIndex((record) => record.name === item.name);
  data.splice(index, 1);
  return data;
};

const editField = 'inEdit';
const DATA_ITEM_KEY = 'name';

const MyCommandCell = (props) => {
  const { dataItem } = props;
  const inEdit = props.isInEdit;
  const isNewItem = dataItem.name === null;

  return (
    <td className="k-command-cell">
      <Button
        fillMode="flat"
        svgIcon={inEdit ? checkIcon : pencilIcon}
        title="Edit button"
        onClick={() =>
          inEdit
            ? isNewItem
              ? props.add(dataItem)
              : props.update(dataItem)
            : props.edit(dataItem)
        }
      />
      <Button
        fillMode="flat"
        themeColor={'error'}
        svgIcon={trashIcon}
        title="Delete Button"
        onClick={() => props.remove(props.dataItem)}
      />
    </td>
  );
};

const CommandCell = (props) => {
  const { edit, remove, add, discard, update, cancel, editField } = props;
  return (
    <MyCommandCell
      {...props}
      edit={edit}
      remove={remove}
      add={add}
      discard={discard}
      update={update}
      cancel={cancel}
      editField={editField}
    />
  );
};

const BooleanCell = (props) => {
  return (
    <td {...props.tdProps} className="k-command-cell k-table-td">
      <Checkbox aria-label="checkbox" />
    </td>
  );
};

const StatusCustomGridCell = (props) => {
  const dropDownData = ['Enabled', 'Disabled', 'Revoked'];

  return (
    <td {...props.tdProps}>
      <div className="k-d-flex k-gap-2 k-align-items-center">
        {props.isInEdit ? (
          <DropDownList
            defaultItem="Select status..."
            style={{
              width: '100%',
            }}
            data={dropDownData}
          />
        ) : (
          <Badge
            themeColor={props.dataItem.statusColor}
            size="small"
            rounded="medium"
            position={null}
            aria-label="badge"
          >
            {props.dataItem.status}
          </Badge>
        )}
      </div>
    </td>
  );
};

const NameCustomGridCell = (props) => {
  return props.isInEdit ? (
    <td {...props.tdProps}>
      <Input defaultValue={props.dataItem.name} />
    </td>
  ) : (
    <td {...props.tdProps}>{props.children}</td>
  );
};

const CreatedCustomGridCell = (props) => {
  return props.isInEdit ? (
    <td {...props.tdProps}>
      <DateTimePicker defaultValue={props.dataItem.created} />
    </td>
  ) : (
    <td {...props.tdProps}>{props.children}</td>
  );
};

const LastUsedCustomGridCell = (props) => {
  return props.isInEdit ? (
    <td {...props.tdProps}>
      <DateTimePicker defaultValue={props.dataItem.lastUsed} />
    </td>
  ) : (
    <td {...props.tdProps}>{props.children}</td>
  );
};

export default function RateLimitsGrid() {
  const [data, setData] = React.useState([]);
  const [edit, setEdit] = React.useState({});

  React.useEffect(() => {
    let newItems = getItems();
    setData(newItems);
  }, []);

  // modify the data in the store, db etc
  const remove = (dataItem) => {
    const newData = [...deleteItem(dataItem)];
    setData(newData);
  };

  const update = (dataItem) => {
    const newData = updateItem(dataItem);
    setData(newData);
    setEdit((edit) => ({ ...edit, [dataItem.name]: false }));
  };

  // Local state operations
  const discard = () => {
    const newData = [...data];
    newData.splice(0, 1);
    setData(newData);
  };

  const cancel = (dataItem) => {
    const originalItem = getItems().find((p) => p.name === dataItem.name);
    const isNewlyAdded = dataItem.name === null;

    if (isNewlyAdded) {
      const newData = data.filter((item) => item.name !== null);
      setData(newData);
    } else if (originalItem) {
      const newData = data.map((item) =>
        item.name === originalItem.name ? originalItem : item,
      );

      setData(newData);
      setEdit((edit) => ({ ...edit, [dataItem.name]: false }));
    }
  };

  const enterEdit = (dataItem) => {
    setEdit((edit) => ({ ...edit, [dataItem.name]: true }));
  };

  const itemChange = (event) => {
    const newData = data.map((item) =>
      item.name === event.dataItem.name
        ? {
            ...item,
            [event.field || '']: event.value,
          }
        : item,
    );
    setData(newData);
  };

  const commandCellProps = {
    edit: enterEdit,
    remove: remove,
    discard: discard,
    update: update,
    cancel: cancel,
    editField: editField,
  };

  return (
    <Grid
      className="k-grid-no-scrollbar"
      data={data}
      onItemChange={itemChange}
      dataItemKey={DATA_ITEM_KEY}
      edit={edit}
      editable={true}
    >
      <GridColumn
        editor="boolean"
        cells={{
          data: (props) => <BooleanCell {...props} />,
        }}
        width={'50px'}
        editable={false}
      />
      <GridColumn
        field="name"
        title="Name"
        width={'192px'}
        editable={true}
        cells={{
          data: (props) => <NameCustomGridCell {...props} />,
        }}
      />
      <GridColumn
        field="creator"
        title="Creator"
        editor="text"
        width={'190px'}
      />
      <GridColumn
        field="created"
        title="Created"
        format="{0:MMM dd yyyy HH:mm:ss}"
        width={'190px'}
        cells={{
          data: (props) => <CreatedCustomGridCell {...props} />,
        }}
      />
      <GridColumn
        field="lastUsed"
        title="Last Used"
        format="{0:MMM dd yyyy HH:mm:ss}"
        width={'190px'}
        cells={{
          data: (props) => <LastUsedCustomGridCell {...props} />,
        }}
      />
      <GridColumn
        field="status"
        title="Status"
        cells={{
          data: (props) => <StatusCustomGridCell {...props} />,
        }}
        editor="text"
      />
      <GridColumn
        cells={{
          data: (props) => <CommandCell {...props} {...commandCellProps} />,
        }}
        width={'100px'}
      />
    </Grid>
  );
}