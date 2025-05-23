
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { 
  FileText, 
  Download, 
  ChevronDown, 
  Loader2,
  Share2,
  Eye,
  CheckCircle 
} from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from 'sonner';

// Mock proposal history
const mockProposalHistory = [
  {
    id: '1',
    clientName: 'Maria Silva',
    service: 'Marketing Digital',
    createdAt: '20/05/2023',
    amount: 'R$ 5.000,00',
    status: 'sent'
  },
  {
    id: '2',
    clientName: 'João Santos',
    service: 'Desenvolvimento Web',
    createdAt: '15/05/2023',
    amount: 'R$ 12.000,00',
    status: 'viewed'
  },
  {
    id: '3',
    clientName: 'Ana Pereira',
    service: 'Consultoria SEO',
    createdAt: '10/05/2023',
    amount: 'R$ 3.500,00',
    status: 'accepted'
  }
];

const statusLabels: Record<string, { label: string, icon: React.ElementType, className: string }> = {
  'draft': { label: 'Rascunho', icon: FileText, className: 'text-muted-foreground' },
  'sent': { label: 'Enviada', icon: Share2, className: 'text-blue-500' },
  'viewed': { label: 'Visualizada', icon: Eye, className: 'text-amber-500' },
  'accepted': { label: 'Aceita', icon: CheckCircle, className: 'text-green-500' }
};

const Proposals = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isGenerated, setIsGenerated] = useState(false);
  const [formData, setFormData] = useState({
    clientName: '',
    service: '',
    description: '',
    budget: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleGenerateProposal = () => {
    setIsLoading(true);
    // Simulate API call delay
    setTimeout(() => {
      setIsLoading(false);
      setIsGenerated(true);
      toast.success('Proposta gerada com sucesso!');
    }, 2000);
  };

  const handleDownload = () => {
    toast.success('Proposta baixada com sucesso!');
  };

  const handleSendProposal = () => {
    toast.success('Proposta enviada para o cliente!');
    setIsGenerated(false);
    setFormData({
      clientName: '',
      service: '',
      description: '',
      budget: '',
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Propostas</h1>
        <p className="text-muted-foreground">Crie e gerencie propostas para clientes</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Gerar nova proposta</CardTitle>
            <CardDescription>Preencha os detalhes para criar uma proposta personalizada.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="clientName">Nome do cliente</Label>
              <Input
                id="clientName"
                name="clientName"
                value={formData.clientName}
                onChange={handleChange}
                placeholder="Ex: Maria Silva"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="service">Serviço</Label>
              <Select
                value={formData.service}
                onValueChange={(value) => handleSelectChange('service', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione um serviço" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="marketing">Marketing Digital</SelectItem>
                  <SelectItem value="development">Desenvolvimento Web</SelectItem>
                  <SelectItem value="seo">Consultoria SEO</SelectItem>
                  <SelectItem value="social-media">Gestão de Redes Sociais</SelectItem>
                  <SelectItem value="other">Outro</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Descrição do projeto</Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Descreva os objetivos e necessidades do cliente..."
                rows={4}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="budget">Orçamento</Label>
              <Input
                id="budget"
                name="budget"
                value={formData.budget}
                onChange={handleChange}
                placeholder="Ex: R$ 5.000,00"
              />
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button
              variant="outline"
              onClick={() => {
                setFormData({
                  clientName: '',
                  service: '',
                  description: '',
                  budget: '',
                });
                setIsGenerated(false);
              }}
            >
              Limpar
            </Button>
            <Button 
              onClick={handleGenerateProposal}
              disabled={
                isLoading || 
                !formData.clientName || 
                !formData.service || 
                !formData.description || 
                !formData.budget
              }
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Gerando...
                </>
              ) : (
                'Gerar proposta'
              )}
            </Button>
          </CardFooter>
        </Card>

        <Card className="lg:col-span-1">
          {isGenerated ? (
            <>
              <CardHeader>
                <CardTitle>Proposta gerada</CardTitle>
                <CardDescription>
                  Proposta para {formData.clientName} - {new Date().toLocaleDateString('pt-BR')}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="border rounded-md p-4">
                  <div className="text-center mb-6">
                    <h2 className="text-xl font-bold text-primary">Optivoo CRM</h2>
                    <p className="text-muted-foreground text-sm">Proposta comercial</p>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-medium">Cliente</h3>
                      <p>{formData.clientName}</p>
                    </div>
                    
                    <div>
                      <h3 className="font-medium">Serviço</h3>
                      <p>{
                        formData.service === 'marketing' ? 'Marketing Digital' :
                        formData.service === 'development' ? 'Desenvolvimento Web' :
                        formData.service === 'seo' ? 'Consultoria SEO' :
                        formData.service === 'social-media' ? 'Gestão de Redes Sociais' :
                        'Outro serviço'
                      }</p>
                    </div>
                    
                    <div>
                      <h3 className="font-medium">Descrição</h3>
                      <p className="text-sm">{formData.description}</p>
                    </div>
                    
                    <div>
                      <h3 className="font-medium">Investimento</h3>
                      <p className="text-lg font-bold">{formData.budget}</p>
                    </div>
                    
                    <div>
                      <h3 className="font-medium">Prazo de entrega</h3>
                      <p>30 dias após aprovação</p>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" className="gap-2" onClick={handleDownload}>
                  <Download size={16} />
                  Baixar PDF
                </Button>
                <Button onClick={handleSendProposal}>Enviar para o cliente</Button>
              </CardFooter>
            </>
          ) : (
            <>
              <CardHeader>
                <CardTitle>Histórico de propostas</CardTitle>
                <CardDescription>
                  Propostas recentes enviadas aos clientes
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Cliente</TableHead>
                      <TableHead>Data</TableHead>
                      <TableHead>Valor</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockProposalHistory.map((proposal) => (
                      <TableRow key={proposal.id}>
                        <TableCell>
                          <div>
                            <p className="font-medium">{proposal.clientName}</p>
                            <p className="text-xs text-muted-foreground">{proposal.service}</p>
                          </div>
                        </TableCell>
                        <TableCell>{proposal.createdAt}</TableCell>
                        <TableCell>{proposal.amount}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            {statusLabels[proposal.status].icon && (
                              <div className={`h-4 w-4 ${statusLabels[proposal.status].className}`}>
                                {React.createElement(statusLabels[proposal.status].icon, {
                                  className: `h-4 w-4 ${statusLabels[proposal.status].className}`
                                })}
                              </div>
                            )}
                            <span className="text-sm">{statusLabels[proposal.status].label}</span>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
              <CardFooter className="flex justify-center">
                <Button variant="ghost" className="gap-1">
                  Ver todas
                  <ChevronDown size={16} />
                </Button>
              </CardFooter>
            </>
          )}
        </Card>
      </div>
    </div>
  );
};

export default Proposals;
