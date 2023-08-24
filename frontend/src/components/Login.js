import React from 'react';

import EntryForm from './EntryForm';

function Login({ title, buttonName, onSubmit, isOpen, isLoading }) {

  return (
    <div className="entry-container">
      <EntryForm
        isOpen={isOpen}
        onSubmit={onSubmit}
        title={title}
        buttonName={buttonName}
        isLoading={isLoading}
      />
    </div>
  );
}

export default Login;