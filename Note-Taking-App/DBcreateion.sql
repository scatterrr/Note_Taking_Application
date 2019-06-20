CREATE TABLE "note_users" (
  "id" SERIAL PRIMARY KEY,
  "username" varchar UNIQUE NOT NULL,
  "password" int NOT NULL
);

CREATE TABLE "note" (
  "id" SERIAL,
  "user_id" int,
  "content" varchar
);

ALTER TABLE "note" ADD FOREIGN KEY ("user_id") REFERENCES "note_users" ("id");
