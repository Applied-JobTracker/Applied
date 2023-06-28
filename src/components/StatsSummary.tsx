import React from 'react';
import { StatsProps } from '../FrontendTypes';

export default function StatsSummary({ totalApps, stackPercentage, responseRate, responseRateByAppStyle } : StatsProps) {

  return (
    <div className='statsSummary'>
        {/* CONFIRM PROPERTY NAMES WITH BACKEND FOR EACH STAT */}
        <ul>Total Apps: {totalApps}</ul>
        <ul>Apps by Stack:</ul>
            {/* would be great to sort these */}
            <li>Full: {stackPercentage.full}</li>
            <li>Frontend: {stackPercentage.frontend}</li>
            <li>Backend: {stackPercentage.backend}</li>
        <ul>Response Rate</ul>
            <li>No Response: {responseRate.noResponse}</li>
            <li>Any Response: {responseRate.anyResponse}</li>
        <ul>Response Rate by App Style</ul>
            <ul>Regular:</ul>
                <li>No Response: {responseRateByAppStyle.regular.noResponse}</li>
                <li>Any Response: {responseRateByAppStyle.regular.anyResponse}</li>
            <ul>Quick:</ul>
                <li>No Response: {responseRateByAppStyle.quick.noResponse}</li>
                <li>Any Response: {responseRateByAppStyle.quick.anyResponse}</li>
            <ul>Codesmith:</ul>
                <li>No Response: {responseRateByAppStyle.codesmith.noResponse}</li>
                <li>Any Response: {responseRateByAppStyle.codesmith.anyResponse}</li>
    </div>
  );
};
