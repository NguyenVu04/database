@echo off
psql -h localhost -d postgres -U postgres -p 5432 -a -q -f ./drizzle/0000_flashy_sprite.sql >nul 2>>db.error.log
echo INITIALIZE DATABASE SUCCESSFULLY
pause