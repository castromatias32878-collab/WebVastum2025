import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { toast } from 'sonner';
import { 
  ArrowLeft,
  Mail,
  Phone,
  Building2,
  Calendar,
  MessageSquare,
  RefreshCw,
  Download,
  Upload,
  Trash2,
  Image as ImageIcon
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const AdminPanel = () => {
  const navigate = useNavigate();
  const [contactos, setContactos] = useState([]);
  const [logos, setLogos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [uploadingLogo, setUploadingLogo] = useState(false);

  // Verificar autenticación
  useEffect(() => {
    const isAuthenticated = localStorage.getItem('vastum_admin_auth');
    if (!isAuthenticated) {
      navigate('/admin/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('vastum_admin_auth');
    toast.success('Sesión cerrada');
    navigate('/');
  };

  const fetchContactos = async () => {
    try {
      setRefreshing(true);
      const response = await axios.get(`${API}/contactos`);
      if (response.data.success) {
        setContactos(response.data.contactos);
        toast.success(`${response.data.total} contactos cargados`);
      }
    } catch (error) {
      console.error('Error al cargar contactos:', error);
      toast.error('Error al cargar los contactos');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const fetchLogos = async () => {
    try {
      const response = await axios.get(`${API}/logos`);
      if (response.data.success) {
        setLogos(response.data.logos);
      }
    } catch (error) {
      console.error('Error al cargar logos:', error);
      toast.error('Error al cargar los logos');
    }
  };

  const handleLogoUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast.error('Por favor selecciona una imagen válida');
      return;
    }

    const reader = new FileReader();
    reader.onloadend = async () => {
      try {
        setUploadingLogo(true);
        const base64String = reader.result;
        
        const response = await axios.post(`${API}/logos`, {
          nombre: file.name,
          imagen_base64: base64String
        });

        if (response.data.success) {
          toast.success('Logo agregado exitosamente');
          fetchLogos();
        }
      } catch (error) {
        console.error('Error al subir logo:', error);
        toast.error('Error al subir el logo');
      } finally {
        setUploadingLogo(false);
        event.target.value = '';
      }
    };

    reader.readAsDataURL(file);
  };

  const handleDeleteLogo = async (logoId, logoNombre) => {
    if (!window.confirm(`¿Seguro que quieres eliminar el logo de ${logoNombre}?`)) {
      return;
    }

    try {
      const response = await axios.delete(`${API}/logos/${logoId}`);
      if (response.data.success) {
        toast.success('Logo eliminado exitosamente');
        fetchLogos();
      }
    } catch (error) {
      console.error('Error al eliminar logo:', error);
      toast.error('Error al eliminar el logo');
    }
  };

  useEffect(() => {
    fetchContactos();
    fetchLogos();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('es-AR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const exportToCSV = () => {
    const headers = ['Fecha', 'Nombre', 'Email', 'Teléfono', 'Empresa', 'Tipo Empresa', 'Mensaje'];
    const csvData = contactos.map(c => [
      formatDate(c.created_at),
      c.nombre,
      c.email,
      c.telefono,
      c.empresa,
      c.tipo_empresa,
      c.mensaje || '-'
    ]);
    
    const csvContent = [
      headers.join(','),
      ...csvData.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `contactos_vastum_${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
    
    toast.success('CSV descargado exitosamente');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <RefreshCw className="h-12 w-12 text-cyan-600 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Cargando contactos...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <Button
              variant="ghost"
              onClick={() => navigate('/')}
              className="text-gray-600 hover:text-cyan-600"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Volver a la Landing
            </Button>
            <div className="flex items-center gap-4">
              <img src="/isologotipo-vastum.png" alt="VASTUM" className="h-12 w-auto" />
              <Button
                variant="outline"
                onClick={handleLogout}
                className="border-red-600 text-red-600 hover:bg-red-50"
              >
                Cerrar Sesión
              </Button>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Panel de Administración</h1>
              <p className="text-gray-600">Gestión de solicitudes de demo</p>
            </div>
            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={fetchContactos}
                disabled={refreshing}
                className="border-cyan-600 text-cyan-600 hover:bg-cyan-50"
              >
                <RefreshCw className={`h-4 w-4 mr-2 ${refreshing ? 'animate-spin' : ''}`} />
                Actualizar
              </Button>
              <Button
                onClick={exportToCSV}
                disabled={contactos.length === 0}
                className="bg-cyan-600 hover:bg-cyan-700 text-white"
              >
                <Download className="h-4 w-4 mr-2" />
                Exportar CSV
              </Button>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Total Contactos</p>
                  <p className="text-3xl font-bold text-gray-900">{contactos.length}</p>
                </div>
                <div className="w-12 h-12 bg-cyan-100 rounded-full flex items-center justify-center">
                  <Mail className="h-6 w-6 text-cyan-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Esta Semana</p>
                  <p className="text-3xl font-bold text-gray-900">
                    {contactos.filter(c => {
                      const contactDate = new Date(c.created_at);
                      const weekAgo = new Date();
                      weekAgo.setDate(weekAgo.getDate() - 7);
                      return contactDate > weekAgo;
                    }).length}
                  </p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <Calendar className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Hoy</p>
                  <p className="text-3xl font-bold text-gray-900">
                    {contactos.filter(c => {
                      const contactDate = new Date(c.created_at);
                      const today = new Date();
                      return contactDate.toDateString() === today.toDateString();
                    }).length}
                  </p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <Building2 className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Lista de Contactos */}
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            Solicitudes Recibidas ({contactos.length})
          </h2>
          
          {contactos.length === 0 ? (
            <Card>
              <CardContent className="p-12 text-center">
                <Mail className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 text-lg">No hay contactos registrados aún</p>
                <p className="text-gray-400 text-sm mt-2">Los nuevos contactos aparecerán aquí</p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {contactos.map((contacto) => (
                <Card key={contacto._id} className="hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-xl text-gray-900 mb-2">
                          {contacto.nombre}
                        </CardTitle>
                        <div className="flex flex-wrap gap-2">
                          <Badge className="bg-cyan-100 text-cyan-700 border-cyan-200">
                            {contacto.tipo_empresa}
                          </Badge>
                          <Badge variant="outline" className="text-gray-600">
                            {contacto.empresa}
                          </Badge>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-gray-500">
                          {formatDate(contacto.created_at)}
                        </p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-4 mb-4">
                      <div className="flex items-center gap-2 text-sm">
                        <Mail className="h-4 w-4 text-cyan-600 flex-shrink-0" />
                        <a href={`mailto:${contacto.email}`} className="text-gray-700 hover:text-cyan-600">
                          {contacto.email}
                        </a>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Phone className="h-4 w-4 text-cyan-600 flex-shrink-0" />
                        <a href={`tel:${contacto.telefono}`} className="text-gray-700 hover:text-cyan-600">
                          {contacto.telefono}
                        </a>
                      </div>
                    </div>
                    
                    {contacto.mensaje && (
                      <div className="bg-gray-50 rounded-lg p-4 mt-4">
                        <div className="flex items-start gap-2">
                          <MessageSquare className="h-4 w-4 text-gray-500 flex-shrink-0 mt-0.5" />
                          <div className="flex-1">
                            <p className="text-xs text-gray-500 mb-1">Mensaje:</p>
                            <p className="text-sm text-gray-700">{contacto.mensaje}</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
