import { supabase } from '../lib/supabaseClient';

export const checkSlotAvailability = async (date, time, durationMinutes = 60) => {
  try {
    const { data, error } = await supabase.rpc('check_slot_availability', {
      check_date: date,
      check_time: time,
      duration_mins: durationMinutes
    });

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error checking availability:', error);
    return false;
  }
};

export const getAvailableSlots = async (date) => {
  try {
    const dayOfWeek = new Date(date).getDay();

    const { data: businessHours, error: hoursError } = await supabase
      .from('business_hours')
      .select('*')
      .eq('day_of_week', dayOfWeek)
      .maybeSingle();

    if (hoursError) throw hoursError;

    if (!businessHours || businessHours.is_closed) {
      return [];
    }

    const slots = [];
    const openTime = businessHours.open_time;
    const closeTime = businessHours.close_time;

    let currentTime = openTime;
    const slotInterval = 60;

    while (currentTime < closeTime) {
      const isAvailable = await checkSlotAvailability(date, currentTime, slotInterval);

      if (isAvailable) {
        slots.push({
          time: currentTime,
          available: true
        });
      }

      const [hours, minutes] = currentTime.split(':');
      const nextDate = new Date();
      nextDate.setHours(parseInt(hours), parseInt(minutes) + slotInterval);
      currentTime = nextDate.toTimeString().slice(0, 5);
    }

    return slots;
  } catch (error) {
    console.error('Error getting available slots:', error);
    return [];
  }
};

export const createBooking = async (bookingData) => {
  try {
    const totalDuration = bookingData.services.reduce(
      (total, service) => total + (parseInt(service.duration) || 60),
      0
    );

    const isAvailable = await checkSlotAvailability(
      bookingData.booking_date,
      bookingData.booking_time,
      totalDuration
    );

    if (!isAvailable) {
      throw new Error('Ce créneau n\'est plus disponible. Veuillez en choisir un autre.');
    }

    const { data, error } = await supabase
      .from('bookings')
      .insert([
        {
          customer_name: bookingData.customer_name,
          customer_email: bookingData.customer_email,
          customer_phone: bookingData.customer_phone,
          booking_date: bookingData.booking_date,
          booking_time: bookingData.booking_time,
          duration_minutes: totalDuration,
          services: bookingData.services,
          total_price: bookingData.total_price,
          status: 'pending',
          notes: bookingData.notes || ''
        }
      ])
      .select()
      .maybeSingle();

    if (error) throw error;
    return { success: true, data };
  } catch (error) {
    console.error('Error creating booking:', error);
    return { success: false, error: error.message };
  }
};

export const getBookingsByDate = async (date) => {
  try {
    const { data, error } = await supabase
      .from('bookings')
      .select('*')
      .eq('booking_date', date)
      .in('status', ['pending', 'confirmed'])
      .order('booking_time');

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching bookings:', error);
    return [];
  }
};

export const updateBookingStatus = async (bookingId, status) => {
  try {
    const { data, error } = await supabase
      .from('bookings')
      .update({ status })
      .eq('id', bookingId)
      .select()
      .maybeSingle();

    if (error) throw error;
    return { success: true, data };
  } catch (error) {
    console.error('Error updating booking:', error);
    return { success: false, error: error.message };
  }
};

export const cancelBooking = async (bookingId) => {
  return updateBookingStatus(bookingId, 'cancelled');
};

export const getBusinessHours = async () => {
  try {
    const { data, error } = await supabase
      .from('business_hours')
      .select('*')
      .order('day_of_week');

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching business hours:', error);
    return [];
  }
};

export const getBlockedDates = async () => {
  try {
    const { data, error } = await supabase
      .from('blocked_slots')
      .select('*')
      .order('blocked_date');

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching blocked dates:', error);
    return [];
  }
};
