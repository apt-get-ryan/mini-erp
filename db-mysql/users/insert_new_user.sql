CREATE PROCEDURE  users_insert_new_user(
	IN p_email VARCHAR(255),
	IN p_nome VARCHAR(100),
    IN p_login VARCHAR(50),
    IN p_password VARCHAR(50)
    
)
BEGIN
	INSERT INTO cadastro_clientes.users(
		email,
        nome,
        login,
        password
    ) VALUES (
		p_email,
        p_nome,
        p_login,
        p_password
        
    );
    
END
