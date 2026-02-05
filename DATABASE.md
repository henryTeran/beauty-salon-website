# Documentation Base de Données PostgreSQL

Cette application utilise PostgreSQL via Supabase pour gérer toutes les données.

## Configuration

Les variables d'environnement sont déjà configurées dans le fichier `.env`:
- `VITE_SUPABASE_URL`: URL de votre instance Supabase
- `VITE_SUPABASE_ANON_KEY`: Clé publique anonyme pour accéder à la base de données

## Structure de la Base de Données

### Table `services`
Stocke tous les services disponibles au salon.

**Colonnes:**
- `id` (uuid) - Identifiant unique
- `title` (text) - Nom du service
- `category` (text) - Catégorie: 'visage', 'corps', 'mains_pieds'
- `price` (numeric) - Prix en CHF
- `duration` (integer) - Durée en minutes
- `description` (text) - Description détaillée
- `benefits` (jsonb) - Liste des bénéfices ["bénéfice 1", "bénéfice 2"]
- `image_url` (text) - URL de l'image du service
- `is_popular` (boolean) - Service populaire ou non
- `is_active` (boolean) - Service actif/désactivé
- `display_order` (integer) - Ordre d'affichage
- `created_at` (timestamptz) - Date de création
- `updated_at` (timestamptz) - Date de dernière mise à jour

**Exemple d'insertion:**
```sql
INSERT INTO services (title, category, price, duration, description, benefits, image_url, is_popular)
VALUES (
  'Épilation Sourcils',
  'visage',
  15,
  15,
  'Épilation précise des sourcils pour un regard sublime',
  '["Sourcils parfaits", "Regard sublimé", "Technique professionnelle"]',
  'https://example.com/image.jpg',
  false
);
```

### Table `orders`
Gère les commandes des clients.

**Colonnes:**
- `id` (uuid) - Identifiant unique
- `customer_name` (text) - Nom du client
- `customer_email` (text) - Email du client
- `customer_phone` (text) - Téléphone du client
- `status` (text) - Statut: 'pending', 'paid', 'completed', 'cancelled'
- `total_amount` (numeric) - Montant total
- `payment_intent_id` (text) - ID de paiement Stripe
- `notes` (text) - Notes supplémentaires
- `created_at` (timestamptz) - Date de création
- `updated_at` (timestamptz) - Date de dernière mise à jour

### Table `order_items`
Détails des articles dans chaque commande.

**Colonnes:**
- `id` (uuid) - Identifiant unique
- `order_id` (uuid) - Référence à la commande
- `service_id` (uuid) - Référence au service
- `quantity` (integer) - Quantité
- `unit_price` (numeric) - Prix unitaire
- `total_price` (numeric) - Prix total
- `created_at` (timestamptz) - Date de création

### Table `bookings`
Gère les réservations de rendez-vous (déjà existante).

**Colonnes:**
- `id` (uuid) - Identifiant unique
- `customer_name` (text) - Nom du client
- `customer_email` (text) - Email du client
- `customer_phone` (text) - Téléphone du client
- `booking_date` (date) - Date du rendez-vous
- `booking_time` (time) - Heure du rendez-vous
- `duration_minutes` (integer) - Durée en minutes
- `services` (jsonb) - Liste des services réservés
- `total_price` (numeric) - Prix total
- `status` (text) - Statut: 'pending', 'confirmed', 'completed', 'cancelled'
- `notes` (text) - Notes
- `created_at` (timestamptz) - Date de création
- `updated_at` (timestamptz) - Date de dernière mise à jour

### Table `business_hours`
Définit les heures d'ouverture du salon (déjà existante).

### Table `blocked_slots`
Crée des créneaux bloqués/indisponibles (déjà existante).

## Hooks React Disponibles

### `useServices()`
Récupère et gère les services depuis la base de données.

**Utilisation:**
```javascript
import { useServices } from '../hooks/useServices';

const { services, loading, error, refetch, getServicesByCategory } = useServices();
```

### `useOrders()`
Gère les commandes.

**Utilisation:**
```javascript
import { useOrders } from '../hooks/useOrders';

const { createOrder, getOrder, updateOrderStatus, loading, error } = useOrders();

// Créer une commande
const result = await createOrder(
  {
    customer_name: 'Marie Dupont',
    customer_email: 'marie@example.com',
    customer_phone: '+41791234567',
    total_amount: 110,
    notes: 'Préfère le matin'
  },
  [
    { id: 'service-uuid-1', price: 70, quantity: 1 },
    { id: 'service-uuid-2', price: 40, quantity: 1 }
  ]
);
```

### `useBookings()`
Gère les réservations de rendez-vous.

**Utilisation:**
```javascript
import { useBookings } from '../hooks/useBookings';

const { createBooking, getBooking, getAvailableSlots, updateBookingStatus, loading, error } = useBookings();

// Créer une réservation
const result = await createBooking({
  customer_name: 'Marie Dupont',
  customer_email: 'marie@example.com',
  customer_phone: '+41791234567',
  booking_date: '2026-02-15',
  booking_time: '14:00',
  duration_minutes: 60,
  services: [{ id: 'uuid', title: 'Soin du Visage', price: 70 }],
  total_price: 70,
  notes: 'Première visite'
});
```

## Sécurité (RLS)

Toutes les tables sont protégées par Row Level Security (RLS):

1. **Services**: Lecture publique des services actifs
2. **Orders**: Création publique, lecture restreinte aux propriétaires
3. **Order Items**: Accessible uniquement via la commande associée
4. **Bookings**: Création publique, lecture restreinte

## Requêtes SQL Utiles

### Voir tous les services actifs
```sql
SELECT * FROM services WHERE is_active = true ORDER BY display_order;
```

### Voir les commandes du jour
```sql
SELECT * FROM orders WHERE DATE(created_at) = CURRENT_DATE;
```

### Voir les réservations à venir
```sql
SELECT * FROM bookings
WHERE booking_date >= CURRENT_DATE
AND status IN ('pending', 'confirmed')
ORDER BY booking_date, booking_time;
```

### Statistiques des services populaires
```sql
SELECT s.title, COUNT(oi.id) as times_ordered, SUM(oi.total_price) as revenue
FROM services s
LEFT JOIN order_items oi ON s.id = oi.service_id
GROUP BY s.id, s.title
ORDER BY times_ordered DESC;
```

## Client Supabase

Le client est initialisé dans `src/lib/supabaseClient.js` et peut être importé partout:

```javascript
import { supabase } from '../lib/supabaseClient';

// Exemple d'utilisation directe
const { data, error } = await supabase
  .from('services')
  .select('*')
  .eq('category', 'visage');
```

## Migrations

Les migrations sont stockées dans Supabase. Pour créer une nouvelle migration via l'interface:

1. Accédez au dashboard Supabase
2. Allez dans l'onglet SQL Editor
3. Écrivez votre migration SQL
4. Exécutez-la

Ou utilisez le hook MCP dans le code pour appliquer des migrations programmatiques.
