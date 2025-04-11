import React from 'react';

const Test: React.FC = () => {
  return (
    <div style={{ 
      width: '100%', 
      height: '100vh', 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center',
      background: 'linear-gradient(135deg, #ff9a9e 0%, #fad0c4 100%)',
      color: 'white',
      fontSize: '2rem'
    }}>
      Hello, this is a test component!
    </div>
  );
};

export default Test;
