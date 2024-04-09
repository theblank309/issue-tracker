import enum
from datetime import datetime
from sqlalchemy import Column, String, Integer,Text, Enum, DateTime

from database import Base

class Status(str, enum.Enum):
    OPEN = 'OPEN'
    IN_PROGRESS = 'IN_PROGRESS'
    CLOSE = 'CLOSE'

class Issue(Base):
    __tablename__ = 'issues'

    id = Column(Integer, primary_key=True, index=True, autoincrement='auto')
    title = Column(String(255))
    description = Column(Text)
    status = Column(Enum(Status), default=Status.OPEN)
    createdAt = Column(DateTime, default=datetime.now())
    updatedAt = Column(DateTime, default=datetime.now())