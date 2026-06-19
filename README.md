# 👾 Pixel Geek Mobile

<p align="center">
  <b>O universo geek agora na palma da sua mão.</b>
</p>

---

## 📱 Sobre o projeto

O **Pixel Geek Mobile** é a versão para dispositivos móveis do projeto Pixel Geek, desenvolvido utilizando **React Native com Expo**.

A aplicação foi criada com o objetivo de transportar a identidade visual do sistema original para uma experiência mobile, mantendo uma estética inspirada no universo gamer, tecnologia e cultura geek.

O projeto surgiu como uma atividade acadêmica da disciplina de Desenvolvimento para Dispositivos Móveis, permitindo aplicar conceitos de navegação entre telas, banco de dados local e desenvolvimento de interfaces modernas.

---

# 🎮 Identidade visual

O aplicativo utiliza uma interface inspirada no universo Pixel Geek, com uma paleta baseada em:

- 🌌 Azul escuro como cor principal de fundo;
- 🟣 Roxo neon para destaques e elementos tecnológicos;
- 🟡 Dourado para ações importantes;
- ⚪ Tons claros para garantir boa legibilidade.

A combinação das cores busca transmitir uma experiência moderna, remetendo ao universo gamer, retrô e tecnológico.

---

# 🕹️ Funcionalidades

## 🏠 Tela Inicial

A tela inicial apresenta a identidade visual do Pixel Geek, contendo:

- Logo oficial da aplicação;
- Navegação entre as áreas do sistema;
- Interface inspirada em menus de jogos e tecnologia.

---

## 👾 Clientes

A área de clientes está atualmente em desenvolvimento e possui uma tela temática indicando que novas funcionalidades serão adicionadas.

### Futuras funcionalidades:

- Cadastro de clientes;
- Listagem de clientes cadastrados;
- Edição de informações;
- Remoção de registros.

---

## 💾 Currículos

Área responsável pelo gerenciamento de currículos recebidos.

### Funcionalidades implementadas:

- Cadastro de candidatos;
- Registro de nome e e-mail;
- Seleção de arquivos PDF;
- Armazenamento das informações utilizando SQLite;
- Listagem dos currículos cadastrados;
- Exclusão de currículos cadastrados.

---

# 🗄️ Banco de dados local

O aplicativo utiliza **SQLite** para realizar o armazenamento local dos dados.

### Tabela Clientes

| Campo | Tipo |
|---|---|
| id | INTEGER |
| nome | TEXT |
| email | TEXT |
| telefone | TEXT |

---

### Tabela Currículos

| Campo | Tipo |
|---|---|
| id | INTEGER |
| nome | TEXT |
| email | TEXT |
| arquivo | TEXT |
| data_cadastro | DATETIME |

---

# ⚙️ Tecnologias utilizadas

- ⚛️ React Native;
- 🚀 Expo;
- 🧭 React Navigation;
- 🗄️ Expo SQLite;
- 📄 Expo Document Picker;
- 🟨 JavaScript;
- 🐙 Git e GitHub.

---

# 🚀 Como executar o projeto

## 1. Clonar o repositório

```bash
git clone URL_DO_REPOSITORIO
```

## 2. Acessar a pasta do projeto

```bash
cd pixel-geek-mobile
```

## 3. Instalar as dependências

```bash
npm install
```

## 4. Executar o Expo

```bash
npx expo start
```

## 5. Rodar no celular

- Instale o aplicativo **Expo Go**;
- Escaneie o QR Code gerado no terminal;
- Execute o Pixel Geek Mobile no dispositivo.

---

# 📚 Objetivos acadêmicos

Este projeto foi desenvolvido como atividade prática da disciplina de Desenvolvimento para Dispositivos Móveis, abordando conceitos como:

- Desenvolvimento de interfaces mobile;
- Componentização com React Native;
- Navegação entre telas;
- Manipulação de estados com React Hooks;
- Banco de dados local utilizando SQLite;
- Organização e estruturação de projetos.

---

# 🔮 Melhorias futuras

- Finalização da tela de clientes;
- Implementação de edição de dados;
- Visualização de currículos em PDF;
- Melhorias na experiência do usuário;
- Integração com uma API para armazenamento remoto.

---

# 📸 Capturas de tela

*(Adicione aqui futuramente as imagens das telas do aplicativo.)*

Exemplo:

- 🏠 Home
- 👾 Clientes
- 💾 Currículos

---

# 👨‍💻 Desenvolvedores

Projeto acadêmico desenvolvido por estudantes de Desenvolvimento de Sistemas.

**Pixel Geek Mobile — O universo geek agora na palma da sua mão. 👾🎮**