export interface Company {
  numero_de_inscricao: string;
  tipo: string;
  abertura: string;
  nome: string;
  fantasia: string;
  atividade_principal: Activity;
  atividades_secundarias: Activity[];
  natureza_juridica: string;
  logradouro: string;
  numero: string;
  complemento: string;
  cep: string;
  bairro: string;
  municipio: string;
  uf: string;
  email: string;
  telefone: string;
  entidade_federativo_responsavel: string;
  situacao: string;
  dt_situacao_cadastral: string;
  situacao_especial: string;
  data_situacao_especial: string;
  capital_social: string;
  quadro_socios: string[];
  status: 'required' | 'notRequired' | 'depend';
}

interface Activity {
  code: string;
  text: string;
  type: 'required' | 'notRequired' | 'depend';
}
