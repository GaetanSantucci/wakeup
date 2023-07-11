CREATE OR REPLACE FUNCTION create_user(json)
RETURNS VOID
LANGUAGE plpgsql AS
$$
BEGIN
	IF (SELECT EXISTS(SELECT U.email FROM "user" as U WHERE U."email" = ($1->>'email'))) = false THEN
			INSERT INTO "user"("email", "password", "lastname", "firstname", "address", "phone", "role", "newsletter_optin")
			VALUES(
			($1 ->> 'email')::EMAIL, 
    		($1 ->> 'password')::TEXT,
    		($1 ->> 'lastname')::TEXT, 
    		($1 ->> 'firstname')::TEXT,
    		($1 ->> 'address')::JSON,
    		($1 ->> 'phone')::TEXT,
    		($1 ->> 'role')::TEXT,
			($1 ->> 'newsletter_optin')::BOOLEAN
				);
			ELSE
		RAISE NOTICE 'User already exist';
	END IF;
END;
$$;

DROP FUNCTION IF EXISTS create_customer;


CREATE OR REPLACE FUNCTION create_user(json)
RETURNS VOID
LANGUAGE plpgsql AS
$$
BEGIN
	IF ($1 ? 'email' AND $1 ? 'password') THEN
		IF NOT EXISTS(SELECT U.email FROM "user" as U WHERE U.email = ($1->>'email')) THEN
			INSERT INTO "user"("email", "password", "lastname", "firstname", "address", "phone", "role", "newsletter_optin")
			VALUES (
				($1 ->> 'email')::EMAIL, 
				($1 ->> 'password')::TEXT,
				($1 ->> 'lastname')::TEXT, 
				($1 ->> 'firstname')::TEXT,
				($1 ->> 'address')::JSON,
				($1 ->> 'phone')::TEXT,
				EAN
			);
		ELSE
			RAISE NOTICE 'User already exists';
		END IF;
	ELSE
		INSERT INTO "user"("lastname", "firstname", "address", "phone", "role", "newsletter_optin")
		VALUES (
			($1 ->> 'lastname')::TEXT, 
			($1 ->> 'firstname')::TEXT,
			($1 ->> 'address')::JSON,
			($1 ->> 'phone')::TEXT,
			($1 ->> 'role')::TEXT,
			($1 ->> 'newsletter_optin')::BOOLEAN
		);
	END IF;
END;
$$;


CREATE OR REPLACE FUNCTION create_payment(json)
RETURNS VOID
LANGUAGE plpgsql AS
$$
BEGIN
			INSERT INTO "payment_details"("order_id", "amount", "status", "payment_mode", "payment_date")
			VALUES(
			  ($1 ->> 'order_id')::uuid, 
    		($1 ->> 'amount')::INT,
    		($1 ->> 'status')::TEXT, 
    		($1 ->> 'payment_mode')::TEXT,
    		($1 ->> 'payment_date')::TEXT,
			);
END;
$$;