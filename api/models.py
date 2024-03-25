import enum
from datetime import datetime
from sqlalchemy import Column, String, Integer,Text, Enum, Time

from database import Base

class Status(enum.Enum):
    OPEN = 1
    IN_PROGRESS = 2
    CLOSE = 3

class Issue(Base):
    __tablename__ = 'issues'

    id = Column(Integer, primary_key=True, index=True, autoincrement='auto')
    title = Column(String(255))
    description = Column(Text)
    status = Column(Enum(Status), default=Status.OPEN)
    createdAt = Column(Time, default=datetime.now().time())
    updatedAt = Column(Time, default=datetime.now().time())