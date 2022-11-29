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

    ALTER TABLE IF EXISTS public."userBudget" OWNER to postgres;
    
    CREATE TABLE public."userAccounts"
    (
      "accountId" serial NOT NULL,
      "accountNumber" character(8),
      "accountType" text,
      amount NUMERIC(10,2),
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
    ALTER TABLE IF EXISTS public."userAccounts" OWNER to postgres;

    CREATE TABLE public."incomeExpense"
    (
      "inExId" serial,
      description text,
      "inExType" text DEFAULT 'Expense',
      amount NUMERIC(10,2),
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

    ALTER TABLE IF EXISTS public."incomeExpense" OWNER to postgres;

    CREATE TABLE public.deposits
    (
      "movementId" serial,
      "movementType" text DEFAULT 'Deposit',
      "description" text,
      amount NUMERIC(10,2),
      "shippingAccount" character(8),
      "destinationAccount" character(8),
      "userTransferId" serial,
      "userReceivedId" serial,
      "createdAt" timestamp with time zone DEFAULT now(),
      PRIMARY KEY ("movementId"),
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

    ALTER TABLE IF EXISTS public.deposits OWNER to postgres;

    CREATE TABLE public.transfers
    (
      "movementId" serial,
      "movementType" text DEFAULT 'Transfer',
      "description" text,
      amount NUMERIC(10,2),
      "shippingAccount" character(8),
      "destinationAccount" character(8),
      "userTransferId" serial,
      "userReceivedId" serial,
      "createdAt" timestamp with time zone DEFAULT now(),
      PRIMARY KEY ("movementId"),
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

    ALTER TABLE IF EXISTS public.transfers OWNER to postgres;

    CREATE TABLE public."accountTypes"
    (
      "typeAccountId" serial,
      "typeAccount" text,
      "createdAt" timestamp with time zone DEFAULT now(),
      PRIMARY KEY ("typeAccountId")
    );

    ALTER TABLE IF EXISTS public."accountTypes" OWNER to postgres;

    insert into "accountTypes" ("typeAccount") values ('Personal');
    insert into "accountTypes" ("typeAccount") values ('Business');
    insert into "accountTypes" ("typeAccount") values ('School');
    insert into "accountTypes" ("typeAccount") values ('Travel');
    insert into "accountTypes" ("typeAccount") values ('Family');