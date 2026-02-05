/*
  # Création des tables Services et Commandes
  
  ## 1. Nouvelles Tables
  
  ### `services`
  Stocke tous les services disponibles au salon
  - `id` (uuid, primary key)
  - `title` (text) - Titre du service
  - `category` (text) - Catégorie (visage, corps, mains_pieds)
  - `price` (numeric) - Prix en CHF
  - `duration` (integer) - Durée en minutes
  - `description` (text) - Description détaillée
  - `benefits` (jsonb) - Liste des bénéfices
  - `image_url` (text) - URL de l'image
  - `is_popular` (boolean) - Service populaire ou non
  - `is_active` (boolean) - Service actif/désactivé
  - `display_order` (integer) - Ordre d'affichage
  - `created_at` (timestamptz)
  - `updated_at` (timestamptz)
  
  ### `orders`
  Gère les commandes/paniers des clients
  - `id` (uuid, primary key)
  - `customer_name` (text)
  - `customer_email` (text)
  - `customer_phone` (text)
  - `status` (text) - pending, paid, completed, cancelled
  - `total_amount` (numeric)
  - `payment_intent_id` (text) - Pour Stripe
  - `notes` (text)
  - `created_at` (timestamptz)
  - `updated_at` (timestamptz)
  
  ### `order_items`
  Détails des articles dans chaque commande
  - `id` (uuid, primary key)
  - `order_id` (uuid, foreign key)
  - `service_id` (uuid, foreign key)
  - `quantity` (integer)
  - `unit_price` (numeric)
  - `total_price` (numeric)
  - `created_at` (timestamptz)
  
  ## 2. Sécurité
  - Activation de RLS sur toutes les tables
  - Politiques pour lecture publique des services actifs
  - Politiques restrictives pour les commandes
  
  ## 3. Indexation
  - Index sur les catégories de services
  - Index sur les statuts de commandes
  - Index sur les relations foreign key
*/

-- Création de la table services
CREATE TABLE IF NOT EXISTS services (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  category text NOT NULL CHECK (category IN ('visage', 'corps', 'mains_pieds')),
  price numeric NOT NULL CHECK (price >= 0),
  duration integer NOT NULL CHECK (duration > 0),
  description text NOT NULL,
  benefits jsonb DEFAULT '[]'::jsonb,
  image_url text NOT NULL,
  is_popular boolean DEFAULT false,
  is_active boolean DEFAULT true,
  display_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Création de la table orders
CREATE TABLE IF NOT EXISTS orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_name text NOT NULL,
  customer_email text NOT NULL,
  customer_phone text,
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'paid', 'completed', 'cancelled')),
  total_amount numeric NOT NULL CHECK (total_amount >= 0),
  payment_intent_id text,
  notes text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Création de la table order_items
CREATE TABLE IF NOT EXISTS order_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id uuid NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  service_id uuid NOT NULL REFERENCES services(id) ON DELETE RESTRICT,
  quantity integer NOT NULL DEFAULT 1 CHECK (quantity > 0),
  unit_price numeric NOT NULL CHECK (unit_price >= 0),
  total_price numeric NOT NULL CHECK (total_price >= 0),
  created_at timestamptz DEFAULT now()
);

-- Création des index pour améliorer les performances
CREATE INDEX IF NOT EXISTS idx_services_category ON services(category);
CREATE INDEX IF NOT EXISTS idx_services_is_active ON services(is_active);
CREATE INDEX IF NOT EXISTS idx_services_display_order ON services(display_order);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
CREATE INDEX IF NOT EXISTS idx_orders_customer_email ON orders(customer_email);
CREATE INDEX IF NOT EXISTS idx_order_items_order_id ON order_items(order_id);
CREATE INDEX IF NOT EXISTS idx_order_items_service_id ON order_items(service_id);

-- Fonction pour mettre à jour automatiquement updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers pour updated_at
DROP TRIGGER IF EXISTS update_services_updated_at ON services;
CREATE TRIGGER update_services_updated_at
  BEFORE UPDATE ON services
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_orders_updated_at ON orders;
CREATE TRIGGER update_orders_updated_at
  BEFORE UPDATE ON orders
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Activation de RLS
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;

-- Politiques RLS pour services (lecture publique des services actifs)
DROP POLICY IF EXISTS "Anyone can view active services" ON services;
CREATE POLICY "Anyone can view active services"
  ON services FOR SELECT
  USING (is_active = true);

DROP POLICY IF EXISTS "Authenticated users can view all services" ON services;
CREATE POLICY "Authenticated users can view all services"
  ON services FOR SELECT
  TO authenticated
  USING (true);

DROP POLICY IF EXISTS "Authenticated users can manage services" ON services;
CREATE POLICY "Authenticated users can manage services"
  ON services FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Politiques RLS pour orders (accès public pour création, lecture limitée)
DROP POLICY IF EXISTS "Anyone can create orders" ON orders;
CREATE POLICY "Anyone can create orders"
  ON orders FOR INSERT
  WITH CHECK (true);

DROP POLICY IF EXISTS "Users can view their own orders" ON orders;
CREATE POLICY "Users can view their own orders"
  ON orders FOR SELECT
  USING (customer_email = current_setting('request.jwt.claims', true)::json->>'email');

DROP POLICY IF EXISTS "Authenticated users can view all orders" ON orders;
CREATE POLICY "Authenticated users can view all orders"
  ON orders FOR SELECT
  TO authenticated
  USING (true);

DROP POLICY IF EXISTS "Authenticated users can update orders" ON orders;
CREATE POLICY "Authenticated users can update orders"
  ON orders FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Politiques RLS pour order_items
DROP POLICY IF EXISTS "Anyone can create order items" ON order_items;
CREATE POLICY "Anyone can create order items"
  ON order_items FOR INSERT
  WITH CHECK (true);

DROP POLICY IF EXISTS "Users can view their own order items" ON order_items;
CREATE POLICY "Users can view their own order items"
  ON order_items FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM orders
      WHERE orders.id = order_items.order_id
      AND orders.customer_email = current_setting('request.jwt.claims', true)::json->>'email'
    )
  );

DROP POLICY IF EXISTS "Authenticated users can view all order items" ON order_items;
CREATE POLICY "Authenticated users can view all order items"
  ON order_items FOR SELECT
  TO authenticated
  USING (true);

-- Insertion des services initiaux
INSERT INTO services (title, category, price, duration, description, benefits, image_url, is_popular, display_order)
VALUES 
  (
    'Soin du Visage',
    'visage',
    70,
    60,
    'Un soin complet pour nettoyer, hydrater et revitaliser votre peau en profondeur',
    '["Nettoyage en profondeur", "Hydratation intense", "Éclat instantané", "Anti-âge"]'::jsonb,
    'https://images.pexels.com/photos/3764013/pexels-photo-3764013.jpeg?auto=compress&cs=tinysrgb&w=800',
    true,
    1
  ),
  (
    'Massage Relaxant',
    'corps',
    40,
    45,
    'Massage thérapeutique aux huiles essentielles pour libérer les tensions',
    '["Soulage le stress", "Améliore la circulation", "Détente musculaire", "Bien-être total"]'::jsonb,
    'https://images.pexels.com/photos/3997985/pexels-photo-3997985.jpeg?auto=compress&cs=tinysrgb&w=800',
    false,
    2
  ),
  (
    'Manucure & Pédicure',
    'mains_pieds',
    40,
    90,
    'Soin complet des mains et pieds avec vernis longue durée',
    '["Manucure complète", "Pédicure spa", "Vernis premium", "Résultat longue durée"]'::jsonb,
    'https://images.pexels.com/photos/1115128/pexels-photo-1115128.jpeg?auto=compress&cs=tinysrgb&w=800',
    true,
    3
  )
ON CONFLICT DO NOTHING;