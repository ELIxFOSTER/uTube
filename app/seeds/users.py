from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        firstName='Demo', lastName='User', profile_img='https://utube-bucket.s3.us-west-1.amazonaws.com/2a68a53513d5462284b8c0bd11c9773a.jpeg', username='Demo', email='demo@aa.io', password='password')
    vevo = User(
       firstName='Vevo', lastName='Tv', profile_img='https://utube-bucket.s3.us-west-1.amazonaws.com/99c103a796bd46ccbe98dd16491090eb.jpeg', username='vevo', email='vevo@aa.io', password='password')
    shroud = User(
        firstName='Michael', lastName='Grzesiek', profile_img='https://utube-bucket.s3.us-west-1.amazonaws.com/196b4e083df8448d8ceea85dcbe07683.jpeg', username='shroud', email='shroud@aa.io', password='password')
    tarik = User(
        firstName='tarik', lastName='celik', profile_img='https://utube-bucket.s3.us-west-1.amazonaws.com/a8f9ebb499bd406d8ee98ded5bc0fce5.jpeg', username='tarik', email='tarik@aa.io', password='password')
    gq = User(
        firstName='GQ', lastName='Magazine', profile_img='https://utube-bucket.s3.us-west-1.amazonaws.com/6c57d3a96c404f198013f097b16e5ac8.jpeg', username='GQ', email='gq@aa.io', password='password')
    bp = User(
        firstName='BLACKPINK', lastName='Music Group', profile_img="https://utube-bucket.s3.amazonaws.com/2047cb4d5ecf49d7a6d0d3bcaff07979.jpeg", username='BLACKPINK', email='blackpink@aa.io', password='password')
    random = User(
        firstName='random', lastName='user', profile_img='https://utube-bucket.s3.us-west-1.amazonaws.com/1f23ec195d0d479a8b79c85357d8718c.jpeg', username='random-user-3', email='randomuser3@aa.io', password='password')
    riot = User(
        firstName='Riot', lastName='Games', profile_img='https://utube-bucket.s3.us-west-1.amazonaws.com/riotpfp.png', username='Riot Games', email='riotgames@aa.io', password='password')

    db.session.add(demo)
    db.session.add(gq)
    db.session.add(vevo)
    db.session.add(shroud)
    db.session.add(tarik)
    db.session.add(random)
    db.session.add(riot)
    db.session.add(bp)
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
