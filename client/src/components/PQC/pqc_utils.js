import { createOrUpdateForm } from './formapi';
import { segments } from './renderSegmentContent';

export const initialFormState = {
    product_id: null,
    vendor_id: null,
    steps: segments.map((segment, index) => ({
      name: segment.name,
      order: segment.order,
      substeps: [],
    })),
  };
  
  export const fetchItems = async (getter, setter) => {
    try {
      const response = await getter();
      setter(response.data);
    } catch (error) {
      // console.error(`Error fetching items: ${error}`);
    }
  };
  
  export const handleFormChange = (form, setForm) => e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  
  export const handleDragOver = (e) => {
    e.preventDefault();
  };
  
  export const saveForm = (form, rows) => async () => {
    console.log("FFFFF", form)
    console.log("XxXxXxXxX",rows);
    const postData = {
      ...(form.id && { id: form.id }),
      id: form.id,
      product_id: form.product_id,
      vendor_id: form.vendor_id,
      steps: segments.map((segment, index) => ({
        name: segment.name,
        order: segment.order,
        substeps: index === 1 ? rows.map(row => {
          const {
            id,
            technical_drawing_numbering,
            tools,
            description,
            actual_dimension,
            lower_tolerance,
            upper_tolerance,
            sample_quantity,
            example_visual_url,
            row_number
          } = row;
          return {
            ...(id && { id }),
            technical_drawing_numbering,
            tools,
            description,
            actual_dimension,
            lower_tolerance,
            upper_tolerance,
            sample_quantity,
            example_visual_url,
            row_number
          };
        }) : [],
      })),
    };

    try {
      console.log("postData:", postData)
      await createOrUpdateForm(postData);
    } catch (error) {
      throw new Error(`Error saving form: ${error}`);
    }
  };
  