/* eslint react/jsx-fragments: off */

import React from 'react';

// we don't need root for now
export const RecoilRoot: React.FC = ({ children }) => (
  <React.Fragment>{children}</React.Fragment>
);
