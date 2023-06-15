from pydantic import BaseModel
from queries.pool import pool
# from queries.user_profile import ProfileRepository


class PrivateMessageIn(BaseModel):
    user_profile_id1: int
    user_profile_id2: int
    content: str


class PrivateMessageOut(BaseModel):
    id: int
    user_profile_id1: int
    user_profile_id2: int
    content: str
    read: bool


class PrivateMessageRepository:

    def create(self, user_profile_id1: int,
               user_profile_id2: int, content: str):
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        INSERT INTO private_messages (
                            user_profile_id1, user_profile_id2, content
                        )
                        VALUES (%s, %s, %s)
                        RETURNING id
                        """,
                        [user_profile_id1, user_profile_id2, content]
                    )
                    id = result.fetchone()[0]
                    return PrivateMessageOut(
                        id=id,
                        user_profile_id1=user_profile_id1,
                        user_profile_id2=user_profile_id2,
                        content=content,
                        read=False
                    )
        except Exception as e:
            print(e)
            return {"message": "Could not create private message"}

    def get(self, user_profile_id: int):
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:

                    result = db.execute(
                        """
                        SELECT *
                        FROM private_messages
                        WHERE private_messages.user_profile_id1 = %s
                        OR private_messages.user_profile_id2 = %s;
                        """,
                        [user_profile_id, user_profile_id]
                    )

                    messages = []
                    rows = result.fetchall()

                    for row in rows:
                        message_info = {
                            "id": row[0],
                            "profile_1": row[1],
                            "profile_id2": row[2],
                            "content": row[3],
                            "read": row[4]
                        }

                        messages.append(message_info)

                    return messages
        except Exception as e:
            print(e)
            return {"message": "Could not get messages"}
