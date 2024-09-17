-- Creates and seeds the SQL database
-- Create database
CREATE DATABASE IF NOT EXISTS demo;
USE demo;
-- Create a new user and grant necessary permissions
CREATE USER IF NOT EXISTS 'demo' @'localhost' IDENTIFIED BY 'example-pass';
GRANT ALL PRIVILEGES ON demo.* TO 'demo' @'localhost';
FLUSH PRIVILEGES;
-- Table for users
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    role ENUM('admin', 'normal') DEFAULT 'normal',
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
-- Table for contact messages
CREATE TABLE IF NOT EXISTS contact (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
-- Table for news
CREATE TABLE IF NOT EXISTS news (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(1024) NOT NULL,
    content TEXT NOT NULL,
    posted_by_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (posted_by_id) REFERENCES users(id)
);

-- Table for message board
CREATE TABLE IF NOT EXISTS message_board (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(1024) NOT NULL,
    content TEXT NOT NULL,
    posted_by_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (posted_by_id) REFERENCES users(id)
);

-- Verify the user privileges
SHOW GRANTS FOR 'demo' @'localhost';

-- Seed users and passwords
INSERT INTO users ( name, email, password, role, created_at, updated_at )
VALUES 
    ( 'Admin', 'admin@mail.tafelab.internal', 'admin123', 'admin', NOW(), NOW() ),
    ( 'Admin 2', 'admin@example.com', '123', 'admin', NOW(), NOW() ),
    ( 'John Smith', 'john.smith@mail.tafelab.internal', 'johnsmith123', 'normal', NOW(), NOW() ),
    ( 'Sabik', 'sabik@mail.tafelab.internal', 'sabik123', 'normal', NOW(), NOW() ),
    ( 'Juliana', 'juliana@mail.tafelab.internal', 'juliana123', 'normal', NOW(), NOW() ),
    ( 'Jess', 'jess@mail.tafelab.internal', 'jess123', 'normal', NOW(), NOW() ),
    ( 'Ahmet', 'ahmet@mail.tafelab.internal', 'ahmet123', 'normal', NOW(), NOW() ),
    ( 'Matt', 'matt@mail.tafelab.internal', 'matt123', 'normal', NOW(), NOW() );


-- Seed news table
INSERT INTO news (title, content, posted_by_id, created_at, updated_at)
VALUES (
        'TAFELabs announced employer of the year!',
        'Sed quis consequat massa. Aenean bibendum justo ut risus venenatis ac vulputate mi vehicula. Aenean placerat, velit eget rutrum semper, sem nulla rutrum neque, nec consectetur est dui ornar.<br/>Lorem. Etiam sapien turpis, semper ut semper sed, porttitor non magna. Phasellus sit amet consectetur est. Vestibulum eu nunc at odio egestas suscipit. Praesent no.<br/>Neque vitae est aliquam vulputate vitae at est. Mauris varius risus et orci porta eget tempus nulla posuere. Vivamus at lacus nisi. Pellentesque ut felis lectus, non sodales nibh. Vestibulum dignissim fermentum diam, quis imperdiet magna ultricies faucibus. Vestibulum suscipit commodo ante quis tincidunt. Mauris facilisis, urna vitae convallis posuere, elit tellus placerat diam, a elementum libero ante ac ligula. Quisque at augu.<br/>Quis tortor euismod tincidunt nec id magna. Phasellus at urna nisl. Fusce dapibus fermentum lectus, et tempus quam venenatis in. Integer malesuada consectetur ligula nec cursus. Cum sociis natoque penatibu.',
        1,
        NOW(), NOW()
    );

-- Seed message_board table
INSERT INTO message_board (title, content, posted_by_id, created_at, updated_at)
VALUES (
        'Message from John Smith',
        'Sed quis consequat massa. Aenean bibendum justo ut risus venenatis ac vulputate mi vehicula. Aenean placerat, velit eget rutrum semper, sem nulla rutrum neque, nec consectetur est dui ornar.<br/>Lorem. Etiam sapien turpis, semper ut semper sed, porttitor non magna. Phasellus sit amet consectetur est. Vestibulum eu nunc at odio egestas suscipit. Praesent no.<br/>Neque vitae est aliquam vulputate vitae at est. Mauris varius risus et orci porta eget tempus nulla posuere. Vivamus at lacus nisi. Pellentesque ut felis lectus, non sodales nibh. Vestibulum dignissim fermentum diam, quis imperdiet magna ultricies faucibus. Vestibulum suscipit commodo ante quis tincidunt. Mauris facilisis, urna vitae convallis posuere, elit tellus placerat diam, a elementum libero ante ac ligula. Quisque at augu.<br/>Quis tortor euismod tincidunt nec id magna. Phasellus at urna nisl. Fusce dapibus fermentum lectus, et tempus quam venenatis in. Integer malesuada consectetur ligula nec cursus. Cum sociis natoque penatibu.',
        3,
        NOW(), NOW()
    );