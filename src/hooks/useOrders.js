import { useState } from 'react';
import { supabase } from '../lib/supabaseClient';

export function useOrders() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const createOrder = async (orderData, items) => {
    try {
      setLoading(true);
      setError(null);

      const { data: order, error: orderError } = await supabase
        .from('orders')
        .insert([{
          customer_name: orderData.customer_name,
          customer_email: orderData.customer_email,
          customer_phone: orderData.customer_phone,
          total_amount: orderData.total_amount,
          notes: orderData.notes,
          status: 'pending'
        }])
        .select()
        .single();

      if (orderError) throw orderError;

      const orderItems = items.map(item => ({
        order_id: order.id,
        service_id: item.id,
        quantity: item.quantity || 1,
        unit_price: item.price,
        total_price: item.price * (item.quantity || 1)
      }));

      const { error: itemsError } = await supabase
        .from('order_items')
        .insert(orderItems);

      if (itemsError) throw itemsError;

      return { success: true, order };
    } catch (err) {
      console.error('Error creating order:', err);
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  const getOrder = async (orderId) => {
    try {
      setLoading(true);
      setError(null);

      const { data: order, error: orderError } = await supabase
        .from('orders')
        .select(`
          *,
          order_items (
            *,
            services (*)
          )
        `)
        .eq('id', orderId)
        .maybeSingle();

      if (orderError) throw orderError;

      return { success: true, order };
    } catch (err) {
      console.error('Error fetching order:', err);
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  const updateOrderStatus = async (orderId, status) => {
    try {
      setLoading(true);
      setError(null);

      const { error: updateError } = await supabase
        .from('orders')
        .update({ status })
        .eq('id', orderId);

      if (updateError) throw updateError;

      return { success: true };
    } catch (err) {
      console.error('Error updating order:', err);
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  return {
    createOrder,
    getOrder,
    updateOrderStatus,
    loading,
    error
  };
}
