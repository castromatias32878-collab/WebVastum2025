import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { toast } from 'sonner';
import { Lock, ArrowLeft } from 'lucide-react';

const ADMIN_PASSWORD = 'Argentina17_admin';

const AdminLogin = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      if (password === ADMIN_PASSWORD) {
        localStorage.setItem('vastum_admin_auth', 'true');
        toast.success('Acceso autorizado');
        navigate('/admin');
      } else {
        toast.error('Contraseña incorrecta');
        setPassword('');
      }
      setLoading(false);
    }, 500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md">
        <Button
          variant="ghost"
          onClick={() => navigate('/')}
          className="mb-4 text-gray-600 hover:text-cyan-600"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Volver a la Landing
        </Button>

        <Card className="shadow-xl">
          <CardHeader className="text-center pb-6">
            <div className="flex justify-center mb-4">
              <img src="/isologotipo-vastum.png" alt="VASTUM" className="h-20 w-auto" />
            </div>
            <CardTitle className="text-2xl font-bold text-gray-900">
              Acceso Administrador
            </CardTitle>
            <p className="text-sm text-gray-500 mt-2">
              Ingresa la contraseña para acceder al panel
            </p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="password" className="text-gray-700 font-medium">
                  Contraseña
                </Label>
                <div className="relative mt-1">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Ingresa la contraseña"
                    required
                    className="pl-10 h-11 border-gray-300 focus:border-cyan-500 focus:ring-cyan-500"
                    autoFocus
                  />
                </div>
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-cyan-600 hover:bg-cyan-700 text-white h-11 font-semibold"
              >
                {loading ? 'Verificando...' : 'Acceder'}
              </Button>
            </form>
          </CardContent>
        </Card>

        <p className="text-center text-xs text-gray-500 mt-4">
          Panel de administración VASTUM
        </p>
      </div>
    </div>
  );
};

export default AdminLogin;
