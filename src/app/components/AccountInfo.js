'use client';

import React, { useEffect, useState } from 'react';
import { Button } from '@progress/kendo-react-buttons';
import { Grid, GridColumn } from '@progress/kendo-react-grid';
import { getAccountProperties } from '../services/octopus-api';
import { Loader } from '@progress/kendo-react-indicators';

export default function AccountInfo() {
  const [accountData, setAccountData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAccountData = async () => {
      try {
        setLoading(true);
        const data = await getAccountProperties();
        setAccountData(data);
        setError(null);
      } catch (err) {
        setError('Failed to load account data. Please try again later.');
        console.error('Error fetching account data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchAccountData();
  }, []);

  const renderProperty = (property) => {
    return (
      <div key={property.id} className="k-mb-4">
        <div className="k-d-flex k-flex-col k-gap-2 k-mb-3">
          <div className="k-font-weight-bold">Property Address:</div>
          <div>{property.address_line_1}</div>
          {property.address_line_2 && <div>{property.address_line_2}</div>}
          {property.address_line_3 && <div>{property.address_line_3}</div>}
          <div>{property.town}, {property.postcode}</div>
          <div>Moved in: {new Date(property.moved_in_at).toLocaleDateString()}</div>
        </div>

        <div className="k-font-weight-bold k-mb-2">Electricity Meter Points:</div>
        {property.electricity_meter_points.map((meterPoint) => (
          <div key={meterPoint.mpan} className="k-mb-3 k-border-bottom k-pb-3">
            <div className="k-d-flex k-flex-col k-gap-1">
              <div><span className="k-font-weight-bold">MPAN:</span> {meterPoint.mpan}</div>
              <div><span className="k-font-weight-bold">Profile Class:</span> {meterPoint.profile_class}</div>
              <div><span className="k-font-weight-bold">Consumption Standard:</span> {meterPoint.consumption_standard} kWh</div>
              <div><span className="k-font-weight-bold">Is Export:</span> {meterPoint.is_export ? 'Yes' : 'No'}</div>
            </div>

            <div className="k-font-weight-bold k-mt-2 k-mb-1">Meters:</div>
            <Grid
              data={meterPoint.meters}
              style={{ maxHeight: '200px' }}
            >
              <GridColumn field="serial_number" title="Serial Number" />
            </Grid>

            <div className="k-font-weight-bold k-mt-3 k-mb-1">Agreements:</div>
            <Grid
              data={meterPoint.agreements}
              style={{ maxHeight: '200px' }}
            >
              <GridColumn field="tariff_code" title="Tariff Code" />
              <GridColumn field="valid_from" title="Valid From" cell={(props) => (
                <td>{new Date(props.dataItem.valid_from).toLocaleDateString()}</td>
              )} />
              <GridColumn field="valid_to" title="Valid To" cell={(props) => (
                <td>{props.dataItem.valid_to ? new Date(props.dataItem.valid_to).toLocaleDateString() : 'Current'}</td>
              )} />
            </Grid>
          </div>
        ))}

        {property.gas_meter_points && property.gas_meter_points.length > 0 && (
          <>
            <div className="k-font-weight-bold k-mb-2">Gas Meter Points:</div>
            {property.gas_meter_points.map((gasPoint) => (
              <div key={gasPoint.mprn} className="k-mb-3 k-border-bottom k-pb-3">
                <div className="k-d-flex k-flex-col k-gap-1">
                  <div><span className="k-font-weight-bold">MPRN:</span> {gasPoint.mprn}</div>
                  <div><span className="k-font-weight-bold">Consumption Standard:</span> {gasPoint.consumption_standard} kWh</div>
                </div>

                <div className="k-font-weight-bold k-mt-2 k-mb-1">Meters:</div>
                <Grid
                  data={gasPoint.meters}
                  style={{ maxHeight: '200px' }}
                >
                  <GridColumn field="serial_number" title="Serial Number" />
                </Grid>

                <div className="k-font-weight-bold k-mt-3 k-mb-1">Agreements:</div>
                <Grid
                  data={gasPoint.agreements}
                  style={{ maxHeight: '200px' }}
                >
                  <GridColumn field="tariff_code" title="Tariff Code" />
                  <GridColumn field="valid_from" title="Valid From" cell={(props) => (
                    <td>{new Date(props.dataItem.valid_from).toLocaleDateString()}</td>
                  )} />
                  <GridColumn field="valid_to" title="Valid To" cell={(props) => (
                    <td>{props.dataItem.valid_to ? new Date(props.dataItem.valid_to).toLocaleDateString() : 'Current'}</td>
                  )} />
                </Grid>
              </div>
            ))}
          </>
        )}
      </div>
    );
  };

  return (
    <div>
      <h2 className="k-h5 !k-mb-5 k-color-subtle">
        Account Information
      </h2>
      <div
        className="k-flex-1 k-d-flex k-flex-col k-border k-border-solid k-border-border k-bg-surface-alt k-rounded-lg"
        style={{ background: 'var(--card-gradient)' }}
      >
        <div className="k-p-4 k-d-flex k-justify-content-between k-flex-wrap k-gap-2 k-align-items-center">
          <span className="k-font-size-xl k-font-weight-bold k-color-on-app-surface">
            Octopus Energy Account
          </span>
          <Button fillMode="flat" title="refresh" onClick={() => {
            setLoading(true);
            getAccountProperties()
              .then(data => {
                setAccountData(data);
                setError(null);
              })
              .catch(err => {
                setError('Failed to load account data. Please try again later.');
                console.error('Error refreshing account data:', err);
              })
              .finally(() => setLoading(false));
          }}>
            Refresh Data
          </Button>
        </div>
        <div className="k-p-4 k-flex-1">
          {loading ? (
            <div className="k-d-flex k-justify-content-center k-align-items-center" style={{ height: '200px' }}>
              <Loader size="large" type="infinite" />
            </div>
          ) : error ? (
            <div className="k-d-flex k-justify-content-center k-align-items-center k-text-error" style={{ height: '200px' }}>
              {error}
            </div>
          ) : accountData ? (
            <div>
              <div className="k-mb-4">
                <span className="k-font-weight-bold">Account Number:</span> {accountData.number}
              </div>
              {accountData.properties.map(renderProperty)}
            </div>
          ) : (
            <div className="k-d-flex k-justify-content-center k-align-items-center" style={{ height: '200px' }}>
              No account data available
            </div>
          )}
        </div>
      </div>
    </div>
  );
}