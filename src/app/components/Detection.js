import React from 'react';
import VoltageGauge from '../internal-building-blocks/VoltageGauge';
import EnergyEfficiencyGauge from '../internal-building-blocks/EnergyEfficiencyGauge';
import GreenEnergyGauge from '../internal-building-blocks/GreenEnergyGauge';

export default function Detection() {
  return (
    <div>
      <h2 className="k-h5 !k-mb-5 k-color-subtle">
        Energy Monitoring
      </h2>
      <div className="k-d-grid k-grid-cols-3 k-gap-4">
        <div
          className="k-col-span-3 k-col-span-md-1 k-col-span-xl-3 k-d-flex k-flex-col k-border k-border-solid k-border-border k-bg-surface-alt k-overflow-x-auto k-rounded-lg"
          style={{ background: 'var(--card-gradient)' }}
        >
          <div className="k-d-flex k-flex-wrap k-align-items-center k-justify-content-between k-p-4">
            <span className="k-font-size-xl k-font-weight-bold k-color-on-app-surface">
              Network Voltage
            </span>
          </div>
          <div className="k-flex-1 k-d-flex k-flex-col k-gap-8 k-p-4">
            <div className="k-d-flex k-justify-content-center">
              <VoltageGauge />
            </div>
            <div className="k-d-flex k-gap-2 k-flex-row k-flex-md-col k-flex-xl-row">
              <div className="k-d-flex k-d-md-none k-d-xl-flex k-flex-1 k-flex-column k-align-items-end k-color-subtle">
                <span className="k-font-weight-bold">220-230V</span>
                <span className="k-text-right">
                  normal voltage range
                </span>
              </div>
              <div className="k-d-none k-d-md-flex k-d-xl-none k-flex-1 k-flex-column k-align-items-start k-color-subtle">
                <span className="k-font-weight-bold">220-230V</span>
                <span>
                  normal voltage range
                </span>
              </div>
              <span className="k-d-md-none k-d-xl-block k-separator k-separator-vertical k-border-border k-h-8 k-m-auto"></span>
              <span className="k-d-none k-d-md-block k-d-xl-none k-separator k-separator-horizontal k-border-border"></span>
              <div className="k-d-flex k-flex-1 k-flex-column k-align-items-start k-color-subtle">
                <span className="k-font-weight-bold">215-235V</span>
                <span>acceptable voltage range</span>
              </div>
            </div>
          </div>
        </div>
        
        <div
          className="k-col-span-3 k-col-span-md-1 k-col-span-xl-3 k-d-flex k-flex-col k-border k-border-solid k-border-border k-bg-surface-alt k-overflow-x-auto k-rounded-lg"
          style={{ background: 'var(--card-gradient)' }}
        >
          <div className="k-d-flex k-flex-wrap k-align-items-center k-justify-content-between k-p-4">
            <span className="k-font-size-xl k-font-weight-bold k-color-on-app-surface">
              Energy Consumption Efficiency
            </span>
          </div>
          <div className="k-flex-1 k-d-flex k-flex-col k-gap-8 k-p-4">
            <div className="k-d-flex k-justify-content-center">
              <EnergyEfficiencyGauge />
            </div>
            <div className="k-d-flex k-gap-2 k-flex-row k-flex-md-col k-flex-xl-row">
              <div className="k-d-flex k-d-md-none k-d-xl-flex k-flex-1 k-flex-column k-align-items-end k-color-subtle">
                <span className="k-font-weight-bold">≥ 115%</span>
                <span className="k-text-right">
                  high efficiency
                </span>
              </div>
              <div className="k-d-none k-d-md-flex k-d-xl-none k-flex-1 k-flex-column k-align-items-start k-color-subtle">
                <span className="k-font-weight-bold">≥ 115%</span>
                <span>
                  high efficiency
                </span>
              </div>
              <span className="k-d-md-none k-d-xl-block k-separator k-separator-vertical k-border-border k-h-8 k-m-auto"></span>
              <span className="k-d-none k-d-md-block k-d-xl-none k-separator k-separator-horizontal k-border-border"></span>
              <div className="k-d-flex k-flex-1 k-flex-column k-align-items-start k-color-subtle">
                <span className="k-font-weight-bold">&lt; 85%</span>
                <span>low efficiency</span>
              </div>
            </div>
          </div>
        </div>
        
        <div
          className="k-col-span-3 k-col-span-md-1 k-col-span-xl-3 k-d-flex k-flex-col k-border k-border-solid k-border-border k-bg-surface-alt k-overflow-x-auto k-rounded-lg"
          style={{ background: 'var(--card-gradient)' }}
        >
          <div className="k-d-flex k-flex-wrap k-align-items-center k-justify-content-between k-p-4">
            <span className="k-font-size-xl k-font-weight-bold k-color-on-app-surface">
              Green Energy Usage
            </span>
          </div>
          <div className="k-flex-1 k-d-flex k-flex-col k-gap-8 k-p-4">
            <div className="k-d-flex k-justify-content-center">
              <GreenEnergyGauge />
            </div>
            <div className="k-d-flex k-gap-2 k-flex-row k-flex-md-col k-flex-xl-row">
              <div className="k-d-flex k-d-md-none k-d-xl-flex k-flex-1 k-flex-column k-align-items-end k-color-subtle">
                <span className="k-font-weight-bold">≥ 70%</span>
                <span className="k-text-right">
                  high renewable sources
                </span>
              </div>
              <div className="k-d-none k-d-md-flex k-d-xl-none k-flex-1 k-flex-column k-align-items-start k-color-subtle">
                <span className="k-font-weight-bold">≥ 70%</span>
                <span>
                  high renewable sources
                </span>
              </div>
              <span className="k-d-md-none k-d-xl-block k-separator k-separator-vertical k-border-border k-h-8 k-m-auto"></span>
              <span className="k-d-none k-d-md-block k-d-xl-none k-separator k-separator-horizontal k-border-border"></span>
              <div className="k-d-flex k-flex-1 k-flex-column k-align-items-start k-color-subtle">
                <span className="k-font-weight-bold">&lt; 30%</span>
                <span>low renewable sources</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* DASHBRDCARD-12 End */}
      </div>
    </div>
  );
}