import {
  Grid,
  GridColumn,
} from '@progress/kendo-react-grid';
import { ChunkProgressBar } from '@progress/kendo-react-progressbars';
import { Button } from '@progress/kendo-react-buttons';
import {
  checkIcon,
  pencilIcon,
  trashIcon,
  xIcon,
} from '@progress/kendo-svg-icons';
import React from 'react';

import { limitsData } from '../data';
import { Input, InputSuffix, NumericTextBox } from '@progress/kendo-react-inputs';
const data = [...limitsData];

export const getItems = () => {
  return data;
};
export const updateItem = (item) => {
  const index = data.findIndex((record) => record.model === item.model);
  data[index] = item;
  return data;
};
export const deleteItem = (item) => {
  const index = data.findIndex((record) => record.model === item.model);
  data.splice(index, 1);
  return data;
};

const editField = 'inEdit';
const DATA_ITEM_KEY = 'model';

const TokenLimitsCell = (props) => {
  return (
    <td {...props.tdProps}>
      <div className="k-d-flex k-gap-2 k-align-items-center">
        {props.isInEdit ? (
          <>
            <span style={{ whiteSpace: 'nowrap' }}>TPM Max Value</span>
            <NumericTextBox
              defaultValue={450000}
              suffix={() => (
                <InputSuffix>
                  <Button fillMode={'flat'} svgIcon={xIcon} />
                </InputSuffix>
              )}
            />
          </>
        ) : (
          <>
            <span style={{ whiteSpace: 'nowrap' }}>0 TPM</span>
            <ChunkProgressBar
              chunkCount={10}
              min={1}
              max={10}
              value={7}
              ariaLabel="chunkbar"
            />
            <span className="k-flex-shrink-0">450 000 TPM</span>
          </>
        )}
      </div>
    </td>
  );
};

const MyCommandCell = (props) => {
  const { dataItem } = props;
  const inEdit = props.isInEdit;
  const isNewItem = dataItem.model === null;

  return (
    <td className="k-command-cell">
      <Button
        fillMode="flat"
        svgIcon={inEdit ? checkIcon : pencilIcon}
        onClick={() =>
          inEdit
            ? isNewItem
              ? props.add(dataItem)
              : props.update(dataItem)
            : props.edit(dataItem)
        }
        title="Edit button"
      />
      <Button
        fillMode="flat"
        themeColor={'error'}
        svgIcon={trashIcon}
        onClick={() => props.remove(props.dataItem)}
        title="Delete Button"
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

const RequestCommandCell = (props) => {
  const formattedNumber = Number(props.dataItem.requestLimits.replace(/\s/g, ''));
  return (
  props.isInEdit ?
  <td {...props.tdProps}>
    <NumericTextBox defaultValue={formattedNumber} width={130} /> RPM
  </td>
  : 
  <td {...props.tdProps}>
    {props.children} RPM
  </td>
  );
};

const BatchCommandCell = (props) => {
  const formattedNumber = Number(props.dataItem.queueLimits.replace(/\s/g, ''));
  return (
  props.isInEdit ?
  <td {...props.tdProps}>
    <NumericTextBox defaultValue={formattedNumber} width={130} /> TPD
  </td>
  : 
  <td {...props.tdProps}>
    {props.children} TPD
  </td>
  );
};

const ModelCustomGridCell = (props) => {
  return props.isInEdit ? (
    <td {...props.tdProps}>
      <Input defaultValue={props.dataItem.model} />
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
    setEdit((edit) => ({ ...edit, [dataItem.model]: false }));
  };

  // Local state operations
  const discard = () => {
    const newData = [...data];
    newData.splice(0, 1);
    setData(newData);
  };

  const cancel = (dataItem) => {
    const originalItem = getItems().find((p) => p.model === dataItem.model);
    const isNewlyAdded = dataItem.model === null;

    if (isNewlyAdded) {
      const newData = data.filter((item) => item.model !== null);
      setData(newData);
    } else if (originalItem) {
      const newData = data.map((item) =>
        item.model === originalItem.model ? originalItem : item,
      );

      setData(newData);
      setEdit((edit) => ({ ...edit, [dataItem.model]: false }));
    }
  };

  const enterEdit = (dataItem) => {
    setEdit((edit) => ({ ...edit, [dataItem.model]: true }));
  };

  const itemChange = (event) => {
    const newData = data.map((item) =>
      item.model === event.dataItem.model
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
        field="model"
        title="Model"
        resizable={false}
        width={'155px'}
        editor="text"
        cells={{
          data: (props) => <ModelCustomGridCell {...props} />,
        }}
      />
      <GridColumn
        field="tokenLimits"
        title="Token Limits"
        cells={{ data: (props) => <TokenLimitsCell {...props} /> }}
        resizable={true}
        editable
        editor="numeric"
      />
      <GridColumn
        field="requestLimits"
        title="Request and Other Limits"
        width={'210px'}
        resizable={false}
        editable
        editor="numeric"
        cells={{ data: (props) => <RequestCommandCell {...props} /> }}
      />
      <GridColumn
        field="queueLimits"
        title="Batch Queue Limits"
        width={'190px'}
        resizable={false}
        editable
        editor="numeric"
        cells={{ data: (props) => <BatchCommandCell {...props} /> }}
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
