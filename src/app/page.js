'use client'

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

import React from 'react';
import dynamic from 'next/dynamic';

// Динамически импортируем все Kendo UI компоненты без SSR
const Button = dynamic(() => import('@progress/kendo-react-buttons').then(mod => ({ default: mod.Button })), { ssr: false });
const ButtonGroup = dynamic(() => import('@progress/kendo-react-buttons').then(mod => ({ default: mod.ButtonGroup })), { ssr: false });
const ChipList = dynamic(() => import('@progress/kendo-react-buttons').then(mod => ({ default: mod.ChipList })), { ssr: false });

const AppBar = dynamic(() => import('@progress/kendo-react-layout').then(mod => ({ default: mod.AppBar })), { ssr: false });
const AppBarSection = dynamic(() => import('@progress/kendo-react-layout').then(mod => ({ default: mod.AppBarSection })), { ssr: false });
const Drawer = dynamic(() => import('@progress/kendo-react-layout').then(mod => ({ default: mod.Drawer })), { ssr: false });
const DrawerContent = dynamic(() => import('@progress/kendo-react-layout').then(mod => ({ default: mod.DrawerContent })), { ssr: false });

// Динамически импортируем компоненты
const DailyStats = dynamic(() => import('./components/DailyStats'), { ssr: false });
const Usage = dynamic(() => import('./components/Utilisation'), { ssr: false });
const TariffsAndExpenses = dynamic(() => import('./components/TariffsAndExpenses'), { ssr: false });
const CostConsumption = dynamic(() => import('./components/CostConsumption'), { ssr: false });
const Detection = dynamic(() => import('./components/Detection'), { ssr: false });
const Features = dynamic(() => import('./components/Features'), { ssr: false });

const CustomDrawerItem = dynamic(() => import('./custom-components/CustomComponents').then(mod => ({ default: mod.CustomDrawerItem })), { ssr: false });
const CustomChip = dynamic(() => import('./custom-components/CustomComponents').then(mod => ({ default: mod.CustomChip })), { ssr: false });

import { chipData, drawerItems } from './data';

import Image from 'next/image';
import logo from '@/app/assets/logo.svg';

// Динамически импортируем SVG иконки
const menuIcon = dynamic(() => import('@progress/kendo-svg-icons').then(mod => ({ default: mod.menuIcon })), { ssr: false });
const exportIcon = dynamic(() => import('@progress/kendo-svg-icons').then(mod => ({ default: mod.exportIcon })), { ssr: false });


export default function Home() {


  const [expanded, setExpanded] = React.useState(true);
 const [items, setItems] = React.useState(drawerItems);
 const [refreshChart, setRefreshChart] = React.useState(true);


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
            
<Image src={logo} alt="Logo" width={200} height={50} />
           </a>
        
         </AppBarSection>


         <AppBarSection
           className="k-flex-basis-0 k-flex-grow k-justify-content-center"
           aria-label="app-bar"
         >
      
         </AppBarSection>


         <AppBarSection className="k-flex-basis-0 k-flex-grow k-justify-content-end k-gap-2">
  
        
           <p className="!k-mb-0">
            Hi, Svitlana!</p>
         
         </AppBarSection>
       </AppBar>
     </header>
   


     <Drawer expanded={expanded} mode="push" aria-label='drawer' items={data} item={CustomDrawerItem} width={248} onSelect={onSelect}>
       <DrawerContent style={{ background: 'var(--panel-gradient)' }}>
         <main className="k-px-2 k-px-sm-4.5 k-px-md-6 k-px-lg-4 k-px-xl-10 k-py-2 k-py-sm-4.5 k-py-md-6 k-py-lg-4 k-py-xl-12 k-pt-8">
           <h1 id="dashboard" className="k-h1 !k-mb-5 k-color-primary k-text-ellipsis">
             Energy Monitoring Dashboard
           </h1>


           <div className="k-display-flex k-flex-col k-gap-10">
            
             <div id="daily-stats">
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
             </div>
            
        
             <div id="utilisation">
               <Usage onRefresh={handleChartRefresh} />
             </div>


             <div className="k-d-grid k-grid-cols-3 k-gap-10 k-gap-xl-4">
               <div className="k-col-span-3 k-col-span-xl-2 k-d-flex k-flex-col k-gap-10">
                 <div className="k-col-span-3 k-col-span-xl-2 k-d-flex k-flex-col k-gap-10">
                   <div id="tariffs-expenses">
                     <TariffsAndExpenses onRefresh={handleChartRefresh} />
                   </div>
                 <div id='cost/consumption'>
                     <CostConsumption onRefresh={handleChartRefresh} />
                 </div>
                 </div>
               </div>
               <div className="k-col-span-3 k-col-span-xl-1 k-d-flex k-flex-col k-gap-10 ">
             
                 <div id="energy-monitoring">
                   <Detection />
                 </div>
                 <div id="hourly-consumption">
                   <Features onRefresh={handleChartRefresh} />
                 </div>
               </div>
             </div>


           </div>
         </main>
         {/* FTR-7 Start */}
         <footer className="!k-bg-dark k-color-on-app-surface k-bg-light k-py-6 k-px-2 k-px-sm-4.5 k-px-md-6 k-px-lg-4 k-px-xl-10">
           <p className="!k-mb-0">
             © 2025 Energy Monitoring Dashboard | Developed by Svitlana Horodylova | Data provided by <a href="https://octopus.energy/" className="k-color-primary" target="_blank" rel="noopener noreferrer">Octopus Energy API</a> | Built with <a href="https://www.telerik.com/kendo-react-ui/" className="k-color-primary" target="_blank" rel="noopener noreferrer">KendoReact UI</a>
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
