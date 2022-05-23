import React from 'react';
import { Result } from 'antd';

import BackButton from './utils/BackButton.jsx'

function NotFoundPage() { 
  
  return (
    <>
      <Result status="404" title="404"
        subTitle="404 Not Found Page"
        extra={<BackButton path={'/'}/>} />
    </>
  );    
}

export default NotFoundPage