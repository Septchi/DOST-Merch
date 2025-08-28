<template>
  <div class="min-h-screen bg-gray-100 flex items-center justify-center p-4">
    <div class="bg-white shadow-lg rounded-lg w-full max-w-md p-6">
      <h1 class="text-2xl font-bold mb-4 text-center">Checkout</h1>

      <UForm :schema="checkoutSchema" :state="state" @submit="onSubmit" class="flex flex-col">
        <!-- Name -->
        <UFormField label="Full name" name="name">
        <UInput
          v-model="state.name"
          placeholder="Your full name"
          required
        />
        </UFormField>

        <!-- Email -->
        <UFormField label="Email" name="email">
        <UInput
          v-model="state.email"
          type="email"
          placeholder="you@example.com"
          :error="errors.email"
          required
        />
        </UFormField>

        <!-- Proof of Payment -->
        <div class="mb-4">
          <label class="block text-gray-700 font-medium mb-1">Proof of Payment</label>
          <UInput
          v-model="state.proofOfPayment"
            type="file"
            accept="image/*"
            class="w-full"
            required
          />
        </div>

        <!-- Preview -->
        <div v-if="state.proofOfPayment" class="mb-4">
          <p class="text-gray-600 mb-1">Preview:</p>
          <img :src="state.proofOfPayment" alt="Proof Preview" class="w-full rounded border border-gray-300" />
        </div>

        <!-- Submit -->
        <UButton type="submit" color="primary" class="w-20">
          Submit Payment
        </UButton>
      </UForm>

      <!-- Success Message -->
      <div v-if="submitted" class="mt-4 p-3 bg-green-100 text-green-800 rounded">
        Payment submitted successfully!
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import * as z from 'zod'
import type { FormSubmitEvent } from '@nuxt/ui'

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
  console.log("bruh");
}
</script>
