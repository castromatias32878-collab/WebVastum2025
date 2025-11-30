from fastapi import APIRouter, HTTPException
from models.contact import ContactCreate, Contact
from motor.motor_asyncio import AsyncIOMotorClient
import os
from datetime import datetime
import logging

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/api", tags=["contactos"])

# MongoDB connection
mongo_url = os.environ.get('MONGO_URL')
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ.get('DB_NAME', 'vastum_db')]
contactos_collection = db.contactos

# Tipos de empresa válidos
VALID_COMPANY_TYPES = [
    "Empresa de Recolección",
    "Empresa de Reciclaje",
    "Centro de Acopio",
    "Planta de Tratamiento",
    "Gestor Ambiental",
    "Transportista de Residuos",
    "Consultoría Ambiental",
    "Otro"
]

@router.post("/contacto", status_code=201)
async def create_contact(contact_data: ContactCreate):
    """
    Crea un nuevo contacto desde el formulario de la landing page
    """
    try:
        # Validar tipo de empresa
        if contact_data.tipoEmpresa not in VALID_COMPANY_TYPES:
            raise HTTPException(
                status_code=400,
                detail=f"Tipo de empresa inválido. Debe ser uno de: {', '.join(VALID_COMPANY_TYPES)}"
            )
        
        # Crear objeto Contact
        contact = Contact(
            nombre=contact_data.nombre,
            email=contact_data.email,
            telefono=contact_data.telefono,
            empresa=contact_data.empresa,
            tipo_empresa=contact_data.tipoEmpresa,
            mensaje=contact_data.mensaje,
            created_at=datetime.utcnow()
        )
        
        # Guardar en MongoDB
        contact_dict = contact.dict()
        result = await contactos_collection.insert_one(contact_dict)
        
        logger.info(f"Contacto creado exitosamente: {contact.email}")
        
        return {
            "success": True,
            "message": "Contacto registrado exitosamente",
            "id": contact.id
        }
    
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error al crear contacto: {str(e)}")
        raise HTTPException(
            status_code=500,
            detail="Error interno al procesar el contacto"
        )

@router.get("/contactos")
async def get_contacts():
    """
    Obtiene todos los contactos (endpoint para administración)
    """
    try:
        contactos = await contactos_collection.find().sort("created_at", -1).to_list(1000)
        
        # Convertir ObjectId a string y formatear
        for contacto in contactos:
            contacto["_id"] = str(contacto["_id"])
            if "created_at" in contacto:
                contacto["created_at"] = contacto["created_at"].isoformat()
        
        return {
            "success": True,
            "contactos": contactos,
            "total": len(contactos)
        }
    
    except Exception as e:
        logger.error(f"Error al obtener contactos: {str(e)}")
        raise HTTPException(
            status_code=500,
            detail="Error al obtener los contactos"
        )
