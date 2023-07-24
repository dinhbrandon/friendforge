from typing import Optional, Union
from queries.pool import pool
from pydantic import BaseModel


class Error(BaseModel):
    message: str


class LocationIn(BaseModel):
    name: str
    region: Optional[str]
    country: str
    latitude: float
    longitude: float


class LocationUpdate(BaseModel):
    id: int
    name: Optional[str]
    region: Optional[str]
    country: Optional[str]
    latitude: Optional[float]
    longitude: Optional[float]


class LocationOut (BaseModel):
    id: int
    name: str
    region: Optional[str]
    country: str
    latitude: float
    longitude: float


class LocationRepository:
    def get_one(self, location_id: int) -> Optional[LocationOut]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        SELECT id, name, region, country, latitude, longitude
                        FROM locations
                        WHERE id = %s
                        """,
                        (location_id,)
                    )
                    record = db.fetchone()
                    if record is None:
                        return {"message":
                                f"Location with ID {location_id} not found"}
                    return LocationOut(
                        id=record[0],
                        name=record[1],
                        region=record[2],
                        country=record[3],
                        latitude=record[4],
                        longitude=record[5],
                    )

        except Exception as e:
            print(e)
            return {"message": f"Could not get location with ID {location_id}"}

    def get_all(self):
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        SELECT id
                        FROM locations
                        """
                    )
                    return [
                        self.get_one(record[0])
                        for record in db
                    ]

        except Exception as e:
            print(e)
            return {"message": "Could not get all locations"}

    def create(self, location: LocationIn) -> Union[Error, LocationOut]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        INSERT INTO locations (
                            name,
                            region,
                            country,
                            latitude,
                            longitude)
                        VALUES (%s, %s, %s, %s, %s) RETURNING id
                        """,
                        (location.name,
                         location.region,
                         location.country,
                         location.latitude,
                         location.longitude)
                    )
                    location_id = db.fetchone()[0]
                    return {"message":
                            f"{location_id}: {location.name} created."}

        except Exception as e:
            print(e)
            return {"message": "Could not create location"}

    def delete(self, location_id: int) -> Union[Error, None]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        DELETE FROM locations
                        WHERE id = %s
                        """,
                        (location_id,)
                    )
                    return None

        except Exception as e:
            print(e)
            return {"message": "Could not delete location"}

    def update(self,
               location_update: LocationUpdate) -> Union[Error, LocationOut]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    # Generate SQL for update statement
                    update_clauses = []
                    params = []
                    for key, value in location_update.dict().items():
                        if value is not None:
                            update_clauses.append(f"{key} = %s")
                            params.append(value)
                    sql_update = ", ".join(update_clauses)

                    db.execute(
                        f"""
                        UPDATE locations
                        SET {sql_update}
                        WHERE id = %s
                        RETURNING id
                        """,
                        (*params, location_update.id)
                    )
                    location_id = db.fetchone()[0]
                    return self.get_one(location_id)

        except Exception as e:
            print(e)
            return {"message": "Could not update location"}
