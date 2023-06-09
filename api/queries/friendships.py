from pydantic import BaseModel
from queries.pool import pool
from queries.user_profile import ProfileRepository
# from typing import List, Union, Optional


class FriendshipOut(BaseModel):
    id: int
    user_profile_id1: int
    user_profile_id2: int


class FriendshipRepository:

    def create(self, user_profile_id1: int, user_profile_id2: int):
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        INSERT INTO friendships (
                            user_profile_id1, user_profile_id2
                        )
                        VALUES (%s, %s)
                        RETURNING id
                        """,
                        [user_profile_id1, user_profile_id2]
                    )
                    id = result.fetchone()[0]
                    friendship_out = FriendshipOut(
                        id=id,
                        user_profile_id1=user_profile_id1,
                        user_profile_id2=user_profile_id2
                        )
                    return friendship_out
        except Exception as e:
            print(e)
            return {"message": "Could not create friendship"}

    def get(self, user_profile_id: int):
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    
                    result = db.execute(
                        """
                        SELECT *
                        FROM friendships
                        WHERE friendships.user_profile_id1 = %s
                        OR friendships.user_profile_id2 = %s;
                        """,
                        [user_profile_id, user_profile_id]
                    )
                    
                    friend_ids = []
                    rows = result.fetchall()

                    for row in rows:
                        friendship = {
                            "friendship_id": row[0],
                            "profile_1": row[1],
                            "profile_id2": row[2],
                        }
                        if friendship["profile_1"] != user_profile_id:
                            friend_ids.append(friendship["profile_1"])
                        else:
                            friend_ids.append(friendship["profile_id2"])
                    
                    profile_repo = ProfileRepository()
                    friends = []

                    for friend_id in friend_ids:
                        friends.append(profile_repo.get_one(friend_id))
                    
                    return friends
        except Exception as e:
            print(e)
            return {"message": "Could not get user's friends"}


