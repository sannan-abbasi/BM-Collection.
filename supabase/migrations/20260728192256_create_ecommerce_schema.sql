/*
# BM Collection — E-commerce Schema

1. New Tables
- `categories`
  - `id` (uuid, primary key)
  - `name` (text, unique, not null) — e.g. "Jewellery", "Clothing", "Bags"
  - `slug` (text, unique, not null) — URL-friendly identifier
  - `description` (text, nullable)
  - `image_url` (text, nullable) — category hero image
  - `sort_order` (int, default 0)
  - `created_at` (timestamptz)
- `products`
  - `id` (uuid, primary key)
  - `category_id` (uuid, references categories, ON DELETE SET NULL)
  - `title` (text, not null)
  - `description` (text, nullable)
  - `price` (numeric, not null)
  - `image_url` (text, nullable) — primary product image
  - `is_new_arrival` (boolean, default false)
  - `is_active` (boolean, default true) — admin can hide products
  - `created_at` (timestamptz)
- `orders`
  - `id` (uuid, primary key)
  - `product_id` (uuid, references products, ON DELETE SET NULL)
  - `product_title` (text, not null) — snapshot of product name at order time
  - `product_price` (numeric, not null) — snapshot of price at order time
  - `customer_name` (text, not null)
  - `email` (text, not null)
  - `phone` (text, not null)
  - `city` (text, not null)
  - `address` (text, not null)
  - `street` (text, nullable)
  - `notes` (text, nullable)
  - `status` (text, default 'pending') — pending, confirmed, shipped, delivered, cancelled
  - `created_at` (timestamptz)

2. Security
- Enable RLS on all tables.
- Public (anon) read access to categories and active products — storefront needs this.
- Public (anon) insert on orders — customers place orders without signing in.
- Admin-only writes (products, categories) are enforced via RLS using the admin email check
  against auth.users.email. The admin email is binteakram224@gmail.com.
- Orders can be read/updated only by the admin.
*/

CREATE TABLE IF NOT EXISTS categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text UNIQUE NOT NULL,
  slug text UNIQUE NOT NULL,
  description text,
  image_url text,
  sort_order int NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  category_id uuid REFERENCES categories(id) ON DELETE SET NULL,
  title text NOT NULL,
  description text,
  price numeric(10,2) NOT NULL DEFAULT 0,
  image_url text,
  is_new_arrival boolean NOT NULL DEFAULT false,
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id uuid REFERENCES products(id) ON DELETE SET NULL,
  product_title text NOT NULL,
  product_price numeric(10,2) NOT NULL,
  customer_name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  city text NOT NULL,
  address text NOT NULL,
  street text,
  notes text,
  status text NOT NULL DEFAULT 'pending',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

-- Helper: is the current user the admin?
-- We compare auth.jwt()->>'email' to the admin address.
-- This works for SELECT/UPDATE/DELETE policies.

-- CATEGORIES: public read, admin write
DROP POLICY IF EXISTS "public_read_categories" ON categories;
CREATE POLICY "public_read_categories" ON categories FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "admin_insert_categories" ON categories;
CREATE POLICY "admin_insert_categories" ON categories FOR INSERT
  TO authenticated WITH CHECK (auth.jwt() ->> 'email' = 'binteakram224@gmail.com');

DROP POLICY IF EXISTS "admin_update_categories" ON categories;
CREATE POLICY "admin_update_categories" ON categories FOR UPDATE
  TO authenticated USING (auth.jwt() ->> 'email' = 'binteakram224@gmail.com')
  WITH CHECK (auth.jwt() ->> 'email' = 'binteakram224@gmail.com');

DROP POLICY IF EXISTS "admin_delete_categories" ON categories;
CREATE POLICY "admin_delete_categories" ON categories FOR DELETE
  TO authenticated USING (auth.jwt() ->> 'email' = 'binteakram224@gmail.com');

-- PRODUCTS: public read (active only), admin full write
DROP POLICY IF EXISTS "public_read_products" ON products;
CREATE POLICY "public_read_products" ON products FOR SELECT
  TO anon, authenticated USING (is_active = true);

DROP POLICY IF EXISTS "admin_read_all_products" ON products;
CREATE POLICY "admin_read_all_products" ON products FOR SELECT
  TO authenticated USING (auth.jwt() ->> 'email' = 'binteakram224@gmail.com');

DROP POLICY IF EXISTS "admin_insert_products" ON products;
CREATE POLICY "admin_insert_products" ON products FOR INSERT
  TO authenticated WITH CHECK (auth.jwt() ->> 'email' = 'binteakram224@gmail.com');

DROP POLICY IF EXISTS "admin_update_products" ON products;
CREATE POLICY "admin_update_products" ON products FOR UPDATE
  TO authenticated USING (auth.jwt() ->> 'email' = 'binteakram224@gmail.com')
  WITH CHECK (auth.jwt() ->> 'email' = 'binteakram224@gmail.com');

DROP POLICY IF EXISTS "admin_delete_products" ON products;
CREATE POLICY "admin_delete_products" ON products FOR DELETE
  TO authenticated USING (auth.jwt() ->> 'email' = 'binteakram224@gmail.com');

-- ORDERS: public insert, admin read/update/delete
DROP POLICY IF EXISTS "public_insert_orders" ON orders;
CREATE POLICY "public_insert_orders" ON orders FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "admin_read_orders" ON orders;
CREATE POLICY "admin_read_orders" ON orders FOR SELECT
  TO authenticated USING (auth.jwt() ->> 'email' = 'binteakram224@gmail.com');

DROP POLICY IF EXISTS "admin_update_orders" ON orders;
CREATE POLICY "admin_update_orders" ON orders FOR UPDATE
  TO authenticated USING (auth.jwt() ->> 'email' = 'binteakram224@gmail.com')
  WITH CHECK (auth.jwt() ->> 'email' = 'binteakram224@gmail.com');

DROP POLICY IF EXISTS "admin_delete_orders" ON orders;
CREATE POLICY "admin_delete_orders" ON orders FOR DELETE
  TO authenticated USING (auth.jwt() ->> 'email' = 'binteakram224@gmail.com');

-- Indexes
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category_id);
CREATE INDEX IF NOT EXISTS idx_products_new_arrival ON products(is_new_arrival) WHERE is_new_arrival = true;
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
CREATE INDEX IF NOT EXISTS idx_orders_created ON orders(created_at DESC);
