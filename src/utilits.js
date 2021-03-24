import React from 'react';
import { Spin } from 'antd';

export const spiner = () => (
  <div className="example">
    <Spin size="large" />
  </div>
);

export const showTags = (arr) => {
  if (arr.length !== 0) arr.map((elem) => elem);
  return 'There are no tags';
};
