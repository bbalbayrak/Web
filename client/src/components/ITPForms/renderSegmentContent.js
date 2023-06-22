import { renderSubPartDimensiol } from "./renderSubPartDimensiol";
import { renderFinalPartMeasurement } from "./renderFinalPartMeasurement";
import { renderPaintReport } from "./renderPaintReport";
import { renderQoatingReport } from "./renderQoatingReport";
import { renderProductPackingStandart } from "./renderProductPackingStandart";

export const renderSegmentContent = ({
    activeSegment,
    form,
    rows,
    handleInputChange,
    handleDragOver,
    handleDrop,
    handleFileSelect,
    addRow,
    saveForm,
  }) => {
    switch (activeSegment) {
      case 1:
        return renderSubPartDimensiol(form);
      case 2:
        return renderFinalPartMeasurement({
          form,
          rows,
          handleInputChange,
          handleDragOver,
          handleDrop,
          handleFileSelect,
          addRow,
          saveForm,
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