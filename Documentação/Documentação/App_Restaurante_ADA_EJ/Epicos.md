# Épicos do Front-end

[Voltar](../DOCUMENTACAO.md)

## Base e premissas desta fase

Os épicos abaixo descrevem exclusivamente o MVP do front-end definido pela pasta `Prototipagem/` e pelo backlog `TASKS_DESENVOLVIMENTO.md`.

O MVP deve:

- utilizar React, TypeScript e a arquitetura já existente no projeto;
- operar com dados mockados compartilhados e sem integração HTTP;
- implementar Home, Cardápio, Mesas, Comandas e Pedidos;
- demonstrar as regras operacionais de estoque, status, cancelamento e fechamento;
- funcionar em viewport móvel a partir de 360 px e em desktop;
- não implementar login, autenticação, autorização por cargo, áreas restritas ou chamadas ao back-end.

Cada épico possui objetivo, escopo, entregáveis, responsabilidades, critérios de aceite e tarefas relacionadas. As dependências devem ser respeitadas entre os épicos e entre as tarefas.

---

## EF-01 — Fundação de Dados Mockados e Estado Local

**Objetivo**

Disponibilizar uma única fonte tipada de dados de demonstração e operações locais para que todas as telas trabalhem com o mesmo estado durante toda a sessão.

**Problema que resolve**

Evita dados fictícios dispersos em componentes, inconsistências entre telas e trabalho bloqueado pela ausência do back-end.

**Escopo detalhado**

- criar fixtures tipadas em `src/data/mock/` ou na pasta equivalente já adotada pelo projeto;
- modelar categorias, produtos, estoque, mesas, clientes, comandas, pedidos, itens, totais e formas de pagamento;
- criar operações locais para:
  - listar categorias, produtos, mesas, clientes e pedidos;
  - abrir comanda;
  - criar e editar pedido;
  - alterar status de pedido;
  - cancelar item ou pedido;
  - fechar comanda;
  - restaurar todos os dados para o estado inicial;
- compartilhar estado entre todas as telas e features da sessão;
- garantir que todas as contagens e totais sejam derivados dos dados;
- manter um único local documentado para manutenção dos dados mockados;
- impedir criação de cliente HTTP, endpoints fictícios, autenticação ou perfis nesta fase.

**Entregáveis**

- tipos de domínio das entidades usadas pelo MVP;
- fixtures completas para estados livres, ocupados, esgotados, vazios e em andamento;
- camada local de consulta e alteração;
- testes das operações locais e dos cálculos compartilhados;
- ação de restaurar a demonstração.

**Critérios de aceite**

- todas as tarefas que exibem ou alteram dados consumem a mesma fonte;
- alterações aparecem nas demais telas sem recarregar o navegador;
- totais, contagens de comandas e status de mesa permanecem coerentes;
- os dados podem ser restaurados ao estado inicial;
- não existem chamadas HTTP ou dependências do back-end;
- não existem login, cargo, guarda de rota ou permissões nesta fase.

**Requisitos cobertos**

- RF007, RF008, RF013, RF014, RF015, RF016, RF017, RF018 e RF023;
- RN003 a RN011;
- NFR003 e NFR004.

**Tarefas relacionadas**

- Tarefa 1 — Dados mockados compartilhados;
- fornece pré-requisitos para as tarefas 2 a 12.

---

## EF-02 — Navegação, Home e Cardápio

**Objetivo**

Entregar a entrada principal do MVP e o catálogo consultável que permite ao garçom localizar itens disponíveis e iniciar um pedido.

**Escopo detalhado**

### Home

- criar a página a partir do protótipo mobile;
- exibir identificação do restaurante e categorias vindas dos mocks;
- apresentar navegação para Mesas e Pedidos;
- aplicar estados visuais de foco, ativo e desabilitado;
- usar a navegação já fornecida pelo layout, sem duplicar barras ou menus;
- ao escolher uma categoria, abrir o Cardápio com o filtro correspondente.

### Cardápio

- criar categorias em abas horizontais acessíveis;
- refletir categoria e busca na URL;
- manter filtros funcionais ao recarregar a página;
- listar imagem, nome, quantidade ou peso, preço e estoque;
- mostrar `[42 un]` para disponível e `[0 un - Esgotado]` para esgotado;
- indicar baixa disponibilidade quando configurada nos dados;
- manter o item esgotado visível e desabilitado apenas como demonstração;
- ocultar produtos desativados ou sem disponibilidade fora da exceção definida;
- desabilitar a ação de adicionar em estoque insuficiente;
- abrir o pedido da comanda selecionada ao adicionar um item;
- mostrar EmptyState para busca ou categoria sem resultados.

**Entregáveis**

- `HomePage`;
- `CardapioPage`;
- componentes acessíveis de cards, categorias, abas e estoque;
- integração da URL com filtros;
- navegação por rota para Mesas, Pedidos e itens do Cardápio.

**Critérios de aceite**

- dados da Home e do Cardápio vêm da fonte mockada;
- filtros de categoria e busca são consistentes e persistem na URL;
- o item esgotado não pode ser adicionado;
- estoque muda localmente após ações de pedido e entrega;
- não ocorre overflow horizontal em 360 px;
- teclado, foco e touch targets são funcionais.

**Requisitos cobertos**

- RF013, RF015 e RF023;
- RN005, RN010 e RN011;
- NFR003 e NFR004.

**Tarefas relacionadas**

- Tarefa 2 — Navegação da Home;
- Tarefa 3 — Cardápio por categoria;
- depende da Tarefa 1.

---

## EF-03 — Operação de Salão: Mesas e Comandas

**Objetivo**

Permitir localizar mesas, abrir comandas, selecionar clientes e visualizar todas as contas abertas de uma mesa antes de lançar pedidos.

**Escopo detalhado**

### Mapa de mesas

- listar mesas ativas em grade ou lista responsiva;
- mostrar identificação, área, status e quantidade de comandas abertas;
- calcular visualização a partir das comandas abertas;
- aplicar verde para Livre, azul para Ocupada e laranja para Conta;
- permitir busca e filtro por área;
- ordenar mesas de forma previsível;
- abrir comanda ou visão da mesa conforme o status.

### Abertura de comanda

- vincular automaticamente a comanda à mesa selecionada;
- buscar clientes existentes por nome, CPF ou telefone;
- permitir cadastro simplificado ou seleção de `Consumidor Final`;
- exigir nome e telefone em novo cliente;
- validar CPF opcional e impedir CPF duplicado;
- impedir mesa inexistente ou inativa;
- criar comanda com status inicial `Aberta`;
- atualizar mesa e navegação após a criação.

### Visão da mesa

- mostrar todas as comandas abertas da mesa;
- identificar cliente ou número da comanda;
- agrupar pedidos por status;
- calcular o total sem permitir edição manual;
- permitir nova comanda e novo pedido;
- impedir edição de comandas finalizadas;
- seguir para o pedido correto ao selecionar uma comanda.

**Entregáveis**

- `MesasPage`;
- componente de mapa de mesas;
- modal ou página de abertura de comanda;
- componente de seleção e cadastro local de cliente;
- visão de divisão de comandas da mesa.

**Critérios de aceite**

- mesa sem comanda aberta fica Livre;
- mesa com comanda aberta fica Ocupada;
- uma mesa pode possuir várias comandas;
- contagem, totais e status são recalculados pelos mocks;
- abertura com `Consumidor Final` não exige dados pessoais;
- erros de validação preservam dados digitados;
- a comanda finalizada não permite edição nesta funcionalidade.

**Requisitos cobertos**

- RF007, RF008, RF014, RF016 e RF023;
- RN001, RN003, RN004 e RN005;
- NFR003 e NFR004.

**Tarefas relacionadas**

- Tarefa 4 — Mapa de mesas;
- Tarefa 5 — Abertura de comanda e seleção de cliente;
- Tarefa 6 — Visão da mesa e divisão de comandas;
- depende da Tarefa 1 e integra-se às tarefas 7 e 11.

---

## EF-04 — Ciclo Completo dos Pedidos

**Objetivo**

Implementar a montagem, validação, transição de status, cancelamento e acompanhamento dos pedidos da mesa até a entrega.

**Escopo detalhado**

### Montagem e edição

- criar pedido em `Em Andamento` vinculado à comanda;
- adicionar itens com quantidade mínima 1;
- bloquear produto desativado ou esgotado;
- bloquear quantidade maior que o estoque disponível;
- permitir remoção de item e observações;
- recalcular subtotal e total a partir de preço e quantidade;
- bloquear confirmação de pedido vazio;
- impedir edição de pedidos `Pendente` ou `Entregue`.

### Status e impressão

- implementar somente `Em Andamento` → `Pendente` → `Entregue`;
- confirmar cada mudança antes da aplicação;
- disparar simulação de impressão somente ao enviar para pendente;
- manter pedido pendente se a impressão simulada falhar;
- permitir reimpressão de demonstração;
- bloquear entrega sem estoque suficiente;
- atualizar estoque localmente ao entregar.

### Cancelamento

- permitir cancelamento apenas antes de `Entregue`;
- exigir justificativa selecionada ou digitada;
- mostrar impacto financeiro antes da confirmação;
- impedir dupla submissão;
- recalcular pedido e comanda;
- associar justificativa ao item ou pedido cancelado;
- impedir cancelamento de pedido entregue.

### Visão de pedidos ativos

- listar pedidos agrupados por mesa;
- filtrar por status e mesa;
- permitir busca por mesa ou comanda;
- aplicar filtros na URL;
- mostrar número, itens, quantidade e horário disponível;
- disponibilizar somente ações compatíveis com o status;
- navegar para o detalhe da comanda;
- atualizar a lista imediatamente após status ou cancelamento.

**Entregáveis**

- montagem e edição de pedido;
- modal de cancelamento;
- controles de transição de status;
- simulação de impressão;
- página de pedidos ativos e filtros.

**Critérios de aceite**

- pedido vazio não pode ser enviado;
- não existem transições retroativas;
- pedidos pendentes ficam congelados;
- pedidos entregues ficam bloqueados para edição e cancelamento;
- estoque insuficiente impede entrega;
- impressão ocorre somente na transição correta;
- cancelamento exige justificativa e recalcula totais;
- todas as telas refletem o mesmo estado do pedido.

**Requisitos cobertos**

- RF015, RF016, RF018, RF023 e RF025;
- RN005, RN006, RN007, RN008, RN010 e RN012;
- NFR003, NFR004 e NFR006.

**Tarefas relacionadas**

- Tarefa 7 — Montagem e edição de pedido;
- Tarefa 8 — Fluxo de status e impressão;
- Tarefa 9 — Cancelamento com justificativa;
- Tarefa 10 — Visão de pedidos ativos;
- depende das tarefas 1, 3 e 6.

---

## EF-05 — Fechamento da Comanda e Sincronização da Mesa

**Objetivo**

Permitir demonstrar o fechamento local de uma comanda somente após todos os pedidos serem entregues e manter Mesa, Comanda e Pedidos sincronizados.

**Escopo detalhado**

- consolidar pedidos e itens em um resumo não editável;
- bloquear fechamento com pedido `Em Andamento` ou `Pendente`;
- identificar exatamente quais pedidos impedem o fechamento;
- exigir uma forma de pagamento mockada;
- solicitar confirmação antes da operação;
- aplicar o fechamento como ação local única;
- marcar a comanda como `Finalizada`;
- liberar a mesa para `Livre` somente se não houver outra comanda aberta;
- manter os pedidos entregues visíveis e bloqueados;
- não alterar dados quando a validação falhar.

**Entregáveis**

- resumo de fechamento;
- validação de elegibilidade;
- seleção mockada de pagamento;
- confirmação e estado final da comanda;
- atualização coordenada da mesa.

**Critérios de aceite**

- fechamento é bloqueado enquanto existir pedido não entregue;
- o usuário vê o pedido ou motivo bloqueador;
- o valor consolidado não é editável;
- forma de pagamento é obrigatória;
- comanda finalizada não pode ser editada;
- a última comanda finalizada libera a mesa;
- o estado permanece coerente em Mesa, Comanda e Pedidos.

**Requisitos cobertos**

- RF017;
- RN009;
- integração com RN003, RN005, RN007 e RN010.

**Tarefas relacionadas**

- Tarefa 11 — Fechamento da comanda;
- depende das tarefas 6, 8 e 9.

---

## EF-06 — Qualidade, Acessibilidade e Validação Visual

**Objetivo**

Comprovar, por testes e validações visuais, que os fluxos operacionais funcionam de ponta a ponta e permanecem utilizáveis em mobile e desktop.

**Escopo detalhado**

- reutilizar as fixtures compartilhadas nos testes;
- cobrir navegação, abertura de comanda, montagem, status, cancelamento e fechamento;
- testar estoque insuficiente e item esgotado;
- testar todas as transições válidas e inválidas;
- testar múltiplas comandas por mesa;
- validar atualização automática de totais e estoque;
- validar estados vazio, desabilitado e mensagens locais;
- executar testes em 360 px, tablet e desktop;
- validar contraste, foco, teclado e touch targets mínimos;
- registrar a comparação visual dos protótipos no PR;
- não substituir testes por screenshots ou validações somente manuais.

**Entregáveis**

- testes unitários;
- testes de integração;
- testes end-to-end dos fluxos principais;
- evidência visual responsiva;
- checklist de acessibilidade;
- confirmação de build, lint e typecheck.

**Critérios de aceite**

- fluxo completo Home → Mesa → Comanda → Pedido → Entrega está automatizado;
- transições inválidas são bloqueadas ou cobertas por teste;
- cancelamento exige justificativa;
- fechamento exige todos os pedidos entregues;
- nenhum elemento essencial fica abaixo de 44 px;
- não existe overflow horizontal em 360 px;
- teclado alcança as ações críticas;
- build, lint, typecheck e testes passam em CI;
- nenhuma restrição por cargo foi criada nesta fase.

**Requisitos cobertos**

- RF013 a RF018 e RF023;
- RN003 a RN011;
- NFR003, NFR004 e NFR006.

**Tarefas relacionadas**

- Tarefa 12 — Testes, acessibilidade e validação visual;
- depende de todas as tarefas 2 a 11.

---

## Matriz de rastreabilidade dos épicos

| Épico | Tarefas | Responsável principal |
|---|---|---|
| EF-01 — Dados mockados | 1 | Equipe A, com revisão da Equipe B |
| EF-02 — Navegação, Home e Cardápio | 2, 3 | Equipe A |
| EF-03 — Mesas e Comandas | 4, 5, 6 | Equipe B |
| EF-04 — Ciclo dos Pedidos | 7, 8, 9, 10 | Equipes A e B |
| EF-05 — Fechamento | 11 | Equipe B |
| EF-06 — Qualidade | 12 | Equipes A e B |
