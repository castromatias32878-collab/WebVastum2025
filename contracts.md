# Contratos API - VASTUM Landing Page

## Datos Mockeados (mock.js)
- `mockData.hero`: Contenido del hero section
- `mockData.features`: 6 características del software
- `mockData.benefits`: 3 beneficios principales
- `mockData.companyTypes`: Tipos de organizaciones para el select

**Nota:** Solo el formulario de contacto necesita backend. El resto del contenido es estático.

## Backend a Implementar

### Modelo MongoDB: Contact

```python
{
    "_id": ObjectId,
    "nombre": str,
    "email": str,
    "telefono": str,
    "empresa": str,
    "tipo_empresa": str,
    "mensaje": str (opcional),
    "created_at": datetime
}
```

### Endpoints

#### POST /api/contacto
**Request Body:**
```json
{
    "nombre": "Juan Pérez",
    "email": "juan@ejemplo.com",
    "telefono": "+54 9 264 123-4567",
    "empresa": "Municipalidad de San Juan",
    "tipoEmpresa": "Municipalidad",
    "mensaje": "Quiero más información..."
}
```

**Response (Success - 201):**
```json
{
    "success": true,
    "message": "Contacto registrado exitosamente",
    "id": "contact_id"
}
```

**Response (Error - 400):**
```json
{
    "success": false,
    "error": "mensaje de error"
}
```

#### GET /api/contactos (Opcional - para administración)
**Response (200):**
```json
{
    "success": true,
    "contactos": [
        {
            "id": "...",
            "nombre": "...",
            "email": "...",
            "telefono": "...",
            "empresa": "...",
            "tipo_empresa": "...",
            "mensaje": "...",
            "created_at": "2025-01-15T10:30:00"
        }
    ]
}
```

## Integración Frontend-Backend

### Cambios en Home.jsx

1. **Remover simulación del handleSubmit**
2. **Implementar llamada real a la API:**

```javascript
const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.nombre || !formData.email || !formData.telefono || !formData.empresa || !formData.tipoEmpresa) {
        toast.error('Por favor completa todos los campos obligatorios');
        return;
    }

    try {
        const response = await axios.post(`${API}/contacto`, formData);
        
        if (response.data.success) {
            toast.success('¡Gracias por contactarnos! Nos comunicaremos pronto.');
            setFormData({
                nombre: '',
                email: '',
                telefono: '',
                empresa: '',
                tipoEmpresa: '',
                mensaje: ''
            });
        }
    } catch (error) {
        console.error('Error al enviar formulario:', error);
        toast.error('Error al enviar el formulario. Por favor intenta nuevamente.');
    }
};
```

## Validaciones Backend

- Nombre: requerido, mínimo 2 caracteres
- Email: requerido, formato válido
- Teléfono: requerido
- Empresa: requerido
- Tipo de empresa: requerido, debe ser uno de los valores válidos
- Mensaje: opcional

## Testing

1. Crear contacto con datos válidos
2. Intentar crear contacto sin campos requeridos
3. Verificar formato de email inválido
4. Verificar que los datos se guardan correctamente en MongoDB
