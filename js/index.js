"use strict";
// 1 Масив взагалі можливих одиниць вирміру
// 2 Додати в меп при створенні списку опшенів перевіку на дубляж
// 3 зробити форму
// 4 повішати слухачів , який забиратиме дані з форми і повертати результат
// 5 додати дів резалт
// 6 описати хендлер який конвертує одну одиницю в іншу
// 7 створити джсон
const selectFromUnit = document.querySelector("#fromUnit");
const selectToUnit = document.querySelector("#toUnit");
const form = document.querySelector("#conversion");

const onConvertFormSubmit = (e) => {
  e.preventDefault();
  const unitFrom = e.target.elements.fromUnit.value;
  const unitTo = e.target.elements.toUnit.value;
  const value = e.target.elements.value.value;

  fetch("data/data.json")
    .then((res) => res.json())
    .then((data) => {
      const unitFromObj = data.reduce((acc, item, index, arr) => {
        const units = Object.values(item)[0];
        units.forEach((unit, index, arr) => {
          if (unit.id === unitFrom) {
            acc = { ...unit };
            return acc;
          }
        });
        return acc;
      }, {});
      let newValue = 0;
      if (unitFromObj.id === unitTo) {
        newValue = value;
        return;
      }
      if (Object.keys(unitFromObj.equivalentToMeter)) {
      }
      console.log(newValue);
    });
};
form.addEventListener("submit", onConvertFormSubmit);

const getSelectMarkup = (data) => {
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

fetch("data/data.json")
  .then((res) => res.json())
  .then((data) => {
    const options = getSelectMarkup(data);
    selectFromUnit.innerHTML = options;
    selectToUnit.innerHTML = options;
    console.log(options);
  });
