--?-------------------------------------------------------------
-- ? FUNCTION TO CREATE USER WITH CONDITION IF IT'S MEMBER OR SIMPLY CUSTOMER,  need object in args 
CREATE OR REPLACE FUNCTION create_user(jsonb) RETURNS UUID LANGUAGE plpgsql AS $$
DECLARE
  user_id UUID;
BEGIN
  IF ($1 ? 'email' AND $1 ? 'password') THEN
    IF NOT EXISTS(SELECT U.email FROM "user" as U WHERE U.email = ($1->>'email')) THEN
      INSERT INTO "user"("email", "password", "role", "newsletter_optin")
      VALUES (
          COALESCE(($1 ->> 'email')::EMAIL, ''),
          COALESCE(($1 ->> 'password')::PASSWORD, ''),
          COALESCE(($1 ->> 'role')::TEXT)
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


--?-------------------------------------------------------------
-- ? FUNCTION TO UPDATE USER WITH CONDITION  
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


CREATE OR REPLACE FUNCTION update_user(jsonb)
RETURNS VOID AS $$
  BEGIN
        -- Update user
        UPDATE "user"
        SET 
            "email" = COALESCE(($1 ->> 'email')::EMAIL, "email"),
            "password" = COALESCE(($1 ->> 'password')::TEXT, "password"),
            "lastname" = COALESCE(($1 ->> 'lastname')::TEXT, "lastname"), 
            "firstname" = COALESCE(($1 ->> 'firstname')::TEXT, "firstname"),
            "address" = COALESCE(($1 ->> 'address')::JSONB, "address"),
            "phone" = COALESCE(($1 ->> 'phone')::TEXT, "phone"),
            "role" = COALESCE(($1 ->> 'role')::TEXT, "role"),
            "newsletter_optin" = COALESCE(($1 ->> 'newsletter_optin')::BOOLEAN, "newsletter_optin"),
            "update_at" = NOW()
        WHERE "id" = ($1 ->> 'id')::UUID;
END;
$$
 LANGUAGE plpgsql;



 CREATE OR REPLACE FUNCTION delete_user(userId UUID) RETURNS BOOLEAN AS
$$
DECLARE
    user_deleted BOOLEAN := false;
BEGIN
    -- Delete related records first
    UPDATE order_details 
    SET user_id = NULL
    WHERE user_id = userId;

    -- Delete the user
    DELETE FROM public.user
    WHERE id = userId;

    IF FOUND THEN
        user_deleted := true;
    END IF;

    COMMIT;
    RETURN user_deleted;
END;
$$

LANGUAGE plpgsql;
 

--?-------------------------------------------------------------
--? FUCNTION TO CREATE payment_details, need object in args 
CREATE OR REPLACE FUNCTION insert_payment_details(jsonb)
  RETURNS INTEGER
AS $$
DECLARE
  new_id INTEGER;
BEGIN
  INSERT INTO "payment_details"("amount", "status", "payment_mode", "payment_id","payment_date")
  VALUES(
    ($1 ->> 'amount')::NUMERIC(10, 2),
    ($1 ->> 'status')::VARCHAR(50),
    ($1 ->> 'payment_mode')::VARCHAR(50),
    --! ajout ligne payment_id
    ($1 ->> 'payment_id')::VARCHAR(100),
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
  "payment_id": "448IHU87J12",
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
        --! modification type payment_id en varchar
    		($1 ->> 'payment_id')::VARCHAR(100)
  ) RETURNING id INTO new_id;
  
  RETURN new_id;
END;
$$
LANGUAGE plpgsql;

SELECT insert_order_details( '{
							"user_id": "b723d553-75b1-46ca-9d75-63713734c936",
							"total" : 94.40,
							"booking_date" : "2023-07-26 00:00:00",
							"payment_id": "448IHU87J12"
							}');


--?-------------------------------------------------------------
-- ? TRIGGER FUNCTION TO UPDATE PAYMENT DETAILS ON INSERT ROW IN ORDER_DETAILS
CREATE OR REPLACE FUNCTION update_payment_details()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE payment_details
  SET order_id = NEW.id
  --! CHANGE ID BY payment_id to set by id generated by paypal or stripe
  WHERE payment_id = NEW.payment_id;
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

CREATE OR REPLACE FUNCTION update_payment_status_by_payment_id(
    p_payment_id VARCHAR(100),
    p_new_status VARCHAR(50)
) RETURNS VOID AS $$
BEGIN
    UPDATE public.payment_details
    SET status = p_new_status
    WHERE payment_id = p_payment_id;
    
    -- Optional: Raise an exception if no rows were updated
    IF NOT FOUND THEN
        RAISE EXCEPTION 'No rows found for payment_id: %', p_payment_id;
    END IF;
END;
$$ LANGUAGE plpgsql;



CREATE OR REPLACE FUNCTION create_special_day(jsonb)
RETURNS INTEGER
AS $$
DECLARE
  new_id INTEGER;
BEGIN
  INSERT INTO special_day("date", "plate_quantity", "closing_day")
  VALUES (
    COALESCE(($1 ->> 'date')::timestamptz),
    COALESCE(($1 ->> 'plate_quantity')::INT),
    COALESCE(($1 ->> 'closing_day')::BOOLEAN)
  )
  RETURNING id INTO new_id;
  
  RETURN new_id;
END;
$$
LANGUAGE plpgsql;

SELECT create_special_day('{"date": "2023-10-08 00:00:00+01", "plate_quantity": 8}')
SELECT create_special_day('{"date": "2023-10-14 00:00:00+01", "closing_day": true}')

CREATE OR REPLACE FUNCTION update_special_day(jsonb)
RETURNS VOID AS $$
  BEGIN
        -- Update special_day
        UPDATE "special_day"
        SET 
            "plate_quantity" = COALESCE(($1 ->> 'plate_quantity')::INT, "plate_quantity")
            "closing_day" = COALESCE(($1 ->> 'closing_day')::BOOLEAN, "closing_day"),
        WHERE "date" = ($1 ->> 'date')::timestamptz;
END;
$$
 LANGUAGE plpgsql;

SELECT update_special_day('{"date": "2023-10-21T00:00:00.000Z", "closing_day": true}')

DROP FUNCTION IF EXISTS create_user();
DROP FUNCTION IF EXISTS insert_payment_details();
DROP FUNCTION IF EXISTS insert_order_details();
DROP TRIGGER IF EXISTS order_details_trigger ON order_details CASCADE;
DROP FUNCTION IF EXISTS update_payment_details();
DROP FUNCTION IF EXISTS create_closed_day

 