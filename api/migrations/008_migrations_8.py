steps = [
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
    ]
]
