import { useEffect, useState } from "react";
import { db } from "../firebaseConfig";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";

export default function Reservations() {
  const [reservations, setReservations] = useState([]);

  // Charger les réservations depuis Firestore
  useEffect(() => {
    const fetchReservations = async () => {
      const querySnapshot = await getDocs(collection(db, "reservations"));
      const reservationsList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setReservations(reservationsList);
    };

    fetchReservations();
  }, []);

  // Supprimer une réservation
  const handleDelete = async (id) => {
    if (window.confirm("Voulez-vous supprimer cette réservation ?")) {
      await deleteDoc(doc(db, "reservations", id));
      setReservations(reservations.filter((reservation) => reservation.id !== id));
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-gold mb-6">📅 Réservations</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-lg rounded-lg">
          <thead className="bg-gold text-white">
            <tr>
              <th className="py-3 px-6">Nom</th>
              <th className="py-3 px-6">Email</th>
              <th className="py-3 px-6">Téléphone</th>
              <th className="py-3 px-6">Soin(s)</th>
              <th className="py-3 px-6">Date</th>
              <th className="py-3 px-6">Heure</th>
              <th className="py-3 px-6">Actions</th>
            </tr>
          </thead>
          <tbody>
            {reservations.length === 0 ? (
              <tr>
                <td colSpan="7" className="text-center py-4">Aucune réservation trouvée.</td>
              </tr>
            ) : (
              reservations.map((reservation) => (
                <tr key={reservation.id} className="border-b">
                  <td className="py-3 px-6">{reservation.customer.name}</td>
                  <td className="py-3 px-6">{reservation.customer.email}</td>
                  <td className="py-3 px-6">{reservation.customer.phone}</td>
                  <td className="py-3 px-6">{reservation.services.map(s => s.title).join(", ")}</td>
                  <td className="py-3 px-6">{reservation.date}</td>
                  <td className="py-3 px-6">{reservation.time}</td>
                  <td className="py-3 px-6">
                    <button 
                      onClick={() => handleDelete(reservation.id)}
                      className="bg-red-500 text-white px-3 py-1 rounded-full hover:bg-red-700 transition duration-300"
                    >
                      ❌ Supprimer
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
