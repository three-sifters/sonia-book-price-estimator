function writeDollarsInto(container, deciCents) {
  if (deciCents < 0) {
    container.getElementsByClassName("sign")[0].innerText = "-";
    deciCents = Math.abs(deciCents);
  } else {
    container.getElementsByClassName("sign")[0].innerText = "";
  }

  const dollars = Math.floor(deciCents / 1000);
  let cents = Math.round(0.1 * (deciCents - dollars * 1000)).toString();

  if (cents.length === 1) cents = `${cents}0`;

  container.getElementsByClassName("dollars")[0].innerText = dollars;
  container.getElementsByClassName("cents")[0].innerText = cents;
}

function decicentsPerPage(pages, size, color) {
  if (color === "grayscale") {
    if (pages < 110) return 0;

    if (size === "standard") return 12;
    return 17;
  }

  if (pages < 40) return 0;

  if (size === "standard") return 65;
  return 80;
}

function flatPrice(pages, size, color) {
  if (color === "grayscale") {
    if (pages >= 110) return 1000;

    if (size === "standard") return 2300;
    return 2840;
  }

  if (pages >= 40) return 1000;

  if (size === "standard") return 3600;
  return 4200;
}

function updateValues() {
  const pages = document.getElementById("page-count").value;
  const size = document.getElementById("book-type").value;
  const color = document.getElementById("book-color").value;
  const freeCount = document.getElementById("free-count").value;
  const maxPrice = document.getElementById("max-price").value * 1000;
  const unitPrice = document.getElementById("unit-price").value * 1000;

  const perBookCost = document.getElementById("per-book-cost");
  const copiesBought = document.getElementById("copies-bought");
  const unitProfit = document.getElementById("unit-profit");
  const totalProfit = document.getElementById("total-profit");

  const pricePerPage = decicentsPerPage(pages, size, color);
  const pricePerBook = pricePerPage * pages + flatPrice(pages, size, color);
  const profitPerBook = unitPrice - pricePerBook;
  writeDollarsInto(perBookCost, pricePerBook);
  writeDollarsInto(unitProfit, profitPerBook);

  if (unitPrice > maxPrice) {
    copiesBought.innerText = "0";
    writeDollarsInto(totalProfit, 0);
    return;
  }

  const slope = freeCount / maxPrice;
  const unitsLostToPrice = Math.round(slope * unitPrice);
  const copies = freeCount - unitsLostToPrice;
  copiesBought.innerText = copies;
  writeDollarsInto(totalProfit, profitPerBook * copies);
}

for (const element of document.getElementsByTagName("input"))
  element.addEventListener("change", updateValues);
for (const element of document.getElementsByTagName("select"))
  element.addEventListener("change", updateValues);
