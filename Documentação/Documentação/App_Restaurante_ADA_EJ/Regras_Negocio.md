# Regras de Negócio

[Voltar](../DOCUMENTACAO.md)
 
| **ID** | **Nome da Regra** | **Descrição Detalhada (Validações/Comportamentos)** | **Origem (RF/DER)** | **Épico** |
| --- | --- | --- | --- | --- |
| **RN001** | **Unicidade de CPF/CNPJ** | O sistema não pode permitir o cadastro de dois clientes (`Perfil.CPF`), funcionários (`Perfil.CPF`), fornecedores (`Fornecedor.CNPJ`) ou restaurantes (`Restaurante.CNPJ`) com o mesmo número de documento. Tentativas devem exibir alerta de "Documento já cadastrado". | RF005, RF008, RF011 | **Épico 1: Cadastros Base** |
| **RN002** | **Endereço Obrigatório** | O cadastro de um restaurante, fornecedor ou cliente (pessoa física) deve obrigatoriamente vincular um endereço válido. A cidade (`Cidade`) deve estar vinculada a um estado (`Estado`) existente. | DER (Endereço, Cidade, Estado) | **Épico 1: Cadastros Base** |
| **RN003** | **Controle de Status da Mesa (Múltiplas Comandas)** | A mesma mesa pode ter **N comandas ativas simultaneamente**, atendendo a diferentes clientes/grupos que desejam contas separadas.
**Regras de validação:**
1. O status da mesa ("Livre" / "Ocupada") deve ser calculado com base na existência de comandas ativas. A mesa é considerada **"Ocupada"** se houver **pelo menos uma** comanda com status diferente de "Finalizada" (ex: "Aberta") vinculada a ela.
2. Para abrir uma nova comanda (RF014), **não há restrição** de status da mesa. Pode-se abrir comanda em mesa "Livre" ou "Ocupada". A única restrição é que a mesa deve existir e estar ativa.
3. O status da mesa só poderá ser alterado automaticamente para **"Livre"** quando a **última** comanda ativa vinculada a ela for finalizada (status "Finalizada") no fechamento do pagamento (RF017) | RF007, RF014, RF017 | **Épico 2: Operação de Salão** |
| **RN004** | **Cliente Anônimo ou Cadastrado** | Ao abrir uma comanda, o Garçom pode vincular a um Cliente existente (via busca CPF/Telefone) ou selecionar a opção "Consumidor Final" (cliente anônimo). Se optar por cadastrar um novo, os campos nome e telefone são obrigatórios; CPF é opcional, mas se preenchido deve ser válido. | RF008, RF014 | **Épico 2: Operação de Salão** |
| **RN005** | **Cálculo Automático do Valor Total** | O campo `valor_total` da tabela `Pedido` deve ser calculado automaticamente pelo sistema com base na soma de (`quantidade` × `valor_produto` da tabela `Produto`) de todos os itens vinculados (`Pedido_Item`). Este valor não pode ser editado manualmente pelo Garçom. | RF015, DER (Pedido, Pedido_Item) | **Épico 2: Operação de Salão** |
| **RN006** | **Fluxo Obrigatório de Status do Pedido** | O sistema deve adotar um fluxo de status de pedido **gerenciado exclusivamente pelo Garçom**, pois a cozinha e o bar não possuem acesso ao sistema, trabalhando apenas com impressões.

**Status permitidos:**
1. **"Em Andamento"** (Padrão ao criar o pedido) – Garçom está montando o pedido, ainda não enviou.
2. **"Pendente"** – Garçom confirma o pedido e o envia para a cozinha/bar (dispara impressão automática via RF025).
3. **"Entregue"** – Garçom confirma que o prato/bebida chegou ao cliente.

**Transições permitidas:**
"Em Andamento" → "Pendente" (única transição válida a partir do estado inicial).
"Pendente" → "Entregue" (garçom confirma entrega).
**Bloqueios:**
Não é permitido voltar de "Pendente" para "Em Andamento".
Não é permitido voltar de "Entregue" para qualquer status anterior.
Não é permitido editar/excluir itens de um pedido com status "Pendente" ou "Entregue" (aplica-se RN007).

**Impressão:**
Ao mudar de "Em Andamento" → "Pendente", o sistema dispara a impressão (RF025). Se a impressão falhar, o pedido continua com status "Pendente" e entra na fila de reimpressão (NFR006). | RF016 | **Épico 2: Operação de Salão** |
| **RN007** | **Congelamento de Pedido Finalizado** | Após o status do pedido atingir "Entregue" ou a comanda ser "Finalizada", nenhum item pode ser adicionado, removido ou alterado naquele pedido. O sistema deve bloquear edições e exibir uma mensagem de "Pedido já concluído". | RF017, RF018 | **Épico 2: Operação de Salão** |
| **RN008** | **Regra de Cancelamento com Justificativa** | Para cancelar um item ou um pedido inteiro com status diferente de "Entregue", o Garçom/Caixa deve obrigatoriamente selecionar uma justificativa (ex: "Cliente desistiu", "Erro de digitação"). O sistema deve registrar o cancelamento nos logs (RF022) e deduzir o valor do item do `valor_total` do pedido/comanda. | RF018, RF022 | **Épico 2: Operação de Salão** |
| **RN009** | **Pagamento e Fechamento de Comanda** | Para finalizar uma comanda, todos os pedidos vinculados devem estar com status "Entregue". O Caixa consolida o valor, registra a forma de pagamento (se houver integração) e altera o status da `Comanda` para "Finalizada" e da `Mesa` para "Livre" (Caso esta seja a única comanda vinculada a mesa que se encontra Aberta). Esta operação deve ser atômica (NFR005 - ACID), gerando rollback em caso de falha. | RF017, NFR005 | **Épico 3: Financeiro** |
| **RN010** | **Controle de Estoque (Baixa Automática)** | Ao alterar o status de um pedido de "Pendente" para "Entregue", o sistema deve dar baixa automática no estoque, subtraindo as quantidades dos produtos utilizados. Se o estoque for insuficiente para algum item, o sistema deve bloquear a mudança de status e alertar o usuário. | RF012, RF016 | **Épico 3: Financeiro / Estoque** |
| **RN011** | **Produtos sem Estoque não aparecem no Cardápio** | O sistema deve permitir que o Caixa/Gerente ative/desative produtos (RF013). Produtos com quantidade em estoque igual a zero (ou abaixo do mínimo configurado) devem ser ocultados automaticamente do cardápio disponível para o Garçom, a menos que o Gerente force a ativação. | RF013, RF021 | **Épico 3: Financeiro / Estoque** |
| **RN012** | **Mapeamento de Impressão por Categoria** | O sistema deve permitir que o Gerente/Caixa configure (RF024) quais categorias de produtos (ex: Bebidas, Comidas, Sobremesas) serão impressas em quais impressoras. Ao enviar um pedido (RF025), o sistema deve separar os itens por categoria e enviar cada notinha para a impressora correspondente (ex: bebidas para o bar, comidas para a cozinha). | RF024, RF025, NFR006 | **Épico 4: Integração (Impressão)** |
| **RN013** | **Regra de Permissão por Cargo (RBAC)** | As ações disponíveis no sistema são estritamente baseadas no cargo do usuário:
- **Garçom**: Apenas RF008, RF014, RF015, RF016, RF018.
- **Caixa**: RF007, RF009, RF010, RF011, RF012, RF013, RF017, RF020, RF021, RF024, RF025.
- **Gerente**: Todos os RFs, com destaque para RF005 e RF006. O sistema deve ocultar ou desabilitar botões/menus que o usuário não tenha permissão. | RF001, RF006, Contexto do Projeto | **Épico 1: Cadastros Base** |
| **RN014** | **Exclusão Lógica vs. Física (LGPD)** | Exclusões de dados mestres (Produtos, Fornecedores, Funcionários) devem ser **lógicas** (campo `status` ou `ativo` = false) para manter a integridade dos históricos de venda e compras. No entanto, a exclusão de dados de **Clientes** (RF008) deve ser **anonimizada** (RN015) (Ou seja, remover todos os dados sensíveis, mantendo a chave primária), desde que o histórico de vendas mantenha apenas um ID genérico, conforme exigido pela LGPD (NFR010). | RF008, RF022, NFR010 | **Épico 1: Cadastros Base** |
| **RN015** | **Direito ao Esquecimento (Cliente)** | Quando um cliente solicitar a exclusão de seus dados, o Gerente deve conseguir executar o comando que deleta os registros de `Perfil` e `Cliente`, mas o sistema deve manter os `Pedidos` históricos atrelados a um registro anônimo (ex: "Cliente Removido - ID X") para não quebrar as leis fiscais e o histórico de faturamento. | RF008, NFR010 | **Épico 1: Cadastros Base** |
| **RN016** | **Auditoria Obrigatória** | Qualquer ação que resulte em alteração de valores financeiros (cancelamento, desconto, fechamento) ou exclusão de dados deve gerar um log imediato (RF022) contendo: Usuário logado, Data/Hora, Tipo de Ação, Valor Anterior e Valor Novo, e IP da máquina. Estes logs devem ser imutáveis. | RF022, NFR011 | **Épico 3: Financeiro** |