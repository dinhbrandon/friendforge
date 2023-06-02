steps = [
    [
        ## Create the table
        """
        CREATE TABLE user_account (
		    id SERIAL PRIMARY KEY NOT NULL,
            email VARCHAR(1000) NOT NULL UNIQUE,
            username VARCHAR(1000) NOT NULL UNIQUE,
            password VARCHAR(1000) NOT NULL,
            date_of_birth VARCHAR(1000) NOT NULL,
            first_name VARCHAR(25) NOT NULL,
            last_name VARCHAR(25) NOT NULL,
            phone_number VARCHAR(15) NOT NULL UNIQUE,
            account_type_id INTEGER NOT NULL REFERENCES account_type(id)
        );
        """,
        """
        DROP TABLE user_account;
        """,
    ]
]
