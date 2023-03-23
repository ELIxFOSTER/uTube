from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        firstName='Demo', lastName='User', profile_img='https://i.pinimg.com/236x/6c/62/40/6c62407bbbfc6cf3ed78a564a67acc7a.jpg', username='Demo', email='demo@aa.io', password='password')
    marnie = User(
       firstName='Marnie', lastName='May', profile_img='https://i.pinimg.com/236x/52/6d/76/526d769b9d87fd5e37ea6762ea8579dd.jpg', username='marnie', email='marnie@aa.io', password='password')
    bobbie = User(
        firstName='Bobbie', lastName='Brown', profile_img='https://i.pinimg.com/236x/37/fb/e8/37fbe8a3bf13aa8dfbe008afd92f9e83.jpg', username='bobbie', email='bobbie@aa.io', password='password')

    db.session.add(demo)
    db.session.add(marnie)
    db.session.add(bobbie)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM users"))

    db.session.commit()
