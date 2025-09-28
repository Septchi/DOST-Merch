<template>
  <div class="p-5 bg-gray-50 dark:bg-gray-900 w-full flex flex-col items-center min-h-screen">
    <!-- Header -->
    <header class="text-center py-6">
      <h1 class="text-3xl font-bold text-gray-900 dark:text-gray-100">DOST SA NegOr Pre-Order</h1>
      <p class="mt-2 text-gray-600 dark:text-gray-400">Shop our exclusive combos and individual items! Pre-order now.
      </p>
    </header>

    <!-- Breadcrumb -->
    <div class="w-full max-w-7xl mb-4">
      <UBreadcrumb :items="crumbs" />
    </div>

    <!-- Checkout Title -->
    <h1 class="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">Checkout</h1>

    <!-- Checkout Cards -->
    <div class="w-full max-w-7xl flex flex-col sm:flex-row gap-4 sm:gap-6 lg:gap-8">
      <!-- Your Order Card -->
      <div class="flex-1 bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-lg shadow-md">
        <div class="flex items-center gap-4 sm:gap-8">
          <UIcon name="i-lucide-shopping-cart" class="size-8 sm:size-10" />
          <h1 class="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-gray-100">Your Order</h1>
        </div>

        <div v-if="store.items?.length" class="mt-4 space-y-4">
          <CartLine v-for="item in store.items" :key="item.name" :product="item" />
        </div>
        <p v-else class="mt-4 text-gray-600 dark:text-gray-400">Your cart is empty.</p>

        <hr class="my-4 border-gray-200 dark:border-gray-700">
        <div class="flex justify-between items-center">
          <h1 class="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-gray-100">Total</h1>
          <h1 class="text-3xl sm:text-4xl font-bold text-purple-600 dark:text-purple-400">₱{{ store.total }}</h1>
        </div>
      </div>

      <!-- Checkout Information Card -->
      <div class="flex-1 bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-lg shadow-md">
        <div class="flex items-center gap-4 sm:gap-8">
          <UIcon name="i-lucide-credit-card" class="size-8 sm:size-10" />
          <h1 class="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-gray-100">Checkout Information</h1>
        </div>

        <UForm :schema="checkoutSchema" :state="state" @submit="onSubmit" class="flex flex-col gap-5 pt-6 sm:pt-8">
          <!-- Personal Information -->
          <h1 class="text-2xl sm:text-3xl font-semibold text-gray-900 dark:text-gray-100">Personal Information</h1>
          <UFormField label="Full Name" name="name" size="xl">
            <UInput v-model="state.name" placeholder="Your full name" required />
          </UFormField>

          <UFormField label="Email" name="email" size="xl">
            <UInput v-model="state.email" type="email" placeholder="you@example.com" required />
          </UFormField>

          <hr class="my-4 border-gray-200 dark:border-gray-700">

          <!-- Payment Information -->
          <h1 class="text-2xl sm:text-3xl font-semibold text-gray-900 dark:text-gray-100">Payment Information</h1>
          <UFormField label="Proof of Payment" name="file" size="xl">
            <UFileUpload v-model="state.proofOfPayment" class="w-full sm:w-auto aspect-square" />
          </UFormField>

          <!-- Submit -->
          <UButton type="submit" color="primary" class="w-full sm:w-32 mt-4" label="Submit Payment" />
        </UForm>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import * as z from 'zod'
import { useCartStore } from '@/stores/cart';
import type { FormSubmitEvent } from '@nuxt/ui'

const store = useCartStore();
const toast = useToast();

const crumbs = ref<BreadcrumbItem[]>([
  {
    label: 'Store',
    icon: 'i-lucide-store',
    to: '/'
  },
  {
    label: 'Checkout',
    icon: 'i-lucide-shopping-cart',
    to: '/checkout'
  },

])

onMounted(() => {
  store.loadSession();
  console.log(store.items[0])
})
const checkoutSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email address"),
  proofOfPayment: z
    .any()
    .refine(file => file instanceof File, "Proof of payment file is required")
    .refine(file => !file || ["image/jpeg", "image/png"].includes(file.type), "File must be JPEG or PNG")
    .refine(file => !file || file.size <= 5 * 1024 * 1024, "File size must be less than 5MB"),
})

type Schema = z.output<typeof checkoutSchema>

const state = reactive<Partial<Schema>>({
  name: '',
  email: '',
  proofOfPayment: null as File | null
})

async function onSubmit(event: FormSubmitEvent<Schema>) {
  try {
    const formData = new FormData()
    formData.append('proof', state.proofOfPayment);
    formData.append('items', JSON.stringify(store.items));
    formData.append('customer', JSON.stringify({ name: event.data.name, email: event.data.email }));
    const { data, status, error } = await useFetch('/api/checkout', {
      method: "POST",
      body: formData
    })
    let valid = status.value == 'success'
    console.log(status.value)
    console.log(valid)
    toast.add({
      title: valid ? "Scan successful" : "Scan failed",
      description: valid
        ? "Order Successfully Submit"
        : "Could not Submit Order",
      color: valid ? "success" : "error",
      icon: valid ? "i-heroicons-check-circle" : "i-heroicons-x-circle",
    });
  } catch (err) {
    console.error("Failed to Send Order:", err);
    toast.add({
      title: "Error",
      description: "A server error occurred while submitting the order.",
      color: "error",
      icon: "i-heroicons-exclamation-circle",
    });

  }
}
</script>

<style>
.card {
  border-radius: 25px;
  width: 50%;
}
</style>
