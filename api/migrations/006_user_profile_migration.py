steps = [
    [
        ## Create the table
        """
        CREATE TABLE user_profile (
		    id SERIAL PRIMARY KEY NOT NULL,
            about_me VARCHAR(1000) NOT NULL,
            profile_photo VARCHAR(1000) NOT NULL,
            location VARCHAR(100) NOT NULL,
            user_account_id INTEGER NOT NULL REFERENCES user_account(id) ON DELETE CASCADE
        );
        """,

        ## Drop the table

        """
        DROP TABLE user_profile;
        """
    ],
    [
        """
        CREATE TABLE user_profile_interests (
            id SERIAL PRIMARY KEY NOT NULL,
            user_profile_id INTEGER NOT NULL REFERENCES user_profile(id) ON DELETE CASCADE,
            interest_id INTEGER NOT NULL REFERENCES interests(id) ON DELETE CASCADE
        );
        """,
        """
        DROP TABLE user_profile_interests;
        """
    ]
]
