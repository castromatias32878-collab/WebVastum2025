import React, { useState } from 'react';
import axios from 'axios';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Label } from '../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Badge } from '../components/ui/badge';
import { toast } from 'sonner';
import { 
  CheckCircle2,
  Truck,
  Users,
  BarChart3,
  Recycle,
  MapPin,
  TrendingUp,
  FileText
} from 'lucide-react';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const companyTypes = [
  "Empresa de Recolección",
  "Empresa de Reciclaje",
  "Centro de Acopio",
  "Planta de Tratamiento",
  "Gestor Ambiental",
  "Transportista de Residuos",
  "Consultoría Ambiental",
  "Otro"
];

const benefits = [
  { icon: TrendingUp, text: "Reduce los tiempos del proceso en un 60%" },
  { icon: Truck, text: "Optimiza el rastreo de cada envío a disposición final de los residuos" },
  { icon: FileText, text: "Permite registrar documentos y subir certificados, remitos y otros registros" }
];

const SimpleLanding = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    empresa: '',
    tipoEmpresa: '',
    mensaje: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (value) => {
    setFormData(prev => ({ ...prev, tipoEmpresa: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.nombre || !formData.email || !formData.telefono || !formData.empresa || !formData.tipoEmpresa) {
      toast.error('Por favor completa todos los campos obligatorios');
      return;
    }

    try {
      const response = await axios.post(`${API}/contacto`, formData);
      
      if (response.data.success) {
        toast.success('¡Gracias! Nos comunicaremos pronto para agendar tu demo.');
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
      const errorMessage = error.response?.data?.detail || 'Error al enviar. Intenta nuevamente.';
      toast.error(errorMessage);
    }
  };

  return (
    <div className="min-h-screen flex bg-gray-100 p-3 md:p-6">
      {/* Contenedor con marco blanco */}
      <div className="w-full max-w-7xl mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col lg:flex-row">
        {/* Columna Izquierda - Formulario */}
        <div className="w-full lg:w-1/2 p-4 lg:p-8 flex flex-col justify-center">
          <div className="max-w-lg mx-auto w-full">
            {/* Logo */}
            <div className="mb-3">
              <img src="/isologotipo-vastum.png" alt="VASTUM Isologotipo" className="h-48 w-auto" />
            </div>

            {/* Título */}
            <div className="mb-3">
              <h1 className="text-xl lg:text-2xl font-bold text-gray-900 mb-1.5 leading-tight">
                Gestiona los residuos de tu empresa de manera más fácil, rápida y eficaz
              </h1>
              <p className="text-xs text-gray-600 mb-0.5">
                ¡Solicita tu demo gratuita!
              </p>
              <p className="text-xs text-gray-500">
                (Sin compromiso · Respuesta en 24hs)
              </p>
            </div>

          {/* Formulario */}
          <form onSubmit={handleSubmit} className="space-y-3">
            <div>
              <Label htmlFor="nombre" className="text-gray-700 font-medium mb-0.5 block text-xs">
                Nombre completo *
              </Label>
              <Input
                id="nombre"
                name="nombre"
                value={formData.nombre}
                onChange={handleInputChange}
                placeholder="Juan Pérez"
                required
                className="h-9 border-gray-300 focus:border-cyan-500 focus:ring-cyan-500 text-sm"
              />
            </div>

            <div>
              <Label htmlFor="email" className="text-gray-700 font-medium mb-0.5 block text-xs">
                Email *
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="juan@empresa.com"
                required
                className="h-9 border-gray-300 focus:border-cyan-500 focus:ring-cyan-500 text-sm"
              />
            </div>

            <div>
              <Label htmlFor="telefono" className="text-gray-700 font-medium mb-0.5 block text-xs">
                Teléfono *
              </Label>
              <Input
                id="telefono"
                name="telefono"
                type="tel"
                value={formData.telefono}
                onChange={handleInputChange}
                placeholder="+54 9 264 123-4567"
                required
                className="h-9 border-gray-300 focus:border-cyan-500 focus:ring-cyan-500 text-sm"
              />
            </div>

            <div>
              <Label htmlFor="empresa" className="text-gray-700 font-medium mb-0.5 block text-xs">
                Empresa *
              </Label>
              <Input
                id="empresa"
                name="empresa"
                value={formData.empresa}
                onChange={handleInputChange}
                placeholder="Nombre de tu empresa"
                required
                className="h-9 border-gray-300 focus:border-cyan-500 focus:ring-cyan-500 text-sm"
              />
            </div>

            <div>
              <Label htmlFor="tipoEmpresa" className="text-gray-700 font-medium mb-0.5 block text-xs">
                Tipo de empresa *
              </Label>
              <Select value={formData.tipoEmpresa} onValueChange={handleSelectChange} required>
                <SelectTrigger className="h-9 border-gray-300 focus:border-cyan-500 focus:ring-cyan-500 text-sm">
                  <SelectValue placeholder="Selecciona tu rubro" />
                </SelectTrigger>
                <SelectContent>
                  {companyTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="mensaje" className="text-gray-700 font-medium mb-0.5 block text-xs">
                ¿Qué necesita tu empresa? (Opcional)
              </Label>
              <Textarea
                id="mensaje"
                name="mensaje"
                value={formData.mensaje}
                onChange={handleInputChange}
                placeholder="Cuéntanos brevemente sobre tu operación..."
                rows={2}
                className="border-gray-300 focus:border-cyan-500 focus:ring-cyan-500 text-sm"
              />
            </div>

            <Button 
              type="submit" 
              size="lg" 
              className="w-full bg-cyan-600 hover:bg-cyan-700 text-white text-sm h-10 font-semibold shadow-lg hover:shadow-xl transition-all"
            >
              Solicitar Demo Gratuita
            </Button>

            <div className="flex justify-center my-2">
              <img src="/logo.2.jpg" alt="VASTUM" className="h-8 w-auto" />
            </div>

            <p className="text-xs text-gray-500 text-center">
              Al registrarte, aceptas nuestros términos y condiciones
            </p>
          </form>
        </div>
      </div>

      {/* Columna Derecha - Visual/Imagen */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-cyan-600 to-cyan-700 relative overflow-hidden">
        {/* Contenido Visual */}
        <div className="relative z-10 p-8 flex flex-col justify-center text-white w-full">
          <div className="max-w-xl">
            <h2 className="text-3xl font-bold mb-4 leading-tight">
              Software de Gestión para la Trazabilidad de Residuos en Empresas
            </h2>
            <p className="text-lg mb-6 text-cyan-50 font-light leading-relaxed">
              La solución integral para gestionar la trazabilidad y seguimiento organizado de los residuos dentro y fuera de una empresa con base en Argentina
            </p>

            {/* Beneficios destacados */}
            <div className="space-y-2.5 mb-6">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-start gap-2.5 bg-white/10 backdrop-blur-sm rounded-lg p-2.5">
                  <div className="flex-shrink-0 mt-0.5">
                    <benefit.icon className="h-4 w-4 text-white" />
                  </div>
                  <span className="text-sm font-medium leading-snug">{benefit.text}</span>
                </div>
              ))}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-3 pt-4 border-t border-white/20">
              <div>
                <div className="text-2xl font-bold mb-0.5">500+</div>
                <div className="text-cyan-100 text-xs">Empresas</div>
              </div>
              <div>
                <div className="text-2xl font-bold mb-0.5">15+</div>
                <div className="text-cyan-100 text-xs">Años</div>
              </div>
              <div>
                <div className="text-2xl font-bold mb-0.5">24/7</div>
                <div className="text-cyan-100 text-xs">Soporte</div>
              </div>
            </div>
          </div>
        </div>

        {/* Decoración de fondo */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 right-20 w-64 h-64 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 left-20 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        </div>

        {/* Imagen de fondo sutil */}
        <div 
          className="absolute inset-0 opacity-25 bg-cover bg-center mix-blend-overlay"
          style={{
            backgroundImage: 'url(/residuos-industrial.png)',
          }}
        ></div>
      </div>
      </div>
    </div>
  );
};

export default SimpleLanding;
