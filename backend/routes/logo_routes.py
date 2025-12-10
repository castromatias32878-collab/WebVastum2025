from fastapi import APIRouter, HTTPException
from models.logo import LogoCreate, Logo
from motor.motor_asyncio import AsyncIOMotorClient
import os
from datetime import datetime
import logging

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/api", tags=["logos"])

# MongoDB connection
mongo_url = os.environ.get('MONGO_URL')
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ.get('DB_NAME', 'vastum_db')]
logos_collection = db.logos

@router.post("/logos", status_code=201)
async def create_logo(logo_data: LogoCreate):
    """
    Crea un nuevo logo para el slider
    """
    try:
        logo = Logo(
            nombre=logo_data.nombre,
            imagen_base64=logo_data.imagen_base64,
            created_at=datetime.utcnow()
        )
        
        logo_dict = logo.dict()
        result = await logos_collection.insert_one(logo_dict)
        
        logger.info(f"Logo creado exitosamente: {logo.nombre}")
        
        return {
            "success": True,
            "message": "Logo agregado exitosamente",
            "id": logo.id
        }
    
    except Exception as e:
        logger.error(f"Error al crear logo: {str(e)}")
        raise HTTPException(
            status_code=500,
            detail="Error al agregar el logo"
        )

@router.get("/logos")
async def get_logos():
    """
    Obtiene todos los logos para el slider
    """
    try:
        # Proyección para optimizar la consulta
        projection = {
            "_id": 1,
            "id": 1,
            "nombre": 1,
            "imagen_base64": 1,
            "created_at": 1
        }
        
        logos = await logos_collection.find({}, projection).sort("created_at", 1).to_list(1000)
        
        # Convertir ObjectId a string
        for logo in logos:
            logo["_id"] = str(logo["_id"])
            if "created_at" in logo:
                logo["created_at"] = logo["created_at"].isoformat()
        
        return {
            "success": True,
            "logos": logos,
            "total": len(logos)
        }
    
    except Exception as e:
        logger.error(f"Error al obtener logos: {str(e)}")
        raise HTTPException(
            status_code=500,
            detail="Error al obtener los logos"
        )

@router.delete("/logos/{logo_id}")
async def delete_logo(logo_id: str):
    """
    Elimina un logo del slider
    """
    try:
        result = await logos_collection.delete_one({"id": logo_id})
        
        if result.deleted_count == 0:
            raise HTTPException(
                status_code=404,
                detail="Logo no encontrado"
            )
        
        logger.info(f"Logo eliminado: {logo_id}")
        
        return {
            "success": True,
            "message": "Logo eliminado exitosamente"
        }
    
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error al eliminar logo: {str(e)}")
        raise HTTPException(
            status_code=500,
            detail="Error al eliminar el logo"
        )
