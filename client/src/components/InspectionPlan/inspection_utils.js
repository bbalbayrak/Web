
export const fetchItems = async (getter, setter) => {
  try {
    const response = await getter();
    setter(response);
  } catch (error) {
    // console.error(`Error fetching items: ${error}`);
  }
};
