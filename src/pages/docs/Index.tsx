
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const DocsIndex = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    // Redirect to the introduction page which will be handled by DocPage
    navigate('/docs/introduction', { replace: true });
  }, [navigate]);

  // This will render briefly during the redirect
  return (
    <div className="animate-pulse p-4">
      Redirecting to introduction...
    </div>
  );
};

export default DocsIndex;
