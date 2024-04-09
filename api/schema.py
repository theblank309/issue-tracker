import enum
from datetime import datetime
from pydantic import BaseModel

class Status(str, enum.Enum):
    OPEN = 'OPEN'
    IN_PROGRESS = 'IN_PROGRESS'
    CLOSE = 'CLOSE'

class Issue(BaseModel, use_enum_values=True):
    title: str
    description: str
    createdAt: datetime
    status: Status