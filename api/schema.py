from datetime import datetime
from pydantic import BaseModel, Field
from api.models import Impact, Status
from typing import Literal, Union

class Issue(BaseModel):
    title: str
    description: str
    status: Status = 'OPEN'

class IssueResponse(BaseModel, use_enum_values=True):
    id: int
    title: str
    description: str
    createdAt: datetime
    updatedAt: datetime
    status: Status
    impact: Impact

class GetIssuesQuery(BaseModel):
    status: Union[Status, None]  = Field(None, description="status")
    orderBy: Union[str, None] = Field(None, min_length=1, max_length=50, description="order by column")
    sort: Literal['asc', 'desc', ''] = Field('', description="type of sort")
    currentPage: int = Field(1, description="current page")
    pageSize: int = Field(10, description="limit for rows")