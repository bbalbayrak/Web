import { renderSubPartDimensiol } from "./Segments/renderSubPartDimensiol";
import { renderFinalPartMeasurement } from "./Segments/renderFinalPartMeasurement";
import { renderPaintReport } from "./Segments/renderPaintReport";
import { renderQoatingReport } from "./Segments/renderQoatingReport";
import { renderProductPackingStandart } from "./Segments/renderProductPackingStandart";

export const segments = [
  { name: "Sub - Part Dimensiol", order: 1 },
  { name: "Final Part Measurement", order: 2 },
  { name: "Paint Report", order: 3 },
  { name: "Qoating Report", order: 4 },
  { name: "Product Packing Standart", order: 5 },
];

export const renderSegmentContent = ({
    activeSegment,
    form,
    finalRows,
    subpartRows,
    handleFinalInputChange,
    handleSubpartInputChange,
    handleDragOver,
    handleFinalDrop,
    handleSubpartDrop,
    handleFinalFileSelect,
    handleSubpartFileSelect,
    addFinalRow,
    addSubpartRow,
    saveSubForm,
    saveFinalForm,
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
        return renderPaintReport(form);
      case 4:
        return renderQoatingReport(form);
      case 5:
        return renderProductPackingStandart(form);
      default:
        return null;
    }
  };