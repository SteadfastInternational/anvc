import { useState } from 'react';

const useSubMenuDepartment = (initialState: boolean) => {
  const [openSubMenuDepartment, setOpenSubMenuDepartment] = useState(initialState);  // Use initialState passed as prop

  const handleSubMenuDepartment = () => {
    // Toggle the current state
    setOpenSubMenuDepartment((prevState) => !prevState);
  };

  // Return state and handler
  const setSubMenuState = (state: boolean) => {
    setOpenSubMenuDepartment(state);
  };

  return {
    openSubMenuDepartment,
    handleSubMenuDepartment,
    setSubMenuState,  // Ensure it's returned
  };
};

export default useSubMenuDepartment;
