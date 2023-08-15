--?-------------------------------------------------------------
-- ? FUNCTION TO CREATE USER WITH CONDITION IF IT'S MEMBER OR SIMPLY CUSTOMER,  need object in args 
CREATE OR REPLACE FUNCTION create_user(jsonb) RETURNS UUID LANGUAGE plpgsql AS $$
DECLARE
  user_id UUID;
BEGIN
  IF ($1 ? 'email' AND $1 ? 'password') THEN
    IF NOT EXISTS(SELECT U.email FROM "user" as U WHERE U.email = ($1->>'email')) THEN
      INSERT INTO "user"("email", "password", "newsletter_optin")
      VALUES (
          COALESCE(($1 ->> 'email')::EMAIL, ''),
          COALESCE(($1 ->> 'password')::PASSWORD, ''),
          COALESCE(($1 ->> 'newsletter_optin')::BOOLEAN, false))
      RETURNING id INTO user_id;
    ELSE
      RAISE NOTICE 'User already exists';
    END IF;
  ELSE
    INSERT INTO "user"("email", "lastname", "firstname", "address", "phone")
    VALUES (
          COALESCE(($1 ->> 'email')::EMAIL, ''),
          COALESCE(($1 ->> 'lastname')::TEXT, ''),
          COALESCE(($1 ->> 'firstname')::TEXT, ''),
          COALESCE(($1 ->> 'address')::JSON, null),
          COALESCE(($1 ->> 'phone')::TEXT, '')
          )
    RETURNING id INTO user_id;
  END IF;
    RETURN user_id;
END;
$$
;

CREATE OR REPLACE FUNCTION create_user(jsonb) RETURNS UUID LANGUAGE plpgsql AS $$
DECLARE
  user_id UUID;
BEGIN
      INSERT INTO "user"("email", "password", "lastname", "firstname", "address", "phone", "role", "newsletter_optin")
      VALUES ( 
          COALESCE(($1 ->> 'email')::EMAIL, ''),
          COALESCE(($1 ->> 'password')::TEXT, ''),
          COALESCE(($1 ->> 'lastname')::TEXT, ''),
          COALESCE(($1 ->> 'firstname')::TEXT, ''),
          COALESCE(($1 ->> 'address')::JSON, ''),
          COALESCE(($1 ->> 'phone')::TEXT, ''),
          COALESCE(($1 ->> 'role')::TEXT, null),
          COALESCE(($1 ->> 'newsletter_optin')::BOOLEAN, false)
          )
      RETURNING id INTO user_id;
    RETURN user_id;
END;
$$
;


--?-------------------------------------------------------------
--? FUCNTION TO CREATE payment_details, need object in args 
CREATE OR REPLACE FUNCTION insert_payment_details(jsonb)
  RETURNS INTEGER
AS $$
DECLARE
  new_id INTEGER;
BEGIN
  INSERT INTO "payment_details"("amount", "status", "payment_mode", "payment_date")
  VALUES(
    ($1 ->> 'amount')::NUMERIC(10, 2),
    ($1 ->> 'status')::VARCHAR(50),
    ($1 ->> 'payment_mode')::VARCHAR(50),
    to_timestamp(($1 ->> 'payment_date')::BIGINT)
  )
  RETURNING id INTO new_id;
  
  RETURN new_id;
END;
$$

LANGUAGE plpgsql;

SELECT insert_payment_details('{
  "amount": 100.00,
  "status": "completed",
  "payment_mode": "card",
  "payment_date": "2023-07-11 12:34:56"
}');


--?-------------------------------------------------------------
--? FUNCTION TO CREATE ORDER, need object in args 

CREATE OR REPLACE FUNCTION insert_order_details(jsonb) 
RETURNS uuid AS $$
DECLARE
  new_id uuid;
BEGIN
  INSERT INTO public.order_details (
    user_id,
    total,
    booking_date,
    payment_id
  ) VALUES (
    		($1 ->> 'user_id')::uuid,
    		($1 ->> 'total')::NUMERIC(10, 2), 
    		($1 ->> 'booking_date')::TIMESTAMP,
    		($1 ->> 'payment_id')::INT
  ) RETURNING id INTO new_id;
  
  RETURN new_id;
END;
$$
LANGUAGE plpgsql;

-- SELECT insert_order_details( '{
-- 							"user_id": "b723d553-75b1-46ca-9d75-63713734c936",
-- 							"total" : 94.40,
-- 							"booking_date" : "2023-07-26 00:00:00",
-- 							"payment_id": 9
-- 							}');


--?-------------------------------------------------------------
-- ? TRIGGER FUNCTION TO UPDATE PAYMENT DETAILS ON INSERT ROW IN ORDER_DETAILS
CREATE OR REPLACE FUNCTION update_payment_details()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE payment_details
  SET order_id = NEW.id
  WHERE id = NEW.payment_id;
  RETURN NEW;
END;
$$ 
LANGUAGE plpgsql;

CREATE TRIGGER order_details_trigger
AFTER INSERT ON order_details
FOR EACH ROW
EXECUTE FUNCTION update_payment_details();


--?-------------------------------------------------------------
--? FUNCTION CREATE ORDER_ITEMS using order_details.id, need json object
CREATE OR REPLACE FUNCTION insert_order_items(jsonb)
RETURNS INTEGER
AS $$
DECLARE
  new_id INTEGER;
BEGIN
  INSERT INTO order_items("order_id", "product_id", "quantity")
  VALUES (
    ($1 ->> 'order_id')::uuid,
    ($1 ->> 'product_id')::INT,
    ($1 ->> 'quantity')::INT
  )
  RETURNING id INTO new_id;
  
  RETURN new_id;
END;
$$
LANGUAGE plpgsql;

DROP FUNCTION IF EXISTS create_user();
DROP FUNCTION IF EXISTS insert_payment_details();
DROP FUNCTION IF EXISTS insert_order_details();
DROP TRIGGER IF EXISTS order_details_trigger ON order_details CASCADE;
DROP FUNCTION IF EXISTS update_payment_details();