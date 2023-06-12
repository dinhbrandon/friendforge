from pydantic import BaseModel
from queries.pool import pool
from datetime import datetime
from queries.user_profile import ProfileRepository
from typing import Optional
# from typing import List, Union, Optional


class FriendshipOut(BaseModel):
    id: int
    sender_id: int
    receiver_id: int
    message: Optional[str]
    status: str
    created_at: datetime


class FriendshipRepository:

    def request(self, sender_id: int, receiver_id: int, message: str):
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    status = "Pending"
                    created_at = datetime.now()
                    result = db.execute(
                        """
                        INSERT INTO friend_requests (
                            sender_id, receiver_id, message, status, created_at
                        )
                        VALUES (%s, %s, %s, %s, %s)
                        RETURNING id
                        """,
                        [sender_id, receiver_id, message, status, created_at]
                    )
                    id = result.fetchone()[0]
                    friendship_out = FriendshipOut(
                        id=id,
                        sender_id=sender_id,
                        receiver_id=receiver_id,
                        message=message,
                        status=status,
                        created_at=created_at

                        )
                    return friendship_out
        except Exception as e:
            print(e)
            return {"message": "Could not create friend request"}
        
    
    def accept(self, friend_request_id: int, receiver_id: int):
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:

                    result = db.execute(
                        """
                        SELECT status
                        FROM friend_requests
                        """
                    )

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
