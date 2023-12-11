import { IProduct } from "../interfaces/iproduct";

let filteredProducts: IProduct[] = [];

export function sortProducts(): void {
  const sortOptions: Record<string, string> = {
    category: "Категория",
    price: "Цена",
    manufacturer: "Производитель",
    createdAt: "Дата изготовления",
  };

  const reverseOrder =
    prompt(
      "Введите 'r', чтобы отсортировать в обратном порядке (или оставьте пустым): "
    ) === "r";

  console.log("\nВыберите критерий сортировки:");
  Object.keys(sortOptions).forEach((key) =>
    console.log(`${key}) ${sortOptions[key]}`)
  );
  console.log(
    `${Object.keys(sortOptions).length + 1}) Вернуться в основное меню`
  );

  const choice = prompt("Введите номер выбранного критерия сортировки: ");

  if (choice !== null) {
    if (choice in sortOptions) {
      const sortBy = choice as keyof IProduct;
      filteredProducts.sort((a, b) => (a[sortBy] > b[sortBy] ? 1 : -1));
      if (reverseOrder) {
        filteredProducts.reverse();
      }
      console.log(`\nТовары отсортированы по ${sortOptions[sortBy]}.`);
    } else if (choice === `${Object.keys(sortOptions).length + 1}`) {
      return;
    } else {
      console.log("Неверный выбор. Пожалуйста, выберите корректный пункт.");
    }
  } else {
    console.log("Отменено пользователем.");
  }
}
