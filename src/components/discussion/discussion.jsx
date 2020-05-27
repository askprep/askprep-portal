import React from 'react';
import RichTextEditor from './RichTextEditor';
import Rects from '../rects/rects';
export const Discussion = ({ currentPage }) => {
  return currentPage === 'rects' ? <Rects /> : <RichTextEditor />;
};
