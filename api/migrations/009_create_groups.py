steps = [
    [
        #  Create the table
        """
        CREATE TABLE groups (
            id SERIAL PRIMARY KEY NOT NULL,
            focus VARCHAR(1000) NOT NULL,
            name VARCHAR(1000) NOT NULL,
            icon_photo TEXT NOT NULL,
            user_profile VARCHAR(10000),
            chatroom TEXT NOT NULL
        )
        """,
        # Drop the table
        """
        DROP TABLE groups;
        """
    ]
]
