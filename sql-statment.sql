-- CREATE DUMMY DATA FOR TESTING
-- create Categories 
INSERT INTO categories (name) VALUES('cat 1');
INSERT INTO categories (name) VALUES('cat 2');
INSERT INTO categories (name) VALUES('cat 3');

-- create Products 
INSERT INTO products (name, price, category_id) VALUES('product 1', 100, 1);
INSERT INTO products (name, price, category_id) VALUES('product 2', 19, 1);
INSERT INTO products (name, price, category_id) VALUES('product 3', 36.6, 1);
INSERT INTO products (name, price, category_id) VALUES('product 4', 100, 2);
INSERT INTO products (name, price, category_id) VALUES('product 5', 19, 2);
INSERT INTO products (name, price, category_id) VALUES('product 6', 36.6, 2);
INSERT INTO products (name, price, category_id) VALUES('product 7', 100, 3);
INSERT INTO products (name, price, category_id) VALUES('product 8', 19, 3);
INSERT INTO products (name, price, category_id) VALUES('product 9', 36.6, 3);

-- create Orders 
INSERT INTO orders (status, user_id) VALUES('active',1);
INSERT INTO orders (status, user_id) VALUES('active',1);
INSERT INTO orders (status, user_id) VALUES('active',1);
INSERT INTO orders (status, user_id) VALUES('complete',1);


