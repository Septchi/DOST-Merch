import { serverSupabaseClient } from '#supabase/server'
import { defineEventHandler, H3Event, setResponseStatus, readMultipartFormData } from 'h3'
import { Database } from '#shared/types/supabase'
import { CartProduct } from '~~/shared/types/cart'

export default defineEventHandler(async (event: H3Event) => {
  try {
    const supabase = await serverSupabaseClient<Database>(event)

    const formData = await readMultipartFormData(event)
    if (!formData) {
      setResponseStatus(event, 400);
      return { success: false, error: 'Failed to locate data' }
    }

    const customer = JSON.parse(formData.find((field) => field.name == "customer")!.data.toString());
    const items = JSON.parse(formData.find((field) => field.name == "items")!.data.toString());
    const proof = formData.find((payload) => payload.name == "proof")!.data;
    //Customer Insert
    const customerPayload: Database['public']['Tables']['Customer']['Insert'] = {
      customer_name: customer.name,
      customer_email: customer.email
    };
    const { data: CustomerData, error: CustomerError } = await supabase
      .from('Customer')
      .insert(customerPayload)
      .select()
      .single()

    if (CustomerError) {
      console.error('[Supabase Error]', CustomerError)
      setResponseStatus(event, 500)
      return { success: false, error: 'Failed to insert Customer' }
    }

    //ProductInsert
    const productPayload: Array<Database['public']['Tables']['Product']['Insert']> =
      items.map((product: CartProduct): Database['public']['Tables']['Product']['Insert'] => ({
        product_name: product.name,
        quantity: product.type == 'item' ? product.quantity : 1,
        variant: product.type == 'item' ? product.size : null,
        customer_id: CustomerData.id
      }))

    const { error: ProductError } = await supabase
      .from('Product')
      .insert(productPayload)

    if (ProductError) {
      console.error('[Supabase Error]', ProductError)
      setResponseStatus(event, 500)
      return { success: false, error: 'Failed to insert Product' }
    }

    //ProofInsert
    const { error: ProofError } = await supabase
      .storage
      .from('ProofOfPayment')
      .upload(`${CustomerData.customer_name}_${CustomerData.created_at}.jpeg`, proof, {
        cacheControl: '3600',
        contentType: 'image/jpeg',
        upsert: false
      });

    if (ProofError) {
      console.error('[Supabase Error]', ProofError)
      setResponseStatus(event, 500)
      return { success: false, error: 'Failed to insert Proof of Payment' }
    }
    return { success: true }
  } catch (e) {
    console.error('[Unexpected Error]', e)
    setResponseStatus(event, 500)
    return { success: false, error: 'Unexpected server error' }
  }
})
