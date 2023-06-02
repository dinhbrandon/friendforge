steps = [
    [
        #  Create the table
        """
        CREATE TABLE groups (
            id SERIAL PRIMARY KEY NOT NULL,
            focus_id INTEGER NOT NULL REFERENCES group_focus(id),
            name VARCHAR(1000) NULL,
            icon_photo TEXT NULL,
            chatroom_id TEXT NULL
        );
        """,
        # Drop the table
        """
        DROP TABLE groups;
        """,
    ],
    [
        """
        CREATE TABLE profiles_in_group (
            id SERIAL PRIMARY KEY NOT NULL,
            user_profile_id INTEGER NOT NULL REFERENCES user_profile(id) ON DELETE CASCADE,
            group_id INTEGER NOT NULL REFERENCES groups(id) ON DELETE CASCADE
        );
        """,
        """
        DROP TABLE profiles_in_group;
        """,
    ],
]
