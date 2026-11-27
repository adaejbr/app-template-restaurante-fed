# Matrizes de Rastreabilidade

[Voltar](../DOCUMENTACAO.md)
 
# Req. Funcionais X Req. Não-Funcionais:

| **Código RF** | **Nome da Função** | **Requisitos Não Funcionais Relacionados** | **Justificativa do Vínculo** |
| --- | --- | --- | --- |
| **RF001** | Autenticação e Controle de Acesso | NFR008, NFR009, NFR011 | A segurança do login exige criptografia de senha (NFR008), timeout de sessão (NFR009) e logs de acesso (NFR011). |
| **RF002** | Gerenciar Perfil do Usuário | NFR008, NFR011 | Edição de dados pessoais requer proteção de CPF/telefone (NFR008) e rastreabilidade de alterações (NFR011). |
| **RF003** | Gerenciar Restaurante | NFR007, NFR011 | Dados da empresa são críticos para backup (NFR007) e auditoria (NFR011). |
| **RF004** | Dashboard Gerencial | NFR001, NFR002 | O carregamento rápido de indicadores (NFR001) e a estabilidade em pico de acessos (NFR002) são essenciais. |
| **RF005** | Gerenciar Funcionários | NFR008, NFR011, NFR009 | Cadastro de funcionários envolve senhas (NFR008), logs (NFR011) e controle de sessão (NFR009). |
| **RF006** | Gerenciar Cargos e Permissões | NFR008, NFR011, NFR009 | Permissões definem níveis de acesso; exigem criptografia, logs e timeout. |
| **RF007** | Gerenciar Mesas | NFR001, NFR003, NFR011 | A atualização de status deve ser rápida (NFR001), com interface responsiva (NFR003) e rastreável (NFR011). |
| **RF008** | Gerenciar Clientes | NFR008, NFR010, NFR011 | Dados de clientes são sensíveis (NFR008), sujeitos à LGPD (NFR010) e com logs de alteração (NFR011). |
| **RF009** | Gerenciar Produtos | NFR001, NFR003, NFR011 | CRUD de produtos exige performance (NFR001), usabilidade mobile (NFR003) e auditoria (NFR011). |
| **RF010** | Gerenciar Categorias e Marcas | NFR001, NFR003 | Operações de busca e organização devem ser rápidas e responsivas. |
| **RF011** | Gerenciar Fornecedores | NFR007, NFR011 | Dados de fornecedores são importantes para backup (NFR007) e rastreabilidade (NFR011). |
| **RF012** | Controle de Estoque (Entrada) | NFR001, NFR005, NFR011 | Atualização de estoque deve ser atômica (NFR005), rápida (NFR001) e com logs (NFR011). |
| **RF013** | Gerenciar Cardápio | NFR001, NFR003, NFR011 | Ativação/desativação de produtos exige rapidez, responsividade e auditoria. |
| **RF014** | Abrir Comanda | NFR001, NFR003, NFR004 | Abertura de comanda deve ser ultrarrápida (NFR001), com poucos cliques (NFR004) e responsiva (NFR003). |
| **RF015** | Realizar Pedido | NFR001, NFR003, NFR004, NFR006, NFR014 | O coração do sistema: exige desempenho (NFR001), usabilidade mobile (NFR003/004), fila de impressão (NFR006) e desacoplamento (NFR014). |
| **RF016** | Gerenciar Status do Pedido | NFR001, NFR003, NFR011 | Atualização de status deve ser instantânea, com interface adaptável e logs. |
| **RF017** | Fechar Comanda (Pagamento) | NFR001, NFR005, NFR007, NFR011 | Operação financeira crítica: exige atomicidade (NFR005), performance (NFR001), backup (NFR007) e logs (NFR011). |
| **RF018** | Cancelar Itens/Pedidos | NFR001, NFR005, NFR011 | Cancelamento afeta valores totais; deve ser atômico (NFR005), rápido e rastreável. |
| **RF019** | Controle de Setores | NFR001, NFR011 | Cadastro de setores é simples, mas deve ser rápido e auditável. |
| **RF020** | Relatório de Faturamento | NFR001, NFR002, NFR007 | Relatórios financeiros exigem performance (NFR001), estabilidade em pico (NFR002) e dados consistentes (NFR007). |
| **RF021** | Relatório de Produtos (Estoque) | NFR001, NFR002, NFR007 | Mesmo que RF020, com foco em dados de estoque. |
| **RF022** | Auditoria de Ações | NFR007, NFR011 | Logs de auditoria devem ser preservados em backup (NFR007) e estruturados (NFR011). |
| **RF023** | Pesquisa e Filtros Avançados | NFR001, NFR003 | Buscas em grandes volumes devem ser rápidas (NFR001) e funcionar bem em mobile (NFR003). |
| **RF024** | Controle de Impressoras | NFR006, NFR011, NFR014 | Configuração de impressoras impacta a fila de impressão (NFR006), logs (NFR011) e desacoplamento (NFR014). |
| **RF025** | Impressão automática de pedido | NFR001, NFR006, NFR011, NFR014 | Impressão deve ser disparada rapidamente (NFR001), com tolerância a falhas (NFR006), logs (NFR011) e desacoplamento (NFR014). |

# Cobertura de Req. Não Funcionais X Req. Funcionais:

| **Código NFR** | **Categoria** | **Requisitos Funcionais que o Validam** |
| --- | --- | --- |
| **NFR001** | Desempenho | RF004, RF007, RF009, RF010, RF012, RF013, RF014, RF015, RF016, RF017, RF018, RF019, RF020, RF021, RF023, RF025 |
| **NFR002** | Desempenho (Concorrência) | RF004, RF020, RF021 |
| **NFR003** | Usabilidade (Responsividade) | RF007, RF009, RF010, RF013, RF014, RF015, RF016, RF023 |
| **NFR004** | Usabilidade (Eficiência) | RF014, RF015 |
| **NFR005** | Confiabilidade (ACID) | RF012, RF017, RF018 |
| **NFR006** | Confiabilidade (Impressão) | RF015, RF024, RF025 |
| **NFR007** | Confiabilidade (Backup) | RF003, RF011, RF017, RF020, RF021, RF022 |
| **NFR008** | Segurança (Criptografia) | RF001, RF002, RF005, RF006, RF008 |
| **NFR009** | Segurança (Sessão) | RF001, RF005, RF006 |
| **NFR010** | LGPD (Privacidade) | RF008 |
| **NFR011** | Manutenibilidade (Logs) | RF001, RF002, RF003, RF005, RF006, RF007, RF008, RF009, RF011, RF012, RF013, RF016, RF017, RF018, RF019, RF022, RF024, RF025 |
| **NFR012** | Portabilidade (Navegadores) | *Aplica-se a toda a interface WEB (todos os RFs com interface gráfica)* |
| **NFR013** | Disponibilidade (Uptime) | *Aplica-se a todo o sistema (todos os RFs)* |
| **NFR014** | Arquitetura (Desacoplamento) | RF015, RF024, RF025 |