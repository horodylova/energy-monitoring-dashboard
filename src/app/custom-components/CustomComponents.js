import React from 'react';
import Image from 'next/image';
import {
  ToggleButton,
} from '@progress/kendo-react-dateinputs';
import {
  Chip,
} from '@progress/kendo-react-buttons';
import {
  DrawerItem,
} from '@progress/kendo-react-layout';
import { SvgIcon } from '@progress/kendo-react-common';
import { xIcon, chevronUpIcon, chevronDownIcon } from '@progress/kendo-svg-icons';

export const CustomDrawerItem = (props) => {
  const { visible, dataExpanded, parentId, id, className, level, href, ...others } = props;
  const arrowDir = dataExpanded ? chevronUpIcon : chevronDownIcon;

  if (!props.separator) {
    const itemContent = (
      <>
        {props.image && (
          <div style={{ width: '16px', height: '16px', position: 'relative', marginRight: '8px' }}>
            <Image 
              src={props.image} 
              alt={`Icon for ${props.text}`}
              fill
              style={{ objectFit: 'contain' }}
            />
          </div>
        )}
        <span className="k-item-text">{props.text}</span>
        {dataExpanded !== undefined && (
          <SvgIcon
            icon={arrowDir}
            style={{
              marginLeft: 'auto',
            }}
          />
        )}
      </>
    );

    return visible === false ? null : (
      <DrawerItem id={props.id} className={`${className} k-font-size-md k-align-items-center`} {...others}>
        {href ? (
          <a href={href} style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', color: 'inherit', width: '100%' }}>
            {itemContent}
          </a>
        ) : (
          itemContent
        )}
      </DrawerItem>
    )
  } else {
    return <DrawerItem separator={props.separator} />;
  }
};

export const CustomToggleButton = (props) => {
  return (
    <>
      <SvgIcon className="k-clear-value" icon={xIcon} />
      <ToggleButton {...props} title="togglebtn">
        <span className="k-icon k-i-sort-desc-sm" />
      </ToggleButton>
    </>
  );
};

export const CustomChip = (props) => {
  return <Chip {...props} rounded={'full'} ariaLabel="chiplist" />;
};

export const adminItemsRender = (props) => {
  return (
    <div>
      <SvgIcon icon={props.item.icon} className="k-mr-2" />
      {`${props.item.text}`}
    </div>
  );
};