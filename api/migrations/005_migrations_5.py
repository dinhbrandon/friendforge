steps = [
    [
        """
        CREATE TABLE messages (
        id SERIAL PRIMARY KEY NOT NULL,
        profile_id INTEGER NOT NULL REFERENCES user_profile(id)
        ON DELETE CASCADE,
        group_id INTEGER NOT NULL REFERENCES groups(id) ON DELETE CASCADE,
        content VARCHAR(1000) NOT NULL
        );
        """,
        """
        DROP TABLE messages;
        """,
    ]
]
