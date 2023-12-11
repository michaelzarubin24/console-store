import { IProduct } from "../interfaces/iproduct";
import { jsonProducts } from "../json/products";

let filteredProducts: IProduct[] = [...jsonProducts];

export function applyFilters(): void {
  filteredProducts = [...jsonProducts];

  const filters = {
    category: null as string | null,
    price: { min: null as number | null, max: null as number | null },
    manufacturer: null as string | null,
    createdAt: { min: null as string | null, max: null as string | null },
  };

  function applyCategoryFilter(categoryStr: string): void {
    if (categoryStr.includes("-")) {
      const excludedCategories = categoryStr.split("-")[0];
      filteredProducts = filteredProducts.filter(
        (product) => !excludedCategories.includes(product.category)
      );
    } else {
      const includedCategories = categoryStr;
      filteredProducts = filteredProducts.filter((product) =>
        includedCategories.includes(product.category)
      );
    }
  }

  function applyPriceFilter(min: number | null, max: number | null): void {
    if (min !== null) {
      filters.price.min = min;
      filteredProducts = filteredProducts.filter(
        (product) => product.price >= min
      );
    }

    if (max !== null) {
      filters.price.max = max;
      filteredProducts = filteredProducts.filter(
        (product) => product.price <= max
      );
    }
  }

  function applyManufacturerFilter(manufacturerStr: string): void {
    applyCategoryFilter(manufacturerStr);
    filters.manufacturer = manufacturerStr;
  }

  function applyDateFilter(min: string | null, max: string | null): void {
    if (min !== null) {
      filters.createdAt.min = min;
      filteredProducts = filteredProducts.filter(
        (product) => product.createdAt >= min
      );
    }

    if (max !== null) {
      filters.createdAt.max = max;
      filteredProducts = filteredProducts.filter(
        (product) => product.createdAt <= max
      );
    }
  }

  function resetFilters(): void {
    filteredProducts = [...jsonProducts];
    filters.category = null;
    filters.price = { min: null, max: null };
    filters.manufacturer = null;
    filters.createdAt = { min: null, max: null };
  }

  function displayFilters(): void {
    let output = "\nУстановленные фильтры:\n";
    output += `Категория: ${filters.category}\n`;
    output += `Цена: от ${filters.price.min} до ${filters.price.max}\n`;
    output += `Производитель: ${filters.manufacturer}\n`;
    output += `Дата изготовления: от ${filters.createdAt.min} до ${filters.createdAt.max}\n`;

    alert(output);
  }

  while (true) {
    alert(
      "\nВыберите тип фильтра:\n" +
        "1) Категория\n" +
        "2) Цена\n" +
        "3) Производитель\n" +
        "4) Дата изготовления\n" +
        "5) Сброс фильтров\n" +
        "6) Вернуться в основное меню"
    );

    const choice = prompt("Введите номер выбранного фильтра: ");

    switch (choice) {
      case "1":
        const categoryStr = prompt(
          "Введите буквы категорий или их комбинации (или используйте - для исключения): "
        )!;
        applyCategoryFilter(categoryStr);
        displayFilters();
        break;

      case "2":
        const minPriceInput = prompt("Введите минимальную цену: ");
        const maxPriceInput = prompt("Введите максимальную цену: ");

        const minPrice =
          minPriceInput !== null && !isNaN(parseFloat(minPriceInput))
            ? parseFloat(minPriceInput)
            : null;
        const maxPrice =
          maxPriceInput !== null && !isNaN(parseFloat(maxPriceInput))
            ? parseFloat(maxPriceInput)
            : null;

        applyPriceFilter(minPrice, maxPrice);
        displayFilters();
        break;

      case "3":
        const manufacturerStrInput = prompt(
          "Введите буквы производителей или их комбинации (или используйте - для исключения): "
        );

        const manufacturerStr =
          manufacturerStrInput !== null ? manufacturerStrInput : "";
        applyManufacturerFilter(manufacturerStr);
        displayFilters();
        break;

      case "4":
        const minDate = prompt("Введите минимальную дату (гггг-мм): ")!;
        const maxDate = prompt("Введите максимальную дату (гггг-мм): ")!;
        applyDateFilter(minDate, maxDate);
        displayFilters();
        break;

      case "5":
        resetFilters();
        displayFilters();
        break;

      case "6":
        return;

      default:
        alert("Неверный выбор. Пожалуйста, выберите корректный пункт.");
        break;
    }
  }
}
