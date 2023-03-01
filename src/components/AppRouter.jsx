import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { router } from '../router';

const AppRouter = () => {
  return (
    <Routes>
      {router.map(({ path, element }) => (
        <Route key={path} path={path} element={element} />
      ))}
      <Route path="*" element={<Navigate to={'/'} replace />} />
    </Routes>
  );
};

export default AppRouter;
