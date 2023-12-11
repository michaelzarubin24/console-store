import { IProduct } from "../interfaces/iproduct";

export function displayProducts(products: IProduct[]) {
  let output: string = "\nСписок товаров:\n";
  products.forEach((product) => {
    output += `${product.category} - ${product.price} - ${product.manufacturer} - ${product.createdAt}\n`;
  });

  const totalPrice: number = products.reduce(
    (total, product) => total + product.price,
    0
  );
  const averagePrice: number = totalPrice / products.length;

  output += `\nКоличество товаров: ${products.length}\n`;
  output += `Суммарная стоимость: ${totalPrice}\n`;
  output += `Средняя цена: ${averagePrice.toFixed(2)}\n`;

  const maxProduct: IProduct = products.reduce(
    (max, product) => (product.price > max.price ? product : max),
    products[0]
  );
  const minProduct: IProduct = products.reduce(
    (min, product) => (product.price < min.price ? product : min),
    products[0]
  );

  output += `Самый дорогой товар: ${maxProduct.category} - ${maxProduct.price}\n`;
  output += `Самый дешевый товар: ${minProduct.category} - ${minProduct.price}\n`;

  alert(output);
}
