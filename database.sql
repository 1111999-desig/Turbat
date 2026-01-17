CREATE DATABASE IF NOT EXISTS my_land_property CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE my_land_property;

CREATE TABLE IF NOT EXISTS admins (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(100) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS settings (
  id INT PRIMARY KEY,
  hero_image VARCHAR(255) NULL,
  whatsapp_number VARCHAR(50) NULL,
  about_title VARCHAR(255) NULL,
  about_body TEXT NULL,
  contact_email VARCHAR(255) NULL,
  contact_phone VARCHAR(50) NULL,
  facebook_url VARCHAR(255) NULL,
  good_things TEXT NULL
) ENGINE=InnoDB;

INSERT INTO settings (id, hero_image, whatsapp_number, about_title, about_body)
VALUES (1, NULL, NULL, 'About ' , '')
ON DUPLICATE KEY UPDATE
  hero_image = VALUES(hero_image),
  whatsapp_number = VALUES(whatsapp_number),
  about_title = VALUES(about_title),
  about_body = VALUES(about_body);

CREATE TABLE IF NOT EXISTS properties (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT NULL,
  features TEXT NULL,
  price VARCHAR(100) NULL,
  discount VARCHAR(100) NULL,
  location VARCHAR(255) NULL,
  status ENUM('Available','Sold') NOT NULL DEFAULT 'Available',
  main_image VARCHAR(255) NULL,
  google_map_embed TEXT NULL,
  plot_rows INT NOT NULL DEFAULT 0,
  plot_cols INT NOT NULL DEFAULT 0,
  plot_map_json TEXT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS property_images (
  id INT AUTO_INCREMENT PRIMARY KEY,
  property_id INT NOT NULL,
  image_path VARCHAR(255) NOT NULL,
  image_details TEXT NULL,
  CONSTRAINT fk_property_images_property
    FOREIGN KEY (property_id) REFERENCES properties(id)
    ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS bookings (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  phone VARCHAR(50) NOT NULL,
  email VARCHAR(255) NULL,
  date DATE NOT NULL,
  time TIME NOT NULL,
  message TEXT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS property_requests (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  phone VARCHAR(50) NOT NULL,
  email VARCHAR(255) NULL,
  property_type VARCHAR(50) NOT NULL,
  budget VARCHAR(100) NULL,
  location VARCHAR(255) NULL,
  requirements TEXT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS plot_bookings (
  id INT AUTO_INCREMENT PRIMARY KEY,
  property_id INT NOT NULL,
  plot_no VARCHAR(20) NOT NULL,
  name VARCHAR(255) NOT NULL,
  phone VARCHAR(50) NOT NULL,
  email VARCHAR(255) NULL,
  message TEXT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_plot_bookings_property
    FOREIGN KEY (property_id) REFERENCES properties(id)
    ON DELETE CASCADE
) ENGINE=InnoDB;
