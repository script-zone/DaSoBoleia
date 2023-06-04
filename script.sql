



CREATE TABLE UTENTE(
    CODIGO NUMBER PRIMARY KEY, 
	NOME VARCHAR(20), 
	SOBRENOME VARCHAR(20), 
    USERNAME VARCHAR(100) UNIQUE NOT NULL,
    EMAIL VARCHAR(50) NOT NULL UNIQUE,
	SENHA VARCHAR(10) NOT NULL, 
	DATA_NASCIMENTO DATE, 
	CATEGORIA VARCHAR(12) CHECK (categoria IN ('Aluno', 'Funcionario', 'Docente')),
	N_IDENTIFICACAO VARCHAR(15) UNIQUE, 
	TIPO_UTENTE VARCHAR(15) CHECK (tipo_utente IN ('Passageiro', 'Condutor')),
	SALDO NUMBER(9,2), 
	ESTADO VARCHAR(5) CHECK (estado IN ('On', 'Off'))
);

CREATE TABLE LOCCAL(
    CODIGO NUMBER PRIMARY KEY, 
	NOME VARCHAR2(100) NOT NULL UNIQUE, 
	LATITUDE NUMBER(6,3) UNIQUE,
	LONGITUDE NUMBER(6,3) UNIQUE
);

CREATE TABLE ALUNO(
    CODIGO NUMBER PRIMARY KEY, 
	CURSO VARCHAR(30), 
	CONSTRAINT FK_ALUNO_UTENTE FOREIGN KEY (CODIGO) REFERENCES UTENTE(CODIGO)
);

CREATE TABLE TRANSACAO(
    CODIGO NUMBER PRIMARY KEY,
	VALOR NUMBER(9,2), 
	DATA_TRANSACAO DATE, 
	CODIGO_UTENTE NUMBER,
    CONSTRAINT FK_TRANSACAO_UTENTE FOREIGN KEY (CODIGO_UTENTE) REFERENCES UTENTE (CODIGO)
);

CREATE TABLE VIATURA(
    CODIGO NUMBER PRIMARY KEY, 
	MATRICULA VARCHAR(15) UNIQUE NOT NULL, 
	MARCA VARCHAR(50), 
	MODELO VARCHAR(20), 
	LOTACAO NUMBER, 
	CODIGO_DONO NUMBER,
    CONSTRAINT FK_AUTOMOVEL_UTENTE FOREIGN KEY (CODIGO_DONO) REFERENCES UTENTE (CODIGO)
);

CREATE TABLE BOLEIA(
    CODIGO NUMBER PRIMARY KEY, 
	QTD_PASSAGEIRO NUMBER, 
	CUSTO_BOLEIA NUMBER(9,2), 
	DATA_BOLEIA DATE, 
	TIPO_BOLEIA VARCHAR(15) CHECK (tipo_boleia IN ('Unica', 'Frequente')), 
	LOCAL_ORIGEM NUMBER, 
	LOCAL_DESTINO NUMBER, 
	ESTADO VARCHAR(15) CHECK (estado IN ('Pendente', 'Confirmada', 'Concluida', 'Concelada')), 
	CODIGO_UTENTE NUMBER NOT NULL,
	CONSTRAINT FK_LOCAL_ORIGEM FOREIGN KEY (LOCAL_ORIGEM) REFERENCES LOCCAL (CODIGO), 
    CONSTRAINT FK_LOCAL_DESTINO FOREIGN KEY (LOCAL_DESTINO) REFERENCES LOCCAL (CODIGO),
    CONSTRAINT FK_COD_UTENTE FOREIGN KEY (CODIGO_UTENTE) REFERENCES UTENTE (CODIGO)
);

CREATE TABLE BOLEIA_FREQUENTE(
    CODIGO NUMBER Primary key,
	TIPO_FREQUENCIA VARCHAR(15) CHECK (tipo_frequencia IN ('Diaria', 'Semanal', 'Mensal')), 
	DATA_TERMINO DATE, 
	CONSTRAINT FK_BOLEIA_FREQUENTE FOREIGN KEY (CODIGO) REFERENCES BOLEIA (CODIGO)
);

CREATE TABLE DIAS(
    CODIGO NUMBER PRIMARY KEY,
    CODIGO_BOLEIA NUMBER,
	SEGUNDA_FEIRA Number(1) check (segunda_feira in (0,1)),
	TERCA_FEIRA Number(1) check (terca_feira in (0,1)),
	QUARTA_FEIRA Number(1) check (quarta_feira in (0,1)),
	QUINTA_FEIRA Number(1) check (quinta_feira in (0,1)),
	SEXTA_FEIRA Number(1) check (sexta_feira in (0,1)),
    CONSTRAINT FK_DIAS_FREQUENTE FOREIGN KEY (CODIGO_BOLEIA) REFERENCES BOLEIA_FREQUENTE (CODIGO)
);

CREATE TABLE INSCRICAO(
    CODIGO NUMBER PRIMARY KEY,
	CODIGO_BOLEIA NUMBER,
	CODIGO_UTENTE NUMBER,
	DATA_INSCRICAO DATE,
    CONSTRAINT FK_CODIGO_UTENTE FOREIGN KEY (CODIGO_UTENTE) REFERENCES UTENTE (CODIGO), 
	CONSTRAINT FK_CODIGO_BOLEIA FOREIGN KEY (CODIGO_BOLEIA) REFERENCES BOLEIA (CODIGO)
);

----- Criação de pacote /* Um de momento com duas funções*/

CREATE OR REPLACE PACKAGE pck_utente IS

  function pesquisar_saldo(cod_utente utente.codigo%TYPE) return utente.saldo%type;
  procedure actualizar_saldo(cod_utente utente.codigo%TYPE, v_saldo utente.saldo%type, ret out number);
  /*procedure ver_condutor(codigo utente.codigo%type);
  function organizar_boleia
  (qtd boleia.qtd_passageiro%type, custo custo_boleia%type, data boleia.data_boleia%type, tipo boleia.tipo_boleia%type, origem boleia.local_origem%type, destino boleia.local_destino%type, estado estado%type)
  return boolean;
  procedure devolucao(codigo_boleia boleia.codigo%type);*/
  
END pck_utente;


create or replace package body pck_utente is

  function pesquisar_saldo(cod_utente utente.codigo%TYPE) return utente.saldo%type is
    v_saldo utente.saldo%type;
  begin
    -- instruções e comandos
    select saldo into v_saldo from utente where codigo = cod_utente;
    return v_saldo;
  end;
  
  procedure actualizar_saldo(cod_utente utente.codigo%TYPE, v_saldo utente.saldo%type, ret out number) is
  begin

    ret := 0;
    update utente
    set saldo = v_saldo
    where codigo = cod_utente;
    select saldo into ret from utente where codigo = cod_utente;
    COMMIT;
    
    EXCEPTION
      WHEN no_data_found then
        ROLLBACK;
  end;

end pck_utente;


-----  Criação de sequencias e triggers a usarem estas sequencias OBS: Ainda estão com um pequeno bug . . .
CREATE SEQUENCE INCREMENT_aluno
    INCREMENT BY 1
    START WITH 1
    NOMAXVALUE
;

create or replace trigger increment_aluno before insert on aluno
for each row
begin
    select AUTO_INCREMENT_ALUNO.nextval into :new.codigo from dual;
end;

CREATE SEQUENCE INCREMENT_boleia
    INCREMENT BY 1
    START WITH 1
    NOMAXVALUE
;

create or replace trigger increment_boleia before insert on boleia
for each row
begin
    select AUTO_INCREMENT_BOLEIA.nextval into :new.codigo from dual;
end;

CREATE SEQUENCE INCREMENT_frequente
    INCREMENT BY 1
    START WITH 1
    NOMAXVALUE
;

create or replace trigger increment_frequente before insert on boleia_frequente
for each row
begin
    select AUTO_INCREMENT_FREQUENTE.nextval into :new.codigo from dual;
end;

CREATE SEQUENCE INCREMENT_dias
    INCREMENT BY 1
    START WITH 1
    NOMAXVALUE
;

create or replace trigger increment_dias before insert on dias
for each row
begin
    select AUTO_INCREMENT_DIAS.nextval into :new.codigo from dual;
end;

CREATE SEQUENCE INCREMENT_inscricao
    INCREMENT BY 1
    START WITH 1
    NOMAXVALUE
;

create or replace trigger increment_inscricao before insert on inscricao
for each row
begin
    select AUTO_INCREMENT_INSCRICAO.nextval into :new.codigo from dual;
end;

CREATE SEQUENCE INCREMENT_loccal
    INCREMENT BY 1
    START WITH 1
    NOMAXVALUE
;

create or replace trigger increment_loccal before insert on loccal
for each row
begin
    select AUTO_INCREMENT_LOCCAL.nextval into :new.codigo from dual;
end;

CREATE SEQUENCE INCREMENT_transacao
    INCREMENT BY 1
    START WITH 1
    NOMAXVALUE
;

create or replace trigger increment_transacao before insert on transacao
for each row
begin
    select AUTO_INCREMENT_TRANSACAO.nextval into :new.codigo from dual;
end;

CREATE SEQUENCE INCREMENT_utente
    INCREMENT BY 1
    START WITH 1
    NOMAXVALUE
;

create or replace trigger increment_utente before insert on utente
for each row
begin
    select AUTO_INCREMENT_UTENTE.nextval into :new.codigo from dual;
end;

CREATE SEQUENCE INCREMENT_viatura
    INCREMENT BY 1
    START WITH 1
    NOMAXVALUE
;

create or replace trigger increment_viatura before insert on viatura
for each row
begin
    select AUTO_INCREMENT_VIATURA.nextval into :new.codigo from dual;
end;



