CREATE TABLE Departamento
(
 ID_Dep INT PRIMARY KEY AUTO_INCREMENT,  
 Nome INT,  
);


CREATE TABLE Usuário
(
 Matricula INT PRIMARY KEY,  
 Nome VARCHAR(100) NOT NULL,  
 CPF VARCHAR(14) NOT NULL,  
 Email VARCHAR(30) NOT NULL,  
 Senha VARCHAR(20) NOT NULL,  
 FotoUsuario varbinary(max),  
 UNIQUE (CPF,Email)
);


CREATE TABLE Aluno
(
 Curso VARCHAR(100) NOT NULL,  
 IRA FLOAT NOT NULL,  
 Data_ingresso DATE NOT NULL,  
 idPesquisa INT,  
 idBolsa INT,  
 idUsuário INT PRIMARY KEY,  
);


CREATE TABLE Professor
(
 Título VARCHAR(100),  
 CargaHoraria INT,  
 idUsuário INT PRIMARY KEY,  
);


CREATE TABLE Coordenador
(
 InicioCoordenador INT,  
 FimMandato DATE NOT NULL,  
 idDepartamento INT NOT NULL,  
 MatriculaINT PRIMARY KEY,  
);


CREATE TABLE Área
(
 IDArea INT PRIMARY KEY AUTO_INCREMENT,  
 NomeArea VARCHAR(100) NOT NULL,  
);


CREATE TABLE Especialidade
(
 IDEspecialidade INT PRIMARY KEY AUTO_INCREMENT,  
 NomeEspecialidade VARCHAR(200) NOT NULL,  
);


CREATE TABLE Pesquisa
(
 IDPesquisa INT PRIMARY KEY AUTO_INCREMENT,  
 DataInicio DATE NOT NULL,  
 DataFim DATE NOT NULL,  
 TituloPesquisa VARCHAR(300) NOT NULL,  
 Relatório varbinary(max),  
 EstadoPesquisa VARCHAR(50),  
 VagasVoluntárias INT NOT NULL,  
 VagasRemuneradas INT NOT NULL,  
);


CREATE TABLE Bolsa
(
 Valor da bolsa FLOAT NOT NULL,  
 IDBolsa INT PRIMARY KEY AUTO_INCREMENT,  
);


CREATE TABLE Revista
(
 ISBN VARCHAR(20) PRIMARY KEY,  
 Título VARCHAR(100) NOT NULL,  
 DataPublicação DATE NOT NULL,  
);


CREATE TABLE Pertence
(
 ID_Dep INT PRIMARY KEY,  
 Matricula INT PRIMARY KEY,  
);


CREATE TABLE Tem
(
 IDArea INT PRIMARY KEY,  
 ID_Dep INT PRIMARY KEY,  
);


CREATE TABLE Tem1
(
 IDArea INT PRIMARY KEY,  
 IDEspecialidade INT PRIMARY KEY,  
);


CREATE TABLE Pertence1
(
 IDEspecialidade INT PRIMARY KEY,  
 IDPesquisa INT PRIMARY KEY,  
);


CREATE TABLE Realiza
(
 IDPesquisa INT PRIMARY KEY,  
 idProfessor INT PRIMARY KEY,  
);


CREATE TABLE Oferece
(
 ID_Dep INT PRIMARY KEY,  
 IDPesquisa INT PRIMARY KEY,  
);


CREATE TABLE Disponibiliza
(
 ID_Dep INT PRIMARY KEY,  
 IDBolsa INT PRIMARY KEY,  
);


CREATE TABLE Abrange
(
 ISBN  VARCHAR(20) PRIMARY KEY,  
 IDArea INT PRIMARY KEY,  
);


CREATE TABLE Publica
(
 ISBN  VARCHAR(20) PRIMARY KEY,  
 IDPesquisa INT PRIMARY KEY,  
);


CREATE TABLE Atuar
(
 IDArea INT PRIMARY KEY,  
 idProfessor INT PRIMARY KEY,  
);


CREATE TABLE Solicita pesquisa
(
 idProfessor INT PRIMARY KEY,  
 ID_Dep INT PRIMARY KEY,  
);


ALTER TABLE Aluno ADD FOREIGN KEY(idPesquisa) REFERENCES Pesquisa (idPesquisa)
ALTER TABLE Aluno ADD FOREIGN KEY(idBolsa) REFERENCES Bolsa (idBolsa)
ALTER TABLE Aluno ADD FOREIGN KEY(idUsuário) REFERENCES Usuário (idUsuário)
ALTER TABLE Professor ADD FOREIGN KEY(idUsuário) REFERENCES Usuário (idUsuário)
ALTER TABLE Coordenador ADD FOREIGN KEY(idDepartamento) REFERENCES Departamento (idDepartamento)
ALTER TABLE Coordenador ADD FOREIGN KEY(idUsuário) REFERENCES Usuário (idUsuário)
ALTER TABLE Pertence ADD FOREIGN KEY(ID_Dep) REFERENCES Departamento (ID_Dep)
ALTER TABLE Pertence ADD FOREIGN KEY(Matricula) REFERENCES Usuário (Matricula)
ALTER TABLE Tem ADD FOREIGN KEY(IDArea) REFERENCES Área (IDArea)
ALTER TABLE Tem ADD FOREIGN KEY(ID_Dep) REFERENCES Departamento (ID_Dep)
ALTER TABLE Tem1 ADD FOREIGN KEY(IDArea) REFERENCES Área (IDArea)
ALTER TABLE Tem1 ADD FOREIGN KEY(IDEspecialidade) REFERENCES Especialidade (IDEspecialidade)
ALTER TABLE Pertence1 ADD FOREIGN KEY(IDEspecialidade) REFERENCES Especialidade (IDEspecialidade)
ALTER TABLE Pertence1 ADD FOREIGN KEY(IDPesquisa) REFERENCES Pesquisa (IDPesquisa)
ALTER TABLE Realiza ADD FOREIGN KEY(IDPesquisa) REFERENCES Pesquisa (IDPesquisa)
ALTER TABLE Realiza ADD FOREIGN KEY(idProfessor) REFERENCES Professor (idProfessor)
ALTER TABLE Oferece ADD FOREIGN KEY(ID_Dep) REFERENCES Departamento (ID_Dep)
ALTER TABLE Oferece ADD FOREIGN KEY(IDPesquisa) REFERENCES Pesquisa (IDPesquisa)
ALTER TABLE Disponibiliza ADD FOREIGN KEY(ID_Dep) REFERENCES Departamento (ID_Dep)
ALTER TABLE Disponibiliza ADD FOREIGN KEY(IDBolsa) REFERENCES Bolsa (IDBolsa)
ALTER TABLE Abrange ADD FOREIGN KEY(ISBN) REFERENCES Revista (ISBN)
ALTER TABLE Abrange ADD FOREIGN KEY(IDArea) REFERENCES Área (IDArea)
ALTER TABLE Publica ADD FOREIGN KEY(ISBN) REFERENCES Revista (ISBN)
ALTER TABLE Publica ADD FOREIGN KEY(IDPesquisa) REFERENCES Pesquisa (IDPesquisa)
ALTER TABLE Atuar ADD FOREIGN KEY(IDArea) REFERENCES Área (IDArea)
ALTER TABLE Atuar ADD FOREIGN KEY(idProfessor) REFERENCES Professor (idProfessor)
ALTER TABLE Solicita pesquisa ADD FOREIGN KEY(idProfessor) REFERENCES Professor (idProfessor)
ALTER TABLE Solicita pesquisa ADD FOREIGN KEY(ID_Dep) REFERENCES Departamento (ID_Dep)