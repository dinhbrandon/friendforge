steps = [
    [
        """
        CREATE TABLE friendships (
            id SERIAL PRIMARY KEY NOT NULL,
            user_profile_id1 INTEGER NOT NULL REFERENCES user_profile (id) ON DELETE CASCADE,
            user_profile_id2 INTEGER NOT NULL REFERENCES user_profile (id) ON DELETE CASCADE,
            CHECK (user_profile_id1 <> user_profile_id2),
            UNIQUE (user_profile_id1, user_profile_id2)
        );
        """,

        """
        DROP TABLE friendships;
        """
    ]
]
