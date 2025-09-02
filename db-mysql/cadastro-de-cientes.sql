DROP DATABASE IF EXISTS cadastro_clientes;
CREATE DATABASE IF NOT EXISTS cadastro_clientes;
USE cadastro_clientes;

CREATE TABLE clientes (
	id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL,
    tel1 VARCHAR(14) NOT NULL,
    tel2 VARCHAR(14),
    email VARCHAR(100),
    instagram VARCHAR(30),
    data_cadastro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    data_atualizacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    data_ultima_visita TIMESTAMP DEFAULT NULL
);

CREATE TABLE users (
	id INT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(100) NOT NULL,
    nome VARCHAR(100) NOT NULL,
    login VARCHAR(100) NOT NULL,
    password VARCHAR(50) NOT NULL,
    data_cadastro TIMESTAMP DEFAULT(current_timestamp()),
    data_atualizacao TIMESTAMP DEFAULT(current_timestamp()) on update current_timestamp
);

create table routes (
	id int primary key auto_increment,
    path varchar(255) not null,
    method ENUM('GET', 'POST', 'PUT', 'DELETE') NOT NULL
);

CREATE TABLE user_routes (
	user_id INT,
    route_id INT,
    PRIMARY KEY(user_id, route_id),
    FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY(route_id) REFERENCES routes(id) ON DELETE CASCADE
);