CREATE VIEW getAllOrdersByUser AS
WITH ProductSums AS (
  SELECT
    oi.product_id,
    SUM(p.price * oi.quantity) AS total_product_price,
    SUM(oi.quantity) AS total_order_quantity
  FROM order_items oi
  JOIN product p ON oi.product_id = p.id
  GROUP BY oi.product_id
)

SELECT
  u.id AS user_id,
  od.booking_date,
  pd.status AS payment_status,
  JSON_AGG(
    JSON_BUILD_OBJECT(
      'product_id', ps.product_id,
      'product_name', p.name,
      'total_product_price', ps.total_product_price,
      'total_order_quantity', ps.total_order_quantity
    )
  ) AS products
FROM order_details od
JOIN payment_details pd ON od.payment_id = pd.payment_id
JOIN "user" u ON od.user_id = u.id
JOIN order_items oi ON od.id = oi.order_id
JOIN ProductSums ps ON oi.product_id = ps.product_id
JOIN product p ON oi.product_id = p.id
WHERE pd.status = 'paid' AND u.id = user_id
GROUP BY od.booking_date, pd.status, u.id, u.email
ORDER BY od.booking_date ASC;

CREATE VIEW getAllOrders AS 
WITH ProductSums AS (
  SELECT
    oi.product_id,
    SUM(p.price * oi.quantity) AS total_product_price,
    SUM(oi.quantity) AS total_order_quantity
  FROM order_items oi
  JOIN product p ON oi.product_id = p.id
  GROUP BY oi.product_id
)

SELECT
  u.id AS user_id,
  u.email AS user_email,
  u.phone AS user_phone,
  u.address AS user_address,
    od.booking_date,
  pd.status AS payment_status,
  JSON_AGG(
    JSON_BUILD_OBJECT(
      'product_id', ps.product_id,
      'product_name', p.name,
      'total_product_price', ps.total_product_price,
      'total_order_quantity', ps.total_order_quantity
    )
  ) AS products
FROM order_details od
JOIN payment_details pd ON od.payment_id = pd.payment_id
JOIN "user" u ON od.user_id = u.id
JOIN order_items oi ON od.id = oi.order_id
JOIN ProductSums ps ON oi.product_id = ps.product_id
JOIN product p ON oi.product_id = p.id
WHERE pd.status = 'paid'
GROUP BY od.booking_date, pd.status, u.id, u.email
ORDER BY od.booking_date ASC;

CREATE VIEW getAllAvailableDates AS 
SELECT od.booking_date AT TIME ZONE 'Etc/GMT+2' AS booking_date, 
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