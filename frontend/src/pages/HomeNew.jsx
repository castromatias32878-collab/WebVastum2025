import React, { useState } from 'react';
import axios from 'axios';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Label } from '../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { toast } from 'sonner';
import { 
  MapPin, 
  Truck, 
  Users, 
  BarChart3, 
  Recycle,
  FileText,
  Mail,
  Phone,
  MapPinned,
  CheckCircle2,
  ArrowRight,
  TrendingUp,
  Zap,
  Target,
  PlayCircle,
  Star,
  Smartphone,
  Wrench,
  Shield,
  MessageCircle,
  Package,
  Globe,
  ChevronLeft,
  ChevronRight
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
  FileText,
  TrendingUp,
  Zap,
  Target,
  Smartphone,
  Wrench,
  Shield,
  MessageCircle,
  Package,
  Globe
};

const HomeNew = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    empresa: '',
    tipoEmpresa: '',
    mensaje: ''
  });

  const [currentSolution, setCurrentSolution] = useState(1);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

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

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % mockData.testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + mockData.testimonials.length) % mockData.testimonials.length);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center gap-3">
              <img src="/logo.2.jpg" alt="VASTUM Logo" className="h-12 w-auto" />
            </div>
            <nav className="hidden md:flex items-center gap-8">
              <a href="#inicio" className="text-gray-700 hover:text-cyan-600 font-medium transition-colors">Inicio</a>
              <a href="#soluciones" className="text-gray-700 hover:text-cyan-600 font-medium transition-colors">Soluciones</a>
              <a href="#caracteristicas" className="text-gray-700 hover:text-cyan-600 font-medium transition-colors">Características</a>
              <a href="#testimonios" className="text-gray-700 hover:text-cyan-600 font-medium transition-colors">Testimonios</a>
            </nav>
            <Button 
              onClick={() => document.getElementById('contacto').scrollIntoView({ behavior: 'smooth' })}
              className="bg-cyan-600 hover:bg-cyan-700 text-white font-semibold px-6"
            >
              Solicitar Demo
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section id="inicio" className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <Badge className="mb-6 bg-cyan-50 text-cyan-700 border-cyan-200 px-4 py-2 text-sm font-semibold">
              Software Argentino para Empresas de Gestión de Residuos
            </Badge>
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
              {mockData.hero.tagline}
            </h1>
            <div className="space-y-3 mb-8">
              <p className="text-3xl md:text-4xl text-cyan-600 font-semibold">
                {mockData.hero.question1}
              </p>
              <p className="text-3xl md:text-4xl text-cyan-600 font-semibold">
                {mockData.hero.question2}
              </p>
            </div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-10 leading-relaxed">
              {mockData.hero.description}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg"
                onClick={() => document.getElementById('contacto').scrollIntoView({ behavior: 'smooth' })}
                className="bg-cyan-600 hover:bg-cyan-700 text-white text-lg px-8 py-6 shadow-lg hover:shadow-xl transition-all"
              >
                {mockData.hero.cta}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                size="lg"
                variant="outline"
                className="border-2 border-cyan-600 text-cyan-600 hover:bg-cyan-50 text-lg px-8 py-6"
              >
                <PlayCircle className="mr-2 h-5 w-5" />
                {mockData.hero.videoLabel}
              </Button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">
            {mockData.stats.map((stat, index) => (
              <Card key={index} className="border-none shadow-lg">
                <CardContent className="p-6 text-center">
                  <div className="text-4xl font-bold text-cyan-600 mb-2">{stat.value}</div>
                  <div className="text-gray-600 font-medium">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Características */}
      <section id="caracteristicas" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Soluciones para impulsar tu negocio</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Herramientas potentes para gestionar cada aspecto de tu empresa de residuos
            </p>
          </div>

          <div className="space-y-24">
            {mockData.features.map((feature, index) => {
              const Icon = iconMap[feature.icon];
              return (
                <div 
                  key={feature.id}
                  className={`grid md:grid-cols-2 gap-12 items-center ${
                    index % 2 === 1 ? 'md:flex-row-reverse' : ''
                  }`}
                >
                  <div className={index % 2 === 1 ? 'md:order-2' : ''}>
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-16 h-16 bg-cyan-100 rounded-2xl flex items-center justify-center">
                        <Icon className="h-8 w-8 text-cyan-600" />
                      </div>
                      <h3 className="text-3xl font-bold text-gray-900">{feature.title}</h3>
                    </div>
                    <p className="text-lg text-gray-600 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                  <div className={index % 2 === 1 ? 'md:order-1' : ''}>
                    <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                      <img 
                        src={feature.image} 
                        alt={feature.title} 
                        className="w-full h-[400px] object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-cyan-900/30 to-transparent"></div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Soluciones/Versiones */}
      <section id="soluciones" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Una solución para cada fase de tu empresa</h2>
            <p className="text-xl text-gray-600">
              Elige la versión que se adapta a tus necesidades actuales
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {mockData.solutions.map((solution) => (
              <Card 
                key={solution.id}
                className={`relative overflow-hidden border-2 hover:shadow-2xl transition-all ${
                  solution.featured ? 'border-cyan-600 shadow-xl scale-105' : 'border-gray-200'
                }`}
              >
                {solution.featured && (
                  <div className="absolute top-0 right-0 bg-cyan-600 text-white px-4 py-1 text-sm font-semibold">
                    MÁS ELEGIDO
                  </div>
                )}
                <CardHeader className="pb-4">
                  <CardTitle className="text-2xl font-bold text-gray-900 mb-2">{solution.title}</CardTitle>
                  <p className="text-cyan-600 font-semibold">{solution.subtitle}</p>
                  <p className="text-gray-600 mt-2">{solution.description}</p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 mb-6">
                    {solution.modules.map((module, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <CheckCircle2 className="h-5 w-5 text-cyan-600 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{module}</span>
                      </div>
                    ))}
                  </div>
                  <Button 
                    className={`w-full ${
                      solution.featured 
                        ? 'bg-cyan-600 hover:bg-cyan-700 text-white' 
                        : 'border-2 border-cyan-600 text-cyan-600 hover:bg-cyan-50'
                    }`}
                    variant={solution.featured ? 'default' : 'outline'}
                    onClick={() => document.getElementById('contacto').scrollIntoView({ behavior: 'smooth' })}
                  >
                    {solution.cta}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Beneficios */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Beneficios que transforman tu operación</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {mockData.benefits.map((benefit) => {
              const Icon = iconMap[benefit.icon];
              return (
                <Card key={benefit.id} className="border-none shadow-xl hover:shadow-2xl transition-shadow">
                  <CardContent className="p-8">
                    <div className="w-16 h-16 bg-cyan-100 rounded-2xl flex items-center justify-center mb-6">
                      <Icon className="h-8 w-8 text-cyan-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">{benefit.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{benefit.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonios */}
      <section id="testimonios" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Casos de Éxito</h2>
          </div>

          <div className="relative">
            <Card className="border-none shadow-xl">
              <CardContent className="p-12">
                <div className="flex justify-center mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-6 w-6 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-xl text-gray-700 text-center mb-8 leading-relaxed italic">
                  "{mockData.testimonials[currentTestimonial].text}"
                </p>
                <div className="text-center">
                  <p className="font-bold text-gray-900 text-lg">{mockData.testimonials[currentTestimonial].name}</p>
                  <p className="text-cyan-600 font-semibold">{mockData.testimonials[currentTestimonial].position}</p>
                  <p className="text-gray-600">{mockData.testimonials[currentTestimonial].company}</p>
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-center gap-4 mt-8">
              <Button
                variant="outline"
                size="icon"
                onClick={prevTestimonial}
                className="rounded-full border-2 border-cyan-600 text-cyan-600 hover:bg-cyan-50"
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={nextTestimonial}
                className="rounded-full border-2 border-cyan-600 text-cyan-600 hover:bg-cyan-50"
              >
                <ChevronRight className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Contacto */}
      <section id="contacto" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-cyan-600 to-cyan-700">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">¿Te asesoramos?</h2>
            <p className="text-xl text-cyan-50">
              Completa el formulario y un especialista se contactará contigo
            </p>
          </div>
          <Card className="border-none shadow-2xl">
            <CardContent className="p-8 md:p-12">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="nombre" className="text-gray-700 font-semibold">Nombre Completo *</Label>
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
                    <Label htmlFor="email" className="text-gray-700 font-semibold">Email *</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="juan@empresa.com"
                      required
                      className="border-gray-300 focus:border-cyan-600 focus:ring-cyan-600"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="telefono" className="text-gray-700 font-semibold">Teléfono *</Label>
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
                    <Label htmlFor="empresa" className="text-gray-700 font-semibold">Empresa *</Label>
                    <Input
                      id="empresa"
                      name="empresa"
                      value={formData.empresa}
                      onChange={handleInputChange}
                      placeholder="Nombre de tu empresa"
                      required
                      className="border-gray-300 focus:border-cyan-600 focus:ring-cyan-600"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="tipoEmpresa" className="text-gray-700 font-semibold">Tipo de Empresa *</Label>
                  <Select value={formData.tipoEmpresa} onValueChange={handleSelectChange} required>
                    <SelectTrigger className="border-gray-300 focus:border-cyan-600 focus:ring-cyan-600">
                      <SelectValue placeholder="Selecciona el tipo de empresa" />
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
                  <Label htmlFor="mensaje" className="text-gray-700 font-semibold">Mensaje</Label>
                  <Textarea
                    id="mensaje"
                    name="mensaje"
                    value={formData.mensaje}
                    onChange={handleInputChange}
                    placeholder="Cuéntanos sobre tu empresa y necesidades..."
                    rows={4}
                    className="border-gray-300 focus:border-cyan-600 focus:ring-cyan-600"
                  />
                </div>

                <Button 
                  type="submit" 
                  size="lg" 
                  className="w-full bg-cyan-600 hover:bg-cyan-700 text-white text-lg py-6 shadow-lg"
                >
                  Solicitar Asesoramiento
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <img src="/logo.2.jpg" alt="VASTUM Logo" className="h-14 w-auto mb-4 brightness-0 invert" />
              <p className="text-gray-400">
                Software ERP argentino para empresas de gestión de residuos.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-lg mb-4 text-white">Soluciones</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-cyan-400 transition-colors">ERP Básico</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition-colors">ERP Profesional</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition-colors">ERP Enterprise</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-lg mb-4 text-white">Empresa</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#caracteristicas" className="hover:text-cyan-400 transition-colors">Características</a></li>
                <li><a href="#testimonios" className="hover:text-cyan-400 transition-colors">Testimonios</a></li>
                <li><a href="#contacto" className="hover:text-cyan-400 transition-colors">Contacto</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-lg mb-4 text-white">Contacto</h4>
              <div className="space-y-3 text-gray-400">
                <div className="flex items-center gap-2">
                  <Mail className="h-5 w-5" />
                  <span>info@vastum.com.ar</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-5 w-5" />
                  <span>0810-122-VASTUM</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPinned className="h-5 w-5" />
                  <span>San Juan, Argentina</span>
                </div>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} VASTUM. Todos los derechos reservados. Software ERP de Gestión de Residuos.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomeNew;
