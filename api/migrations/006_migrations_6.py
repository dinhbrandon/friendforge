steps = [
    [
        """
        CREATE TABLE friendships (
            id SERIAL PRIMARY KEY NOT NULL,
            user_profile_id1 INTEGER NOT NULL REFERENCES user_profiles (id)
                ON DELETE CASCADE,
            user_profile_id2 INTEGER NOT NULL REFERENCES user_profiles (id)
                ON DELETE CASCADE,
            CHECK (user_profile_id1 <> user_profile_id2)
        );

        -- Adding a unique constraint to prevent duplicate friendships
        ALTER TABLE friendships
        ADD CONSTRAINT uq_friendship UNIQUE (
            LEAST(user_profile_id1, user_profile_id2),
            GREATEST(user_profile_id1, user_profile_id2)
        );
        """,

        """
        DROP TABLE friendships;
        """
    ]
]
