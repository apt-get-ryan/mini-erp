const getDiffFields = (form) => {
  return Object.keys(form.values).reduce((acc, key) => {
    if(form.isDirty(key)) {
      acc[key] = form.getValues()[key];
    }
    return acc;
  }, {})
};


export {getDiffFields};