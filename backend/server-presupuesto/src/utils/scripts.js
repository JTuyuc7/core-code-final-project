`
// Create user
CREATE TABLE public."userBudget"
(
    "userId" serial NOT NULL,
    "userName" text,
    "userLastName" text,
    "userEmail" text,
    "userToken" text,
    "isAuth" boolean DEFAULT false,
    "createdAt" timestamp with time zone DEFAULT now(),
    PRIMARY KEY ("userId")
);

ALTER TABLE IF EXISTS public."userBudget"
    OWNER to postgres;
`

`
// Accounts

CREATE TABLE public."userAccounts"
(
    id serial NOT NULL,
    "accountNumber" character(8),
    amount integer,
    "belongsTo" serial,
    currency text DEFAULT 'Dollar',
    "createdAt" timestamp with time zone DEFAULT now(),
    PRIMARY KEY (id),
    CONSTRAINT "userBelongsTo" FOREIGN KEY ("belongsTo")
        REFERENCES public."userBudget" ("userID") MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID
);

ALTER TABLE IF EXISTS public."userAccounts"
    OWNER to postgres;

`


`
    // Tabla de Transferencia
    CREATE TABLE public.transfers
(
    id serial NOT NULL,
    type text DEFAULT 'Transfer',
    amount integer,
    "shippingAccount" character(8),
    "destinationAccount" character(8),
    "userTransferId" serial,
    "userReceivedId" serial,
    "createdAt" timestamp with time zone DEFAULT now(),
    PRIMARY KEY (id),
    CONSTRAINT "FKuserMadeTransfer" FOREIGN KEY ("userTransferId")
        REFERENCES public."userBudget" ("userId") MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID,
    CONSTRAINT "FKuserReceivedId" FOREIGN KEY ("userReceivedId")
        REFERENCES public."userBudget" ("userId") MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID
);

ALTER TABLE IF EXISTS public.transfers
    OWNER to postgres;
`

`
// Depositos
CREATE TABLE public.deposits
(
    id serial NOT NULL,
    type text DEFAULT 'Deposit',
    amount integer,
    "shippingAccount" character(8),
    "destinationAccount" character(8),
    "userTransferId" serial,
    "userReceivedId" serial,
    "createdAt" timestamp with time zone DEFAULT now(),
    PRIMARY KEY (id),
    CONSTRAINT "FKuserMadeTransfer" FOREIGN KEY ("userTransferId")
        REFERENCES public."userBudget" ("userId") MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID,
    CONSTRAINT "FKusertReceivedId" FOREIGN KEY ("userReceivedId")
        REFERENCES public."userBudget" ("userId") MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID
);

ALTER TABLE IF EXISTS public.deposits
    OWNER to postgres;
`

// Version 2.0 backend scripts

`

CREATE TABLE IF NOT EXISTS public."userBudget"
(
    "userID" serial NOT NULL,
    "userName" text COLLATE pg_catalog."default",
    "userLastName" text COLLATE pg_catalog."default",
    "userEmail" text COLLATE pg_catalog."default",
    "userPassword" text COLLATE pg_catalog."default",
    "userToken" text COLLATE pg_catalog."default",
    "isAuthenticated" text COLLATE pg_catalog."default" DEFAULT 0,
    "createdAt" timestamp with time zone DEFAULT now(),
    PRIMARY KEY ("userID")
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public."userBudget"
    OWNER to postgres;
	
	
-- para cuentas bancarias 
CREATE TABLE public."userAccounts"
(
    "accountId" serial NOT NULL,
    "accountNumber" character(8),
	"accountType" text,
    amount integer,
    "belongsTo" serial,
    currency text DEFAULT 'Dollar',
    "createdAt" timestamp with time zone DEFAULT now(),
    PRIMARY KEY ("accountId"),
    CONSTRAINT "userBelongsTo" FOREIGN KEY ("belongsTo")
        REFERENCES public."userBudget" ("userID") MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID
);

ALTER TABLE IF EXISTS public."userAccounts"
    OWNER to postgres;
	
	
	
-- Tabla para expenses o incomes
CREATE TABLE public."incomeExpense"
(
    "inExId" serial,
    description text,
    "inExType" text DEFAULT 'Expense',
    amount integer,
    "userBelongsTo" serial,
    "inAccBelongsTo" character(8),
    "createdAt" timestamp with time zone DEFAULT now(),
	PRIMARY KEY ("inExId"),
    CONSTRAINT "FKIdUser" FOREIGN KEY ("userBelongsTo")
        REFERENCES public."userBudget" ("userID") MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID
);

ALTER TABLE IF EXISTS public."incomeExpense"
    OWNER to postgres;


-- Tabla de Depositos
CREATE TABLE public.deposits
(
    "depositId" serial,
    "depositType" text DEFAULT 'Deposit',
	"desctiption" text,
    amount integer,
    "shippingAccount" character(8),
    "destinationAccount" character(8),
    "userTransferId" serial,
    "userReceivedId" serial,
    "createdAt" timestamp with time zone DEFAULT now(),
	PRIMARY KEY ("depositId"),
    CONSTRAINT "KFuserTransferMade" FOREIGN KEY ("userTransferId")
        REFERENCES public."userBudget" ("userID") MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID,
    CONSTRAINT "FKuserReceived" FOREIGN KEY ("userReceivedId")
        REFERENCES public."userBudget" ("userID") MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID
);

ALTER TABLE IF EXISTS public.deposits
    OWNER to postgres;
	
-- Tabla Transferencias
CREATE TABLE public.transfers
(
    "transferId" serial,
    "transferType" text DEFAULT 'Transfer',
	"desctiption" text,
    amount integer,
    "shippingAccount" character(8),
    "destinationAccount" character(8),
    "userTransferId" serial,
    "userReceivedId" serial,
    "createdAt" timestamp with time zone DEFAULT now(),
	PRIMARY KEY ("transferId"),
    CONSTRAINT "KFuserTransferMade" FOREIGN KEY ("userTransferId")
        REFERENCES public."userBudget" ("userID") MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID,
    CONSTRAINT "FKuserReceived" FOREIGN KEY ("userReceivedId")
        REFERENCES public."userBudget" ("userID") MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID
);

ALTER TABLE IF EXISTS public.transfers
    OWNER to postgres;

-- Tabla de tipos de cuentas
CREATE TABLE public."accountTypes"
(
    "typeAccountId" serial,
    "typeAccount" text,
    "createdAt" timestamp with time zone DEFAULT now(),
	PRIMARY KEY ("typeAccountId")
);

ALTER TABLE IF EXISTS public."accountTypes"
    OWNER to postgres;








`