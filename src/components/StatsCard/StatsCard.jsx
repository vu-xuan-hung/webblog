import React from 'react';

const StatsCard = ({ title, value }) => {
    return (
        <div style={{
            backgroundColor: '#1E293B',
            borderRadius: '12px',
            padding: '20px 30px',
            color: '#E2E8F0',
            textAlign: 'center',
            minWidth: '250px'
        }}>
            <h3 style={{ fontSize: '16px', color: '#94A3B8', margin: 0 }}>{title}</h3>
            <h2 style={{ fontSize: '36px', fontWeight: 'bold', margin: '10px 0 0' }}>{value}</h2>
        </div>
    );
};

export default StatsCard;