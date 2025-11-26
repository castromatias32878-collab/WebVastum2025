from pydantic import BaseModel, Field, EmailStr
from typing import Optional
from datetime import datetime
import uuid

class ContactCreate(BaseModel):
    nombre: str = Field(..., min_length=2, description="Nombre completo")
    email: EmailStr = Field(..., description="Email válido")
    telefono: str = Field(..., min_length=5, description="Teléfono de contacto")
    empresa: str = Field(..., min_length=2, description="Nombre de la empresa u organización")
    tipoEmpresa: str = Field(..., description="Tipo de organización")
    mensaje: Optional[str] = Field(None, description="Mensaje opcional")

class Contact(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    nombre: str
    email: str
    telefono: str
    empresa: str
    tipo_empresa: str
    mensaje: Optional[str] = None
    created_at: datetime = Field(default_factory=datetime.utcnow)

    class Config:
        json_encoders = {
            datetime: lambda v: v.isoformat()
        }
