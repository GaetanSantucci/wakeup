BEGIN;

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE DOMAIN EMAIL AS TEXT CHECK ( value ~ '^[\w\-\.]+@([\w-]+\.)+[\w-]+$');

CREATE DOMAIN PASSWORD AS TEXT CHECK ( value ~ '^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{6,}$');

CREATE DOMAIN ZIPCODE AS text CHECK (
    -- 63000 à 63999
    VALUE ~ '63\d{3}' 
);

BEGIN;

CREATE TABLE IF NOT EXISTS public.plate(
  id INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  subtitle VARCHAR(100) NULL,
  description TEXT NOT NULL,
  image TEXT NULL,
  price NUMERIC(10,2) NOT NULL,
  is_new BOOLEAN NOT NULL DEFAULT FALSE,
  slug TEXT NULL,
  dimension TEXT NULL
);

CREATE TABLE IF NOT EXISTS public.blog(
  id INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  title VARCHAR(100) NOT NULL,
  subtitle VARCHAR(100),
  description TEXT NOT NULL,
  image TEXT NULL,
  interaction VARCHAR(100) NULL,
  slug VARCHAR(100) NULL,
  created_at timestamptz NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.delivery_area(
  id INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  city VARCHAR(100) NOT NULL,
  zipcode ZIPCODE NOT NULL,
  price NUMERIC(10,2) NOT NULL
);

CREATE TABLE IF NOT EXISTS public.addon_sales(
  id INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  subtitle VARCHAR(100) NULL,
  description TEXT NOT NULL,
  image TEXT NULL,
  price NUMERIC(10,2) NOT NULL,
  is_new BOOLEAN NOT NULL DEFAULT FALSE
);

CREATE TABLE IF NOT EXISTS public.plate_has_addon_sales(
  addon_sales_id INTEGER REFERENCES public.addon_sales(id),
  plate_id INTEGER REFERENCES public.plate(id)
);

CREATE TABLE IF NOT EXISTS public.user (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  email EMAIL NULL,
  password PASSWORD NULL,
  lastname VARCHAR(100) NULL,
  firstname VARCHAR(100) NULL,
  address JSON NULL,
  phone VARCHAR(20) NULL,
  role VARCHAR(50) NULL,
  newsletter_optin BOOLEAN NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT NOW(),
  update_at timestamptz NULL
);

CREATE TABLE IF NOT EXISTS public.order_details (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id uuid NOT NULL,
  total NUMERIC(10, 2) NOT NULL,
  booking_date TIMESTAMP NOT NULL DEFAULT NOW(),
  payment_id INTEGER NOT NULL,
  created_at timestamptz NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.payment_details (
  id INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  order_id uuid NULL,
  amount NUMERIC(10, 2) NOT NULL,
  status VARCHAR(50) NOT NULL,
  payment_mode VARCHAR(50) NOT NULL,
  payment_date TIMESTAMP NULL,
  created_at timestamptz NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.order_items (
  id INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  order_id uuid NOT NULL,
  plate_id INTEGER NULL,
  addon_id INTEGER NULL,
  quantity INTEGER NOT NULL,
  created_at timestamptz NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.review (
  id INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  description TEXT NOT NULL,
  author VARCHAR(50) NOT NULL,
  date VARCHAR(20) NOT NULL,
  star INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS public.closed_days (
  id INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  closing_date TIMESTAMP NULL,
);


ALTER TABLE order_items ADD FOREIGN KEY (order_id) REFERENCES order_details(id);
ALTER TABLE order_items ADD FOREIGN KEY (plate_id) REFERENCES plate(id);
ALTER TABLE order_items ADD FOREIGN KEY (addon_id) REFERENCES addon_sales(id);

ALTER TABLE order_details ADD FOREIGN KEY (user_id) REFERENCES public.user(id);
ALTER TABLE order_details ADD FOREIGN KEY (payment_id) REFERENCES payment_details(id);
ALTER TABLE payment_details ADD FOREIGN KEY (order_id) REFERENCES order_details(id);


COMMIT;