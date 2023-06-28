import React from 'react';
import { StatsProps } from '../FrontendTypes';
import '../css/StatsSummary.css';

export default function StatsSummary({
  totalApps,
  stackPercentage,
  responseRate,
  responseRateByAppStyle,
}: StatsProps) {
  // this conditional is necessary to avoid errors on initial render when data fetch is incomplete and properties are undefined
  if (totalApps && stackPercentage && responseRate && responseRateByAppStyle) {
    // function to handle instances of "NaN%"
    function output(rate: string) {
      return rate === 'NaN%' ? '0.00%' : rate;
    }
    return (
      <div className='statsSummary'>
        <h1>Total Applications - {totalApps}</h1>
        <h2>Apps by Stack</h2>
        <p>Full - {stackPercentage.full}</p>
        <p>Frontend - {stackPercentage.frontend}</p>
        <p>Backend - {stackPercentage.backend}</p>
        <h2>Response Rate</h2>
        <p>No Response - {responseRate.noResponse}</p>
        <p>Any Response - {responseRate.anyResponse}</p>
        <h2>Response Rate by App Style</h2>
        <h3>Traditional</h3>
        <p>
          No Response - {output(responseRateByAppStyle.traditional.noResponse)}
        </p>
        <p>
          Any Response -{' '}
          {output(responseRateByAppStyle.traditional.anyResponse)}
        </p>
        <h3>Quick</h3>
        <p>No Response - {output(responseRateByAppStyle.quick.noResponse)}</p>
        <p>Any Response - {output(responseRateByAppStyle.quick.anyResponse)}</p>
        <h3>Codesmith</h3>
        <p>
          No Response - {output(responseRateByAppStyle.codesmith.noResponse)}
        </p>
        <p>
          Any Response - {output(responseRateByAppStyle.codesmith.anyResponse)}
        </p>
      </div>
    );
  }
}
