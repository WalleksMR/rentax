
 **RF** => Requisitos funcionais\
 **RNF** => Requisitos nao funcionais\
 **RN** => Regra de negocio


 # Cadastro de carro
 **RF**
  - Deve ser possivel cadastrar um novo carro.
  - Deve ser possivel listar todas as categorias.

**RN**
  - Nao deve ser possivel cadastrar um carro com a placa ja existente.
  - Nao deve ser possivel alterar a placa de um carro ja cadastrado.
  - O carro deve ser cadastrado com disponibilidade por padrao.
  - O usuarios responsavel pelo cadastro deve ser um usuario administrador.

# Listagem de carros
**RF**
  - Deve ser possivel listar todos os carros disponiveis.
  - Deve ser possivel listar todos os carros disponiveis pelo nome da categoria.
  - Deve ser possivel listar todos os carros disponiveis pelo nome da marca.
  - Deve ser possivel listar todos os carros disponiveis pelo nome do carro.

**RN**
  - O usuario nao precisa esta logado no sistema.

# Cadastro de especificacao no carro
**RF**
  - Deve ser possivel cadastrar uma especificacao para um carro.
  - Deve ser possivel listar todas as especificacao.
  - Deve ser possivel listar todos os carros.

**RN**
  - Nao deve ser possivel cadastrar uma especificacao para um carro nao cadastrado.
  - Nao deve ser possivel cadastrar uma especificacao ja existente para o mesmo carro.
  - O usuario responsavel pelo cadastro deve ser um usuario administrador.

# Cadastro de imagens do carro
**RF**
  - Deve ser possivel cadastrar a imagem do carro.
  - Deve ser possivel listar todos os carros.

**RNF**
  - Utilizar o multer para upload dos arquivos.

**RN**
  - O usuario deve poder cadastrar mais de uma imagem para o mesmo carro.
  - O usuario responsavel pelo cadastro deve ser um usuario administrador.

# Aluguel de carro

**RF**
  - Deve ser possivel cadastrar um aluguel.

**RN**
  - O aluguel deve ter duracao minima de 24 hora.
  - Nao deve ser possivel cadastrar um novo aluguel caso ja exista um aberto para o mesmo usuario.
  - Nao deve ser possivel cadastrar um novo aluguel caso ja exista um aberto para o mesmo carro.
