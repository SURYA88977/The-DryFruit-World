const STORE_CONFIG = {
  name: "The DRYfruit World",
  whatsappBase: "https://wa.me/916305041341",
  email: "Dryfruitworld076@gmail.com",
  instagram: "https://www.instagram.com/dryfruitw8?igsh=N2FwcnlkNXg0YWZu",
  facebook: "https://www.facebook.com/share/1BdPesY1y5/",
  maps: "https://maps.app.goo.gl/XxvxqNZLGoc6rzd6A",
  address: "Shop No 2, Dry fruits world, OU Colony, Shaikpet, Manikonda, Hyderabad, Telangana 500104"
};

const SIGNATURE_PRODUCT_NAMES = [
  "Medjoul Dates",
  "Elaichi",
  "Badam Mamra",
  "Kaju Jumbo",
  "Brazil Nuts",
  "Pecan Nuts",
  "Walnut",
  "Pista Plain",
  "Blueberry"
];

const products = [
  { id: 1, name: "Kaju Regular", category: "Nuts", description: "Fresh regular cashews for daily snacking, sweets, and kitchen use.", image: "images/Kaju regular.png", prices: { "250g": 275, "500g": 550, "1kg": 1100 }, rating: 4.7, featured: true, popular: 94 },
  { id: 2, name: "Kaju Jumbo", category: "Nuts", description: "Large whole cashews with a buttery bite and premium finish.", image: "images/Kaju jumbo.png", prices: { "250g": 330, "500g": 660, "1kg": 1320 }, rating: 4.9, featured: true, popular: 98 },
  { id: 3, name: "Kaju Masala", category: "Nuts", description: "Roasted cashews seasoned with a savory masala blend.", image: "images/Kaju masala.png", prices: { "250g": 330, "500g": 660, "1kg": 1320 }, rating: 4.8, featured: true, popular: 93 },
  { id: 4, name: "Badam Regular", category: "Nuts", description: "Everyday almonds with clean crunch and rich natural taste.", image: "images/Badam reg.png", prices: { "250g": 330, "500g": 660, "1kg": 1320 }, rating: 4.7, featured: false, popular: 91 },
  { id: 5, name: "Badam Jumbo", category: "Nuts", description: "Large premium almonds selected for size, taste, and freshness.", image: "images/Badam jumbo.png", prices: { "250g": 375, "500g": 750, "1kg": 1500 }, rating: 4.9, featured: true, popular: 96 },
  { id: 6, name: "Badam Mamra", category: "Nuts", description: "Elite mamra almonds prized for texture, aroma, and natural richness.", image: "images/Badam mamra.png", prices: { "250g": 1072, "500g": 2145, "1kg": 4290 }, rating: 4.9, featured: true, popular: 97 },
  { id: 7, name: "Pista Plain", category: "Nuts", description: "Naturally flavored pistachios for clean premium snacking.", image: "images/Pista plain.png", prices: { "250g": 925, "500g": 1850, "1kg": 3700 }, rating: 4.8, featured: false, popular: 87 },
  { id: 8, name: "Pista Salted", category: "Nuts", description: "Lightly salted pistachios with a bright roasted finish.", image: "images/Pista salted.png", prices: { "250g": 545, "500g": 1090, "1kg": 2180 }, rating: 4.8, featured: true, popular: 90 },
  { id: 9, name: "Walnut", category: "Nuts", description: "Premium walnut kernels with earthy depth and delicate bite.", image: "images/Walnut.png", prices: { "250g": 510, "500g": 1020, "1kg": 2040 }, rating: 4.8, featured: true, popular: 88 },
  { id: 10, name: "Pecan Nuts", category: "Nuts", description: "Luxurious pecans with a naturally sweet, creamy profile.", image: "images/Pecan nuts.png", prices: { "250g": 680, "500g": 1360, "1kg": 2720 }, rating: 4.8, featured: false, popular: 82 },
  { id: 11, name: "Brazil Nuts", category: "Nuts", description: "Rich, smooth Brazil nuts for a distinctive premium pantry pick.", image: "images/Brazil nuts.png", prices: { "250g": 1050, "500g": 2100, "1kg": 4200 }, rating: 4.7, featured: false, popular: 78 },

  { id: 12, name: "Kismis Long", category: "Dry Fruits", description: "Long raisins with a bright, juicy sweetness.", image: "images/Kismis long.png", prices: { "250g": 175, "500g": 350, "1kg": 700 }, rating: 4.6, featured: false, popular: 74 },
  { id: 13, name: "Kissmis Gold", category: "Dry Fruits", description: "Golden raisins with gentle sweetness and festive color.", image: "images/Kissmis Gold.png", prices: { "250g": 200, "500g": 400, "1kg": 800 }, rating: 4.7, featured: false, popular: 77 },
  { id: 14, name: "Amla Candy", category: "Dry Fruits", description: "Sweet amla candy with a familiar tangy finish.", image: "images/Amla candy.png", prices: { "250g": 93, "500g": 186, "1kg": 372 }, rating: 4.5, featured: false, popular: 65 },
  { id: 15, name: "Honey Amla", category: "Dry Fruits", description: "Amla in honey for a bright, traditional wellness treat.", image: "images/Honey Amla.png", prices: { "250g": 115, "500g": 230, "1kg": 460 }, rating: 4.7, featured: false, popular: 73 },
  { id: 16, name: "Black Raisins", category: "Dry Fruits", description: "Naturally sweet raisins for snacks, desserts, and breakfast bowls.", image: "images/Black raisins.png", prices: { "250g": 170, "500g": 340, "1kg": 680 }, rating: 4.7, featured: false, popular: 80 },
  { id: 17, name: "Dry Dates", category: "Dates", description: "Classic dry dates for traditional sweets, snacks, and pantry use.", image: "images/Dry dates.png", prices: { "250g": 120, "500g": 240, "1kg": 480 }, rating: 4.6, featured: false, popular: 72 },
  { id: 18, name: "Anjeer Big", category: "Dry Fruits", description: "Premium big figs with honeyed sweetness and a soft chew.", image: "images/Anjeer Premium.png", prices: { "250g": 450, "500g": 900, "1kg": 1800 }, rating: 4.9, featured: true, popular: 92 },
  { id: 19, name: "Anjeer Regular", category: "Dry Fruits", description: "Soft regular figs for daily nutrition and dessert pairing.", image: "images/Anjeer Regular.png", prices: { "250g": 325, "500g": 650, "1kg": 1300 }, rating: 4.7, featured: false, popular: 84 },
  { id: 20, name: "Protein Beans", category: "Dry Fruits", description: "Crunchy protein-rich beans for healthy snacking.", image: "images/Protein beans.png", prices: { "250g": 192, "500g": 385, "1kg": 770 }, rating: 4.6, featured: false, popular: 70 },

  { id: 21, name: "Kiwi Dried", category: "Berries", description: "Colorful dried kiwi slices for premium snack boards.", image: "images/Kiwi dried.png", prices: { "250g": 150, "500g": 300, "1kg": 600 }, rating: 4.6, featured: false, popular: 71 },
  { id: 22, name: "Mango Dried", category: "Berries", description: "Bright dried mango slices with tropical sweetness.", image: "images/Mango dried.png", prices: { "250g": 185, "500g": 370, "1kg": 740 }, rating: 4.8, featured: true, popular: 85 },
  { id: 23, name: "Blueberry", category: "Berries", description: "Deep blueberry notes for trail mixes and dessert topping.", image: "images/Blueberry dryed.png", prices: { "250g": 437, "500g": 875, "1kg": 1750 }, rating: 4.7, featured: false, popular: 81 },
  { id: 24, name: "Cranberry Slices", category: "Berries", description: "Tangy cranberry slices with a polished sweet-sour finish.", image: "images/Cranberry slices.png", prices: { "250g": 220, "500g": 440, "1kg": 880 }, rating: 4.7, featured: false, popular: 75 },
  { id: 25, name: "Blackberry Plum", category: "Berries", description: "Sweet dried blackberry plum for vibrant snack mixes.", image: "images/Blackberry plum.png", prices: { "250g": 150, "500g": 300, "1kg": 600 }, rating: 4.6, featured: false, popular: 69 },

  { id: 26, name: "Flax Seeds", category: "Seeds", description: "Earthy flax seeds for wholesome daily nutrition.", image: "images/Flax seeds.png", prices: { "250g": 60, "500g": 120, "1kg": 240 }, rating: 4.6, featured: false, popular: 69 },
  { id: 27, name: "Pumpkin Seeds", category: "Seeds", description: "Fresh pumpkin seeds with a rich nutty crunch.", image: "images/Pumpkin seeds.png", prices: { "250g": 190, "500g": 380, "1kg": 760 }, rating: 4.8, featured: true, popular: 86 },
  { id: 28, name: "Sunflower Seeds", category: "Seeds", description: "Light sunflower seeds for salads, snacks, and baking.", image: "images/Sunflower seeds.png", prices: { "250g": 90, "500g": 180, "1kg": 360 }, rating: 4.6, featured: false, popular: 71 },
  { id: 29, name: "Watermelon Seeds", category: "Seeds", description: "Premium watermelon seeds with clean crunch and subtle flavor.", image: "images/Watermelon seeds.png", prices: { "250g": 207, "500g": 415, "1kg": 830 }, rating: 4.7, featured: false, popular: 76 },
  { id: 30, name: "Chia Seeds", category: "Seeds", description: "Clean chia seeds for smoothies, puddings, and breakfast bowls.", image: "images/Chia Seeds.png", prices: { "250g": 105, "500g": 210, "1kg": 420 }, rating: 4.8, featured: true, popular: 87 },
  { id: 31, name: "Halim Seeds", category: "Seeds", description: "Traditional halim seeds for a nourishing pantry staple.", image: "images/Halim seeds.png", prices: { "250g": 60, "500g": 120, "1kg": 240 }, rating: 4.6, featured: false, popular: 68 },
  { id: 32, name: "Sesame Seeds (Nuvvulu)", category: "Seeds", description: "Clean sesame seeds for sweets, chutneys, and everyday cooking.", image: "images/Seesame seeds.png", prices: { "250g": 55, "500g": 110, "1kg": 220 }, rating: 4.6, featured: false, popular: 67 },
  { id: 33, name: "Quinoa", category: "Seeds", description: "Nutritious quinoa for bowls, salads, and modern kitchens.", image: "images/Quinoa.png", prices: { "250g": 75, "500g": 150, "1kg": 300 }, rating: 4.6, featured: false, popular: 68 },

  { id: 34, name: "Medjoul Dates", category: "Dates", description: "Large Medjoul dates with a caramel-like finish.", image: "images/Medjoul dates.png", prices: { "250g": 450, "500g": 900, "1kg": 1800 }, rating: 4.9, featured: true, popular: 93 },
  { id: 35, name: "Ajwa Dates", category: "Dates", description: "Soft, dark Ajwa dates with deep natural sweetness.", image: "images/Ajwa dates.png", prices: { "250g": 280, "500g": 560, "1kg": 1120 }, rating: 4.9, featured: true, popular: 95 },
  { id: 36, name: "Safawi Dates", category: "Dates", description: "Dark, soft dates with a rich traditional flavor.", image: "images/Safawi dates.png", prices: { "250g": 222, "500g": 445, "1kg": 890 }, rating: 4.8, featured: false, popular: 81 },
  { id: 37, name: "Mabroom Dates", category: "Dates", description: "Elegant long dates with balanced sweetness and premium texture.", image: "images/Mabroom.png", prices: { "250g": 350, "500g": 700, "1kg": 1400 }, rating: 4.8, featured: false, popular: 84 },
  { id: 38, name: "Kimia Dates", category: "Dates", description: "Soft Kimia dates in a convenient box for daily energy.", image: "images/Kimia dates.png", prices: { "400g box": 320 }, rating: 4.7, featured: false, popular: 86 },
  { id: 39, name: "Seedless Dates", category: "Dates", description: "Ready-to-use seedless dates for snacks, smoothies, and sweets.", image: "images/Seedless dates.png", prices: { "500g": 160 }, rating: 4.6, featured: false, popular: 79 },

  { id: 40, name: "Dalchina Cheka", category: "Spices", description: "Aromatic cinnamon sticks for tea, sweets, biryani, and spice blends.", image: "images/Cinnamon.png", prices: { "250g": 155, "500g": 310, "1kg": 620 }, rating: 4.7, featured: true, popular: 82 },
  { id: 41, name: "Elaichi", category: "Spices", description: "Premium cardamom with a deep aroma for desserts and tea.", image: "images/Cardomom.png", prices: { "250g": 1072, "500g": 2145, "1kg": 4290 }, rating: 4.9, featured: true, popular: 89 },
  { id: 42, name: "Lavanga Cloves", category: "Spices", description: "Bold cloves with warm spice notes for cooking and wellness blends.", image: "images/Cloves.png", prices: { "250g": 310, "500g": 620, "1kg": 1240 }, rating: 4.8, featured: false, popular: 80 },
  { id: 43, name: "Shahi Jeera", category: "Spices", description: "Fragrant shahi jeera for rich rice dishes and premium cooking.", image: "images/Shahi jeera.png", prices: { "250g": 340, "500g": 680, "1kg": 1360 }, rating: 4.8, featured: false, popular: 78 },
  { id: 44, name: "Black Pepper", category: "Spices", description: "Sharp black pepper with clean heat and pantry-ready aroma.", image: "images/Black Pepper.png", prices: { "250g": 292, "500g": 585, "1kg": 1170 }, rating: 4.8, featured: false, popular: 83 },

  { id: 45, name: "Lindt Excellence 70% Cocoa", category: "Chocolates", description: "Refined dark chocolate with balanced cocoa intensity.", image: "images/Lindt 70 cocoa.png", prices: { "Bar": 470 }, rating: 4.8, featured: true, popular: 84 },
  { id: 46, name: "Lindt Excellence 85% Cocoa Robust Dark", category: "Chocolates", description: "Robust dark chocolate with elegant cocoa depth.", image: "images/Lindt 85 cocoa.png", prices: { "Bar": 490 }, rating: 4.8, featured: false, popular: 82 },
  { id: 47, name: "Lindt Excellence 99% Cocoa Absolute Dark", category: "Chocolates", description: "Absolute dark chocolate for intense cocoa lovers.", image: "images/Lindt 99 cocoa.png", prices: { "Bar": 570 }, rating: 4.7, featured: false, popular: 77 },
  { id: 48, name: "Lindt Vanilla White", category: "Chocolates", description: "Smooth white chocolate with a vanilla finish.", image: "images/Lindt Vanilla white.png", prices: { "Bar": 580 }, rating: 4.7, featured: false, popular: 76 },
  { id: 49, name: "Lindt Mint Intense Dark", category: "Chocolates", description: "Dark chocolate with a cool mint finish.", image: "images/Lindt Mint Intense dark.png", prices: { "Bar": 580 }, rating: 4.8, featured: true, popular: 81 },
  { id: 50, name: "Lindt Excellence Extra Creamy Milk", category: "Chocolates", description: "Extra creamy milk chocolate for a smooth indulgent bite.", image: "images/Lindt Excellence Extra Creamy.png", prices: { "Bar": 570 }, rating: 4.8, featured: false, popular: 80 },
  { id: 51, name: "Alfredo Almond Milk Chocolate", category: "Chocolates", description: "No-sugar-added almond milk chocolate with a smooth finish.", image: "images/Alfredo Almond milk chocolate.png", prices: { "Bar": 400 }, rating: 4.6, featured: false, popular: 72 },
  { id: 52, name: "Alfredo Dark Chocolate", category: "Chocolates", description: "No-sugar-added dark chocolate with balanced cocoa character.", image: "images/Alfredo Dark_chocolate.png", prices: { "Bar": 400 }, rating: 4.6, featured: false, popular: 71 },
  { id: 53, name: "Alfredo Mint Dark Chocolate", category: "Chocolates", description: "No-sugar-added mint dark chocolate with a fresh finish.", image: "images/Alfredo Mint Dark Chocolate.png", prices: { "Bar": 400 }, rating: 4.6, featured: false, popular: 70 },
  { id: 54, name: "KitKat Hazelnut", category: "Chocolates", description: "Imported KitKat with hazelnut flavor and crisp layers.", image: "images/KitKat Hazelnut.png", prices: { "Bar": 440 }, rating: 4.6, featured: false, popular: 74 },
  { id: 55, name: "KitKat Salted Caramel", category: "Chocolates", description: "Imported KitKat with salted caramel notes.", image: "images/KitKat Salted Caramel.png", prices: { "Bar": 440 }, rating: 4.6, featured: false, popular: 73 },
  { id: 56, name: "KitKat Double Chocolate", category: "Chocolates", description: "Imported KitKat with a double chocolate profile.", image: "images/KitKat Double Chocolate.png", prices: { "Bar": 430 }, rating: 4.6, featured: false, popular: 72 }
];