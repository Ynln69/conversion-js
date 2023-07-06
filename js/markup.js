export const getSelectMarkup = (data) => {
  const array = data.reduce((acc, item, index, array) => {
    const units = Object.values(item)[0];
    const markup = units
      .map((item, index, array) => {
        return `<option value="${item.id}">${item.fullname}</option>`;
      })
      .join("");
    acc.push(markup);
    return acc;
  }, []);
  return array.join("");
};
