BEGIN;

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE DOMAIN EMAIL AS TEXT CHECK ( value ~ '^[\w\-\.]+@([\w-]+\.)+[\w-]+$');

CREATE DOMAIN PASSWORD AS TEXT CHECK ( value ~ '^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{6,}$');

CREATE DOMAIN ZIPCODE AS text CHECK (
    -- 63000 à 63999
    VALUE ~ '63\d{3}' 
);

-- BEGIN;
-- ! replace plate by product
CREATE TABLE IF NOT EXISTS public.product(
  id INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  subtitle VARCHAR(100) NULL,
  description TEXT NOT NULL,
  image TEXT NULL,
  price NUMERIC(10,2) NOT NULL,
  is_new BOOLEAN NOT NULL DEFAULT FALSE,
  slug TEXT NULL,
  dimension TEXT NULL,
  category VARCHAR(50) NOT NULL
);

CREATE TABLE IF NOT EXISTS public.blog(
  id INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  title VARCHAR(100) NOT NULL,
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

CREATE TABLE IF NOT EXISTS public.user (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  email EMAIL NULL UNIQUE,
  password PASSWORD NULL,
  lastname VARCHAR(100) NULL,
  firstname VARCHAR(100) NULL,
  address JSON NULL,
  phone VARCHAR(20) NULL,
  role VARCHAR(50) NULL,
  newsletter_optin BOOLEAN NULL DEFAULT false,
  token TEXT NULL,
  expirationTime timestamptz NULL, 
  created_at timestamptz NOT NULL DEFAULT NOW(),
  update_at timestamptz NULL
);

CREATE TABLE IF NOT EXISTS public.order_details (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id uuid NOT NULL,
  booking_date TIMESTAMP NOT NULL,
  payment_id VARCHAR(100) NOT NULL,
  total NUMERIC(10, 2) NOT NULL,
  created_at timestamptz NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.payment_details (
  id INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  order_id uuid NULL,
  payment_id VARCHAR(100) NOT NULL UNIQUE,
  status VARCHAR(50) NOT NULL,
  amount NUMERIC(10, 2) NOT NULL,
  payment_mode VARCHAR(50) NOT NULL,
  payment_date TIMESTAMP NULL,
  created_at timestamptz NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.order_items (
  id INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  order_id uuid NOT NULL,
  product_id INTEGER NULL,
  quantity INTEGER NOT NULL,
  created_at timestamptz NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.review (
  id INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  description TEXT NOT NULL,
  author VARCHAR(50) NOT NULL,
  date VARCHAR(20) NOT NULL,
  star INTEGER NOT NULL,
  source VARCHAR(50) NOT NULL
);

CREATE TABLE IF NOT EXISTS public.special_day (
  id INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  date TIMESTAMP NOT NULL,
  plate_quantity INT NULL,
  closind_day BOOLEAN NULL,
  created_at timestamptz NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.voucher (
    id INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
    voucher_id TEXT NOT NULL,
    expiration_date timestamptz NOT NULL,
    initial_amount NUMERIC(10,2) NOT NULL,
    amount_used NUMERIC(10,2) NULL,
    date_use timestamptz NULL,
    created_at timestamptz NOT NULL DEFAULT NOW()
);

ALTER TABLE order_items ADD FOREIGN KEY (order_id) REFERENCES order_details(id);
ALTER TABLE order_items ADD FOREIGN KEY (product_id) REFERENCES product(id);
ALTER TABLE order_details ADD FOREIGN KEY (user_id) REFERENCES public.user(id);
-- ALTER TABLE order_details ADD FOREIGN KEY (payment_id) REFERENCES payment_details(id);
-- replace by payment_details(payment_id)
ALTER TABLE order_details ADD FOREIGN KEY (payment_id) REFERENCES payment_details(payment_id);
ALTER TABLE payment_details ADD FOREIGN KEY (order_id) REFERENCES order_details(id);
ALTER TABLE public.product OWNER TO wakeup;
ALTER TABLE public.delivery_area OWNER TO wakeup;
ALTER TABLE public.user OWNER TO wakeup;
ALTER TABLE public.order_details OWNER TO wakeup;
ALTER TABLE public.payment_details OWNER TO wakeup;
ALTER TABLE public.order_items OWNER TO wakeup;
ALTER TABLE public.review OWNER TO wakeup;
ALTER TABLE public.special_day OWNER TO wakeup;
ALTER TABLE public.voucher OWNER TO wakeup;


CREATE OR REPLACE FUNCTION create_user(jsonb) RETURNS UUID AS $$
DECLARE
  user_id UUID;
BEGIN
  IF ($1 ? 'email' AND $1 ? 'password') THEN
    IF NOT EXISTS(SELECT U.email FROM "user" as U WHERE U.email = ($1->>'email')) THEN
      INSERT INTO "user"("email", "password", "role", "newsletter_optin")
      VALUES (
          COALESCE(($1 ->> 'email')::EMAIL, ''),
          COALESCE(($1 ->> 'password')::PASSWORD, ''),
          COALESCE(($1 ->> 'role')::TEXT, ''),
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
LANGUAGE plpgsql;


-- --?-------------------------------------------------------------
-- -- ? FUNCTION TO UPDATE USER WITH CONDITION  
-- CREATE OR REPLACE FUNCTION create_user(jsonb) RETURNS UUID AS $$
-- DECLARE
--   user_id UUID;
-- BEGIN
--       INSERT INTO "user"("email", "password", "lastname", "firstname", "address", "phone", "role", "newsletter_optin")
--       VALUES ( 
--           COALESCE(($1 ->> 'email')::EMAIL, ''),
--           COALESCE(($1 ->> 'password')::TEXT, ''),
--           COALESCE(($1 ->> 'lastname')::TEXT, ''),
--           COALESCE(($1 ->> 'firstname')::TEXT, ''),
--           COALESCE(($1 ->> 'address')::JSON, ''),
--           COALESCE(($1 ->> 'phone')::TEXT, ''),
--           COALESCE(($1 ->> 'role')::TEXT, null),
--           COALESCE(($1 ->> 'newsletter_optin')::BOOLEAN, false)
--           )
--       RETURNING id INTO user_id;
--     RETURN user_id;
-- END;
-- $$
-- LANGUAGE plpgsql;


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
    ($1 ->> 'payment_id')::VARCHAR(100),
    to_timestamp(($1 ->> 'payment_date')::BIGINT)
  )
  RETURNING id INTO new_id;
  
  RETURN new_id;
END;
$$
LANGUAGE plpgsql;

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

CREATE OR REPLACE FUNCTION update_special_day(jsonb)
RETURNS VOID AS $$
  BEGIN
        -- Update special_day
        UPDATE "special_day"
        SET 
            "plate_quantity" = COALESCE(($1 ->> 'plate_quantity')::INT, "plate_quantity"),
            "closing_day" = COALESCE(($1 ->> 'closing_day')::BOOLEAN, "closing_day")
        WHERE "date" = ($1 ->> 'date')::timestamptz;
END;
$$
LANGUAGE plpgsql;

CREATE VIEW getAllOrders AS 
SELECT
  u.id AS user_id,
  u.lastname AS user_lastname,
  u.firstname AS user_firstname,
  u.email AS user_email,
  u.phone AS user_phone,
  u.address AS user_address,
  od.booking_date AT TIME ZONE 'GMT-4' AS booking_date,
  od.total AS total_amount,
  pd.status AS payment_status,
  JSON_AGG(
    JSON_BUILD_OBJECT(
      'product_id', oi.product_id,
      'product_name', p.name,
	  'product_price', p.price,
	  'quantity', oi.quantity
    )
  ) AS products
FROM order_details od
JOIN payment_details pd ON od.payment_id = pd.payment_id
JOIN "user" u ON od.user_id = u.id
JOIN order_items oi ON od.id = oi.order_id
JOIN product p ON oi.product_id = p.id
WHERE pd.status = 'paid'
GROUP BY od.booking_date, od.total, pd.status, u.id, u.email
ORDER BY od.booking_date ASC;

-- ? View to see all order create by user
CREATE VIEW GetOrdersByUser AS
 SELECT u.id AS user_id,
    od.booking_date,
	od.total AS total_amount,
    pd.status AS payment_status,
    json_agg(json_build_object(
		'product_id',oi.product_id, 
		'product_name', p.name, 
		'product_price', p.price, 
		'quantity', oi.quantity)) 
		AS products
  FROM order_details od
    JOIN payment_details pd ON od.payment_id = pd.payment_id::text
    JOIN "user" u ON od.user_id = u.id
    JOIN order_items oi ON od.id = oi.order_id
    JOIN product p ON oi.product_id = p.id
  WHERE pd.status::text = 'paid'::text AND u.id = od.user_id
  GROUP BY od.booking_date, pd.status, u.id, u.email, od.total
  ORDER BY od.booking_date;

-- ? View to see all date available with plate quantity condition
CREATE VIEW getAllAvailableDates AS 
SELECT od.booking_date AT TIME ZONE 'GMT-4' AS booking_date, 
          SUM(oi.quantity) AS plate_quantity, 
          COUNT(od.id) AS order_count
        FROM 
        order_details od 
          INNER JOIN order_items oi ON od.id = oi.order_id 
          INNER JOIN payment_details pd ON od.id = pd.order_id 
          INNER JOIN product p ON oi.product_id = p.id
          WHERE 
          p.category = 'plateau'        
        AND pd.status = 'paid'
        AND od.booking_date > CURRENT_DATE
          GROUP BY 
            od.booking_date
            ORDER BY 
            od.booking_date ASC;

CREATE VIEW getAllUsers AS 
SELECT
    U.lastname,
    U.firstname,
    U.phone,
    U.email,
    U.address,
    jsonb_agg(jsonb_build_object('booking_date', od.booking_date, 'total_amount', od.total) 
    ORDER BY od.booking_date) AS booking_info
FROM public.user AS U
LEFT JOIN order_details AS od ON U.id = od.user_id
--! enlever U.address du group by, a tester
GROUP BY U.id, U.lastname, U.firstname, U.phone, U.email
ORDER BY U.lastname ASC;

ALTER VIEW getAllUsers OWNER TO wakeup;
ALTER VIEW getAllAvailableDates OWNER TO wakeup;
ALTER VIEW getOrdersByUser OWNER TO wakeup;
ALTER VIEW getAllOrders OWNER TO wakeup;

ALTER FUNCTION create_special_day(jsonb) OWNER TO wakeup;
ALTER FUNCTION create_user(jsonb) OWNER TO wakeup;
ALTER FUNCTION delete_user(userid uuid) OWNER TO wakeup;
ALTER FUNCTION insert_order_details(jsonb) OWNER TO wakeup;
ALTER FUNCTION insert_order_items(jsonb) OWNER TO wakeup;
ALTER FUNCTION insert_payment_details(jsonb) OWNER TO wakeup;
ALTER FUNCTION update_payment_status_by_payment_id(
    VARCHAR(100),
    VARCHAR(50)
) OWNER TO wakeup;
ALTER FUNCTION update_special_day(jsonb) OWNER TO wakeup;
ALTER FUNCTION update_user(jsonb) OWNER TO wakeup;


INSERT INTO public.product(name, subtitle, description, image, price, is_new, slug, dimension, category)
	VALUES ('plateau sunshine', 'Conseillé pour 2-3 personnes', '3 viennoiseries artisanales\n
			Pain artisanal tranché\n 6 mini crêpes vanillées (fait-maison)\n 8 madeleines aux pépites de chocolat (fait-maison\n Cake  vanillé (fait-maison)\n Fruits frais\n 1 bouteille de jus d''orange frais (pressé maison de 25cl)\n Pâte à tartiner et confiture (Alain Milliat).', 
			'new_sunshine',
			29.90, false, 
			'sunshine', '45 x 25 x 6', 'plateau'),
			('plateau best-seller', 'Conseillé pour 2-3 personnes', 
			'3 viennoiseries artisanales\n Pain artisanal tranché\n 6 mini crêpes vanillées (fait-maison)\n 4 madeleines aux pépites de chocolat (fait-maison)\n Cake vanillé  (fait-maison)\n 4 gaufres salées emmental, tomates séchées et basilic frais (fait-maison)\n 4 "crescentine" (petits pains italien fait-maison) au jambon Serrano affinage 12 mois\n Cantal entre deux AOP (lait cru)\n 
			Fruits frais, légumes croquants\n 1 bouteille de jus d''orange frais (pressé maison de 25cl)\n Pâte à tartiner et confiture (Alain Milliat).', 
			'new_bestseller', 
 			42.90, false,
 			'bestseller', '45 x 25 x 6', 'plateau'),
			('plateau dolce vita', 'Conseillé pour 2-3 personnes', 
			'3 viennoiseries artisanales\n Pain artisanal tranché\n 6 mini crêpes vanillées (fait-maison)\n Cake vanillé (fait-maison)\n 6 gaufres salées emmental, tomates séchées et basilic frais (fait-maison)\n 4 "crescentine"(petits pains italien fait-maison) au jambon de Parme\n Jambon de Parme 16 mois d''affinage\n Pecorino DOP (fromage de brebis au lait pasteurisé) et Burrata à l''huile d''olive\n Fruits frais, légumes croquants et olives vertes\n Pâte à tartiner et confiture (Alain Milliat).', 
			'new_dolcevita', 
 			49.90, false,
 			'dolcevita', '45 x 25 x 6', 'plateau'),
			('plateau apéritif', 'Conseillé pour 4-5 personnes', 
			'Pain artisanal tranché\n 6 gaufres salées emmental, tomates séchées et basilic frais (fait-maison)\n Cantal entre deux AOP (lait cru)\n Bleu d''Auvergne AOP (lait cru)\n Bûche cendrée au lait de chèvre\n Jambon Serrano\n Bresaola (boeuf séché)\n Pistaches et figues séchées\n Fruits frais, légumes croquants et olives vertes\n Confiture (Alain Milliat).', 
			'aperitif', 
 			69.90, false,
 			'aperitif', '45 x 25 x 6', 'plateau'),
			('mini best-seller', 'Conseillé pour 1-2 personnes', 
			'1 pain au chocolat artisanal\n Pain artisanal tranché\n 3 mini crêpes vanillées (fait-maison)\n 2 madeleines aux pépites de chocolat (fait-maison)\n Cake vanillé (fait-maison)\n 2 gaufres emmental tomates séchées et basilic frais\n Cantal AOP (lait cru)\n Pâte à tartiner et confiture (Alain Milliat)\n Fruits frais et légumes croquants.', 
			'mini_bestseller', 
 			29.90, false,
 			'mini-best-seller', 'diam. 24', 'plateau'),
			( 'burrata à partager', 'Conseillé pour 1-2 personnes', 
			'Burrata crémeuse de 300g au lait de Bufflone et huile d''olive\n Pain tranché\n Fruits frais et légumes croquants.', 
			'burrata', 
 			32.90, false,
 			'burrata', 'diam. 24', 'plateau'),
			('mini dolce vita', 'Conseillé pour 1-2 personnes', 
			'1 pain au chocolat artisanal\n Pain artisanal tranché\n 3 mini crêpes vanillées (fait-maison)\n Cake vanillé (fait-maison)\n 3 gaufres emmental tomates séchées et basilic frais\n Burrata crémeuse au lait de bufflonne\n Jambon de Parme 16 mois d''affinage\n Copeaux de Pecorino DOP (fromage de brebis au lait pasteurisé)\n Fruits frais, légumes croquants et olives vertes\n Pâte à tartiner et confiture (Alain Milliat).', 
			'mini_dolce', 
 			34.90, false,
 			'mini-dolce-vita', 'diam. 24', 'plateau'),
			('mini apéritif', 'Conseillé pour 2-3 personnes', 
			'Pain artisanal tranché\n Cantal entre deux AOP (lait cru)\n Fourme d''Ambert AOP (lait cru) \n Crottin de chèvre (lait cru)\n Jambon Serrano affinage 12 mois\n Pistaches séchées et figues séchées\n Fruits frais, légumes croquants et olives verte\n Confitures (Alain Milliat).', 
			'mini_aperitif', 
 			42.90, false,
 			'mini-aperitif', 'diam. 24', 'plateau'),
			('jus d''orange pressé', '', 
			'Bouteille de 25cl de jus d''orange frais pressé maison.', 
			'orange', 
 			3.90, false,
 			'jus-orange', '25cl', 'boisson'),
			('prosecco riccadonna', '', 
			'Bouteille de Prosecco Riccadona de 20cl pour créer un cocktail mimosas, 4cl de jus d''orange mélangé à 8cl de prosecco', 
			'prosecco', 
 			6.90, false,
 			'prosecco', '20cl', 'boisson'),
			('thé noir - breakfast', '', 
			'Sachet de the noir breakfast Dammann', 
			'the_dammann', 
 			0.90, false,
 			'the-dammann', '1 sachet', 'boisson'),
			('noeud ruban en lin', '', 
			'Offrez un plateau avec un joli noeud fait avec un large ruban en lin', 
			'runban', 
 			3.90, false,
 			'ruban', '1 noeud', 'decoration');

				INSERT INTO public.blog(
	title, description, image, interaction, slug)
	VALUES ('Découvrez nos plateaux','Succombez à  nos plateaux gourmands, élégants et raffinés et passez un moment convivial et de partage avec vos proches. \n Nous sélectionnons des produits gourmands, et de qualité pour vous proposer le meilleur. \n Vous pouvez également accompagner vos plateaux brunch avec une bouteille de Prosecco Riccadonna. Ce vin blanc pétillant aux fines bulles caractérisé par sa fraicheur et ses notes fruitées accompagnera parfaitement l''un de nos brunch ou nos plateaux apéritifs.', 'aperitif-carousel, carousel-bestseller, dolce-carousel, buratta-carousel, carousel-aperitif, bestseller-carousel, carousel-dolce-gd, carousel-mini-aperitif', 'Découvrir', 'plateau'),
	('Offrez un moment de partage unique', 'Surprenez vos proches et offrez leur un petit-déjeuner gourmand livré à domicile ! Une idée originale pour un anniversaire ou pour les fêtes de fin d''année. \n Notre carte cadeau prête à offrir sera parfaite pour n''importe quelles occasions avec une jolie carte et son enveloppe élégante,  le cadeau parfait pour offrir un moment original et très gourmand ! \n Faites nous votre demande dans la rubrique Contact.', 'carte_cadeau', 'En savoir plus', 'prestation'),
	('Pour vos évènements', 'WAKE UP vous accompagne pour vos évènements tel qu''un anniversaire, un baptême, pour un apéritif dinatoire ou un lendemain de mariage.\n Nous sommes disponibles pour échanger avec vous concernant vos envies pour cet évènement.\n Pour toute demande, merci de nous contacter au minimum 2 semaines à l''avance.', 'plateau_aperitif_homepage', 'Contact', 'contact'),
	('Pour vos entreprises','Découvrez nos plateaux business pour vos petits-déjeuners d''entreprise, vos réunions, vos teams building ou tout autre évènement d''entreprise. \n Du petit-déjeuner classique au petit-déjeuner avec une touche salée, nos plateaux s''adapterons à toutes les envies. \nPour toute demande, merci de nous contacter au minimum 2 semaines à l''avance. Commande minimum supérieure à 75€.', 'business_homepage', 'En savoir plus', 'prestation');

INSERT INTO public.review (description, author, date, star, source)
	VALUES ('Comment ne pas mettre 5 étoiles? Déjà c''est incroyablement beau. Plein de couleur et de relief. Et puis tout est très bon. Des viennoiseries aux fruits, du pain aux fromages etc... Rien n''est laissé au hasard. Bref à ne pas 			louper. Juste incroyable', 'AurelASM', '02-2023', 5, 'google'),
	('La box était un régal aussi bien pour les yeux que pour le ventre 😁 Les produits sont vraiment frais, très bons (petite mention spéciale pour le cake vanillé et les pains au chocolats 😍) et de qualité.
On rajoute à ça une équipe super sympa que ce soit en échange de mails ou à la livraison.
Parfait du début à la fin, merci !', 'Laurie R.', '06-2023', 5, 'google'),
('Merci à Wake Up pour cet excellent petit déjeuner. Rien n’est laissé au hasard : qualité, présentation et quantité sont au rendez-vous ! A consommer sans aucune modération. Nous nous sommes régalés !', 'Nathalie P.', '08-2023', 5, 'google'),
('Super concept ! Plateau travaillé avec grand soin, les produits maisons sont succulents et variés. D’une grande qualité pour de l’emporté et à l’heure au point de rdv :)', 'Charlotte D.', '07-2023', 5, 'google' ),
('Un plateau incroyable !!! Idéal pour 2 ! Produits de qualité ! Le mélange des saveurs était parfait ! J’ai déjà hâte de tester les autres box !!! Vegetarian options: Il existe même d’autres box speciales vegans et vegetariens ! Kid-friendliness: Viennoiseries, fruits parfaits pour les ptits nin’s !', 'Elisabeth M.', '04-2023', 5, 'google'), 
('Après plusieurs commandes, produits toujours au top ! Produits frais faits maison et très belle présentation. De quoi bien commencer le week-end 🤩 Petit plus : livraison très ponctuelle avec un service chaleureux. Je recommande à 100%', 'Olivia B.', '03-2023', 5, 'google'),
('Excellent ! Autant visuellement que gustativement ! Une livraison ponctuelle avec des personnes très sympa. Je recommande vivement les yeux fermées (cake vanille super bon 😍)', 'Tiphanie R.', '06-2023', 5, 'google'),
('Des plateaux de qualité nous ont été servis à l’occasion du lendemain de notre mariage. La présentation était à l’image des propositions du site et les goûts ont comblé nos attentes. Nos invités ont également apprécié déguster ce petit-déjeuner.', 'Mégane V.', '08-2023', 5, 'google'),
('Nouvelle commande chez Wake Up directement livré dans notre jardin pour nous laisser faire la grasse-matinée. Produits de qualité, de saison et variés. Qualité prix très satisfaisant. Et quelques poissons offerts en ce lundi de Pâques !!
Toujours un succès....', 'Christel M.', '04-2023', 5, 'google'),
('Commande ce jour d’un plateau best seller, incroyablement complet et variés et surtout, produits de qualité extrêmement bons!', 'Ludwig D.', '02-2023', 5, 'google'),
					('Que dire de plus si ce n''est parfait 👌 Le froid est venu frapper à notre porte quand soudain Wake up est arrivé ! De la chaleur et des douceurs au petit déjeuner préparées avec sincérité et qualité. C''était une surprise pour un anniversaire qui débuta dans l''originalité, la simplicité le tout fait maison, de saison et avec raison. Je recommencerai sans hésiter !👏', 'Johanna R', '01-2023', 5, 'google'),
					('Parfait! Des produits frais et fait maison et un joli packagin pour offrir ou se faire plaisir !^^', 'Rachel B.', '12-2022', 5, 'google'),
					('Une équipe au top, très arrangeante et gentille ! Petit déjeuner livré à domicile dans une jolie box un vrai moment de douceur et gourmandise ! Des fruits de saison, des viennoiseries, crêpes madeleines délicieuses, jus d''orange frais… très copieux et gourmand et plein d’autres petits plaisirs salés… et les gaufres sont mon coup de cœur 😉 Je recommande à 100%', 'Nadia E.', '11-2022', 5, 'google'),
					('On s''est régalé, un vrai moment de partage et de bonheur en famille ! Merci encore ! On se fera ça de nouveau rapidement 😄', 'Lise B.', '11-2022', 5, 'google'),
					('Comme d''habitude, expérience au top: produits délicieux, choisis et cuisinés avec soin, box de qualité et joliment présentée. Quantités plus que généreuse, au top !', 'Lucas M.', '12-2022', 5, 'google'),
					('Nous avons pris la box Best Sellers et c’était vraiment parfait. On sent que que les produits sont frais et fait maison. C''est très complet, varié en sucré et salé et pour 2 personnes c’est le top. On s''est régalé. Je recommande ☺️', 'Johanna G.', '11-2022', 5, 'google'),
					('Profiter d''un dimanche cocooning avec un délicieux brunch en famille. La box est joliment présentée, les produits sont excellents et de qualité (crêpes, gâteau, madelaines, etc. fait maison)Vivement la prochaine commande!', 'Fanny M.', '11-2022', 5, 'google'),
					('Nous avons pris le plateau DOLCE VITA et nous n''avons pas été déçu! Une box complète avec du sucré et du salé qui nous a totalement comblé, ce qui est sûr, c’est qu''on recommandera', 'Tamara E.', '11-2022', 5, 'google'),
					('Plateau brunch délicieux et copieux. Des produits frais et de qualité ! La présentation est magnifique, c''est aussi beau que bon :-), l''heure de livraison est parfaitement respectée. Tout est parfait. Déjà hâte de passer une nouvelle commande.', 'Anne-Sophie M.', '11-2022', 5, 'google'),
					('Petit déjeuner bien présenté, délicieux, et personne en charge de la livraison très aimable !!!', 'MI R', '10-2022', 5, 'google'),
					('Box brunch au top, livraison sympathique à l''heure annoncée. On avait choisi la box à 39euro, le contenu est d''un bon rapport qualité/prix. Si on pinaille, on aurait apprécié quelques crudités (carottes ?) pour aller avec la sauce et une bouteille de jus un peu plus grande, c''était juste pour deux. À mon sens les pailles biodégradables sont sympathiques mais superflues. Dans l''ensemble c''était donc très bien, je recommande ! :D', 'Maïlys D.', '10-2022', 5, 'google'),
					('Merci pour ce magnifique brunch !!! C''était exceptionnel !!! Nous avons eu que de superbes compliments ✨ Merci pour votre gentillesse', 'Manon V.', '07-2023',5 ,'instagram'),
					('Qu''est ce qu''on s’est régalés ! Petits et grands ! Vous pouvez y aller les yeux fermés ! Merci à l’équipe WAKE UP !', 'Thomas L.', '10-2022', 5, 'google'),
					('Très beau rendu visuel, produits supers gourmands, livraison parfaite et horaires respectées ! Super moment passé entre copines.', 'Laetitia M.', '09-2022', 5, 'google'),
					('C''est la 3 ème fois que nous prenons cette box et c''est toujours super bon , des produits de qualité et prix juste . Bravo 👏', 'Stéphane M.', '09-2022', 5, 'google'),
					('J''ai commandé une box sucrée. Il s''agit de ma 3 ème dégustation Wake Up et la qualité est toujours au RDV. La box est super bien garnie et présentée. Les viennoiseries ont un feuilletage de dingue, et les fruits sont délicieux. Encore merci ☺️ à une prochaine fois !', 'Lion Lulu', '07-2022', 5, 'google'),
					('La box Dreamy porte bien son nom ! C''était un rêve de déguster ce délicieux petit déjeuner, tout est parfait, bien présenté, très complet, service au top, je recommande +++ c''était pour faire une surprise pour un anniversaire, et bien c''est réussi ! J''ai hâte de refaire ma prochaine commande ! Merci à vous', 'Océane', '05-2022', 5, 'google'),
					('Avons partagé à 2 le brunch, ce fut un délice. Fait de viennoiserie fait maison et de produits annexes de d''excellentes qualités, pâte à tartiner et confiture. La livraison a été effectuée dans les temps impartis avec en prime le sourire de la personne qui nous a livrée. Excellente première expérience, sûr je renouvellerai l''expérience sans hésiter. Merci à toute l''équipe Wakeup', 'Myriam T.', '01-2022', 5, 'google'),
					('Je suis très satisfait du service. J''ai acheté un petit-déjeuner pour mon petit ami d''Argentine et la livraison a été un succès. Ils ont inclus un message personnel que je leur ai demandé de faire, ils sont arrivés à l''heure et la meilleure chose était que les produits étaient très bons. Ils m''ont fait me sentir proche de mon petit ami lors d''une journée spéciale et ils ont parfaitement compris ce dont j''avais besoin. Je recommande ce service à 100%.', 'Nadia G.', '03-2022', 5, 'simplybook');

INSERT INTO public.delivery_area(city, zipcode, price)
	VALUES ('Aulnat','63510',3.5),
		('Lussat','63360',3.5),
		('Riom','63200',5.5),
		('Chamalières','63400',3.5),
		('Clermont-Ferrand','63100',3.5),
		('Clermont-Ferrand','63000',3.5),
		('Beaumont','63110',5.5),
		('Pont du Château','63430',3.5),
		('Gerzat','63360',3.5),
		('Aubière','63170',3.5),
		('Lempdes','63370',3.5),
		('Romagnat','63540',5.5),
		('Cebazat','63118',3.5),
		('Ceyrat','63122',5.5),
		('Le Cendre','63670',5.5),
		('Royat','63130',5.5),
		('Les Martres de Veyre','63730',5.5),
		('Mozac','63200',5.5),
		('Blanzat','63112',3.5),
		('Orcines','63870',5.5),
		('Châteaugay','63119',5.5),
		('Orcet','63670',5.5),
		('Pérignat lès Sarliève ','63170',5.5),
		('Pérignat sur Allier','63800',5.5),
		('Ennezat','63720',5.5),
		('Sayat','63530',5.5),
		('Mezel','63115',5.5),
		('Saint-Beauzire','63360',3.5),
		('Les Martres d''Artière','63430',3.5),
		('Durtol','63830',3.5),
		('Nohanent','63830',3.5),
		('Ménétrol','63200',5.5),
		('Chappes','63720',3.5),
		('Dallet','63111',3.5),
		('Malauzat','63200',5.5),
		('Joze','63350',5.5),
		('Malintrat','63510',3.5),
		('Chavaroux','63720',3.5),
		('Cournon-d''Auvergne','63800',5.5);
    
COMMIT;