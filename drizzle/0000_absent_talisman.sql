CREATE TABLE IF NOT EXISTS "bookmarks" (
	"id" uuid PRIMARY KEY NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"title" text NOT NULL,
	"description" text,
	"url" text NOT NULL,
	"image" text,
	"userId" uuid NOT NULL,
	"groupId" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "groups" (
	"id" uuid PRIMARY KEY NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"name" text NOT NULL,
	"slug" text NOT NULL,
	"userId" uuid NOT NULL,
	CONSTRAINT "groups_slug_userId_unique" UNIQUE("slug","userId")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"id" uuid PRIMARY KEY NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"username" text,
	"email" text NOT NULL,
	"provider" text NOT NULL,
	CONSTRAINT "users_username_unique" UNIQUE("username"),
	CONSTRAINT "users_provider_email_unique" UNIQUE("provider","email"),
	CONSTRAINT "users_id_email_unique" UNIQUE("id","email")
);
