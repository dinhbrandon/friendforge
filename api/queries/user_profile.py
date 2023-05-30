from pydantic import BaseModel
from typing import Optional, List, Union
from queries.pool import pool

class ProfileIn(BaseModel):
    about_me: str
    profile_photo: str
    location: str
    # user_account_id: int ---> this field is removed and will now populate automatically based on authenticated user

class ProfileOutCreation(BaseModel):
    id: int
    about_me: str
    profile_photo: str
    location: str
    user_account_id: int

class ProfileOut(ProfileOutCreation):
    username: str
    first_name: str
    date_of_birth: str
    interests: List[str]

class ProfileInterestIn(BaseModel):
    # user_profile_id: int
    interest_id: int

class ProfileInterestOut(BaseModel):
    id: int
    user_profile_id: int
    interest_id: int

class Junction(BaseModel):
    id: int
    name: str
    user_profile_interest_id: int

class JunctionsOut(BaseModel):
    interests: List[Junction]


class Error(BaseModel):
    message: str

class ProfileRepository:

    def get_all_interest_junctions(self) -> Union[Error, List[ProfileInterestOut]]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        SELECT id, user_profile_id, interest_id
                        FROM user_profile_interests
                        """
                    )
                    return [
                        ProfileInterestOut(
                        id=record[0],
                        user_profile_id=record[1],
                        interest_id=record[2]
                        )
                        for record in db
                    ]

        except Exception as e:
            print(e)
            # return {"message": "Could not get all interests"}


    def get_profile_id_by_user_account(self, user_account_id: int) -> int:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        SELECT id
                        FROM user_profile
                        WHERE user_account_id = %s
                        """,
                        [user_account_id]
                    )

                    row = db.fetchone()
                    if row:
                        return row[0]
                    else:
                        return None
        except Exception as e:
            print(e)
            return {"message": "This user has no profile created."}


    def delete_interests_profile_junction(self, junction_id: int) -> bool:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        DELETE FROM user_profile_interests
                        WHERE id = %s
                        """,
                        [junction_id]
                    )
                    return True
        except Exception as e:
            print(e)
            return False

    def get_interests_user_profile(self, user_profile_id):
        with pool.connection() as conn:
            with conn.cursor() as db:
                db.execute(
                    """
                    SELECT interest.id, interest.name, upi.id
                    FROM interests interest
                    JOIN user_profile_interests upi ON(interest.id = upi.interest_id)
                    WHERE upi.user_profile_id = %s
                    ORDER BY interest.name
                    """,
                    [user_profile_id],
                )

                interests = []
                rows = db.fetchall()
                for row in rows:
                    interest = {
                        "id": row[0],
                        "name": row[1],
                        "user_profile_interest_id": row[2],
                    }
                    interests.append(interest)
                return interests


    def create(self, user_account_id, profile: ProfileIn) -> Union[ProfileOutCreation, Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        INSERT INTO user_profile (
                            about_me, profile_photo, location, user_account_id
                        )
                        VALUES (%s, %s, %s, %s)
                        RETURNING id, user_account_id
                        """,
                        [
                            profile.about_me,
                            profile.profile_photo,
                            profile.location,
                            user_account_id
                        ]
                    )
                    id = result.fetchone()[0]
                    return self.profile_in_to_out(id, user_account_id, profile)
        except Exception as e:
            print(e)
            return {"message": "could not create profile"}

    def get_all(self) -> Union[Error, List[ProfileOutCreation]]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        SELECT id, about_me, profile_photo, location, user_account_id
                        FROM user_profile
                        """
                    )
                    return [
                        ProfileOutCreation(
                            id=record[0],
                            about_me = record[1],
                            profile_photo=record[2],
                            location=record[3],
                            user_account_id=record[4],
                        )
                        for record in db
                    ]

        except Exception as e:
            print(e)
            # return {"message": "Could not get all interests"}

    def get_one(self, profile_id):
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    # Get profile details
                    db.execute(
                        """
                        SELECT UP.id, UP.about_me, UP.profile_photo, UP.location, UP.user_account_id, UA.username, UA.first_name, UA.date_of_birth
                        FROM user_profile AS UP
                        JOIN user_account AS UA ON UP.user_account_id = UA.id
                        WHERE UP.id = %s
                        """,
                        [profile_id]
                    )
                    interests = self.get_interests_user_profile(profile_id)

                    interest_names = []
                    for interest in interests:
                        interest_names.append(interest["name"])

                    row = db.fetchone()
                    if row:
                        profile_data = {
                            "id": row[0],
                            "about_me": row[1],
                            "profile_photo": row[2],
                            "location": row[3],
                            "user_account_id": row[4],
                            "username": row[5],
                            "first_name": row[6],
                            "date_of_birth": row[7],
                            "interests": interest_names
                        }
                        return profile_data
                    else:
                        return {"message": "profile not found"}
        except Exception as e:
            print(e)
            return {"message": "error retrieving profile"}

    def update(self, user_account_id, profile: ProfileIn) -> Union[ProfileOutCreation, Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        UPDATE user_profile
                        SET about_me = %s, profile_photo = %s, location = %s
                        WHERE user_account_id = %s
                        RETURNING id, user_account_id
                        """,
                        [
                            profile.about_me,
                            profile.profile_photo,
                            profile.location,
                            user_account_id

                        ]
                    )
                    id = result.fetchone()[0]
                    return self.profile_in_to_out(id, user_account_id, profile)
        except Exception as e:
            print(e)
            # return {"message": "Could not update profile"}

    def create_user_profile_interest(self, profile_interest: ProfileInterestIn, user_account_id: int) -> ProfileInterestOut:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:

                    # Fetch profile ID based on associated user account ID
                    result = db.execute(
                        """
                        SELECT id
                        FROM user_profile
                        WHERE user_account_id = %s
                        """,
                        [user_account_id]
                    )
                    profile_id = result.fetchone()[0]
                    # We will then insert profile_id associated with user into the junction table\
                    result = db.execute(
                        """
                        SELECT upi.user_profile_id, upi.interest_id
                        FROM user_profile_interests upi
                        WHERE upi.user_profile_id = %s AND upi.interest_id = %s
                        """,
                        [
                            profile_id,
                            profile_interest.interest_id
                        ]
                    )

                    interests = result.fetchall()
                    if len(interests) > 0:
                        return {"message": "You're already have this interest"}

                    result = db.execute(
                        """
                        INSERT INTO user_profile_interests (
                            user_profile_id, interest_id
                        )
                        VALUES (%s, %s)
                        RETURNING id
                        """,
                        [
                            profile_id,
                            profile_interest.interest_id
                        ]
                    )
                    id = result.fetchone()[0]

                    return self.profile_interest_in_to_out(id, profile_id, profile_interest)
        except Exception as e:
            print(e)
            return {"message": "could not add interest"}

    def profile_interest_in_to_out(self, id: int, profile_id: int, profile_interest: ProfileInterestIn):
        old_data = profile_interest.dict()
        return ProfileInterestOut(id=id, user_profile_id=profile_id, **old_data)


    def profile_in_to_out(self, id: int, user_account_id: int, profile: ProfileIn):
        old_data = profile.dict()
        return ProfileOutCreation(id=id, user_account_id=user_account_id, **old_data)
