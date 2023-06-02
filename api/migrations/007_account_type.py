steps = [
    [
        """
        CREATE TABLE account_type (
        id SERIAL PRIMARY KEY NOT NULL,
        type VARCHAR(100) NOT NULL
        );
        """,
        """
        DROP TABLE account_type;
        """
    ]
]
