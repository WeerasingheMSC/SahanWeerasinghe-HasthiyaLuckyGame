#!/bin/bash

# Database Setup Script for Hasthiya Lucky 4
# This script automates the database setup process

set -e  # Exit on error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Database configuration
DB_NAME="Lucky_4"
MIGRATIONS_DIR="./migrations"
SEEDS_DIR="./seeds"

echo -e "${GREEN}=====================================${NC}"
echo -e "${GREEN}Hasthiya Lucky 4 - Database Setup${NC}"
echo -e "${GREEN}=====================================${NC}\n"

# Check if MySQL is installed
if ! command -v mysql &> /dev/null; then
    echo -e "${RED}Error: MySQL is not installed or not in PATH${NC}"
    exit 1
fi

echo -e "${YELLOW}Please enter MySQL root password:${NC}"
read -s MYSQL_PASSWORD

# Test MySQL connection
echo -e "\n${YELLOW}Testing MySQL connection...${NC}"
if mysql -u root -p"$MYSQL_PASSWORD" -e "SELECT 1;" &> /dev/null; then
    echo -e "${GREEN}✓ MySQL connection successful${NC}\n"
else
    echo -e "${RED}✗ MySQL connection failed. Please check your password.${NC}"
    exit 1
fi

# Run initial migration
echo -e "${YELLOW}Running database migration...${NC}"
if mysql -u root -p"$MYSQL_PASSWORD" < "$MIGRATIONS_DIR/001_initial_setup.sql"; then
    echo -e "${GREEN}✓ Migration completed successfully${NC}\n"
else
    echo -e "${RED}✗ Migration failed${NC}"
    exit 1
fi

# Ask if user wants to load seed data
echo -e "${YELLOW}Do you want to load seed data? (y/n)${NC}"
read -r LOAD_SEEDS

if [ "$LOAD_SEEDS" = "y" ] || [ "$LOAD_SEEDS" = "Y" ]; then
    echo -e "${YELLOW}Loading seed data...${NC}"
    if mysql -u root -p"$MYSQL_PASSWORD" "$DB_NAME" < "$SEEDS_DIR/seed.sql"; then
        echo -e "${GREEN}✓ Seed data loaded successfully${NC}\n"
    else
        echo -e "${RED}✗ Seed data loading failed${NC}"
        exit 1
    fi
fi

# Verify setup
echo -e "${YELLOW}Verifying database setup...${NC}"
GAME_COUNT=$(mysql -u root -p"$MYSQL_PASSWORD" -N -e "USE $DB_NAME; SELECT COUNT(*) FROM games;")
echo -e "${GREEN}✓ Database '$DB_NAME' is ready${NC}"
echo -e "${GREEN}✓ Found $GAME_COUNT games in database${NC}\n"

echo -e "${GREEN}=====================================${NC}"
echo -e "${GREEN}Database setup completed successfully!${NC}"
echo -e "${GREEN}=====================================${NC}\n"

echo -e "${YELLOW}Next steps:${NC}"
echo -e "1. Update your .env file with database credentials"
echo -e "2. Start the backend server: npm run dev"
echo -e "3. Test the connection: curl http://localhost:3000/api/test-db\n"
