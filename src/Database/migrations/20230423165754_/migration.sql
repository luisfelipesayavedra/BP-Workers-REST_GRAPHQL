-- CreateEnum
CREATE TYPE "DLPY_backoffice_user_role_type" AS ENUM ('ADMIN', 'USER');

-- CreateEnum
CREATE TYPE "DLPY_BACKOFFICE_USER_DOCUMENT_TYPE" AS ENUM ('CC', 'CE', 'PASSPORT');

-- CreateEnum
CREATE TYPE "DLPY_BACKOFFICE_PERMISSIONS" AS ENUM ('CREATE_USER', 'CREATE_CUSTOMER', 'CREATE_DRIVERS', 'CREATE_MANGERS', 'VIEW_USERS', 'VIEW_DRIVERS', 'APPROVE_USERS', 'EXPORT_FILES', 'MANAGE_ORDERS', 'VIEW_STATS', 'VIEW_ORDER_HISTORY');

-- CreateEnum
CREATE TYPE "DLPY_backoffice_user_status" AS ENUM ('ACTIVE', 'INACTIVE');

-- CreateEnum
CREATE TYPE "ACCOUNT_STATUS" AS ENUM ('CREATED', 'ACTIVE', 'INACTIVE', 'DELETED', 'BLOCKED');

-- CreateEnum
CREATE TYPE "TYPE_ACCOUNT_DNI" AS ENUM ('DNI', 'RUC', 'PASSPORT', 'NIT');

-- CreateEnum
CREATE TYPE "PRODUCT_STATUS" AS ENUM ('AVAILABLE', 'UNAVAILABLE', 'DELETED', 'LOW_STOCK', 'EXHAUSTED');

-- CreateEnum
CREATE TYPE "GENDER" AS ENUM ('MALE', 'FEMALE');

-- CreateEnum
CREATE TYPE "TYPE_DNI" AS ENUM ('CC', 'CE', 'NIT', 'PP', 'DIE', 'TI', 'NUIP', 'TE', 'RC');

-- CreateEnum
CREATE TYPE "POSITION" AS ENUM ('POS_MANAGER', 'WAREHOUSE_MANAGER');

-- CreateEnum
CREATE TYPE "ROLE" AS ENUM ('SUPERUSER', 'ACCOUNTANT', 'ADMINISTRATIVE_ASSISTANT', 'ADMINISTRATOR', 'WAREHOUSE_MANAGER', 'SELLER', 'CASHIER', 'GROCER', 'SUPER_ADMINISTRATOR');

-- CreateEnum
CREATE TYPE "PERMISSION" AS ENUM ('ALL', 'SELL', 'BUY', 'CREATE_SELLER', 'UPDATE_SELLER', 'READ_SELLER', 'ALL_SELLERS', 'CREATE_USER', 'UPDATE_USER', 'READ_USER', 'ALL_USERS', 'CREATE_PRODUCTS', 'UPDATE_PRODUCT', 'READ_PRODUCT', 'ALL_PRODUCTS', 'CREATE_SELLERS', 'CREATE_CASHBOX', 'UPDATE_CASHBOX', 'READ_CASHBOX', 'ALL_CASHBOX', 'OPEN_CLOSE_CASHBOX', 'CREATE_CUSTOMER', 'UPDATE_CUSTOMER', 'READ_CUSTOMER', 'ALL_CUSTOMERS', 'CREATE_SUPPLIER', 'UPDATE_SUPPLIER', 'READ_SUPPLIER', 'ALL_SUPPLIERS', 'ALL_PAYMENT_METHOD', 'ALL_CONFIG', 'CREATE_BANKS', 'UPDATE_BANKS', 'READ_BANKS', 'ALL_BANKS', 'CREATE_POS', 'UPDATE_POS', 'READ_POS', 'ALL_POS', 'CREATE_WAREHOUSE', 'UPDATE_WAREHOUSE', 'READ_WAREHOUSE', 'ALL_WAREHOUSE', 'CHANGE_PRODUCT_FOR_WAREHOUSE', 'ALL_PRODUCTS_PURCHASE', 'READ_PRODUCTS_PURCHASE', 'CREATE_PRODUCTS_PURCHASE', 'UPDATE_PRODUCTS_PURCHASE', 'ALL_PURCHASE', 'READ_PURCHASE', 'CREATE_PURCHASE', 'UPDATE_PURCHASE', 'ALL_SELL', 'READ_SELL', 'CREATE_SELL', 'UPDATE_SELL', 'EXPORT_DATA', 'EXPORT_FINANCIAL_REPORTS', 'EXPORT_STATS', 'CONFIG_INFO_PERSONAL', 'CONFIG_INFO_BUSINESS', 'CONFIG_BILLER', 'CONFIG_SHIPPINGS', 'CONFIG_VIRTUAL_SHOPS', 'CONFIG_FINTECH', 'CONFIG_TAGS', 'CONFIG_CATEGORY', 'CONFIG_BRAND', 'CONFIG_PAYMENTS', 'CONFIG_METAS', 'CONFIG_IMPUESTOS', 'CONFIG_INVOICE', 'INVOICE_DESIGN', 'INVOICE_BASE');

-- CreateEnum
CREATE TYPE "CURRENCIES" AS ENUM ('USD', 'COP');

-- CreateEnum
CREATE TYPE "BANK_ACCOUNT_TYPE" AS ENUM ('CHECKING', 'SAVINGS');

-- CreateEnum
CREATE TYPE "STATUS_BANK_ACCOUNT" AS ENUM ('ACTIVE', 'INACTIVE', 'DELETED', 'BLOCKED');

-- CreateEnum
CREATE TYPE "CASHBOX_STATUS" AS ENUM ('AVAILABLE', 'UNAVAILABLE', 'DELETED');

-- CreateEnum
CREATE TYPE "POS_STATUS" AS ENUM ('AVAILABLE', 'UNAVAILABLE', 'DELETED');

-- CreateEnum
CREATE TYPE "LOGIN_PROVIDER" AS ENUM ('GOOGLE', 'EMAIL');

-- CreateEnum
CREATE TYPE "STATUS" AS ENUM ('ACTIVE', 'INACTIVE', 'DELETED', 'BLOCKED');

-- CreateEnum
CREATE TYPE "WAREHOUSE_STATUS" AS ENUM ('AVAILABLE', 'UNAVAILABLE', 'DELETED');

-- CreateEnum
CREATE TYPE "PRODUCT_TYPE" AS ENUM ('VARIABLE', 'FIXED');

-- CreateEnum
CREATE TYPE "TYPE_PAYMENT" AS ENUM ('CASH', 'CREDIT_CARD', 'DEBIT_CARD', 'VOUCHER');

-- CreateEnum
CREATE TYPE "MANAGER_INCHARGE_STATUS" AS ENUM ('CURRENT', 'INACTIVE');

-- CreateEnum
CREATE TYPE "GROCER_INCHARGE_STATUS" AS ENUM ('CURRENT', 'INACTIVE');

-- CreateEnum
CREATE TYPE "CUSTOMER_STATUS" AS ENUM ('ACTIVE', 'INACTIVE', 'DELETED');

-- CreateEnum
CREATE TYPE "BUYORSELL" AS ENUM ('BUY', 'SELL');

-- CreateEnum
CREATE TYPE "PURCHASE_STATUS" AS ENUM ('PENDING', 'PROCESSING', 'CANCELLED', 'COMPLETED');

-- CreateEnum
CREATE TYPE "TYPE_PERSON" AS ENUM ('NATURAL', 'JURIDICAL');

-- CreateEnum
CREATE TYPE "TAX_TYPE_LOCATION" AS ENUM ('CITY', 'COUNTRY');

-- CreateEnum
CREATE TYPE "TAX_TYPE" AS ENUM ('TOTAL', 'PER_PRODUCT');

-- CreateEnum
CREATE TYPE "TAX_PERIOD" AS ENUM ('MONTH', 'TWO_MONTH', 'THREE_MONTH', 'FOUR_MONTH', 'SIX_MONTH', 'ANNUAL');

-- CreateEnum
CREATE TYPE "TYPE_LOCATION" AS ENUM ('FISICA', 'VIRTUAL');

-- CreateEnum
CREATE TYPE "MetasStatus" AS ENUM ('ACTIVE', 'INACTIVE', 'DELETED');

-- CreateEnum
CREATE TYPE "CURRENCYSTATUS" AS ENUM ('ACTIVE', 'INACTIVE', 'DELETED');

-- CreateEnum
CREATE TYPE "DIAN_AXCES_DETAILS_STATUS" AS ENUM ('ACTIVE', 'EXPIRED', 'DONE', 'DELETED');

-- CreateEnum
CREATE TYPE "SELL_STATUS" AS ENUM ('PENDING', 'PROCESSING', 'CANCELLED', 'COMPLETED');

-- CreateEnum
CREATE TYPE "SUPPLIERS_STATUS" AS ENUM ('ACTIVE', 'INACTIVE', 'DELETED');

-- CreateEnum
CREATE TYPE "BYBUYORSELL" AS ENUM ('BUY', 'SELL', 'BUYANDSELL');

-- CreateEnum
CREATE TYPE "TYPE_AXCES_LEGAL_INVOICE" AS ENUM ('NOTA_CREDITO', 'NOTA_DEBITO', 'BASE');

-- CreateEnum
CREATE TYPE "TYPE_INVOICE" AS ENUM ('COMPRA', 'VENTA');

-- CreateEnum
CREATE TYPE "TYPE_DOCS" AS ENUM ('NOTA_CREDITO', 'NOTA_DEBITO', 'FACTURA');

-- CreateEnum
CREATE TYPE "INVOICE_STATUS" AS ENUM ('BASE', 'MODIFY', 'DELETED');

-- CreateEnum
CREATE TYPE "BULKING_TYPE_EVENT" AS ENUM ('PRODUCT', 'WAREHOUSE', 'PURCHASE_INVOICE', 'SELL_INVOICE', 'CUSTOMERS', 'NOTA_CREDITO', 'CATEGORIAS', 'MARCAS');

-- CreateEnum
CREATE TYPE "TYPEINVOICE" AS ENUM ('BUY_INVOICE', 'SALES_INVOICE', 'CREDIT_NOTE', 'DEBIT_NOTE');

-- CreateEnum
CREATE TYPE "TYPEDESIGNINVOICE" AS ENUM ('FACTURAS', 'COTIZACIONES', 'REMISIONES', 'ORDENES_COMPRA');

-- CreateEnum
CREATE TYPE "TYPE_OF_NOTE" AS ENUM ('DEVOLUCION', 'DESCUENTO');

-- CreateEnum
CREATE TYPE "STATUSCOBROFACTURA" AS ENUM ('COBRADA', 'POR_COBRAR', 'ANULADA', 'BORRADOR');

-- CreateEnum
CREATE TYPE "STATUS_PROCESO_METAS" AS ENUM ('COMPLETADA', 'INCOMPLETA', 'EN_PROCESO', 'FINALIZADA');

-- CreateTable
CREATE TABLE "SBQ_internal_user" (
    "uuid" UUID NOT NULL DEFAULT gen_random_uuid(),
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "gender" "GENDER" NOT NULL DEFAULT 'MALE',
    "type_DNI" "TYPE_DNI" NOT NULL DEFAULT 'CC',
    "DNI" TEXT,
    "position" TEXT,
    "email" TEXT NOT NULL,
    "account_status" "ACCOUNT_STATUS" NOT NULL DEFAULT 'CREATED',
    "profile_img" TEXT,
    "organizationUuid" UUID,
    "user_role_uuid" UUID NOT NULL,
    "birthday" TIMESTAMP(3),
    "instagram" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "first_login_provider" "LOGIN_PROVIDER" NOT NULL DEFAULT 'GOOGLE',

    CONSTRAINT "SBQ_internal_user_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "SBQ_internal_user_google_provider" (
    "uuid" UUID NOT NULL DEFAULT gen_random_uuid(),
    "google_id" TEXT NOT NULL,
    "internal_user_uuid" UUID NOT NULL,
    "organizationUuid" TEXT,

    CONSTRAINT "SBQ_internal_user_google_provider_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "SBQ_internal_user_cellphone" (
    "uuid" UUID NOT NULL DEFAULT gen_random_uuid(),
    "internal_user_uuid" UUID NOT NULL,
    "cellphone_number" TEXT NOT NULL,
    "organizationUuid" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SBQ_internal_user_cellphone_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "SBQ_internal_user_address" (
    "uuid" UUID NOT NULL DEFAULT gen_random_uuid(),
    "internal_user_uuid" UUID NOT NULL,
    "address" TEXT NOT NULL,
    "country" TEXT,
    "state" TEXT,
    "city" TEXT,
    "latitude" DOUBLE PRECISION,
    "longitude" DOUBLE PRECISION,
    "organizationUuid" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SBQ_internal_user_address_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "SBQ_internal_user_password" (
    "uuid" UUID NOT NULL DEFAULT gen_random_uuid(),
    "user_uuid" UUID NOT NULL,
    "password" TEXT NOT NULL,
    "organizationUuid" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SBQ_internal_user_password_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "SBQ_user_role" (
    "uuid" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" TEXT NOT NULL,
    "type" "ROLE" NOT NULL,
    "organizationUuid" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SBQ_user_role_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "SBQ_user_has_permission" (
    "uuid" UUID NOT NULL DEFAULT gen_random_uuid(),
    "internal_user_uuid" UUID NOT NULL,
    "permission_uuid" UUID NOT NULL,
    "organizationUuid" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SBQ_user_has_permission_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "SBQ_permission" (
    "uuid" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "type" "PERMISSION" NOT NULL,
    "organizationUuid" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SBQ_permission_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "SBQ_warehouse_manager" (
    "uuid" UUID NOT NULL DEFAULT gen_random_uuid(),
    "internal_user_uuid" UUID NOT NULL,
    "warehouse_uuid" UUID NOT NULL,
    "status" "MANAGER_INCHARGE_STATUS" NOT NULL DEFAULT 'CURRENT',
    "organizationUuid" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SBQ_warehouse_manager_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "SBQ_warehouse_grocer" (
    "uuid" UUID NOT NULL DEFAULT gen_random_uuid(),
    "internal_user_uuid" UUID NOT NULL,
    "warehouse_uuid" UUID NOT NULL,
    "status" "GROCER_INCHARGE_STATUS" NOT NULL DEFAULT 'CURRENT',
    "organizationUuid" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SBQ_warehouse_grocer_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "SBQ_warehouse" (
    "uuid" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "location_latitude" DOUBLE PRECISION NOT NULL,
    "location_longitude" DOUBLE PRECISION NOT NULL,
    "location_address" TEXT NOT NULL,
    "city" TEXT,
    "state" TEXT,
    "country" TEXT,
    "phone" TEXT,
    "status" "WAREHOUSE_STATUS" NOT NULL DEFAULT 'AVAILABLE',
    "organizationUuid" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SBQ_warehouse_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "SBQ_warehouse_pos" (
    "uuid" UUID NOT NULL DEFAULT gen_random_uuid(),
    "warehouse_uuid" UUID NOT NULL,
    "pos_uuid" UUID NOT NULL,
    "organizationUuid" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SBQ_warehouse_pos_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "SBQ_pos" (
    "uuid" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "phone" TEXT,
    "country" TEXT,
    "state" TEXT,
    "city" TEXT,
    "address" TEXT,
    "url" TEXT,
    "CMS" TEXT,
    "typeLocation" "TYPE_LOCATION" NOT NULL DEFAULT 'FISICA',
    "location_latitude" DOUBLE PRECISION NOT NULL,
    "location_longitude" DOUBLE PRECISION NOT NULL,
    "location_address" TEXT NOT NULL,
    "status" "POS_STATUS" NOT NULL DEFAULT 'AVAILABLE',
    "organizationUuid" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SBQ_pos_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "SBQ_pos_manager" (
    "uuid" UUID NOT NULL DEFAULT gen_random_uuid(),
    "internal_user_uuid" UUID NOT NULL,
    "pos_uuid" UUID NOT NULL,
    "organizationUuid" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SBQ_pos_manager_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "SBQ_cashbox" (
    "uuid" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" TEXT NOT NULL DEFAULT 'NOT ASIGNED',
    "initial_amount" DOUBLE PRECISION NOT NULL,
    "currency" "CURRENCIES" NOT NULL DEFAULT 'COP',
    "status" "CASHBOX_STATUS" NOT NULL DEFAULT 'AVAILABLE',
    "amount" DOUBLE PRECISION NOT NULL DEFAULT 0.0,
    "organizationUuid" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SBQ_cashbox_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "SBQ_user_cashbox" (
    "uuid" UUID NOT NULL DEFAULT gen_random_uuid(),
    "internal_user_uuid" UUID NOT NULL,
    "cashbox_uuid" UUID NOT NULL,
    "organizationUuid" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SBQ_user_cashbox_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "SBQ_payment_method_cashbox" (
    "uuid" UUID NOT NULL DEFAULT gen_random_uuid(),
    "cashbox_uuid" UUID NOT NULL,
    "payment_method_uuid" UUID NOT NULL,
    "organizationUuid" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SBQ_payment_method_cashbox_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "SBQ_payment_method" (
    "uuid" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "organizationUuid" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SBQ_payment_method_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "Currency" (
    "uuid" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" TEXT,
    "symbol" TEXT,
    "country" TEXT,
    "currency_type" "CURRENCIES" NOT NULL DEFAULT 'COP',

    CONSTRAINT "Currency_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "CurrencyCashbox" (
    "uuid" UUID NOT NULL DEFAULT gen_random_uuid(),
    "cashbox_uuid" UUID NOT NULL,
    "currency_uuid" "CURRENCIES" NOT NULL,
    "Status" "CURRENCYSTATUS" NOT NULL DEFAULT 'ACTIVE',
    "organizationUuid" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CurrencyCashbox_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "SBQ_pos_cashbox" (
    "uuid" UUID NOT NULL DEFAULT gen_random_uuid(),
    "pos_uuid" UUID NOT NULL,
    "cashbox_uuid" UUID NOT NULL,
    "organizationUuid" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SBQ_pos_cashbox_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "SBQ_bank_account_cashbox" (
    "uuid" UUID NOT NULL DEFAULT gen_random_uuid(),
    "bank_account_uuid" UUID NOT NULL,
    "cashbox_uuid" UUID NOT NULL,
    "organizationUuid" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SBQ_bank_account_cashbox_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "SBQ_seller_pos" (
    "uuid" UUID NOT NULL DEFAULT gen_random_uuid(),
    "internal_user_uuid" UUID NOT NULL,
    "pos_uuid" UUID NOT NULL,
    "status" "STATUS" NOT NULL DEFAULT 'ACTIVE',
    "organizationUuid" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SBQ_seller_pos_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "SBQ_product_warehouse" (
    "uuid" UUID NOT NULL DEFAULT gen_random_uuid(),
    "warehouse_uuid" UUID NOT NULL,
    "status" "STATUS" NOT NULL DEFAULT 'ACTIVE',
    "subProductUuid" UUID,
    "product_uuid" UUID,
    "currentStock" DOUBLE PRECISION NOT NULL DEFAULT 0.0,
    "initialStock" DOUBLE PRECISION NOT NULL DEFAULT 0.0,
    "organizationUuid" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SBQ_product_warehouse_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "SBQ_product" (
    "uuid" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "wordpress_url" TEXT DEFAULT '',
    "status" "PRODUCT_STATUS" DEFAULT 'AVAILABLE',
    "productType" "PRODUCT_TYPE" NOT NULL DEFAULT 'FIXED',
    "byBuyOrSell" "BYBUYORSELL" DEFAULT 'BUYANDSELL',
    "principalImage" TEXT,
    "SKU" TEXT,
    "price" BIGINT DEFAULT 0,
    "minimalPrice" BIGINT DEFAULT 0,
    "wordpress_id" TEXT DEFAULT '',
    "height" DOUBLE PRECISION DEFAULT 0.0,
    "length" DOUBLE PRECISION DEFAULT 0.0,
    "width" DOUBLE PRECISION DEFAULT 0.0,
    "weight" DOUBLE PRECISION DEFAULT 0.0,
    "organizationUuid" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "justBuyable" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "SBQ_product_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "SBQ_product_supplier" (
    "uuid" UUID NOT NULL DEFAULT gen_random_uuid(),
    "product_uuid" UUID,
    "supplier_uuid" UUID NOT NULL,
    "organizationUuid" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "subProductUuid" UUID,

    CONSTRAINT "SBQ_product_supplier_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "SBQ_product_gallery" (
    "uuid" UUID NOT NULL DEFAULT gen_random_uuid(),
    "product_uuid" UUID NOT NULL,
    "image" TEXT NOT NULL,
    "organizationUuid" TEXT,

    CONSTRAINT "SBQ_product_gallery_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "SBQ_subproduct" (
    "uuid" UUID NOT NULL DEFAULT gen_random_uuid(),
    "price" BIGINT NOT NULL DEFAULT 0,
    "buyPrice" BIGINT NOT NULL DEFAULT 0,
    "minimalPrice" INTEGER NOT NULL,
    "status" "PRODUCT_STATUS" DEFAULT 'AVAILABLE',
    "SKU" TEXT NOT NULL,
    "wordpress_url" TEXT DEFAULT '',
    "image" TEXT,
    "wordpress_id" TEXT DEFAULT '',
    "height" DOUBLE PRECISION DEFAULT 0.0,
    "length" DOUBLE PRECISION DEFAULT 0.0,
    "width" DOUBLE PRECISION DEFAULT 0.0,
    "weight" DOUBLE PRECISION DEFAULT 0.0,
    "product_uuid" UUID NOT NULL,
    "organizationUuid" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SBQ_subproduct_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "OptionsSubproduct" (
    "uuid" UUID NOT NULL DEFAULT gen_random_uuid(),
    "organizationUuid" TEXT,
    "subproductUuid" UUID NOT NULL,
    "color" TEXT,
    "size" TEXT,
    "type" TEXT,

    CONSTRAINT "OptionsSubproduct_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "SBQ_categories_subproducts" (
    "uuid" UUID NOT NULL DEFAULT gen_random_uuid(),
    "subproductUuid" UUID NOT NULL,
    "categoryUuid" UUID NOT NULL,
    "organizationUuid" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SBQ_categories_subproducts_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "SBQ_categories_products" (
    "uuid" UUID NOT NULL DEFAULT gen_random_uuid(),
    "productUuid" UUID NOT NULL,
    "categoryUuid" UUID NOT NULL,
    "status" "STATUS" NOT NULL DEFAULT 'ACTIVE',
    "organizationUuid" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SBQ_categories_products_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "SBQ_categories" (
    "uuid" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" TEXT NOT NULL,
    "organizationUuid" TEXT,
    "categoryPaternUuid" UUID,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "categorieImg" TEXT,

    CONSTRAINT "SBQ_categories_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "SBQ_category_organizaiton" (
    "uuid" UUID NOT NULL DEFAULT gen_random_uuid(),
    "categoryUuid" UUID NOT NULL,
    "organizationUuid" UUID NOT NULL,

    CONSTRAINT "SBQ_category_organizaiton_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "SBQ_organization" (
    "uuid" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" TEXT NOT NULL,
    "NIT" TEXT NOT NULL,
    "description" TEXT,
    "address2" TEXT,
    "creation_date" TIMESTAMP(3),
    "creation_email" TEXT,
    "creation_phone" TEXT,
    "country" TEXT,
    "state" TEXT,
    "city" TEXT,
    "logo" TEXT,
    "baseNumberEmployees" TEXT,
    "address" TEXT,
    "latitude" DOUBLE PRECISION,
    "longitude" DOUBLE PRECISION,
    "fromattedAdress" TEXT,
    "lat" INTEGER,
    "lng" INTEGER,
    "web" TEXT,
    "organizationUuid" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SBQ_organization_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "SBQ_activities_organization" (
    "uuid" UUID NOT NULL DEFAULT gen_random_uuid(),
    "organizationUuid" UUID NOT NULL,
    "activityUuid" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SBQ_activities_organization_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "Activity" (
    "uuid" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "organizationUuid" UUID NOT NULL,

    CONSTRAINT "Activity_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "Activities" (
    "uuid" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "organizationUuid" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Activities_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "SBQ_organization_documentation" (
    "uuid" UUID NOT NULL DEFAULT gen_random_uuid(),
    "camara" TEXT NOT NULL,
    "cedula_front" TEXT NOT NULL,
    "cedula_back" TEXT NOT NULL,
    "back_certification" TEXT NOT NULL,
    "organization_uuid" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SBQ_organization_documentation_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "SBQ_taxes" (
    "uuid" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "country" TEXT,
    "state" TEXT,
    "city" TEXT,
    "taxesCode" TEXT,
    "forNatural" BOOLEAN NOT NULL DEFAULT false,
    "forJuridica" BOOLEAN NOT NULL DEFAULT false,
    "typeLocation" "TAX_TYPE_LOCATION" NOT NULL,
    "forSells" BOOLEAN NOT NULL DEFAULT false,
    "forBought" BOOLEAN NOT NULL DEFAULT false,
    "typeTax" "TAX_TYPE" NOT NULL,
    "period" "TAX_PERIOD" NOT NULL,
    "percent" DOUBLE PRECISION NOT NULL,
    "ACTIVE" BOOLEAN NOT NULL DEFAULT true,
    "status" "STATUS" NOT NULL DEFAULT 'ACTIVE',
    "organization_uuid" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SBQ_taxes_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "SBQ_taxes_cashbox" (
    "uuid" UUID NOT NULL DEFAULT gen_random_uuid(),
    "cashboxUuid" UUID NOT NULL,
    "taxUuid" UUID NOT NULL,
    "organizationUuid" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SBQ_taxes_cashbox_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "OrganizationAxcesDetails" (
    "uuid" UUID NOT NULL DEFAULT gen_random_uuid(),
    "organization_uuid" UUID NOT NULL,
    "invoiceRangeStart" INTEGER NOT NULL,
    "invoiceRageEnd" INTEGER NOT NULL,
    "ExpiredIn" TIMESTAMP(3) NOT NULL,
    "totalLeft" INTEGER NOT NULL,
    "Status" "DIAN_AXCES_DETAILS_STATUS" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "OrganizationAxcesDetails_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "OrganizationCurrencies" (
    "uuid" UUID NOT NULL DEFAULT gen_random_uuid(),
    "organization_uuid" UUID NOT NULL,
    "currencie" "CURRENCIES" NOT NULL,

    CONSTRAINT "OrganizationCurrencies_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "SBQ_labels" (
    "uuid" UUID NOT NULL DEFAULT gen_random_uuid(),
    "principalImg" TEXT NOT NULL,
    "principalImgOrg" TEXT DEFAULT '',
    "organizationUuid" UUID,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SBQ_labels_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "SBQ_labels_items" (
    "uuid" UUID NOT NULL DEFAULT gen_random_uuid(),
    "id" TEXT DEFAULT '',
    "name" TEXT DEFAULT '',
    "value" TEXT DEFAULT '',
    "className" TEXT DEFAULT '',
    "type" TEXT DEFAULT '',
    "labelUuid" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SBQ_labels_items_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "SBQ_labels_organization_info" (
    "uuid" UUID NOT NULL DEFAULT gen_random_uuid(),
    "type" TEXT NOT NULL,
    "position" INTEGER NOT NULL,
    "organizationUuid" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "labelsDeliveryDetailsUuid" UUID,
    "labelsStorageDetailsUuid" UUID,

    CONSTRAINT "SBQ_labels_organization_info_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "SBQ_labels_product_info" (
    "uuid" UUID NOT NULL DEFAULT gen_random_uuid(),
    "type" TEXT NOT NULL,
    "position" INTEGER NOT NULL,
    "organizationUuid" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "labelsDeliveryDetailsUuid" UUID,
    "labelsStorageDetailsUuid" UUID,

    CONSTRAINT "SBQ_labels_product_info_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "SBQ_labels_delivery_info" (
    "uuid" UUID NOT NULL DEFAULT gen_random_uuid(),
    "type" TEXT NOT NULL,
    "position" INTEGER NOT NULL,
    "labelsUuid" UUID,
    "organizationUuid" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SBQ_labels_delivery_info_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "SBQ_labels_storage_info" (
    "uuid" UUID NOT NULL DEFAULT gen_random_uuid(),
    "type" TEXT NOT NULL,
    "position" INTEGER NOT NULL,
    "labelsUuid" UUID,
    "organizationUuid" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SBQ_labels_storage_info_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "SBQ_labels_styles" (
    "uuid" UUID NOT NULL DEFAULT gen_random_uuid(),
    "includeFrames" BOOLEAN DEFAULT false,
    "labelsUuid" UUID,
    "type" TEXT DEFAULT '',
    "organizationUuid" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SBQ_labels_styles_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "InvoiceLabel" (
    "uuid" UUID NOT NULL DEFAULT gen_random_uuid(),
    "organization_uuid" UUID NOT NULL,

    CONSTRAINT "InvoiceLabel_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "SBQ_invoice_labels_items" (
    "uuid" UUID NOT NULL DEFAULT gen_random_uuid(),
    "id" TEXT DEFAULT '',
    "name" TEXT DEFAULT '',
    "value" TEXT DEFAULT '',
    "className" TEXT DEFAULT '',
    "type" TEXT DEFAULT '',
    "invoice_label_uuid" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SBQ_invoice_labels_items_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "SBQ_bank_account_organization" (
    "uuid" UUID NOT NULL DEFAULT gen_random_uuid(),
    "bank_account_uuid" UUID NOT NULL,
    "organization_uuid" UUID NOT NULL,
    "organizationUuid" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SBQ_bank_account_organization_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "SBQ_bank_account" (
    "uuid" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" TEXT,
    "description" TEXT,
    "bank_name" TEXT NOT NULL,
    "bank_account" TEXT NOT NULL,
    "bank_account_type" "BANK_ACCOUNT_TYPE" NOT NULL DEFAULT 'SAVINGS',
    "bank_account_owner_name" TEXT,
    "bank_account_document" TEXT,
    "type_document" "TYPE_ACCOUNT_DNI" NOT NULL DEFAULT 'NIT',
    "status" "STATUS_BANK_ACCOUNT" NOT NULL DEFAULT 'ACTIVE',
    "organizationUuid" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL DEFAULT 0,

    CONSTRAINT "SBQ_bank_account_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "SBQ_customer" (
    "uuid" UUID NOT NULL DEFAULT gen_random_uuid(),
    "firstName" TEXT NOT NULL,
    "LastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "wordpress_url" TEXT DEFAULT '',
    "wordpress_id" TEXT DEFAULT '',
    "sendEmail" BOOLEAN NOT NULL DEFAULT false,
    "DNI" TEXT NOT NULL,
    "TypeDOC" "TYPE_DNI" NOT NULL DEFAULT 'CC',
    "birthDate" TIMESTAMP(3),
    "profileImg" TEXT,
    "status" "CUSTOMER_STATUS" NOT NULL DEFAULT 'ACTIVE',
    "NIT" TEXT,
    "DV" TEXT,
    "name" TEXT,
    "habeasData" BOOLEAN DEFAULT false,
    "signature" TEXT,
    "typePerson" "TYPE_PERSON" DEFAULT 'NATURAL',
    "organizationUuid" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" UUID NOT NULL,

    CONSTRAINT "SBQ_customer_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "SBQ_customer_details" (
    "uuid" UUID NOT NULL DEFAULT gen_random_uuid(),
    "customerUuid" UUID NOT NULL,
    "birthDate" TIMESTAMP(3) NOT NULL,
    "gender" "GENDER" NOT NULL DEFAULT 'MALE',
    "phone" TEXT NOT NULL,
    "address" TEXT,
    "address2" TEXT DEFAULT '',
    "lat" DOUBLE PRECISION DEFAULT 0,
    "lng" DOUBLE PRECISION DEFAULT 0,
    "city" TEXT,
    "state" TEXT,
    "country" TEXT,
    "instagram" TEXT,
    "organizationUuid" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SBQ_customer_details_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "SBQ_customer_pos" (
    "uuid" UUID NOT NULL DEFAULT gen_random_uuid(),
    "customerUuid" UUID NOT NULL,
    "posUuid" UUID NOT NULL,
    "organizationUuid" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SBQ_customer_pos_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "SBQ_sell" (
    "uuid" UUID NOT NULL DEFAULT gen_random_uuid(),
    "typePayment" "TYPE_PAYMENT" NOT NULL DEFAULT 'CASH',
    "organizationUuid" TEXT,
    "wordpress_id" TEXT,
    "wordpress_url" TEXT DEFAULT '',
    "totalTax" BIGINT DEFAULT 0,
    "totalShipping" BIGINT DEFAULT 0,
    "subtotal" BIGINT DEFAULT 0,
    "total" BIGINT DEFAULT 0,
    "discount" BIGINT DEFAULT 0,
    "totalDiscount" BIGINT DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" "SELL_STATUS" DEFAULT 'PENDING',

    CONSTRAINT "SBQ_sell_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "SBQ_customer_sell" (
    "uuid" UUID NOT NULL DEFAULT gen_random_uuid(),
    "customerUuid" UUID NOT NULL,
    "sellUuid" UUID NOT NULL,
    "organizationUuid" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SBQ_customer_sell_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "SBQ_cashbox_sell" (
    "uuid" UUID NOT NULL DEFAULT gen_random_uuid(),
    "cashboxUuid" UUID NOT NULL,
    "sellUuid" UUID NOT NULL,
    "organizationUuid" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SBQ_cashbox_sell_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "SBQ_seller_sell" (
    "uuid" UUID NOT NULL DEFAULT gen_random_uuid(),
    "sellerUuid" UUID NOT NULL,
    "sellUuid" UUID NOT NULL,
    "organizationUuid" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SBQ_seller_sell_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "SBQ_subproduct_sell" (
    "uuid" UUID NOT NULL DEFAULT gen_random_uuid(),
    "subProductUuid" UUID,
    "productUuid" UUID,
    "sellUuid" UUID NOT NULL,
    "quantity" INTEGER,
    "organizationUuid" TEXT,
    "warehouseUuid" UUID,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SBQ_subproduct_sell_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "SBQ_sell_taxes" (
    "uuid" UUID NOT NULL DEFAULT gen_random_uuid(),
    "sellUuid" UUID NOT NULL,
    "taxUuid" UUID NOT NULL,
    "totalProductsValue" INTEGER NOT NULL,
    "totalTaxvalue" INTEGER NOT NULL,

    CONSTRAINT "SBQ_sell_taxes_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "SBQ_subproduct_sell_return" (
    "uuid" UUID NOT NULL DEFAULT gen_random_uuid(),
    "subproductSellUuid" UUID NOT NULL,
    "quantity" INTEGER NOT NULL,
    "cashReturn" BOOLEAN NOT NULL,
    "organizationUuid" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SBQ_subproduct_sell_return_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "BaseInvoice" (
    "uuid" UUID NOT NULL DEFAULT gen_random_uuid(),
    "key" TEXT NOT NULL,
    "styles" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "nit" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "web" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "saldoPorPagar" BIGINT,
    "configInvoiceUuid" UUID,
    "type_invoice" "TYPE_INVOICE" NOT NULL,
    "type_document" "TYPE_DOCS" NOT NULL,
    "dateExpedition" TIMESTAMP(3) NOT NULL,
    "dateExpiration" TIMESTAMP(3) NOT NULL,
    "organizationUuid" TEXT NOT NULL,
    "subtotal" BIGINT NOT NULL,
    "totalTax" BIGINT NOT NULL,
    "discount" BIGINT NOT NULL,
    "tax" BIGINT NOT NULL,
    "taxporcentage" INTEGER NOT NULL,
    "total" BIGINT NOT NULL,
    "description" TEXT NOT NULL,
    "resolution" TEXT NOT NULL,
    "footer" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "BaseInvoice_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "SellBaseInvoice" (
    "uuid" UUID NOT NULL DEFAULT gen_random_uuid(),
    "data" TEXT NOT NULL,
    "pref" TEXT,
    "statusCobro" "STATUSCOBROFACTURA",
    "number" TEXT,
    "cashboxUuid" UUID,
    "SellUuid" UUID NOT NULL,
    "organizationUuid" UUID NOT NULL,
    "isExternal" BOOLEAN NOT NULL,
    "customerUuid" UUID NOT NULL,
    "baseInvoiceUuid" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SellBaseInvoice_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "BuyBaseInvoice" (
    "uuid" UUID NOT NULL DEFAULT gen_random_uuid(),
    "data" TEXT NOT NULL,
    "pref" TEXT,
    "fechaDeVencimiento" TIMESTAMP(3),
    "description" TEXT,
    "pagado" BIGINT,
    "PorPagar" BIGINT,
    "number" TEXT,
    "PurchaseUuid" UUID,
    "organizationUuid" UUID NOT NULL,
    "isExternal" BOOLEAN NOT NULL,
    "SupplierUuid" UUID NOT NULL,
    "baseInvoiceUuid" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "BuyBaseInvoice_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "NoteCredit" (
    "uuid" UUID NOT NULL DEFAULT gen_random_uuid(),
    "data" TEXT NOT NULL,
    "pref" TEXT,
    "numberNote" TEXT,
    "CUDE" TEXT,
    "statusDian" TEXT,
    "typeNoteCredit" TEXT,
    "description" TEXT,
    "total" BIGINT,
    "saldoPorPagar" BIGINT,
    "tipoDeNota" "TYPE_OF_NOTE",
    "buyOrSell" "BUYORSELL",
    "NotaDebitUuid" UUID,
    "SellUuid" UUID,
    "organizationUuid" UUID NOT NULL,
    "customerUuid" UUID,
    "baseInvoiceUuid" UUID,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "subproductSellUuid" UUID,
    "supplierUuid" UUID,
    "subproductPurchaseUuid" UUID,

    CONSTRAINT "NoteCredit_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "NoteCreditProducts" (
    "uuid" UUID NOT NULL DEFAULT gen_random_uuid(),
    "data" TEXT NOT NULL,
    "noteCreditUuid" UUID NOT NULL,
    "productUuid" UUID,
    "subproductUuid" UUID,
    "quantity" INTEGER NOT NULL,
    "organizationUuid" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "NoteCreditProducts_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "NoteDebit" (
    "uuid" UUID NOT NULL DEFAULT gen_random_uuid(),
    "data" TEXT NOT NULL,
    "pref" TEXT,
    "numberNote" TEXT,
    "description" TEXT,
    "total" BIGINT,
    "saldoPorPagar" BIGINT,
    "tipoDeNota" "TYPE_OF_NOTE",
    "buyOrSell" "BUYORSELL",
    "organizationUuid" UUID,
    "PurchaseUuid" UUID,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "supplierUuid" UUID,
    "subproductPurchaseUuid" UUID,
    "baseInvoiceUuid" UUID,
    "customerUuid" UUID,
    "subproductSellUuid" UUID,

    CONSTRAINT "NoteDebit_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "NoteDebitProducts" (
    "uuid" UUID NOT NULL DEFAULT gen_random_uuid(),
    "data" TEXT NOT NULL,
    "noteDebitUuid" UUID NOT NULL,
    "productUuid" UUID,
    "subproductUuid" UUID,
    "quantity" INTEGER NOT NULL,
    "organizationUuid" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "NoteDebitProducts_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "SellLegalInvoice" (
    "uuid" UUID NOT NULL DEFAULT gen_random_uuid(),
    "data" TEXT NOT NULL,
    "type" "TYPE_AXCES_LEGAL_INVOICE" NOT NULL DEFAULT 'BASE',
    "baseInvoiceUuid" UUID NOT NULL,
    "legalStatus" "INVOICE_STATUS" NOT NULL DEFAULT 'BASE',
    "SellUuid" UUID,
    "organizationUuid" UUID NOT NULL,
    "isExternal" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "subproductSellUuid" UUID,

    CONSTRAINT "SellLegalInvoice_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "SBQ_purchase" (
    "uuid" UUID NOT NULL DEFAULT gen_random_uuid(),
    "typePayment" "TYPE_PAYMENT" NOT NULL DEFAULT 'CASH',
    "organizationUuid" TEXT,
    "totalTax" BIGINT DEFAULT 0,
    "totalShipping" BIGINT DEFAULT 0,
    "subtotal" BIGINT DEFAULT 0,
    "total" BIGINT DEFAULT 0,
    "discount" BIGINT DEFAULT 0,
    "totalDiscount" BIGINT DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "purchaseStatus" "PURCHASE_STATUS" NOT NULL DEFAULT 'PENDING',

    CONSTRAINT "SBQ_purchase_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "SBQ_supplier_purchase" (
    "uuid" UUID NOT NULL DEFAULT gen_random_uuid(),
    "supplierUuid" UUID NOT NULL,
    "purchaseUuid" UUID NOT NULL,
    "organizationUuid" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SBQ_supplier_purchase_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "SBQ_buyer_purchase" (
    "uuid" UUID NOT NULL DEFAULT gen_random_uuid(),
    "buyerUuid" UUID NOT NULL,
    "purchaseUuid" UUID NOT NULL,
    "organizationUuid" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SBQ_buyer_purchase_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "PurchaseLegalInvoice" (
    "uuid" UUID NOT NULL DEFAULT gen_random_uuid(),
    "data" TEXT NOT NULL,
    "internalConsecutivce" INTEGER NOT NULL,
    "InvoiceSerial" TEXT NOT NULL,
    "expiresIn" TIMESTAMP(3) NOT NULL,
    "baseTotalValue" INTEGER NOT NULL,
    "basePendingPay" INTEGER NOT NULL,
    "data2" TEXT NOT NULL,
    "baseValueReceip" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "firstSubTotal" INTEGER NOT NULL,
    "secondSubTotoal" INTEGER NOT NULL,
    "type" "TYPE_AXCES_LEGAL_INVOICE" NOT NULL DEFAULT 'BASE',
    "legalStatus" "INVOICE_STATUS" NOT NULL DEFAULT 'BASE',
    "purchaseUuid" UUID,
    "organizationUuid" UUID NOT NULL,
    "isExternal" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PurchaseLegalInvoice_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "SBQ_subproduct_purchase" (
    "uuid" UUID NOT NULL DEFAULT gen_random_uuid(),
    "subProductUuid" UUID,
    "productUuid" UUID,
    "purchaseUuid" UUID NOT NULL,
    "organizationUuid" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "quantity" INTEGER NOT NULL DEFAULT 1,

    CONSTRAINT "SBQ_subproduct_purchase_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "SBQ_upcoming_purchase" (
    "uuid" UUID NOT NULL DEFAULT gen_random_uuid(),
    "subProductPurchaseUuid" UUID NOT NULL,
    "warehouse_uuid" UUID NOT NULL,
    "organizationUuid" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "subQuantity" INTEGER NOT NULL,

    CONSTRAINT "SBQ_upcoming_purchase_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "PurchaseDetails" (
    "uuid" UUID NOT NULL DEFAULT gen_random_uuid(),

    CONSTRAINT "PurchaseDetails_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "SBQ_discounts" (
    "uuid" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" TEXT NOT NULL,
    "description" TEXT,
    "percentage" DOUBLE PRECISION NOT NULL,
    "organizationUuid" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SBQ_discounts_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "SBQ_supplier" (
    "uuid" UUID NOT NULL DEFAULT gen_random_uuid(),
    "firstNameContact" TEXT NOT NULL,
    "LastNameContact" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "emailContact" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "phoneContact" TEXT NOT NULL,
    "DNI" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "latitude" DOUBLE PRECISION,
    "longitude" DOUBLE PRECISION,
    "instagram" TEXT NOT NULL,
    "TypeDOC" "TYPE_DNI" NOT NULL DEFAULT 'CC',
    "profileImg" TEXT,
    "status" "SUPPLIERS_STATUS" DEFAULT 'ACTIVE',
    "organizationUuid" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" UUID NOT NULL,

    CONSTRAINT "SBQ_supplier_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "SBQ_supplier_organization" (
    "uuid" UUID NOT NULL DEFAULT gen_random_uuid(),
    "supplier_uuid" UUID NOT NULL,
    "organization_uuid" UUID NOT NULL,
    "organizationUuid" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SBQ_supplier_organization_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "SBQ_category_supplier" (
    "uuid" UUID NOT NULL DEFAULT gen_random_uuid(),
    "supplier_uuid" UUID NOT NULL,
    "categoryUuid" UUID NOT NULL,
    "organizationUuid" TEXT,

    CONSTRAINT "SBQ_category_supplier_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "SBQ_remisiones" (
    "uuid" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" TEXT NOT NULL,
    "prefix" TEXT NOT NULL,
    "consecutivo" INTEGER NOT NULL,
    "description" TEXT,
    "customerUuid" UUID NOT NULL,
    "productUuid" UUID NOT NULL,
    "subProductUuid" UUID NOT NULL,
    "organizationUuid" TEXT,
    "vendedorUuid" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SBQ_remisiones_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "DLPY_backoffice_user" (
    "uuid" UUID NOT NULL DEFAULT gen_random_uuid(),
    "firstname" TEXT NOT NULL,
    "lastname" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "codePhone" TEXT,
    "phone" TEXT NOT NULL,
    "email" TEXT,
    "country" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "avatar" TEXT,
    "number1" TEXT,
    "number2" TEXT,
    "organizationUuid" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "Status" "DLPY_backoffice_user_status" NOT NULL DEFAULT 'ACTIVE',

    CONSTRAINT "DLPY_backoffice_user_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "DLPY_backoffice_user_details" (
    "uuid" UUID NOT NULL DEFAULT gen_random_uuid(),
    "backoffice_user_uuid" UUID NOT NULL,
    "TypeDni" "DLPY_BACKOFFICE_USER_DOCUMENT_TYPE" NOT NULL DEFAULT 'CC',
    "Dni" TEXT NOT NULL,
    "organizationUuid" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DLPY_backoffice_user_details_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "DLPY_backoffice_user_role" (
    "uuid" UUID NOT NULL DEFAULT gen_random_uuid(),
    "backoffice_user_uuid" UUID NOT NULL,
    "Role" "DLPY_backoffice_user_role_type" NOT NULL DEFAULT 'ADMIN',
    "organizationUuid" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DLPY_backoffice_user_role_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "SBQ_brand" (
    "uuid" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" TEXT NOT NULL,
    "logo" TEXT NOT NULL,
    "description" TEXT,
    "organizationUuid" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SBQ_brand_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "SBQ_brand_organization" (
    "uuid" UUID NOT NULL DEFAULT gen_random_uuid(),
    "brandUuid" UUID NOT NULL,
    "organization_uuid" UUID NOT NULL,
    "organizationUuid" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SBQ_brand_organization_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "SBQ_brand_supplier" (
    "uuid" UUID NOT NULL DEFAULT gen_random_uuid(),
    "supplier_uuid" UUID NOT NULL,
    "brandUuid" UUID NOT NULL,
    "organizationUuid" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SBQ_brand_supplier_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "SBQ_brand_product" (
    "uuid" UUID NOT NULL DEFAULT gen_random_uuid(),
    "product_uuid" UUID NOT NULL,
    "brandUuid" UUID NOT NULL,
    "organizationUuid" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SBQ_brand_product_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "SBQ_metas" (
    "uuid" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" TEXT NOT NULL,
    "time" TIMESTAMP(3) NOT NULL,
    "amount" BIGINT DEFAULT 0,
    "clientes" INTEGER,
    "sells" INTEGER,
    "buys" INTEGER,
    "shippings" INTEGER,
    "statusProceso" "STATUS_PROCESO_METAS" NOT NULL DEFAULT 'EN_PROCESO',
    "status" "MetasStatus" NOT NULL DEFAULT 'ACTIVE',
    "createdBy" UUID NOT NULL,
    "organizationUuid" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SBQ_metas_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "SBQ_log_history" (
    "uuid" UUID NOT NULL DEFAULT gen_random_uuid(),
    "table" TEXT NOT NULL,
    "type_change" TEXT NOT NULL,
    "reference" TEXT,
    "organization_uuid" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SBQ_log_history_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "SBQ_wordpress" (
    "uuid" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "image" TEXT DEFAULT '',
    "host" TEXT DEFAULT '',
    "status" "STATUS" DEFAULT 'ACTIVE',
    "product_send_xell_wordpress" BOOLEAN DEFAULT false,
    "user_send_xell_wordpress" BOOLEAN DEFAULT false,
    "order_send_xell_wordpress" BOOLEAN DEFAULT false,
    "product_send_wordpress_xell" BOOLEAN DEFAULT false,
    "user_send_wordpress_xell" BOOLEAN DEFAULT false,
    "order_send_wordpress_xell" BOOLEAN DEFAULT false,
    "organization_uuid" UUID,
    "pos_uuid" UUID,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SBQ_wordpress_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "SBQ_bulking_events" (
    "uuid" UUID NOT NULL DEFAULT gen_random_uuid(),
    "organization_uuid" UUID,
    "type" "BULKING_TYPE_EVENT" NOT NULL,
    "percentage" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SBQ_bulking_events_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "SBQ_bulking_events_failure" (
    "uuid" UUID NOT NULL DEFAULT gen_random_uuid(),
    "bulkingEventUuid" UUID,
    "position" INTEGER NOT NULL,
    "log" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SBQ_bulking_events_failure_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "SBQ_config_invoice" (
    "uuid" UUID NOT NULL DEFAULT gen_random_uuid(),
    "organization_uuid" UUID NOT NULL,
    "status" "STATUS" NOT NULL DEFAULT 'ACTIVE',
    "createBy" UUID NOT NULL,
    "createdBy" UUID NOT NULL,
    "cashbox_uuid" UUID,
    "supplier_uuid" UUID,
    "type" TEXT NOT NULL,
    "typeInvoice" "TYPEINVOICE" NOT NULL,
    "name" TEXT NOT NULL,
    "numberInit" INTEGER NOT NULL,
    "numberCurrent" INTEGER,
    "numberEnd" INTEGER,
    "pref" TEXT NOT NULL,
    "resolution" TEXT,
    "term" TEXT NOT NULL,
    "notes" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SBQ_config_invoice_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "SBQ_invoice_design" (
    "uuid" UUID NOT NULL DEFAULT gen_random_uuid(),
    "organization_uuid" UUID NOT NULL,
    "createdBy" UUID NOT NULL,
    "type" "TYPEDESIGNINVOICE" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SBQ_invoice_design_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "SBQ_invoice_design_styles" (
    "uuid" UUID NOT NULL DEFAULT gen_random_uuid(),
    "invoiceDesignUuid" UUID NOT NULL,
    "key" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SBQ_invoice_design_styles_pkey" PRIMARY KEY ("uuid")
);

-- CreateIndex
CREATE UNIQUE INDEX "SBQ_internal_user_email_key" ON "SBQ_internal_user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "SBQ_internal_user_google_provider_google_id_key" ON "SBQ_internal_user_google_provider"("google_id");

-- CreateIndex
CREATE UNIQUE INDEX "SBQ_internal_user_google_provider_internal_user_uuid_key" ON "SBQ_internal_user_google_provider"("internal_user_uuid");

-- CreateIndex
CREATE UNIQUE INDEX "SBQ_user_role_name_key" ON "SBQ_user_role"("name");

-- CreateIndex
CREATE UNIQUE INDEX "SBQ_user_role_type_key" ON "SBQ_user_role"("type");

-- CreateIndex
CREATE UNIQUE INDEX "SBQ_permission_name_key" ON "SBQ_permission"("name");

-- CreateIndex
CREATE UNIQUE INDEX "SBQ_warehouse_manager_internal_user_uuid_warehouse_uuid_key" ON "SBQ_warehouse_manager"("internal_user_uuid", "warehouse_uuid");

-- CreateIndex
CREATE UNIQUE INDEX "SBQ_warehouse_grocer_internal_user_uuid_warehouse_uuid_key" ON "SBQ_warehouse_grocer"("internal_user_uuid", "warehouse_uuid");

-- CreateIndex
CREATE UNIQUE INDEX "SBQ_warehouse_name_key" ON "SBQ_warehouse"("name");

-- CreateIndex
CREATE UNIQUE INDEX "SBQ_warehouse_pos_warehouse_uuid_pos_uuid_key" ON "SBQ_warehouse_pos"("warehouse_uuid", "pos_uuid");

-- CreateIndex
CREATE UNIQUE INDEX "SBQ_pos_manager_pos_uuid_key" ON "SBQ_pos_manager"("pos_uuid");

-- CreateIndex
CREATE UNIQUE INDEX "SBQ_user_cashbox_internal_user_uuid_cashbox_uuid_key" ON "SBQ_user_cashbox"("internal_user_uuid", "cashbox_uuid");

-- CreateIndex
CREATE UNIQUE INDEX "SBQ_payment_method_cashbox_cashbox_uuid_payment_method_uuid_key" ON "SBQ_payment_method_cashbox"("cashbox_uuid", "payment_method_uuid");

-- CreateIndex
CREATE UNIQUE INDEX "SBQ_payment_method_name_key" ON "SBQ_payment_method"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Currency_currency_type_key" ON "Currency"("currency_type");

-- CreateIndex
CREATE UNIQUE INDEX "CurrencyCashbox_cashbox_uuid_currency_uuid_key" ON "CurrencyCashbox"("cashbox_uuid", "currency_uuid");

-- CreateIndex
CREATE UNIQUE INDEX "SBQ_bank_account_cashbox_bank_account_uuid_cashbox_uuid_key" ON "SBQ_bank_account_cashbox"("bank_account_uuid", "cashbox_uuid");

-- CreateIndex
CREATE UNIQUE INDEX "SBQ_product_warehouse_warehouse_uuid_subProductUuid_product_key" ON "SBQ_product_warehouse"("warehouse_uuid", "subProductUuid", "product_uuid");

-- CreateIndex
CREATE UNIQUE INDEX "OptionsSubproduct_subproductUuid_key" ON "OptionsSubproduct"("subproductUuid");

-- CreateIndex
CREATE UNIQUE INDEX "SBQ_categories_subproducts_subproductUuid_categoryUuid_key" ON "SBQ_categories_subproducts"("subproductUuid", "categoryUuid");

-- CreateIndex
CREATE UNIQUE INDEX "SBQ_categories_products_productUuid_categoryUuid_key" ON "SBQ_categories_products"("productUuid", "categoryUuid");

-- CreateIndex
CREATE UNIQUE INDEX "SBQ_categories_name_key" ON "SBQ_categories"("name");

-- CreateIndex
CREATE UNIQUE INDEX "SBQ_category_organizaiton_categoryUuid_key" ON "SBQ_category_organizaiton"("categoryUuid");

-- CreateIndex
CREATE UNIQUE INDEX "SBQ_organization_documentation_organization_uuid_key" ON "SBQ_organization_documentation"("organization_uuid");

-- CreateIndex
CREATE UNIQUE INDEX "SBQ_taxes_cashbox_cashboxUuid_taxUuid_key" ON "SBQ_taxes_cashbox"("cashboxUuid", "taxUuid");

-- CreateIndex
CREATE UNIQUE INDEX "OrganizationCurrencies_organization_uuid_key" ON "OrganizationCurrencies"("organization_uuid");

-- CreateIndex
CREATE UNIQUE INDEX "InvoiceLabel_organization_uuid_key" ON "InvoiceLabel"("organization_uuid");

-- CreateIndex
CREATE UNIQUE INDEX "SBQ_bank_account_organization_bank_account_uuid_key" ON "SBQ_bank_account_organization"("bank_account_uuid");

-- CreateIndex
CREATE UNIQUE INDEX "SBQ_bank_account_bank_account_key" ON "SBQ_bank_account"("bank_account");

-- CreateIndex
CREATE UNIQUE INDEX "SBQ_customer_details_customerUuid_key" ON "SBQ_customer_details"("customerUuid");

-- CreateIndex
CREATE UNIQUE INDEX "SBQ_customer_sell_sellUuid_key" ON "SBQ_customer_sell"("sellUuid");

-- CreateIndex
CREATE UNIQUE INDEX "SBQ_cashbox_sell_sellUuid_key" ON "SBQ_cashbox_sell"("sellUuid");

-- CreateIndex
CREATE UNIQUE INDEX "SBQ_seller_sell_sellUuid_key" ON "SBQ_seller_sell"("sellUuid");

-- CreateIndex
CREATE UNIQUE INDEX "SBQ_sell_taxes_sellUuid_taxUuid_key" ON "SBQ_sell_taxes"("sellUuid", "taxUuid");

-- CreateIndex
CREATE UNIQUE INDEX "NoteCredit_NotaDebitUuid_key" ON "NoteCredit"("NotaDebitUuid");

-- CreateIndex
CREATE UNIQUE INDEX "SBQ_supplier_purchase_purchaseUuid_key" ON "SBQ_supplier_purchase"("purchaseUuid");

-- CreateIndex
CREATE UNIQUE INDEX "SBQ_buyer_purchase_purchaseUuid_key" ON "SBQ_buyer_purchase"("purchaseUuid");

-- CreateIndex
CREATE UNIQUE INDEX "SBQ_upcoming_purchase_subProductPurchaseUuid_warehouse_uuid_key" ON "SBQ_upcoming_purchase"("subProductPurchaseUuid", "warehouse_uuid");

-- CreateIndex
CREATE UNIQUE INDEX "SBQ_discounts_name_key" ON "SBQ_discounts"("name");

-- CreateIndex
CREATE UNIQUE INDEX "SBQ_supplier_organization_supplier_uuid_key" ON "SBQ_supplier_organization"("supplier_uuid");

-- CreateIndex
CREATE UNIQUE INDEX "DLPY_backoffice_user_email_key" ON "DLPY_backoffice_user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "SBQ_brand_name_key" ON "SBQ_brand"("name");

-- CreateIndex
CREATE UNIQUE INDEX "SBQ_brand_organization_brandUuid_key" ON "SBQ_brand_organization"("brandUuid");

-- CreateIndex
CREATE UNIQUE INDEX "SBQ_brand_product_brandUuid_product_uuid_key" ON "SBQ_brand_product"("brandUuid", "product_uuid");

-- CreateIndex
CREATE UNIQUE INDEX "SBQ_wordpress_url_key" ON "SBQ_wordpress"("url");

-- AddForeignKey
ALTER TABLE "SBQ_internal_user" ADD CONSTRAINT "SBQ_internal_user_organizationUuid_fkey" FOREIGN KEY ("organizationUuid") REFERENCES "SBQ_organization"("uuid") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SBQ_internal_user" ADD CONSTRAINT "SBQ_internal_user_user_role_uuid_fkey" FOREIGN KEY ("user_role_uuid") REFERENCES "SBQ_user_role"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SBQ_internal_user_google_provider" ADD CONSTRAINT "SBQ_internal_user_google_provider_internal_user_uuid_fkey" FOREIGN KEY ("internal_user_uuid") REFERENCES "SBQ_internal_user"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SBQ_internal_user_cellphone" ADD CONSTRAINT "SBQ_internal_user_cellphone_internal_user_uuid_fkey" FOREIGN KEY ("internal_user_uuid") REFERENCES "SBQ_internal_user"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SBQ_internal_user_address" ADD CONSTRAINT "SBQ_internal_user_address_internal_user_uuid_fkey" FOREIGN KEY ("internal_user_uuid") REFERENCES "SBQ_internal_user"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SBQ_internal_user_password" ADD CONSTRAINT "SBQ_internal_user_password_user_uuid_fkey" FOREIGN KEY ("user_uuid") REFERENCES "SBQ_internal_user"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SBQ_user_has_permission" ADD CONSTRAINT "SBQ_user_has_permission_internal_user_uuid_fkey" FOREIGN KEY ("internal_user_uuid") REFERENCES "SBQ_internal_user"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SBQ_user_has_permission" ADD CONSTRAINT "SBQ_user_has_permission_permission_uuid_fkey" FOREIGN KEY ("permission_uuid") REFERENCES "SBQ_permission"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SBQ_warehouse_manager" ADD CONSTRAINT "SBQ_warehouse_manager_internal_user_uuid_fkey" FOREIGN KEY ("internal_user_uuid") REFERENCES "SBQ_internal_user"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SBQ_warehouse_manager" ADD CONSTRAINT "SBQ_warehouse_manager_warehouse_uuid_fkey" FOREIGN KEY ("warehouse_uuid") REFERENCES "SBQ_warehouse"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SBQ_warehouse_grocer" ADD CONSTRAINT "SBQ_warehouse_grocer_internal_user_uuid_fkey" FOREIGN KEY ("internal_user_uuid") REFERENCES "SBQ_internal_user"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SBQ_warehouse_grocer" ADD CONSTRAINT "SBQ_warehouse_grocer_warehouse_uuid_fkey" FOREIGN KEY ("warehouse_uuid") REFERENCES "SBQ_warehouse"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SBQ_warehouse_pos" ADD CONSTRAINT "SBQ_warehouse_pos_warehouse_uuid_fkey" FOREIGN KEY ("warehouse_uuid") REFERENCES "SBQ_warehouse"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SBQ_warehouse_pos" ADD CONSTRAINT "SBQ_warehouse_pos_pos_uuid_fkey" FOREIGN KEY ("pos_uuid") REFERENCES "SBQ_pos"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SBQ_pos_manager" ADD CONSTRAINT "SBQ_pos_manager_internal_user_uuid_fkey" FOREIGN KEY ("internal_user_uuid") REFERENCES "SBQ_internal_user"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SBQ_pos_manager" ADD CONSTRAINT "SBQ_pos_manager_pos_uuid_fkey" FOREIGN KEY ("pos_uuid") REFERENCES "SBQ_pos"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SBQ_user_cashbox" ADD CONSTRAINT "SBQ_user_cashbox_internal_user_uuid_fkey" FOREIGN KEY ("internal_user_uuid") REFERENCES "SBQ_internal_user"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SBQ_user_cashbox" ADD CONSTRAINT "SBQ_user_cashbox_cashbox_uuid_fkey" FOREIGN KEY ("cashbox_uuid") REFERENCES "SBQ_cashbox"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SBQ_payment_method_cashbox" ADD CONSTRAINT "SBQ_payment_method_cashbox_cashbox_uuid_fkey" FOREIGN KEY ("cashbox_uuid") REFERENCES "SBQ_cashbox"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SBQ_payment_method_cashbox" ADD CONSTRAINT "SBQ_payment_method_cashbox_payment_method_uuid_fkey" FOREIGN KEY ("payment_method_uuid") REFERENCES "SBQ_payment_method"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CurrencyCashbox" ADD CONSTRAINT "CurrencyCashbox_cashbox_uuid_fkey" FOREIGN KEY ("cashbox_uuid") REFERENCES "SBQ_cashbox"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SBQ_pos_cashbox" ADD CONSTRAINT "SBQ_pos_cashbox_pos_uuid_fkey" FOREIGN KEY ("pos_uuid") REFERENCES "SBQ_pos"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SBQ_pos_cashbox" ADD CONSTRAINT "SBQ_pos_cashbox_cashbox_uuid_fkey" FOREIGN KEY ("cashbox_uuid") REFERENCES "SBQ_cashbox"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SBQ_bank_account_cashbox" ADD CONSTRAINT "SBQ_bank_account_cashbox_bank_account_uuid_fkey" FOREIGN KEY ("bank_account_uuid") REFERENCES "SBQ_bank_account"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SBQ_bank_account_cashbox" ADD CONSTRAINT "SBQ_bank_account_cashbox_cashbox_uuid_fkey" FOREIGN KEY ("cashbox_uuid") REFERENCES "SBQ_cashbox"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SBQ_seller_pos" ADD CONSTRAINT "SBQ_seller_pos_internal_user_uuid_fkey" FOREIGN KEY ("internal_user_uuid") REFERENCES "SBQ_internal_user"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SBQ_seller_pos" ADD CONSTRAINT "SBQ_seller_pos_pos_uuid_fkey" FOREIGN KEY ("pos_uuid") REFERENCES "SBQ_pos"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SBQ_product_warehouse" ADD CONSTRAINT "SBQ_product_warehouse_warehouse_uuid_fkey" FOREIGN KEY ("warehouse_uuid") REFERENCES "SBQ_warehouse"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SBQ_product_warehouse" ADD CONSTRAINT "SBQ_product_warehouse_subProductUuid_fkey" FOREIGN KEY ("subProductUuid") REFERENCES "SBQ_subproduct"("uuid") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SBQ_product_warehouse" ADD CONSTRAINT "SBQ_product_warehouse_product_uuid_fkey" FOREIGN KEY ("product_uuid") REFERENCES "SBQ_product"("uuid") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SBQ_product_supplier" ADD CONSTRAINT "SBQ_product_supplier_product_uuid_fkey" FOREIGN KEY ("product_uuid") REFERENCES "SBQ_product"("uuid") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SBQ_product_supplier" ADD CONSTRAINT "SBQ_product_supplier_supplier_uuid_fkey" FOREIGN KEY ("supplier_uuid") REFERENCES "SBQ_supplier"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SBQ_product_supplier" ADD CONSTRAINT "SBQ_product_supplier_subProductUuid_fkey" FOREIGN KEY ("subProductUuid") REFERENCES "SBQ_subproduct"("uuid") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SBQ_product_gallery" ADD CONSTRAINT "SBQ_product_gallery_product_uuid_fkey" FOREIGN KEY ("product_uuid") REFERENCES "SBQ_product"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SBQ_subproduct" ADD CONSTRAINT "SBQ_subproduct_product_uuid_fkey" FOREIGN KEY ("product_uuid") REFERENCES "SBQ_product"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OptionsSubproduct" ADD CONSTRAINT "OptionsSubproduct_subproductUuid_fkey" FOREIGN KEY ("subproductUuid") REFERENCES "SBQ_subproduct"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SBQ_categories_subproducts" ADD CONSTRAINT "SBQ_categories_subproducts_subproductUuid_fkey" FOREIGN KEY ("subproductUuid") REFERENCES "SBQ_subproduct"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SBQ_categories_subproducts" ADD CONSTRAINT "SBQ_categories_subproducts_categoryUuid_fkey" FOREIGN KEY ("categoryUuid") REFERENCES "SBQ_categories"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SBQ_categories_products" ADD CONSTRAINT "SBQ_categories_products_productUuid_fkey" FOREIGN KEY ("productUuid") REFERENCES "SBQ_product"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SBQ_categories_products" ADD CONSTRAINT "SBQ_categories_products_categoryUuid_fkey" FOREIGN KEY ("categoryUuid") REFERENCES "SBQ_categories"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SBQ_categories" ADD CONSTRAINT "SBQ_categories_categoryPaternUuid_fkey" FOREIGN KEY ("categoryPaternUuid") REFERENCES "SBQ_categories"("uuid") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SBQ_category_organizaiton" ADD CONSTRAINT "SBQ_category_organizaiton_categoryUuid_fkey" FOREIGN KEY ("categoryUuid") REFERENCES "SBQ_categories"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SBQ_category_organizaiton" ADD CONSTRAINT "SBQ_category_organizaiton_organizationUuid_fkey" FOREIGN KEY ("organizationUuid") REFERENCES "SBQ_organization"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SBQ_activities_organization" ADD CONSTRAINT "SBQ_activities_organization_organizationUuid_fkey" FOREIGN KEY ("organizationUuid") REFERENCES "SBQ_organization"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SBQ_activities_organization" ADD CONSTRAINT "SBQ_activities_organization_activityUuid_fkey" FOREIGN KEY ("activityUuid") REFERENCES "Activities"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Activity" ADD CONSTRAINT "Activity_organizationUuid_fkey" FOREIGN KEY ("organizationUuid") REFERENCES "SBQ_organization"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SBQ_organization_documentation" ADD CONSTRAINT "SBQ_organization_documentation_organization_uuid_fkey" FOREIGN KEY ("organization_uuid") REFERENCES "SBQ_organization"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SBQ_taxes" ADD CONSTRAINT "SBQ_taxes_organization_uuid_fkey" FOREIGN KEY ("organization_uuid") REFERENCES "SBQ_organization"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SBQ_taxes_cashbox" ADD CONSTRAINT "SBQ_taxes_cashbox_cashboxUuid_fkey" FOREIGN KEY ("cashboxUuid") REFERENCES "SBQ_cashbox"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SBQ_taxes_cashbox" ADD CONSTRAINT "SBQ_taxes_cashbox_taxUuid_fkey" FOREIGN KEY ("taxUuid") REFERENCES "SBQ_taxes"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrganizationAxcesDetails" ADD CONSTRAINT "OrganizationAxcesDetails_organization_uuid_fkey" FOREIGN KEY ("organization_uuid") REFERENCES "SBQ_organization"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrganizationCurrencies" ADD CONSTRAINT "OrganizationCurrencies_organization_uuid_fkey" FOREIGN KEY ("organization_uuid") REFERENCES "SBQ_organization"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SBQ_labels" ADD CONSTRAINT "SBQ_labels_organizationUuid_fkey" FOREIGN KEY ("organizationUuid") REFERENCES "SBQ_organization"("uuid") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SBQ_labels_items" ADD CONSTRAINT "SBQ_labels_items_labelUuid_fkey" FOREIGN KEY ("labelUuid") REFERENCES "SBQ_labels"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SBQ_labels_organization_info" ADD CONSTRAINT "SBQ_labels_organization_info_labelsDeliveryDetailsUuid_fkey" FOREIGN KEY ("labelsDeliveryDetailsUuid") REFERENCES "SBQ_labels_delivery_info"("uuid") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SBQ_labels_organization_info" ADD CONSTRAINT "SBQ_labels_organization_info_labelsStorageDetailsUuid_fkey" FOREIGN KEY ("labelsStorageDetailsUuid") REFERENCES "SBQ_labels_storage_info"("uuid") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SBQ_labels_product_info" ADD CONSTRAINT "SBQ_labels_product_info_labelsDeliveryDetailsUuid_fkey" FOREIGN KEY ("labelsDeliveryDetailsUuid") REFERENCES "SBQ_labels_delivery_info"("uuid") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SBQ_labels_product_info" ADD CONSTRAINT "SBQ_labels_product_info_labelsStorageDetailsUuid_fkey" FOREIGN KEY ("labelsStorageDetailsUuid") REFERENCES "SBQ_labels_storage_info"("uuid") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SBQ_labels_delivery_info" ADD CONSTRAINT "SBQ_labels_delivery_info_labelsUuid_fkey" FOREIGN KEY ("labelsUuid") REFERENCES "SBQ_labels"("uuid") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SBQ_labels_storage_info" ADD CONSTRAINT "SBQ_labels_storage_info_labelsUuid_fkey" FOREIGN KEY ("labelsUuid") REFERENCES "SBQ_labels"("uuid") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SBQ_labels_styles" ADD CONSTRAINT "SBQ_labels_styles_labelsUuid_fkey" FOREIGN KEY ("labelsUuid") REFERENCES "SBQ_labels"("uuid") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InvoiceLabel" ADD CONSTRAINT "InvoiceLabel_organization_uuid_fkey" FOREIGN KEY ("organization_uuid") REFERENCES "SBQ_organization"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SBQ_invoice_labels_items" ADD CONSTRAINT "SBQ_invoice_labels_items_invoice_label_uuid_fkey" FOREIGN KEY ("invoice_label_uuid") REFERENCES "InvoiceLabel"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SBQ_bank_account_organization" ADD CONSTRAINT "SBQ_bank_account_organization_bank_account_uuid_fkey" FOREIGN KEY ("bank_account_uuid") REFERENCES "SBQ_bank_account"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SBQ_bank_account_organization" ADD CONSTRAINT "SBQ_bank_account_organization_organization_uuid_fkey" FOREIGN KEY ("organization_uuid") REFERENCES "SBQ_organization"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SBQ_customer" ADD CONSTRAINT "SBQ_customer_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "SBQ_internal_user"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SBQ_customer_details" ADD CONSTRAINT "SBQ_customer_details_customerUuid_fkey" FOREIGN KEY ("customerUuid") REFERENCES "SBQ_customer"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SBQ_customer_pos" ADD CONSTRAINT "SBQ_customer_pos_customerUuid_fkey" FOREIGN KEY ("customerUuid") REFERENCES "SBQ_customer"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SBQ_customer_pos" ADD CONSTRAINT "SBQ_customer_pos_posUuid_fkey" FOREIGN KEY ("posUuid") REFERENCES "SBQ_pos"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SBQ_customer_sell" ADD CONSTRAINT "SBQ_customer_sell_customerUuid_fkey" FOREIGN KEY ("customerUuid") REFERENCES "SBQ_customer"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SBQ_customer_sell" ADD CONSTRAINT "SBQ_customer_sell_sellUuid_fkey" FOREIGN KEY ("sellUuid") REFERENCES "SBQ_sell"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SBQ_cashbox_sell" ADD CONSTRAINT "SBQ_cashbox_sell_cashboxUuid_fkey" FOREIGN KEY ("cashboxUuid") REFERENCES "SBQ_cashbox"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SBQ_cashbox_sell" ADD CONSTRAINT "SBQ_cashbox_sell_sellUuid_fkey" FOREIGN KEY ("sellUuid") REFERENCES "SBQ_sell"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SBQ_seller_sell" ADD CONSTRAINT "SBQ_seller_sell_sellerUuid_fkey" FOREIGN KEY ("sellerUuid") REFERENCES "SBQ_internal_user"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SBQ_seller_sell" ADD CONSTRAINT "SBQ_seller_sell_sellUuid_fkey" FOREIGN KEY ("sellUuid") REFERENCES "SBQ_sell"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SBQ_subproduct_sell" ADD CONSTRAINT "SBQ_subproduct_sell_subProductUuid_fkey" FOREIGN KEY ("subProductUuid") REFERENCES "SBQ_subproduct"("uuid") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SBQ_subproduct_sell" ADD CONSTRAINT "SBQ_subproduct_sell_productUuid_fkey" FOREIGN KEY ("productUuid") REFERENCES "SBQ_product"("uuid") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SBQ_subproduct_sell" ADD CONSTRAINT "SBQ_subproduct_sell_sellUuid_fkey" FOREIGN KEY ("sellUuid") REFERENCES "SBQ_sell"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SBQ_subproduct_sell" ADD CONSTRAINT "SBQ_subproduct_sell_warehouseUuid_fkey" FOREIGN KEY ("warehouseUuid") REFERENCES "SBQ_warehouse"("uuid") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SBQ_sell_taxes" ADD CONSTRAINT "SBQ_sell_taxes_sellUuid_fkey" FOREIGN KEY ("sellUuid") REFERENCES "SBQ_sell"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SBQ_sell_taxes" ADD CONSTRAINT "SBQ_sell_taxes_taxUuid_fkey" FOREIGN KEY ("taxUuid") REFERENCES "SBQ_taxes"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SBQ_subproduct_sell_return" ADD CONSTRAINT "SBQ_subproduct_sell_return_subproductSellUuid_fkey" FOREIGN KEY ("subproductSellUuid") REFERENCES "SBQ_subproduct_sell"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BaseInvoice" ADD CONSTRAINT "BaseInvoice_configInvoiceUuid_fkey" FOREIGN KEY ("configInvoiceUuid") REFERENCES "SBQ_config_invoice"("uuid") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SellBaseInvoice" ADD CONSTRAINT "SellBaseInvoice_cashboxUuid_fkey" FOREIGN KEY ("cashboxUuid") REFERENCES "SBQ_cashbox"("uuid") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SellBaseInvoice" ADD CONSTRAINT "SellBaseInvoice_SellUuid_fkey" FOREIGN KEY ("SellUuid") REFERENCES "SBQ_sell"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SellBaseInvoice" ADD CONSTRAINT "SellBaseInvoice_customerUuid_fkey" FOREIGN KEY ("customerUuid") REFERENCES "SBQ_customer"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SellBaseInvoice" ADD CONSTRAINT "SellBaseInvoice_baseInvoiceUuid_fkey" FOREIGN KEY ("baseInvoiceUuid") REFERENCES "BaseInvoice"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BuyBaseInvoice" ADD CONSTRAINT "BuyBaseInvoice_PurchaseUuid_fkey" FOREIGN KEY ("PurchaseUuid") REFERENCES "SBQ_purchase"("uuid") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BuyBaseInvoice" ADD CONSTRAINT "BuyBaseInvoice_SupplierUuid_fkey" FOREIGN KEY ("SupplierUuid") REFERENCES "SBQ_supplier"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BuyBaseInvoice" ADD CONSTRAINT "BuyBaseInvoice_baseInvoiceUuid_fkey" FOREIGN KEY ("baseInvoiceUuid") REFERENCES "BaseInvoice"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NoteCredit" ADD CONSTRAINT "NoteCredit_NotaDebitUuid_fkey" FOREIGN KEY ("NotaDebitUuid") REFERENCES "NoteDebit"("uuid") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NoteCredit" ADD CONSTRAINT "NoteCredit_SellUuid_fkey" FOREIGN KEY ("SellUuid") REFERENCES "SBQ_sell"("uuid") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NoteCredit" ADD CONSTRAINT "NoteCredit_customerUuid_fkey" FOREIGN KEY ("customerUuid") REFERENCES "SBQ_customer"("uuid") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NoteCredit" ADD CONSTRAINT "NoteCredit_baseInvoiceUuid_fkey" FOREIGN KEY ("baseInvoiceUuid") REFERENCES "BaseInvoice"("uuid") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NoteCredit" ADD CONSTRAINT "NoteCredit_subproductSellUuid_fkey" FOREIGN KEY ("subproductSellUuid") REFERENCES "SBQ_subproduct_sell"("uuid") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NoteCredit" ADD CONSTRAINT "NoteCredit_supplierUuid_fkey" FOREIGN KEY ("supplierUuid") REFERENCES "SBQ_supplier"("uuid") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NoteCredit" ADD CONSTRAINT "NoteCredit_subproductPurchaseUuid_fkey" FOREIGN KEY ("subproductPurchaseUuid") REFERENCES "SBQ_subproduct_purchase"("uuid") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NoteCreditProducts" ADD CONSTRAINT "NoteCreditProducts_noteCreditUuid_fkey" FOREIGN KEY ("noteCreditUuid") REFERENCES "NoteCredit"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NoteCreditProducts" ADD CONSTRAINT "NoteCreditProducts_productUuid_fkey" FOREIGN KEY ("productUuid") REFERENCES "SBQ_product"("uuid") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NoteCreditProducts" ADD CONSTRAINT "NoteCreditProducts_subproductUuid_fkey" FOREIGN KEY ("subproductUuid") REFERENCES "SBQ_subproduct"("uuid") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NoteDebit" ADD CONSTRAINT "NoteDebit_PurchaseUuid_fkey" FOREIGN KEY ("PurchaseUuid") REFERENCES "SBQ_purchase"("uuid") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NoteDebit" ADD CONSTRAINT "NoteDebit_supplierUuid_fkey" FOREIGN KEY ("supplierUuid") REFERENCES "SBQ_supplier"("uuid") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NoteDebit" ADD CONSTRAINT "NoteDebit_subproductPurchaseUuid_fkey" FOREIGN KEY ("subproductPurchaseUuid") REFERENCES "SBQ_subproduct_purchase"("uuid") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NoteDebit" ADD CONSTRAINT "NoteDebit_baseInvoiceUuid_fkey" FOREIGN KEY ("baseInvoiceUuid") REFERENCES "BaseInvoice"("uuid") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NoteDebit" ADD CONSTRAINT "NoteDebit_customerUuid_fkey" FOREIGN KEY ("customerUuid") REFERENCES "SBQ_customer"("uuid") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NoteDebit" ADD CONSTRAINT "NoteDebit_subproductSellUuid_fkey" FOREIGN KEY ("subproductSellUuid") REFERENCES "SBQ_subproduct_sell"("uuid") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NoteDebitProducts" ADD CONSTRAINT "NoteDebitProducts_noteDebitUuid_fkey" FOREIGN KEY ("noteDebitUuid") REFERENCES "NoteDebit"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NoteDebitProducts" ADD CONSTRAINT "NoteDebitProducts_productUuid_fkey" FOREIGN KEY ("productUuid") REFERENCES "SBQ_product"("uuid") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NoteDebitProducts" ADD CONSTRAINT "NoteDebitProducts_subproductUuid_fkey" FOREIGN KEY ("subproductUuid") REFERENCES "SBQ_subproduct"("uuid") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SellLegalInvoice" ADD CONSTRAINT "SellLegalInvoice_baseInvoiceUuid_fkey" FOREIGN KEY ("baseInvoiceUuid") REFERENCES "BaseInvoice"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SellLegalInvoice" ADD CONSTRAINT "SellLegalInvoice_SellUuid_fkey" FOREIGN KEY ("SellUuid") REFERENCES "SBQ_sell"("uuid") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SellLegalInvoice" ADD CONSTRAINT "SellLegalInvoice_subproductSellUuid_fkey" FOREIGN KEY ("subproductSellUuid") REFERENCES "SBQ_subproduct_sell"("uuid") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SBQ_supplier_purchase" ADD CONSTRAINT "SBQ_supplier_purchase_supplierUuid_fkey" FOREIGN KEY ("supplierUuid") REFERENCES "SBQ_supplier"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SBQ_supplier_purchase" ADD CONSTRAINT "SBQ_supplier_purchase_purchaseUuid_fkey" FOREIGN KEY ("purchaseUuid") REFERENCES "SBQ_purchase"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SBQ_buyer_purchase" ADD CONSTRAINT "SBQ_buyer_purchase_buyerUuid_fkey" FOREIGN KEY ("buyerUuid") REFERENCES "SBQ_internal_user"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SBQ_buyer_purchase" ADD CONSTRAINT "SBQ_buyer_purchase_purchaseUuid_fkey" FOREIGN KEY ("purchaseUuid") REFERENCES "SBQ_purchase"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PurchaseLegalInvoice" ADD CONSTRAINT "PurchaseLegalInvoice_purchaseUuid_fkey" FOREIGN KEY ("purchaseUuid") REFERENCES "SBQ_purchase"("uuid") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SBQ_subproduct_purchase" ADD CONSTRAINT "SBQ_subproduct_purchase_subProductUuid_fkey" FOREIGN KEY ("subProductUuid") REFERENCES "SBQ_subproduct"("uuid") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SBQ_subproduct_purchase" ADD CONSTRAINT "SBQ_subproduct_purchase_productUuid_fkey" FOREIGN KEY ("productUuid") REFERENCES "SBQ_product"("uuid") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SBQ_subproduct_purchase" ADD CONSTRAINT "SBQ_subproduct_purchase_purchaseUuid_fkey" FOREIGN KEY ("purchaseUuid") REFERENCES "SBQ_purchase"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SBQ_upcoming_purchase" ADD CONSTRAINT "SBQ_upcoming_purchase_subProductPurchaseUuid_fkey" FOREIGN KEY ("subProductPurchaseUuid") REFERENCES "SBQ_subproduct_purchase"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SBQ_upcoming_purchase" ADD CONSTRAINT "SBQ_upcoming_purchase_warehouse_uuid_fkey" FOREIGN KEY ("warehouse_uuid") REFERENCES "SBQ_warehouse"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SBQ_supplier" ADD CONSTRAINT "SBQ_supplier_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "SBQ_internal_user"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SBQ_supplier_organization" ADD CONSTRAINT "SBQ_supplier_organization_supplier_uuid_fkey" FOREIGN KEY ("supplier_uuid") REFERENCES "SBQ_supplier"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SBQ_supplier_organization" ADD CONSTRAINT "SBQ_supplier_organization_organization_uuid_fkey" FOREIGN KEY ("organization_uuid") REFERENCES "SBQ_organization"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SBQ_category_supplier" ADD CONSTRAINT "SBQ_category_supplier_supplier_uuid_fkey" FOREIGN KEY ("supplier_uuid") REFERENCES "SBQ_supplier"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SBQ_category_supplier" ADD CONSTRAINT "SBQ_category_supplier_categoryUuid_fkey" FOREIGN KEY ("categoryUuid") REFERENCES "SBQ_categories"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SBQ_remisiones" ADD CONSTRAINT "SBQ_remisiones_customerUuid_fkey" FOREIGN KEY ("customerUuid") REFERENCES "SBQ_customer"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SBQ_remisiones" ADD CONSTRAINT "SBQ_remisiones_productUuid_fkey" FOREIGN KEY ("productUuid") REFERENCES "SBQ_product"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SBQ_remisiones" ADD CONSTRAINT "SBQ_remisiones_subProductUuid_fkey" FOREIGN KEY ("subProductUuid") REFERENCES "SBQ_subproduct"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SBQ_remisiones" ADD CONSTRAINT "SBQ_remisiones_vendedorUuid_fkey" FOREIGN KEY ("vendedorUuid") REFERENCES "SBQ_internal_user"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DLPY_backoffice_user_details" ADD CONSTRAINT "DLPY_backoffice_user_details_backoffice_user_uuid_fkey" FOREIGN KEY ("backoffice_user_uuid") REFERENCES "DLPY_backoffice_user"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DLPY_backoffice_user_role" ADD CONSTRAINT "DLPY_backoffice_user_role_backoffice_user_uuid_fkey" FOREIGN KEY ("backoffice_user_uuid") REFERENCES "DLPY_backoffice_user"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SBQ_brand_organization" ADD CONSTRAINT "SBQ_brand_organization_brandUuid_fkey" FOREIGN KEY ("brandUuid") REFERENCES "SBQ_brand"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SBQ_brand_organization" ADD CONSTRAINT "SBQ_brand_organization_organization_uuid_fkey" FOREIGN KEY ("organization_uuid") REFERENCES "SBQ_organization"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SBQ_brand_supplier" ADD CONSTRAINT "SBQ_brand_supplier_supplier_uuid_fkey" FOREIGN KEY ("supplier_uuid") REFERENCES "SBQ_supplier"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SBQ_brand_supplier" ADD CONSTRAINT "SBQ_brand_supplier_brandUuid_fkey" FOREIGN KEY ("brandUuid") REFERENCES "SBQ_brand"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SBQ_brand_product" ADD CONSTRAINT "SBQ_brand_product_product_uuid_fkey" FOREIGN KEY ("product_uuid") REFERENCES "SBQ_product"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SBQ_brand_product" ADD CONSTRAINT "SBQ_brand_product_brandUuid_fkey" FOREIGN KEY ("brandUuid") REFERENCES "SBQ_brand"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SBQ_metas" ADD CONSTRAINT "SBQ_metas_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "SBQ_internal_user"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SBQ_log_history" ADD CONSTRAINT "SBQ_log_history_organization_uuid_fkey" FOREIGN KEY ("organization_uuid") REFERENCES "SBQ_organization"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SBQ_wordpress" ADD CONSTRAINT "SBQ_wordpress_organization_uuid_fkey" FOREIGN KEY ("organization_uuid") REFERENCES "SBQ_organization"("uuid") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SBQ_wordpress" ADD CONSTRAINT "SBQ_wordpress_pos_uuid_fkey" FOREIGN KEY ("pos_uuid") REFERENCES "SBQ_pos"("uuid") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SBQ_bulking_events" ADD CONSTRAINT "SBQ_bulking_events_organization_uuid_fkey" FOREIGN KEY ("organization_uuid") REFERENCES "SBQ_organization"("uuid") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SBQ_bulking_events_failure" ADD CONSTRAINT "SBQ_bulking_events_failure_bulkingEventUuid_fkey" FOREIGN KEY ("bulkingEventUuid") REFERENCES "SBQ_bulking_events"("uuid") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SBQ_config_invoice" ADD CONSTRAINT "SBQ_config_invoice_organization_uuid_fkey" FOREIGN KEY ("organization_uuid") REFERENCES "SBQ_organization"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SBQ_config_invoice" ADD CONSTRAINT "SBQ_config_invoice_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "SBQ_internal_user"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SBQ_config_invoice" ADD CONSTRAINT "SBQ_config_invoice_cashbox_uuid_fkey" FOREIGN KEY ("cashbox_uuid") REFERENCES "SBQ_cashbox"("uuid") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SBQ_config_invoice" ADD CONSTRAINT "SBQ_config_invoice_supplier_uuid_fkey" FOREIGN KEY ("supplier_uuid") REFERENCES "SBQ_supplier"("uuid") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SBQ_invoice_design" ADD CONSTRAINT "SBQ_invoice_design_organization_uuid_fkey" FOREIGN KEY ("organization_uuid") REFERENCES "SBQ_organization"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SBQ_invoice_design" ADD CONSTRAINT "SBQ_invoice_design_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "SBQ_internal_user"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SBQ_invoice_design_styles" ADD CONSTRAINT "SBQ_invoice_design_styles_invoiceDesignUuid_fkey" FOREIGN KEY ("invoiceDesignUuid") REFERENCES "SBQ_invoice_design"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;
