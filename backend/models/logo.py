from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime
import uuid

class LogoCreate(BaseModel):
    nombre: str = Field(..., description="Nombre de la empresa")
    imagen_base64: str = Field(..., description="Imagen en base64")
    
class Logo(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    nombre: str
    imagen_base64: str
    created_at: datetime = Field(default_factory=datetime.utcnow)
    
    class Config:
        json_encoders = {
            datetime: lambda v: v.isoformat()
        }
