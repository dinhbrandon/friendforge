from pydantic import BaseModel
from queries.pool import pool
from typing import List


class MessageIn(BaseModel):
    profile_id: int
    group_id: int
    content: str


class MessageOut(MessageIn):
    id: int


class MessageRepository:
    def create(self, profile_id, group_id, content) -> MessageOut:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        INSERT INTO messages
                            (profile_id, group_id, content)
                        VALUES
                            (%s, %s, %s)
                        RETURNING id;
                        """,
                        [profile_id, group_id, content],
                    )
                    id = result.fetchone()[0]
                    print("New message ID:", id)
                    return self.message_in_to_out(
                        id, profile_id, group_id, content
                    )
        except Exception as e:
            print("Error during message creation:", e)
            return None

    def message_in_to_out(
        self, id: int, profile_id: int, group_id: int, content: str
    ) -> MessageOut:
        return MessageOut(
            id=id, profile_id=profile_id, group_id=group_id, content=content
        )

    def get_by_group_id(self, group_id: int) -> List[MessageOut]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        SELECT id, profile_id, group_id, content
                        FROM messages
                        WHERE group_id = %s;
                        """,
                        [group_id],
                    )
                    results = db.fetchall()
                    messages = []
                    for result in results:
                        message_id, profile_id, group_id, content = result
                        message = self.message_in_to_out(
                            message_id, profile_id, group_id, content
                        )
                        messages.append(message)
                    return messages
        except Exception as e:
            print("Error during message retrieval:", e)
            return []
