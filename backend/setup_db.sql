CREATE DATABASE IF NOT EXISTS zibmate;
USE zibmate;

CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(255) NOT NULL DEFAULT '',
    last_name VARCHAR(255),
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL DEFAULT '',
    phone VARCHAR(20),
    role ENUM('user', 'owner', 'admin') DEFAULT 'user',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS pg_data (
    id INT AUTO_INCREMENT PRIMARY KEY,
    property_name VARCHAR(255) NOT NULL,
    description TEXT,
    house_number VARCHAR(100),
    street VARCHAR(255),
    landmark VARCHAR(255),
    city VARCHAR(100),
    state VARCHAR(100),
    zip VARCHAR(10),
    maplink TEXT,
    discount DECIMAL(10,2) DEFAULT 0,
    occupancy JSON,          
    prices JSON,            
    facilities JSON,        
    looking_for ENUM('Any','Students','Professionals') DEFAULT 'Any',
    owner_id INT,
    owner_phone VARCHAR(20) NOT NULL,
    status ENUM('active','inactive') DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
     FOREIGN KEY (owner_id) REFERENCES users(id) ON DELETE SET NULL
);


CREATE TABLE IF NOT EXISTS rooms (
    id INT AUTO_INCREMENT PRIMARY KEY,
    pg_id INT,
    room_number VARCHAR(50) NOT NULL,
    type ENUM('single', 'double', 'triple', 'suite') DEFAULT 'double',
    status ENUM('available', 'booked', 'maintenance') DEFAULT 'available',
    price DECIMAL(10, 2),
    FOREIGN KEY (pg_id) REFERENCES pg_data(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS bookings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    pg_id INT,
    room_id INT,
    full_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    profession VARCHAR(100),
    aadhar_number VARCHAR(20),
    check_in_date DATE,
    room_type VARCHAR(50),
    status ENUM('pending', 'confirmed', 'cancelled', 'completed') DEFAULT 'pending',
    total_amount DECIMAL(10, 2),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL,
    FOREIGN KEY (pg_id) REFERENCES pg_data(id) ON DELETE CASCADE,
    FOREIGN KEY (room_id) REFERENCES rooms(id) ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS tickets (
    id INT AUTO_INCREMENT PRIMARY KEY,
    pg_id INT,
    user_id INT,
    room_id INT,
    issue VARCHAR(255) NOT NULL,
    description TEXT,
    category VARCHAR(50),
    priority ENUM('Low', 'Medium', 'High') DEFAULT 'Medium',
    status ENUM('open', 'in_progress', 'resolved', 'closed') DEFAULT 'open',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (pg_id) REFERENCES pg_data(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (room_id) REFERENCES rooms(id) ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS pg_images (
    id INT AUTO_INCREMENT PRIMARY KEY,
    pg_id INT,
    image_url TEXT,
    FOREIGN KEY (pg_id) REFERENCES pg_data(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS app_content (
    id INT AUTO_INCREMENT PRIMARY KEY,
    section_name VARCHAR(50),
    title VARCHAR(255),
    content TEXT,
    icon VARCHAR(50),
    image_url TEXT,
    display_order INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS tenent_call_requests (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT, 
    pg_id INT,
    full_name VARCHAR(255),
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(20),
    status ENUM('active', 'inactive') DEFAULT 'active',
    email_sent BOOLEAN DEFAULT FALSE,
    email_sent_at DATETIME NULL;
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (pg_id) REFERENCES pg_data(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
)
CREATE TABLE IF NOT EXISTS owner_call_requests (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT, 
    full_name VARCHAR(255),
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(20) UNIQUE NOT NULL,
    status ENUM('active', 'inactive') DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
)