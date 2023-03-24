from flask.cli import AppGroup
from .users import seed_users, undo_users
from .videos import seed_videos, undo_videos
from .comments import seed_comments, undo_comments

from app.models.db import db, environment, SCHEMA


# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    if environment == 'production':
        # Before seeding, truncate all tables prefixed with schema name
        # Add a truncate command here for every table that will be seeded.
        undo_comments()
        undo_videos()
        undo_users()
    seed_users()
    seed_videos()
    seed_comments()
    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_users()
    undo_videos()
    undo_comments()
    # Add other undo functions here
