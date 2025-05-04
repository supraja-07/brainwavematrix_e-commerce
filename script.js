const products = [
    { id: 1, name: "Headphones", price: 49.99, category: "Electronics", image: "https://via.placeholder.com/150" },
    { id: 2, name: "Smart Watch", price: 89.99, category: "Electronics", image: "https://via.placeholder.com/150" },
    { id: 3, name: "Bluetooth Speaker", price: 29.99, category: "Electronics", image: "https://via.placeholder.com/150" },
    { id: 4, name: "Power Bank", price: 19.99, category: "Accessories", image: "https://via.placeholder.com/150" },
    { id: 5, name: "Phone Case", price: 9.99, category: "Accessories", image: "https://via.placeholder.com/150" },
  ];
  
  let cart = [];
  
  const productList = document.getElementById("product-list");
  const cartItemsEl = document.getElementById("cart-items");
  const cartCount = document.getElementById("cart-count");
  const totalPriceEl = document.getElementById("total-price");
  
  const loginModal = document.getElementById("login-modal");
  const signupModal = document.getElementById("signup-modal");
  
  function renderProducts() {
    const searchTerm = document.getElementById("search").value.toLowerCase();
    const selectedCategory = document.getElementById("category-filter").value;
  
    productList.innerHTML = "";
    products
      .filter(p =>
        p.name.toLowerCase().includes(searchTerm) &&
        (selectedCategory === "all" || p.category === selectedCategory)
      )
      .forEach(product => {
        const div = document.createElement("div");
        div.classList.add("product");
        div.innerHTML = `
          <img src="${product.image}" alt="${product.name}">
          <h3>${product.name}</h3>
          <p>$${product.price}</p>
          <button onclick="addToCart(${product.id})">Add to Cart</button>
        `;
        productList.appendChild(div);
      });
  }
  
  function addToCart(id) {
    const product = products.find(p => p.id === id);
    cart.push(product);
    updateCart();
  }
  
  function updateCart() {
    cartItemsEl.innerHTML = "";
    let total = 0;
    cart.forEach((item, index) => {
      total += item.price;
      const div = document.createElement("div");
      div.classList.add("cart-item");
      div.innerHTML = `
        ${item.name} - $${item.price.toFixed(2)}
        <button onclick="removeFromCart(${index})">❌</button>
      `;
      cartItemsEl.appendChild(div);
    });
    cartCount.textContent = cart.length;
    totalPriceEl.textContent = total.toFixed(2);
  }
  
  function removeFromCart(index) {
    cart.splice(index, 1);
    updateCart();
  }
  
  document.getElementById("search").addEventListener("input", renderProducts);
  document.getElementById("category-filter").addEventListener("change", renderProducts);
  document.getElementById("login-btn").addEventListener("click", () => {
    loginModal.style.display = "flex";
  });
  
  function closeModal() {
    loginModal.style.display = "none";
    signupModal.style.display = "none";
  }
  
  function switchToSignup() {
    loginModal.style.display = "none";
    signupModal.style.display = "flex";
  }
  
  function switchToLogin() {
    signupModal.style.display = "none";
    loginModal.style.display = "flex";
  }
  
  renderProducts();
  