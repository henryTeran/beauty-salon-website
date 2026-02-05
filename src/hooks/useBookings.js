import { useState } from 'react';
import { supabase } from '../lib/supabaseClient';

export function useBookings() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const createBooking = async (bookingData) => {
    try {
      setLoading(true);
      setError(null);

      const { data, error: insertError } = await supabase
        .from('bookings')
        .insert([{
          customer_name: bookingData.customer_name,
          customer_email: bookingData.customer_email,
          customer_phone: bookingData.customer_phone,
          booking_date: bookingData.booking_date,
          booking_time: bookingData.booking_time,
          duration_minutes: bookingData.duration_minutes || 60,
          services: bookingData.services,
          total_price: bookingData.total_price,
          notes: bookingData.notes,
          status: 'pending'
        }])
        .select()
        .single();

      if (insertError) throw insertError;

      return { success: true, booking: data };
    } catch (err) {
      console.error('Error creating booking:', err);
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  const getBooking = async (bookingId) => {
    try {
      setLoading(true);
      setError(null);

      const { data, error: fetchError } = await supabase
        .from('bookings')
        .select('*')
        .eq('id', bookingId)
        .maybeSingle();

      if (fetchError) throw fetchError;

      return { success: true, booking: data };
    } catch (err) {
      console.error('Error fetching booking:', err);
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  const getAvailableSlots = async (date) => {
    try {
      setLoading(true);
      setError(null);

      const { data: bookings, error: bookingsError } = await supabase
        .from('bookings')
        .select('booking_time, duration_minutes')
        .eq('booking_date', date)
        .in('status', ['pending', 'confirmed']);

      if (bookingsError) throw bookingsError;

      const { data: blockedSlots, error: blockedError } = await supabase
        .from('blocked_slots')
        .select('blocked_time')
        .eq('blocked_date', date);

      if (blockedError) throw blockedError;

      const { data: businessHours, error: hoursError } = await supabase
        .from('business_hours')
        .select('*')
        .maybeSingle();

      if (hoursError) throw hoursError;

      return {
        success: true,
        bookedSlots: bookings || [],
        blockedSlots: blockedSlots || [],
        businessHours: businessHours || null
      };
    } catch (err) {
      console.error('Error fetching available slots:', err);
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  const updateBookingStatus = async (bookingId, status) => {
    try {
      setLoading(true);
      setError(null);

      const { error: updateError } = await supabase
        .from('bookings')
        .update({ status })
        .eq('id', bookingId);

      if (updateError) throw updateError;

      return { success: true };
    } catch (err) {
      console.error('Error updating booking:', err);
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  return {
    createBooking,
    getBooking,
    getAvailableSlots,
    updateBookingStatus,
    loading,
    error
  };
}
