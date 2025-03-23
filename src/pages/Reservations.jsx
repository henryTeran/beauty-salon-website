import { useEffect, useState, useMemo } from "react";
import { db } from "../firebaseConfig";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  flexRender,
} from "@tanstack/react-table";
import { FaUser, FaEnvelope, FaPhone, FaCalendarAlt, FaClock, FaTrash, FaMoneyBillWave } from "react-icons/fa";

export default function Reservations() {
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    const fetchReservations = async () => {
      const querySnapshot = await getDocs(collection(db, "reservations"));
      const reservationsList = querySnapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          name: data.customer?.name || "Non spécifié",
          email: data.customer?.email || "Non spécifié",
          phone: data.customer?.phone || "Non spécifié",
          date: data.date || "Non spécifié",
          time: data.time || "Non spécifié",
          services: data.services || [], // Tableau d'objets {title, price}
          totalPrice: data.services
            ? data.services.reduce((acc, service) => acc + (service.price || 0), 0)
            : 0,
        };
      });
      setReservations(reservationsList);
    };

    fetchReservations();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Voulez-vous supprimer cette réservation ?")) {
      await deleteDoc(doc(db, "reservations", id));
      setReservations((prev) => prev.filter((reservation) => reservation.id !== id));
    }
  };

  // Définition des colonnes
  const columns = useMemo(
    () => [
      {
        header: "Nom",
        accessorKey: "name",
        cell: ({ getValue }) => (
          <div className="flex items-center gap-2">
            <FaUser className="text-gold" />
            {getValue()}
          </div>
        ),
      },
      {
        header: "Email",
        accessorKey: "email",
        cell: ({ getValue }) => (
          <div className="flex items-center gap-2">
            <FaEnvelope className="text-gold" />
            {getValue()}
          </div>
        ),
      },
      {
        header: "Téléphone",
        accessorKey: "phone",
        cell: ({ getValue }) => (
          <div className="flex items-center gap-2">
            <FaPhone className="text-gold" />
            {getValue()}
          </div>
        ),
      },
      {
        header: "Soin(s)",
        accessorKey: "services",
        cell: ({ getValue }) => (
          <ul className="text-left">
            {getValue().length > 0 ? (
              getValue().map((s, index) => <li key={index}>{s.title}</li>)
            ) : (
              <li>Aucun soin</li>
            )}
          </ul>
        ),
      },
      {
        header: "Prix Total (CHF)",
        accessorKey: "totalPrice",
        cell: ({ getValue }) => (
          <div className="flex items-center gap-2">
            <FaMoneyBillWave className="text-gold" />
            {getValue()} CHF
          </div>
        ),
      },
      {
        header: "Date",
        accessorKey: "date",
        cell: ({ getValue }) => (
          <div className="flex items-center gap-2">
            <FaCalendarAlt className="text-gold" />
            {getValue()}
          </div>
        ),
      },
      {
        header: "Heure",
        accessorKey: "time",
        cell: ({ getValue }) => (
          <div className="flex items-center gap-2">
            <FaClock className="text-gold" />
            {getValue()}
          </div>
        ),
      },
      {
        header: "Action",
        accessorKey: "id",
        cell: ({ getValue }) => (
          <button
            onClick={() => handleDelete(getValue())}
            className="bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-700 transition flex items-center gap-2"
          >
            <FaTrash /> Supprimer
          </button>
        ),
      },
    ],
    []
  );

  // Utilisation de React Table v8
  const table = useReactTable({
    data: reservations,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-4xl font-bold text-gold mb-6 text-center">📅 Mes Réservations</h1>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-lg rounded-lg text-center">
          <thead className="bg-gold text-white text-lg">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((column) => (
                  <th key={column.id} className="py-4 px-6">
                    {flexRender(column.column.columnDef.header, column.getContext())}
                  </th>
                ))}
              </tr>
            ))}
          </thead>

          <tbody>
            {table.getRowModel().rows.length === 0 ? (
              <tr>
                <td colSpan="8" className="text-gray-600 py-6 text-lg">Aucune réservation trouvée.</td>
              </tr>
            ) : (
              table.getRowModel().rows.map((row) => (
                <tr key={row.id} className="border-b text-lg hover:bg-gray-100 transition">
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="py-4 px-6">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
