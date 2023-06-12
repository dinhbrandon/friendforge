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
    ],
    [
        """
        CREATE TABLE friend_requests (
            id SERIAL PRIMARY KEY NOT NULL,
            sender_id INTEGER NOT NULL REFERENCES user_profile (id) ON DELETE CASCADE,
            receiver_id INTEGER NOT NULL REFERENCES user_profile (id) ON DELETE CASCADE,
            message VARCHAR(1000),
            status VARCHAR(100) NOT NULL,
            created_at TIMESTAMP NOT NULL,
            deleted_at TIMESTAMP,
            CHECK (sender_id <> receiver_id),
            UNIQUE (sender_id, receiver_id)
        );
        """,

        """
        DROP TABLE friendships;
        """
    ]
]
