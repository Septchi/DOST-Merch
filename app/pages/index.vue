<template>
  <div class="container mx-auto p-4">
    <!-- Header -->
    <header class="text-center py-6">
      <h1 class="text-3xl font-bold text-gray-800">Pre-Order Apparel Store</h1>
      <p class="text-gray-600 mt-2">Shop our exclusive combos and individual items! Pre-order now.</p>
    </header>

    <!-- Cart Summary -->
    <div class="mb-6 p-4 bg-white rounded-lg shadow">
      <h2 class="text-xl font-semibold">Cart ({{ cartCount }} items)</h2>
      <p v-if="cartCount === 0" class="text-gray-500">Your cart is empty.</p>
      <ul v-else>
        <li v-for="(item, index) in cart" :key="index" class="flex justify-between py-2">
          <span>{{ item.name }} (x{{ item.quantity }})</span>
          <span>₱{{ item.price * item.quantity }}</span>
        </li>
      </ul>
      <p class="font-bold mt-2">Total: ₱{{ cartTotal }}</p>
    </div>

    <!-- Individual Items Section -->
    <section>
      <h2 class="text-2xl font-semibold mb-4">Individual Items</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        <div v-for="item in items" :key="item.name" class="bg-white p-4 rounded-lg shadow hover:shadow-lg transition">
          <img :src="item.image" :alt="item.name" class="w-full h-48 object-cover rounded mb-4">
          <h3 class="text-lg font-semibold">{{ item.name }}</h3>
          <p class="text-gray-600">{{ item.description }}</p>
          <p class="text-xl font-bold mt-2">₱{{ item.price }}</p>
          <button @click="addToCart(item)" class="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Add
            to Cart</button>
        </div>
      </div>
    </section>

    <!-- Combos Section -->
    <section class="mb-12">
      <h2 class="text-2xl font-semibold mb-4">Combos</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        <div v-for="combo in combos" :key="combo.name"
          class="bg-white p-4 rounded-lg shadow hover:shadow-lg transition">
          <div class="flex overflow-x-auto gap-2 mb-4">
            <img v-for="(image, index) in combo.images" :key="index" :src="image"
              :alt="`${combo.name} image ${index + 1}`" class="w-32 h-32 object-cover rounded flex-shrink-0">
          </div>
          <h3 class="text-lg font-semibold">{{ combo.name }}</h3>
          <p class="text-gray-600">{{ combo.description }}</p>
          <p class="text-xl font-bold mt-2">₱{{ combo.price }}</p>
          <button @click="addToCart(combo)" class="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Add
            to Cart</button>
        </div>
      </div>
    </section>

  </div>
</template>

<script>
export default {
  name: 'Storefront',
  data() {
    return {
      combos: [
        {
          name: 'Combo 1: Shirt + Lanyard',
          description: 'Cotton Shirt and Lanyard bundle',
          price: 420,
          images: ['/images/cotton_shirt.jpg', '/images/lanyard.jpg']
        },
        {
          name: 'Combo 2: Polo + Lanyard',
          description: 'Cotton Polo Shirt and Lanyard bundle',
          price: 620,
          images: ['/images/cotton_polo.jpg', '/images/lanyard.jpg']
        },
        {
          name: 'Combo 3: Polo + Shirt',
          description: 'Cotton Polo Shirt and Cotton Shirt bundle',
          price: 850,
          images: ['/images/cotton_polo.jpg', '/images/cotton_shirt.jpg']
        },
        {
          name: 'Combo 4: Polo + Shirt + Lanyard',
          description: 'Complete bundle with Polo, Shirt, and Lanyard',
          price: 900,
          images: ['/images/cotton_polo.jpg', '/images/cotton_shirt.jpg', '/images/lanyard.jpg']
        }
      ],

      items: [
        {
          name: 'Cotton Polo Shirt',
          description: 'Comfortable cotton polo shirt',
          price: 550,
          image: '/images/cotton_polo.jpg'
        },
        {
          name: 'Cotton Shirt',
          description: 'Lightweight cotton shirt',
          price: 350,
          image: '/images/cotton_shirt.jpg'
        },
        {
          name: 'Lanyard',
          description: 'Durable lanyard for everyday use',
          price: 120,
          image: '/images/lanyard.jpg'
        },
        {
          name: 'Sublimation Jersey',
          description: 'Vibrant sublimation jersey',
          price: 350,
          image: '/images/sublimation_shirt.png'
        }
      ],
      cart: []
    };
  },
  computed: {
    cartCount() {
      return this.cart.reduce((total, item) => total + item.quantity, 0);
    },
    cartTotal() {
      return this.cart.reduce((total, item) => total + item.price * item.quantity, 0);
    }
  },
  methods: {
    addToCart(product) {
      const existingItem = this.cart.find(item => item.name === product.name);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        this.cart.push({ ...product, quantity: 1 });
      }
    }
  }
};
</script>
