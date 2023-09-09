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


class FriendRequestOut(BaseModel):
    id: int
    sender_id: int
    receiver_id: int
    message: Optional[str]
    status: str
    created_at: datetime


class FriendshipRepository:

    def check_status(self, user_1: int, user_2: int):
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    # Check if the users are already friends
                    results = db.execute(
                        """
                        SELECT *
                        FROM friendships
                        WHERE (user_profile_id1 = %s AND user_profile_id2 = %s)
                        OR (user_profile_id1 = %s AND user_profile_id2 = %s)
                        """,
                        [user_1, user_2, user_2, user_1]
                    )
                    result = results.fetchone()
                    if result is not None:
                        return {"relationship_status": "Friends"}

                    # Check if there is a pending
                    # friend request between the users
                    results2 = db.execute(
                        """
                        SELECT *
                        FROM friend_requests
                        WHERE ((sender_id = %s AND receiver_id = %s)
                        OR (sender_id = %s AND receiver_id = %s))
                        AND status = 'Pending'
                        """,
                        [user_1, user_2, user_2, user_1]
                    )
                    result = results2.fetchone()
                    if result is not None:
                        return {"relationship_status": "Pending Friendship"}

                    # If no results from either query, the users are not
                    # friends and have no pending requests
                    return {"relationship_status": "Not Friends"}

        except Exception as e:
            print(e)
            return {"message": "Could not determine friendship status"}

    def get_all_requests(self, profile_id: int):
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT *
                        FROM friend_requests
                        WHERE receiver_id = %s
                        """,
                        [profile_id]
                    )
                    profile_repo = ProfileRepository()
                    rows = result.fetchall()
                    requester_data = []
                    for row in rows:
                        profile_data = profile_repo.get_one(row[1])
                        profile_data["request_info"] = row
                        requester_data.append(profile_data)
                    return requester_data
        except Exception as e:
            print(e)
            return {"message": "Could not get friend requests"}

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
                    friendship_out = FriendRequestOut(
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

    def accept(self, receiver_id: int, sender_id: int):
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:

                    result = db.execute(
                        """
                        UPDATE friend_requests
                        SET status = %s
                        WHERE receiver_id = %s
                        AND sender_id = %s
                        RETURNING id
                        """,
                        ["Accepted", receiver_id, sender_id]
                    )
                    id = result.fetchone()[0]

                    self.create(sender_id, receiver_id)
                    return {
                        "message": (
                            f"Now friends with user profile: {sender_id}. "
                            f"Request ID: {id}"
                        )
                    }

        except Exception as e:
            print(e)
            return {"message": "Could not accept friend request."}

    def reject(self, receiver_id: int, sender_id: int):
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    deleted_at = datetime.now()

                    result = db.execute(
                        """
                        UPDATE friend_requests
                        SET status = %s, deleted_at = %s
                        WHERE receiver_id = %s
                        AND sender_id = %s
                        RETURNING id
                        """,
                        ["Rejected", deleted_at, receiver_id, sender_id]
                    )
                    id = result.fetchone()[0]

                    return {
                        "message": (
                            f"Friend request rejected with: {sender_id}. "
                            f"Request ID: {id}"
                        )
                    }

        except Exception as e:
            print(e)
            return {"message": "Could not accept friend request."}

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

    def create(self, sender_id: int, receiver_id: int):
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
                        [sender_id, receiver_id]
                    )
                    id = result.fetchone()[0]
                    friendship_out = FriendshipOut(
                        id=id,
                        sender_id=sender_id,
                        receiver_id=receiver_id
                        )
                    return friendship_out
        except Exception as e:
            print(e)
            return {"message": "Could not create friendship"}
