const categories = ["All", "Nuts", "Seeds", "Dates", "Berries", "Dry Fruits", "Spices", "Chocolates"];
let activeCategory = "All";
let activeSort = "newest";

function filteredProducts() {
  const filtered = products.filter((product) => {
    const categoryMatch = activeCategory === "All" || product.category === activeCategory;
    return categoryMatch && matchesSearch(product);
  });

  return filtered.sort((a, b) => {
    if (activeSort === "popular") return b.popular - a.popular;
    if (activeSort === "low") return lowestPrice(a) - lowestPrice(b);
    if (activeSort === "high") return lowestPrice(b) - lowestPrice(a);
    return a.id - b.id;
  });
}

function setCategory(category) {
  activeCategory = category;
  document.getElementById("categoryFilter").value = category;
  renderProducts();
}