import { renderSubPartDimensiol } from "./Segments/renderSubPartDimensiol";
import { renderFinalPartMeasurement } from "./Segments/renderFinalPartMeasurement";
import { renderPaintReport } from "./Segments/renderPaintReport";
import { renderCoatingReport } from "./Segments/renderCoatingReport";
import { renderProductPackingStandart } from "./Segments/renderProductPackingStandart";

export const segments = [
  { name: "Sub - Part Dimensiol", order: 1 },
  { name: "Final Part Measurement", order: 2 },
  { name: "Paint Report", order: 3 },
  { name: "Coating Report", order: 4 },
  { name: "Product Packing Standart", order: 5 },
];

export const renderSegmentContent = ({
  activeSegment,
  form,
  finalRows,
  subpartRows,
  paintRows,
  coatingRows,
  productPackingRows,
  handleFinalInputChange,
  handleSubpartInputChange,
  handlePaintInputChange,
  handleCoatingInputChange,
  handleProductPackingInputChange,
  handleDragOver,
  handleFinalDrop,
  handleSubpartDrop,
  handlePaintDrop,
  handleCoatingDrop,
  handleProductPackingDrop,
  handleFinalFileSelect,
  handleSubpartFileSelect,
  handlePaintFileSelect,
  handleCoatingFileSelect,
  handleProductPackingFileSelect,
  addFinalRow,
  addSubpartRow,
  addPaintRow,
  addCoatingRow,  
  addProductPackingRow,
  saveSubForm,
  saveFinalForm,
  savePaintForm,
  saveCoatingForm,
  saveProductPackingForm,
  }) => {
    
    switch (activeSegment) {
      case 1:
        return renderSubPartDimensiol({
          form,
          subpartRows,
          handleInputChange: handleSubpartInputChange,
          handleDragOver,
          handleDrop: handleSubpartDrop,
          handleFileSelect: handleSubpartFileSelect,
          addRow: addSubpartRow,
          saveSubForm,
        });
      case 2:
        return renderFinalPartMeasurement({
          form,
          finalRows,
          handleInputChange: handleFinalInputChange,
          handleDragOver,
          handleDrop: handleFinalDrop,
          handleFileSelect: handleFinalFileSelect,
          addRow: addFinalRow,
          saveFinalForm,
        });
      case 3:
        return renderPaintReport({
          form,
          paintRows,
          handleInputChange: handlePaintInputChange,
          handleDragOver,
          handleDrop: handlePaintDrop,
          handleFileSelect: handlePaintFileSelect,
          addRow: addPaintRow,
          savePaintForm,
        });
      case 4:
        return renderCoatingReport({
          form,
          coatingRows,
          handleInputChange: handleCoatingInputChange,
          handleDragOver,
          handleDrop: handleCoatingDrop,
          handleFileSelect: handleCoatingFileSelect,
          addRow: addCoatingRow,
          saveCoatingForm,
          });
      case 5:
        return renderProductPackingStandart({
          form,
          productPackingRows,
          handleInputChange: handleProductPackingInputChange,
          handleDragOver,
          handleDrop: handleProductPackingDrop,
          handleFileSelect: handleProductPackingFileSelect,
          addRow: addProductPackingRow,
          saveProductPackingForm,
        });
      default:
        return null;
    }
  };