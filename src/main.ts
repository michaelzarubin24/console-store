import { jsonProducts } from "../json/products";
import { displayMenu } from "../func/displayMenu";
import { displayProducts } from "../func/displayProducts";
import { applyFilters } from "../func/displayFilters";
import { sortProducts } from "../func/sortProducts";

let json = [...jsonProducts];

while (true) {
  displayMenu();

  const mainChoice = prompt("Введите номер: ");

  switch (mainChoice) {
    case "a":
      displayProducts(json);
      break;
    case "b":
      applyFilters();
      break;
    case "c":
      sortProducts();
      break;
    case "q":
      alert("Выход из программы.");
      break;
    default:
      alert("Неверный выбор. Пожалуйста, выберите корректный пункт.");
      break;
  }
}
