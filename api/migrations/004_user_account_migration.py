steps = [
    [
        ## Create the table
        """
        CREATE TABLE user_account (
		    id SERIAL PRIMARY KEY NOT NULL, 
            email VARCHAR(1000) NOT NULL,
            username VARCHAR(1000) NOT NULL,
            password VARCHAR(1000) NOT NULL,
            date_of_birth VARCHAR(1000) NOT NULL,
            first_name VARCHAR(25) NOT NULL,
            last_name VARCHAR(25) NOT NULL,
            phone_number VARCHAR(15) NOT NULL

        );
        """,

        ## Drop the table

        """
        DROP TABLE user_accounts;
        """
    ]
]