'use client'

import React from 'react';
import {
  TextBox,
  InputPrefix,
  InputSeparator,
} from '@progress/kendo-react-inputs';

import { Badge } from '@progress/kendo-react-indicators';
import { SvgIcon } from '@progress/kendo-react-common';
import {
  Button,
  ButtonGroup,
  ChipList,
  DropDownButton,
} from '@progress/kendo-react-buttons';
import {
  AppBar,
  AppBarSection,
  Drawer,
  DrawerContent,
} from '@progress/kendo-react-layout';

import { chipData, drawerItems, adminItems } from './data';

import RequestsChart from './internal-building-blocks/requests-chart';
import DailyStats from './components/DailyStats';
import Usage from './components/Usage';
import TariffsAndExpenses from './components/TariffsAndExpenses';
import Detection from './components/Detection';
import Features from './components/Features';
import RateLimits from './components/RateLimits';
import Members from './components/Members';
import AccountInfo from './components/AccountInfo';
 
import logo from '@/app/assets/logo.svg';
import compactLogo from '@/app/assets/compact-logo.svg';

import {
  bellIcon,
  caretAltDownIcon,
  menuIcon,
  searchIcon,
  userIcon,
  exportIcon,
  envelopeIcon
} from '@progress/kendo-svg-icons';

import {
  CustomDrawerItem,
  CustomChip,
  adminItemsRender
} from './custom-components/CustomComponents';

export default function Home() {
  const [expanded, setExpanded] = React.useState(true);
  const [items, setItems] = React.useState(drawerItems);
  const [refreshChart, setRefreshChart] = React.useState(true);
  
  // Состояние для DailyStats
  const [selectedDate, setSelectedDate] = React.useState(new Date());
  const [electricityData, setElectricityData] = React.useState(null);
  const [gasData, setGasData] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  const handleDrawerState = () => {
    setExpanded(prevState => !prevState);
    setRefreshChart(false);
  };
  const handleChartRefresh = (chartOptions, themeOptions, chartInstance) => {
    if (refreshChart) {
      chartInstance.setOptions(chartOptions, themeOptions);
    }
  };

  const onSelect = (ev) => {
    const currentItem = ev.itemTarget.props;
    const isParent = currentItem.text === 'Performance' || currentItem.text === 'Data Sources';
    const newData = items.map(item => {
      const {
        dataExpanded: currentExpanded,
        id,
        ...others
      } = item;
      const isCurrentItem = currentItem.id === id;
      const nextExpanded = item.dataExpanded === undefined ? !currentExpanded : !item.dataExpanded;
      return {
        selected: isCurrentItem,
        dataExpanded: isCurrentItem && isParent ? nextExpanded : currentExpanded,
        id,
        ...others
      };
    });
    setItems(newData);
  };
  const data = items.map(item => {
    const {
      parentId,
      ...others
    } = item;
    if (parentId !== undefined) {
      const parentEl = items.find(parent => parent.id === parentId);
      return {
        ...others,
        visible: parentEl && parentEl.dataExpanded
      };
    }
    return item;
  });
  return (
    <>
      {/* TPNAV-1 Start */}
      <header className="k-d-contents">
        <AppBar positionMode="sticky" themeColor="dark" aria-label="appbar">
          <AppBarSection className="k-flex-basis-0 k-flex-grow k-gap-4">
            <Button svgIcon={menuIcon} fillMode="clear" themeColor="light" title='Toggle Drawer' onClick={handleDrawerState} />
            <a href="#" className="k-d-none k-d-md-flex">
              <img src={logo} alt="Logo" />
            </a>
            <a href="#" className="k-d-flex k-d-md-none">
              <img src={compactLogo} alt="Compact Logo" />
            </a>
          </AppBarSection>

          <AppBarSection
            className="k-flex-basis-0 k-flex-grow k-justify-content-center"
            aria-label="app-bar"
          >
            <div className="k-d-flex k-d-sm-none">
              <Button svgIcon={searchIcon} fillMode="clear" title="btn" />
            </div>
            <div className="k-d-none k-d-sm-flex">
              <TextBox
                prefix={() => (
                  <>
                    <InputPrefix>
                      <SvgIcon icon={searchIcon} />
                    </InputPrefix>
                    <InputSeparator />
                  </>
                )}
                placeholder="Search"
                fillMode="solid"
                style={{ width: '360px' }}
                aria-label="Search Textbox"
              />
            </div>
          </AppBarSection>

          <AppBarSection className="k-flex-basis-0 k-flex-grow k-justify-content-end k-gap-2">
            <div className="k-badge-container">
              <Button
                svgIcon={bellIcon}
                fillMode="flat"
                themeColor="light"
                title="Notifications"
              />
              <Badge
                rounded="full"
                position="inside"
                align={{ vertical: 'top', horizontal: 'end' }}
                themeColor="tertiary"
              />
            </div>

            <div className="k-badge-container k-d-none k-d-lg-block">
              <Button
                svgIcon={envelopeIcon}
                fillMode="flat"
                themeColor="light"
                title="Mail"
              />
              <Badge
                rounded="full"
                position="inside"
                align={{ vertical: 'top', horizontal: 'end' }}
                themeColor="tertiary"
                aria-label="badge"
              />
            </div>

            <span className="k-appbar-separator k-color-border"></span>
            {/* DropDownButton with Image and Text */}
            <DropDownButton
              className="k-d-inline-flex k-d-md-none"
              fillMode="flat"
              themeColor="light"
              items={adminItems}
              itemRender={adminItemsRender}
              svgIcon={userIcon}
              title="Profile"
            />

            <DropDownButton
              className="k-d-none k-d-md-inline-flex"
              fillMode="flat"
              themeColor="light"
              text="Hi admin"
              items={adminItems}
              itemRender={adminItemsRender}
              startIcon={<SvgIcon icon={userIcon} />}
              endIcon={<SvgIcon icon={caretAltDownIcon} />}
              title="Profile"
            />
            {/* End of DropDownButton with Icon and Text */}
          </AppBarSection>
        </AppBar>
      </header>
      {/* TPNAV-1 End */}

      <Drawer expanded={expanded} mode="push" aria-label='drawer' items={data} item={CustomDrawerItem} width={248} onSelect={onSelect}>
        <DrawerContent style={{ background: 'var(--panel-gradient)' }}>
          <main className="k-px-2 k-px-sm-4.5 k-px-md-6 k-px-lg-4 k-px-xl-10 k-py-2 k-py-sm-4.5 k-py-md-6 k-py-lg-4 k-py-xl-12 k-pt-8">
            <h1 className="k-h1 !k-mb-5 k-color-primary k-text-ellipsis">
              Energy Monitoring Dashboard
            </h1>

            <div className="k-display-flex k-flex-col k-gap-10">
              {/* Daily Stats - передаем состояние через props */}
              <DailyStats 
                selectedDate={selectedDate}
                setSelectedDate={setSelectedDate}
                electricityData={electricityData}
                setElectricityData={setElectricityData}
                gasData={gasData}
                setGasData={setGasData}
                loading={loading}
                setLoading={setLoading}
                error={error}
                setError={setError}
              />
              
              {/* Usage */}
              <Usage onRefresh={handleChartRefresh} />

              {/* Cost */}
              <div className="k-d-grid k-grid-cols-3 k-gap-10 k-gap-xl-4">
                <div className="k-col-span-3 k-col-span-xl-2 k-d-flex k-flex-col k-gap-10">
                  <TariffsAndExpenses onRefresh={handleChartRefresh} />
                  <div className="k-flex-1 k-d-flex k-flex-col">
                    <h2 className="k-h5 !k-mb-5 k-color-subtle">Requests</h2>
                    <div
                      className="k-flex-1 k-d-flex k-flex-col k-border k-border-solid k-border-border k-bg-surface-alt k-rounded-lg"
                      style={{ background: 'var(--card-gradient)' }}
                    >
                      <div className="k-p-4 k-d-flex k-justify-content-between k-flex-wrap k-gap-2">
                        <span className="k-font-size-xl k-font-weight-bold k-color-on-app-surface">
                          Requests over time
                        </span>
                        <ButtonGroup>
                          <Button title="min">Minute</Button>
                          <Button className="k-selected" title="day">
                            Day
                          </Button>
                          <Button title="month">Month</Button>
                          <Button title="year">Year</Button>
                          <Button title="total">Total</Button>
                        </ButtonGroup>
                      </div>
                      <div className="k-flex-1 k-p-4 k-d-flex k-flex-col k-gap-4">
                        <ChipList
                          className="k-gap-2"
                          data={chipData}
                          chip={CustomChip}
                          ariaLabel="chiplist"
                        />
                        <div className="k-flex-1">
                          {/* chart with 100% height */}
                          <RequestsChart onRefresh={handleChartRefresh} />
                        </div>
                      </div>
                      <div className="k-p-2">
                        <Button
                          svgIcon={exportIcon}
                          fillMode="flat"
                          title="export"
                        >
                          Export
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="k-col-span-3 k-col-span-xl-1 k-d-flex k-flex-col k-gap-10 ">
                  {/* Content detection */}
                  <Detection />
                  <Features onRefresh={handleChartRefresh} />
                </div>
              </div>

              {/* Rate Limits */}
              <RateLimits />

              {/* Members */}
              <Members />

              {/* Api Keys Management */}
              <AccountInfo />
              
              {/* Get Account Info for debugging */}
              
            </div>
          </main>
          {/* FTR-7 Start */}
          <footer className="!k-bg-dark k-color-on-app-surface k-bg-light k-py-6 k-px-2 k-px-sm-4.5 k-px-md-6 k-px-lg-4 k-px-xl-10">
            <p className="!k-mb-0">
            Hello
            </p>
          </footer>
          {/* FTR-7 End */}
        </DrawerContent>
      </Drawer>
      <style>{`
      .k-drawer-wrapper {
        padding: 16px;
      }`}</style>
    </>
  );
}
