from pydantic import BaseModel
from typing import Optional, List, Union
from queries.pool import pool

class ProfileIn(BaseModel):
    about_me: str
    profile_photo: str
    location: str
    user_account_id: int

class ProfileOut(BaseModel):
    id: int
    about_me: str
    profile_photo: str
    location: str
    user_account_id: int

class ProfileInterestIn(BaseModel):
    user_profile_id: int
    interest_id: int

class ProfileInterestOut(BaseModel):
    id: int
    user_profile_id: int
    interest_id: int

class Error(BaseModel):
    name: str

class ProfileRepository:
    def get_interests_user_profile(self, user_profile_id):
        with pool.connection() as conn:
            with conn.cursor() as db:
                db.execute(
                    """
                    SELECT interest.id, interest.name
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
                    }
                    interests.append(interest)
                return interests

    def create(self, profile: ProfileIn) -> ProfileOut:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        INSERT INTO user_profile (
                            about_me, profile_photo, location, user_account_id
                        )
                        VALUES (%s, %s, %s, %s)
                        RETURNING id
                        """,
                        [
                            profile.about_me,
                            profile.profile_photo,
                            profile.location,
                            profile.user_account_id
                        ]
                    )
                    id = result.fetchone()[0]
                    return self.profile_in_to_out(id, profile)
        except Exception as e:
            print(e)
            return {"message": "could not create profile"}

    # def get_one(self, profile_id):
    #     try:
    #         with pool.connection() as conn:
    #             with conn.cursor() as db:
    #                 result = db.execute(
    #                     """

    #                     """
    #                 )

    def create_user_profile_interest(self, profile_interest: ProfileInterestIn) -> ProfileInterestOut:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        INSERT INTO user_profile_interests (
                            user_profile_id, interest_id
                        )
                        VALUES (%s, %s)
                        RETURNING id
                        """,
                        [
                            profile_interest.user_profile_id,
                            profile_interest.interest_id
                        ]
                    )
                    id = result.fetchone()[0]
                    return self.profile_interest_in_to_out(id, profile_interest)
        except Exception as e:
            print(e)
            return {"message": "could not add interest"}

    def profile_interest_in_to_out(self, id: int, profile_interest: ProfileInterestIn):
        old_data = profile_interest.dict()
        return ProfileInterestOut(id=id, **old_data)


    def profile_in_to_out(self, id: int, profile: ProfileIn):
        old_data = profile.dict()
        return ProfileOut(id=id, **old_data)
