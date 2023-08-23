import React from 'react';



const Signin = () => {
  const containerStyle = {
    display: 'flex',
    flexDirection: 'column', // Align children in a column
    justifyContent: 'center', // Center horizontally
    alignItems: 'center',    // Center vertically
    height: '100vh',         // Set height to full viewport height
  };

  
  const textStyle = {
    marginTop: '10px', // Add space between navbar and content
  };

  return (
   
    <div>
      
      
      <div style={containerStyle}>
        {/* Main content */}
        <h1 style={textStyle}>Hello, You have been successfully Logged In</h1>
      </div>
    </div>
  
  );
};

export default Signin;
