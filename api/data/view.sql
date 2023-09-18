-- ? View to see all orders
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

SELECT * FROM newgetallorders;

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

  SELECT * FROM newgetorderbyuser WHERE user_id = '97270839-48a3-4d4c-97b4-a7da682e1c58';

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

SELECT * FROM getAllAvailableDates;