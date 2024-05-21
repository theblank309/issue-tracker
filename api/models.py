import enum
from datetime import datetime
from sqlalchemy import Column, String, Integer,Text, Enum, DateTime, ForeignKey
from sqlalchemy.orm import mapped_column, relationship

from api.database import Base

class Status(str, enum.Enum):
    OPEN = 'OPEN'
    IN_PROGRESS = 'IN_PROGRESS'
    CLOSED = 'CLOSED'

class Impact(str, enum.Enum):
    HIGH = 'HIGH'
    MODERATE = 'MODERATE'
    LOW = 'LOW'

class Issue(Base):
    __tablename__ = 'issues'

    id = Column(Integer, primary_key=True, index=True, autoincrement='auto')
    title = Column(String(255))
    description = Column(Text)
    status = Column(Enum(Status), default=Status.OPEN)
    createdAt = Column(DateTime, default=datetime.now())
    updatedAt = Column(DateTime, default=datetime.now())
    impact = Column(Enum(Impact), nullable=True)
    user_id = mapped_column(ForeignKey("users.id"), nullable=True)
    user = relationship("User", back_populates="issues")

class User(Base):
    __tablename__ = 'users'

    id = Column(Integer, primary_key=True, index=True, autoincrement='auto')
    name = Column(String(255))
    email = Column(Text)
    issues = relationship("Issue", back_populates="user")