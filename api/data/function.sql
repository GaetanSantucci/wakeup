CREATE OR REPLACE FUNCTION create_customer(json)
RETURNS VOID
LANGUAGE plpgsql AS
$$
BEGIN
	IF (SELECT EXISTS(SELECT C.email FROM "customer" as C WHERE C."email" = ($1->>'email'))) = false THEN
			INSERT INTO "customer"("email", "password", "lastname", "firstname", "address", "phone", "role", "newsletter_optin")
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