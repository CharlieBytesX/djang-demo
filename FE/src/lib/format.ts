export function formatPrice(priceN: number) {
  const price = priceN.toString();
  const splittedOnComma = price.split(",");
  const beforeComma = splittedOnComma[0];
  const afterComma = splittedOnComma[1];

  let lastCharIndexAdded = beforeComma.length;
  const chunks: string[] = [];

  for (let index = beforeComma.length - 1; index >= 0; index--) {
    if ((index + 1) % 3 === 0) {
      chunks.push(beforeComma.substring(index, lastCharIndexAdded));
      lastCharIndexAdded = index;
    }
  }

  if (lastCharIndexAdded !== 0) {
    chunks.push(beforeComma.substring(0, lastCharIndexAdded));
  }

  let newPrice = "";
  for (let index = chunks.length - 1; index >= 0; index--) {
    newPrice += chunks[index];
    if (index !== 0) {
      newPrice += ".";
    }
  }
  if (afterComma) {
    newPrice += `,${afterComma}`;
  }

  return newPrice;
}

export function formatTelephoneNumber(original: string | number) {
  let result = "";
  const transformated = original.toString();
  if (transformated.length !== 8) {
    return original;
  }
  result = transformated.substring(0, 4) + "-" + transformated.substring(4);
  return result;
}
