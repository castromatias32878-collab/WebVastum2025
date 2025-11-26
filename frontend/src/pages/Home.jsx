import React, { useState } from 'react';
import axios from 'axios';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Label } from '../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Card, CardContent } from '../components/ui/card';
import { toast } from 'sonner';
import { 
  MapPin, 
  Truck, 
  Users, 
  BarChart3, 
  Recycle, 
  Bell,
  Mail,
  Phone,
  MapPinned,
  CheckCircle2,
  ArrowRight
} from 'lucide-react';
import { mockData } from '../mock';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const iconMap = {
  MapPin,
  Truck,
  Users,
  BarChart3,
  Recycle,
  Bell
};

const Home = () => {
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

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validación básica
    if (!formData.nombre || !formData.email || !formData.telefono || !formData.empresa || !formData.tipoEmpresa) {
      toast.error('Por favor completa todos los campos obligatorios');
      return;
    }

    // Simulación de envío
    console.log('Formulario enviado:', formData);
    toast.success('¡Gracias por contactarnos! Nos comunicaremos pronto.');
    
    // Limpiar formulario
    setFormData({
      nombre: '',
      email: '',
      telefono: '',
      empresa: '',
      tipoEmpresa: '',
      mensaje: ''
    });
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <img src="/logo.2.jpg" alt="VASTUM Logo" className="h-10 w-auto" />
            </div>
            <nav className="hidden md:flex items-center gap-8">
              <a href="#inicio" className="text-gray-700 hover:text-cyan-600 transition-colors">Inicio</a>
              <a href="#caracteristicas" className="text-gray-700 hover:text-cyan-600 transition-colors">Características</a>
              <a href="#beneficios" className="text-gray-700 hover:text-cyan-600 transition-colors">Beneficios</a>
              <a href="#contacto" className="text-gray-700 hover:text-cyan-600 transition-colors">Contacto</a>
            </nav>
            <Button 
              onClick={() => document.getElementById('contacto').scrollIntoView({ behavior: 'smooth' })}
              className="bg-cyan-600 hover:bg-cyan-700 text-white"
            >
              Contactar
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section id="inicio" className="pt-24 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-block px-4 py-2 bg-cyan-50 rounded-full">
                <span className="text-cyan-600 font-medium text-sm">Software Argentino</span>
              </div>
              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight">
                {mockData.hero.title}
              </h1>
              <p className="text-xl text-cyan-600 font-semibold">
                {mockData.hero.subtitle}
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                {mockData.hero.description}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button 
                  size="lg"
                  onClick={() => document.getElementById('contacto').scrollIntoView({ behavior: 'smooth' })}
                  className="bg-cyan-600 hover:bg-cyan-700 text-white"
                >
                  {mockData.hero.cta}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button 
                  size="lg"
                  variant="outline"
                  onClick={() => document.getElementById('caracteristicas').scrollIntoView({ behavior: 'smooth' })}
                  className="border-cyan-600 text-cyan-600 hover:bg-cyan-50"
                >
                  Conocer Más
                </Button>
              </div>
            </div>
            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img 
                  src={mockData.hero.image} 
                  alt="Ciudad Argentina" 
                  className="w-full h-[500px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-cyan-900/20 to-transparent"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Características Section */}
      <section id="caracteristicas" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Características</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Herramientas potentes para una gestión de residuos eficiente y moderna
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {mockData.features.map((feature) => {
              const Icon = iconMap[feature.icon];
              return (
                <Card key={feature.id} className="border-none shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <CardContent className="p-6">
                    <div className="w-14 h-14 bg-cyan-100 rounded-xl flex items-center justify-center mb-4">
                      <Icon className="h-7 w-7 text-cyan-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Beneficios Section */}
      <section id="beneficios" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Beneficios</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Impacto real en tu organización y en la comunidad
            </p>
          </div>
          <div className="space-y-20">
            {mockData.benefits.map((benefit, index) => (
              <div 
                key={benefit.id} 
                className={`grid md:grid-cols-2 gap-12 items-center ${
                  index % 2 === 1 ? 'md:flex-row-reverse' : ''
                }`}
              >
                <div className={index % 2 === 1 ? 'md:order-2' : ''}>
                  <div className="flex items-center gap-3 mb-4">
                    <CheckCircle2 className="h-8 w-8 text-cyan-600" />
                    <h3 className="text-3xl font-bold text-gray-900">{benefit.title}</h3>
                  </div>
                  <p className="text-lg text-gray-600 leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
                <div className={index % 2 === 1 ? 'md:order-1' : ''}>
                  <div className="relative rounded-2xl overflow-hidden shadow-xl">
                    <img 
                      src={benefit.image} 
                      alt={benefit.title} 
                      className="w-full h-[350px] object-cover"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contacto Section */}
      <section id="contacto" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Contáctanos</h2>
            <p className="text-xl text-gray-600">
              Estamos listos para ayudarte a optimizar la gestión de residuos en tu ciudad
            </p>
          </div>
          <Card className="border-none shadow-xl">
            <CardContent className="p-8 md:p-12">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="nombre">Nombre Completo *</Label>
                    <Input
                      id="nombre"
                      name="nombre"
                      value={formData.nombre}
                      onChange={handleInputChange}
                      placeholder="Juan Pérez"
                      required
                      className="border-gray-300 focus:border-cyan-600 focus:ring-cyan-600"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="juan@ejemplo.com"
                      required
                      className="border-gray-300 focus:border-cyan-600 focus:ring-cyan-600"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="telefono">Teléfono *</Label>
                    <Input
                      id="telefono"
                      name="telefono"
                      type="tel"
                      value={formData.telefono}
                      onChange={handleInputChange}
                      placeholder="+54 9 264 123-4567"
                      required
                      className="border-gray-300 focus:border-cyan-600 focus:ring-cyan-600"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="empresa">Empresa/Organización *</Label>
                    <Input
                      id="empresa"
                      name="empresa"
                      value={formData.empresa}
                      onChange={handleInputChange}
                      placeholder="Municipalidad de San Juan"
                      required
                      className="border-gray-300 focus:border-cyan-600 focus:ring-cyan-600"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="tipoEmpresa">Tipo de Organización *</Label>
                  <Select value={formData.tipoEmpresa} onValueChange={handleSelectChange} required>
                    <SelectTrigger className="border-gray-300 focus:border-cyan-600 focus:ring-cyan-600">
                      <SelectValue placeholder="Selecciona el tipo de organización" />
                    </SelectTrigger>
                    <SelectContent>
                      {mockData.companyTypes.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="mensaje">Mensaje</Label>
                  <Textarea
                    id="mensaje"
                    name="mensaje"
                    value={formData.mensaje}
                    onChange={handleInputChange}
                    placeholder="Cuéntanos cómo podemos ayudarte..."
                    rows={4}
                    className="border-gray-300 focus:border-cyan-600 focus:ring-cyan-600"
                  />
                </div>

                <Button 
                  type="submit" 
                  size="lg" 
                  className="w-full bg-cyan-600 hover:bg-cyan-700 text-white"
                >
                  Enviar Consulta
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <img src="/logo.2.jpg" alt="VASTUM Logo" className="h-12 w-auto mb-4 brightness-0 invert" />
              <p className="text-gray-400">
                Software argentino de gestión de residuos para un futuro más sustentable.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-lg mb-4">Contacto</h4>
              <div className="space-y-3 text-gray-400">
                <div className="flex items-center gap-2">
                  <Mail className="h-5 w-5" />
                  <span>info@vastum.com.ar</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-5 w-5" />
                  <span>+54 264 XXX-XXXX</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPinned className="h-5 w-5" />
                  <span>San Juan, Argentina</span>
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-lg mb-4">Enlaces</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#caracteristicas" className="hover:text-cyan-400 transition-colors">Características</a></li>
                <li><a href="#beneficios" className="hover:text-cyan-400 transition-colors">Beneficios</a></li>
                <li><a href="#contacto" className="hover:text-cyan-400 transition-colors">Contacto</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} VASTUM. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
