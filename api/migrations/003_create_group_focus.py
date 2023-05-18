steps = [
    [
        # Create the table
        """
        CREATE TABLE group_focus (
            id SERIAL PRIMARY KEY NOT NULL,
            name VARCHAR(1000) NOT NULL
        );
        """,
        # Drop the table
        """
        DROP TABLE group_focus;
        """
    ]
]
