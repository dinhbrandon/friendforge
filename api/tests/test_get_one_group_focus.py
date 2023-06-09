from fastapi.testclient import TestClient
from main import app
from queries.group_focus import GroupFocusRepository


client = TestClient(app)


class MockGroupFocusRepository:
    # Must contain the exact naming convention of methods within repo
    def get_one(self, group_focus_id):
        # A: Matches other A
        return {"id": group_focus_id, "name": "Mock focus name"}


# Method activates the test, does not mock it
def test_get_one_focus():
    app.dependency_overrides[GroupFocusRepository] = MockGroupFocusRepository
    group_focus_id = 1
    response = client.get(f"/group_focus/{group_focus_id}")
    app.dependency_overrides = {}

    assert response.status_code == 200
    # A: Matches other A
    assert response.json() == {"id": group_focus_id, "name": "Mock focus name"}
