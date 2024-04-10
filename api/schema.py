from datetime import datetime
from pydantic import BaseModel
from models import Status

class Issue(BaseModel, use_enum_values=True):
    id: int
    title: str
    description: str
    createdAt: datetime
    status: Status