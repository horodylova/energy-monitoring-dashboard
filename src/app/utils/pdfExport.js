'use client';

import { savePDF } from '@progress/kendo-react-pdf';

export const exportToPDF = (elementRef, fileName = 'export.pdf', options = {}) => {
  if (!elementRef || !elementRef.current) {
    console.error('Element reference is required for PDF export');
    return;
  }

  const defaultOptions = {
    paperSize: 'auto',
    margin: { top: '1cm', left: '1cm', right: '1cm', bottom: '1cm' },
    fileName: fileName,
    author: 'Energy Monitoring Dashboard',
    creator: 'Energy Monitoring Dashboard',
    date: new Date(),
    scale: 0.8,
    landscape: false,
    forcePageBreak: '.page-break',
    keepTogether: '.keep-together',
    avoidLinks: true
  };

  const mergedOptions = { ...defaultOptions, ...options };

  try {
    if (options.title) {
      const titleElement = document.createElement('div');
      titleElement.className = 'pdf-title';
      titleElement.style.fontSize = '18px';
      titleElement.style.fontWeight = 'bold';
      titleElement.style.marginBottom = '15px';
      titleElement.style.textAlign = 'center';
      titleElement.style.color = options.color || '#fff'; 
      titleElement.textContent = options.title;
      
      const clonedElement = elementRef.current.cloneNode(true);
      clonedElement.insertBefore(titleElement, clonedElement.firstChild);
      
      clonedElement.style.background = options.background || '#333';
      clonedElement.style.color = options.color || '#fff';
      clonedElement.style.padding = '20px';
      clonedElement.style.borderRadius = '5px';
      
      const allSvgElements = clonedElement.querySelectorAll('svg');
      
      allSvgElements.forEach(svg => {
        svg.style.background = options.background || '#333';
      });
      
      const allTextElements = clonedElement.querySelectorAll('text, tspan');
      
      allTextElements.forEach(textElement => {
        textElement.style.fill = options.color || '#fff';
        textElement.setAttribute('fill', options.color || '#fff');
      });
      
      const tempContainer = document.createElement('div');
      tempContainer.style.position = 'absolute';
      tempContainer.style.left = '-9999px';
      tempContainer.appendChild(clonedElement);
      document.body.appendChild(tempContainer);
      
      savePDF(clonedElement, mergedOptions);
      
      document.body.removeChild(tempContainer);
    } else {
      savePDF(elementRef.current, mergedOptions);
    }
  } catch (error) {
    console.error('Error exporting to PDF:', error);
  }
};