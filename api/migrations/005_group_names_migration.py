steps = [
    [
        """
        CREATE TABLE group_names (
        id SERIAL PRIMARY KEY NOT NULL,
        name VARCHAR(100) NOT NULL
        );
        """,
        """
        DROP TABLE group_names;
        """
    ]
]
