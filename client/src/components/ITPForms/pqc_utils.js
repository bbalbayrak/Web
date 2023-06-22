import { createOrUpdateForm } from './formapi';
import { segments } from './Segments';

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
  
  export const saveForm = (form, rows, setFormSaved) => async () => {
    const postData = {
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
            status: "active"
          };
        }) : [],
      })),
    };
  
    try {
      await createOrUpdateForm(postData);
      setFormSaved(true);
    } catch (error) {
      throw new Error(`Error saving form: ${error}`);
    }
  };
  