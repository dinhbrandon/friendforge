steps = [
    [
        """
        CREATE TABLE private_messages (
            id SERIAL PRIMARY KEY NOT NULL,
            user_profile_id1 INTEGER NOT NULL REFERENCES user_profile (id)
            ON DELETE CASCADE,
            user_profile_id2 INTEGER NOT NULL REFERENCES user_profile (id)
            ON DELETE CASCADE,
            content VARCHAR(1000) NOT NULL,
            read BOOLEAN NOT NULL DEFAULT false
        );
        """,

        """
        DROP TABLE private_messages;
        """
    ]
]
