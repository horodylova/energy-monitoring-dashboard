// 'use client';

// import { savePDF } from '@progress/kendo-react-pdf';

// export const exportToPDF = (elementRef, fileName = 'export.pdf', options = {}) => {
//   if (!elementRef || !elementRef.current) {
//     console.error('Element reference is required for PDF export');
//     return;
//   }

//   const defaultOptions = {
//     paperSize: 'A3',
//     margin: { top: '1cm', left: '1cm', right: '1cm', bottom: '1cm' },
//     fileName: fileName,
//     author: 'Energy Monitoring Dashboard',
//     creator: 'Energy Monitoring Dashboard',
//     date: new Date(),
//     scale: 0.8,
//     landscape: false,
//     forcePageBreak: '.page-break',
//     keepTogether: '.keep-together',
//     avoidLinks: true
//   };

//   const mergedOptions = { ...defaultOptions, ...options };

//   try {
//     if (options.title) {
//       const titleElement = document.createElement('div');
//       titleElement.className = 'pdf-title';
//       titleElement.style.fontSize = '18px';
//       titleElement.style.fontWeight = 'bold';
//       titleElement.style.marginBottom = '15px';
//       titleElement.style.textAlign = 'left';
//       titleElement.style.color = options.color || '#fff'; 
//       titleElement.textContent = options.title;
      
//       const clonedElement = elementRef.current.cloneNode(true);
//       clonedElement.insertBefore(titleElement, clonedElement.firstChild);

//      clonedElement.style.width = '1600px'; 
//      clonedElement.style.height = 'auto'; 
      
//       clonedElement.style.background = options.background || '#333';
//       clonedElement.style.color = options.color || '#fff';
//       clonedElement.style.padding = '20px';
//       clonedElement.style.borderRadius = '5px';
      
//       const allSvgElements = clonedElement.querySelectorAll('svg');
      
//       allSvgElements.forEach(svg => {
//         svg.style.background = options.background || '#333';
//       });
      
//       const allTextElements = clonedElement.querySelectorAll('text, tspan');
      
//       allTextElements.forEach(textElement => {
//         textElement.style.fill = options.color || '#fff';
//         textElement.setAttribute('fill', options.color || '#fff');
//       });
      
//       const tempContainer = document.createElement('div');
//       tempContainer.style.position = 'absolute';
//       tempContainer.style.left = '-9999px';
//       tempContainer.appendChild(clonedElement);
//       document.body.appendChild(tempContainer);
      
//       savePDF(clonedElement, mergedOptions);
      
//       document.body.removeChild(tempContainer);
//     } else {
//       savePDF(elementRef.current, mergedOptions);
//     }
//   } catch (error) {
//     console.error('Error exporting to PDF:', error);
//   }
// };

'use client';

import { savePDF } from '@progress/kendo-react-pdf';

export const exportToPDF = (elementRef, fileName = 'export.pdf', options = {}) => {
  if (!elementRef || !elementRef.current) {
    console.error('Element reference is required for PDF export');
    return;
  }

  const defaultOptions = {
    paperSize: 'A3',
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
    const clonedElement = elementRef.current.cloneNode(true);

    // Добавим заголовок, если указан
    if (options.title) {
      const titleElement = document.createElement('div');
      titleElement.className = 'pdf-title';
      titleElement.style.fontSize = '18px';
      titleElement.style.fontWeight = 'bold';
      titleElement.style.marginBottom = '15px';
      titleElement.style.textAlign = 'left';
      titleElement.style.color = options.color || '#fff';
      titleElement.textContent = options.title;
      clonedElement.insertBefore(titleElement, clonedElement.firstChild);
    }

    // Применим общие стили
    clonedElement.style.background = options.background || '#333';
    clonedElement.style.color = options.color || '#fff';
    clonedElement.style.padding = '20px';
    clonedElement.style.borderRadius = '5px';

    // Найдём SVG и увеличим его размеры
    const allSvgElements = clonedElement.querySelectorAll('svg');
    allSvgElements.forEach(svg => {
      svg.setAttribute('width', '2200');   // Увеличиваем ширину
      svg.setAttribute('height', '800');   // И высоту
      svg.style.width = '1200px';
      svg.style.height = '800px';
      svg.style.background = options.background || '#333';
    });

    // Цвет текста на графике
    const allTextElements = clonedElement.querySelectorAll('text, tspan');
    allTextElements.forEach(textElement => {
      textElement.style.fill = options.color || '#fff';
      textElement.setAttribute('fill', options.color || '#fff');
    });

    // Временный контейнер для печати
    const tempContainer = document.createElement('div');
    tempContainer.style.position = 'absolute';
    tempContainer.style.left = '-9999px';
    tempContainer.style.top = '0';
    tempContainer.appendChild(clonedElement);
    document.body.appendChild(tempContainer);

    savePDF(clonedElement, mergedOptions);

    document.body.removeChild(tempContainer);
  } catch (error) {
    console.error('Error exporting to PDF:', error);
  }
};
