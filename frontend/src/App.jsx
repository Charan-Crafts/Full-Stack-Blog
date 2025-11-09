import React from 'react';

const App = () => {
  const userName = import.meta.env.VITE_NAME
  
  return (
    <div>
      <h1>{userName}</h1>
    </div>
  );
}

export default App;
