from fastapi.testclient import TestClient
from main import app
from queries.group_focus import GroupFocusRepository


client = TestClient(app)


class EmptyGroupFocusRepository:
    def get_group_focus(self):
        return []


class CreateGroupRepository:
    def create(self, focus):
        result = {
            "id": 1,
            "name": "musicians"
        }
        result.update(focus)
        return result


def test_get_all_focuses():
    app.dependency_overrides[GroupFocusRepository] = EmptyGroupFocusRepository
    response = client.get("/group_focus")
    app.dependency_overrides = {}

    assert response.status_code == 200
    assert response.json() == []


def test_create_group_focus():
    app.dependency_overrides[GroupFocusRepository] = CreateGroupRepository
    json = {
        "name": "Growers"
    }
    expected = {
        "id": 1,
        "name": "Growers"
    }

    response = client.post("/group_focus", json=json)
    app.dependency_overrides = {}

    assert response.status_code == 200
    assert response.json() == expected
