from fastapi import APIRouter, Depends, Response
from typing import Union, List
from queries.locations import (
    LocationIn,
    LocationOut,
    LocationUpdate,
    LocationRepository,
    Error,
)

router = APIRouter()


@router.get("/locations")
def get_all(repo: LocationRepository = Depends()):
    return repo.get_all()


@router.get("/locations/{location_id}",
            response_model=Union[LocationOut, Error])
def get_location(
    location_id: int,
    repo: LocationRepository = Depends(),
) -> Union[Error, LocationOut]:
    return repo.get_one(location_id)


@router.post("/bulk/locations")
def create_bulk_locations(
    locations: List[LocationIn],
    response: Response,
    repo: LocationRepository = Depends(),
):
    return repo.bulk_create(locations)


@router.post("/locations", response_model=Union[LocationOut, Error])
def create_location(
    location: LocationIn,
    response: Response,
    repo: LocationRepository = Depends(),
):
    return repo.create(location)


@router.put(
    "/locations/{location_id}", response_model=Union[LocationOut, Error]
)
def update_location(
    location_id: int,
    location: LocationUpdate,
    repo: LocationRepository = Depends(),
) -> Union[Error, LocationOut]:
    return repo.update(location_id, location)


@router.delete("/locations/{location_id}", response_model=Union[None, Error])
def delete_location(
    location_id: int,
    repo: LocationRepository = Depends(),
) -> Union[None, Error]:
    return repo.delete(location_id)
