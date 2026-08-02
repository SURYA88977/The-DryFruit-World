let searchTerm = "";

function setSearchTerm(value) {
  searchTerm = value.trim().toLowerCase();
  const productSearch = document.getElementById("productSearch");
  if (document.activeElement !== productSearch) productSearch.value = value;
  renderProducts();
}

function matchesSearch(product) {
  if (!searchTerm) return true;
  return [product.name, product.category, product.description].some((field) =>
    field.toLowerCase().includes(searchTerm)
  );
}