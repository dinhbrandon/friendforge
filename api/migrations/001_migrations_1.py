steps = [
    [
        """
        CREATE TABLE interests (
        id SERIAL PRIMARY KEY NOT NULL,
        name VARCHAR(100) NOT NULL
        );
        """,
        """
        DROP TABLE interests;
        """
    ],
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
    ],
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
