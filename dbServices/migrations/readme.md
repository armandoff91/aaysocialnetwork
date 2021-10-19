user schema migration:
1) check schema version each time user login in
2) if not === newest, run migrations
3) if extra info is needed, save default first, then redirect to profile page for users to key in.

how to write migration:
try: migrate-mongoose