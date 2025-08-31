import { useEffect, useState, useMemo } from "react";
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { db } from "../firebaseConfig";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  flexRender,
} from "@tanstack/react-table";
import { User, Mail, Phone, Calendar, Clock, Trash2, DollarSign, CalendarDays, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Reservations() {
  const { t } = useTranslation();
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
          services: data.services || [],
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

  const columns = useMemo(
    () => [
      {
        header: t('reservations.name'),
        accessorKey: "name",
        cell: ({ getValue }) => (
          <div className="flex items-center gap-2">
            <User className="w-4 h-4 text-gold" />
            {getValue()}
          </div>
        ),
      },
      {
        header: t('reservations.email'),
        accessorKey: "email",
        cell: ({ getValue }) => (
          <div className="flex items-center gap-2">
            <Mail className="w-4 h-4 text-gold" />
            {getValue()}
          </div>
        ),
      },
      {
        header: t('reservations.phone'),
        accessorKey: "phone",
        cell: ({ getValue }) => (
          <div className="flex items-center gap-2">
            <Phone className="w-4 h-4 text-gold" />
            {getValue()}
          </div>
        ),
      },
      {
        header: t('reservations.services'),
        accessorKey: "services",
        cell: ({ getValue }) => (
          <div className="text-left">
            {getValue().length > 0 ? (
              <div className="space-y-1">
                {getValue().map((s, index) => (
                  <div key={index} className="bg-gold/10 px-2 py-1 rounded text-sm">
                    {s.title}
                  </div>
                ))}
              </div>
            ) : (
              <span className="text-gray-500">{t('reservations.no_service')}</span>
            )}
          </div>
        ),
      },
      {
        header: t('reservations.total_price'),
        accessorKey: "totalPrice",
        cell: ({ getValue }) => (
          <div className="flex items-center gap-2">
            <DollarSign className="w-4 h-4 text-gold" />
            {getValue()} CHF
          </div>
        ),
      },
      {
        header: t('reservations.date'),
        accessorKey: "date",
        cell: ({ getValue }) => (
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-gold" />
            {getValue()}
          </div>
        ),
      },
      {
        header: t('reservations.time'),
        accessorKey: "time",
        cell: ({ getValue }) => (
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-gold" />
            {getValue()}
          </div>
        ),
      },
      {
        header: t('reservations.action'),
        accessorKey: "id",
        cell: ({ getValue }) => (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleDelete(getValue())}
            className="bg-red-500 text-white px-4 py-2 rounded-xl hover:bg-red-600 transition-all duration-300 flex items-center gap-2 font-semibold"
          >
            <Trash2 className="w-4 h-4" />
            {t('reservations.delete')}
          </motion.button>
        ),
      },
    ],
    [t]
  );

  const table = useReactTable({
    data: reservations,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pt-20">
      <div className="container mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-gold to-yellow-400 bg-clip-text text-transparent mb-4 flex items-center justify-center gap-4">
            <CalendarDays className="w-12 h-12 text-gold" />
            {t('reservations.title')}
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white rounded-3xl shadow-2xl overflow-hidden"
        >
          <div className="overflow-x-auto">
            <table className="min-w-full text-center">
              <thead className="bg-gradient-to-r from-gold to-yellow-400 text-black">
                {table.getHeaderGroups().map((headerGroup) => (
                  <tr key={headerGroup.id}>
                    {headerGroup.headers.map((column) => (
                      <th key={column.id} className="py-6 px-6 text-lg font-bold">
                        {flexRender(column.column.columnDef.header, column.getContext())}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>

              <tbody>
                {table.getRowModel().rows.length === 0 ? (
                  <tr>
                    <td colSpan="8" className="text-gray-600 py-12 text-xl">
                      <div className="flex flex-col items-center gap-4">
                        <CalendarDays className="w-16 h-16 text-gray-300" />
                        {t('reservations.no_reservations')}
                      </div>
                    </td>
                  </tr>
                ) : (
                  table.getRowModel().rows.map((row, index) => (
                    <motion.tr 
                      key={row.id} 
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      className="border-b border-gray-100 text-lg hover:bg-gradient-to-r hover:from-gold/5 hover:to-yellow-400/5 transition-all duration-300"
                    >
                      {row.getVisibleCells().map((cell) => (
                        <td key={cell.id} className="py-6 px-6">
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </td>
                      ))}
                    </motion.tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12"
        >
          <Link 
            to="/services"
            className="inline-flex items-center gap-3 bg-gradient-to-r from-gold to-yellow-400 text-black px-8 py-4 rounded-full text-lg font-bold hover:shadow-xl hover:shadow-gold/25 transition-all duration-300"
          >
            <Plus className="w-5 h-5" />
            Réserver un nouveau soin
          </Link>
        </motion.div>
      </div>
    </div>
  );
}