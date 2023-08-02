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
        """,
    ],
    [
        """
        CREATE TABLE locations (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        region TEXT,
        country TEXT NOT NULL,
        latitude NUMERIC NOT NULL,
        longitude NUMERIC NOT NULL
        );
        """,
        """
        DROP TABLE locations;
        """,
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
        """,
    ],
    [
        """
        CREATE TABLE account_type (
        id SERIAL PRIMARY KEY NOT NULL,
        type VARCHAR(100) NOT NULL
        );
        INSERT INTO account_type (id, type)
        VALUES (1, 'user'), (2, 'premium'), (3, 'admin');
        """,
        """
        DROP TABLE account_type;
        """,
    ],
]
