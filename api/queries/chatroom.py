from pydantic import BaseModel
from queries.pool import pool


class MessageIn(BaseModel):
    profile_id: int
    group_id: int
    content: str


class MessageOut(MessageIn):
    id: int


class MessageRepository:
    def create(self, profile_id, group_id, message) -> MessageOut | None:
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
                        [profile_id, group_id, message],
                    )
                    id = result.fetchone()[0]
                    return self.message_in_to_out(
                        id, profile_id, group_id, message
                    )
        except Exception as e:
            print(e)
            return {"message": "Create did not work"}

    def message_in_to_out(
        self, id: int, profile_id: int, group_id: int, message: str
    ):
        # old_data = message.dict()
        return MessageOut(
            id=id, profile_id=profile_id, group_id=group_id, content=message
        )


connections = {}
