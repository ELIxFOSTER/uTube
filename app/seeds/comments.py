from app.models import db, Comment, environment, SCHEMA
from datetime import datetime
from sqlalchemy.sql import text

def seed_comments():
    comment1 = Comment(
        comment_text='This video was crazy',
        video_id=1,
        user_id=6,
        created_at=datetime.now(),
        updated_at=datetime.now()
    )

    comment2 = Comment(
        comment_text='Wow amazing',
        video_id=1,
        user_id=6,
        created_at=datetime.now(),
        updated_at=datetime.now()
    )

    comment3 = Comment(
        comment_text='Who edited this video?',
        video_id=1,
        user_id=6,
        created_at=datetime.now(),
        updated_at=datetime.now()
    )

    comment4 = Comment(
        comment_text='So trash',
        video_id=2,
        user_id=6,
        created_at=datetime.now(),
        updated_at=datetime.now()
    )

    comment5 = Comment(
        comment_text='I love you!!! PLEASE SEE MY COMMENT',
        video_id=2,
        user_id=6,
        created_at=datetime.now(),
        updated_at=datetime.now()
    )

    comment6 = Comment(
        comment_text='Im a hater, you suck!',
        video_id=2,
        user_id=6,
        created_at=datetime.now(),
        updated_at=datetime.now()
    )

    comment7 = Comment(
        comment_text='Pfffffff',
        video_id=4,
        user_id=6,
        created_at=datetime.now(),
        updated_at=datetime.now()
    )

    comment8 = Comment(
        comment_text='AYO?',
        video_id=15,
        user_id=6,
        created_at=datetime.now(),
        updated_at=datetime.now()
    )

    comment9 = Comment(
        comment_text='SHEEEEEEEEEESH',
        video_id=7,
        user_id=6,
        created_at=datetime.now(),
        updated_at=datetime.now()
    )

    comment10 = Comment(
        comment_text='lmfao',
        video_id=10,
        user_id=6,
        created_at=datetime.now(),
        updated_at=datetime.now()
    )

    comment11 = Comment(
        comment_text='Im a robot',
        video_id=6,
        user_id=6,
        created_at=datetime.now(),
        updated_at=datetime.now()
    )

    comment12 = Comment(
        comment_text='yooo',
        video_id=11,
        user_id=6,
        created_at=datetime.now(),
        updated_at=datetime.now()
    )

    comment13 = Comment(
        comment_text='Hi',
        video_id=11,
        user_id=6,
        created_at=datetime.now(),
        updated_at=datetime.now()
    )



    db.session.add_all([comment1, comment2, comment3, comment4, comment5, comment6, comment7, comment8, comment9, comment10, comment11, comment12, comment13])
    db.session.commit()


def undo_comments():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.comments RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM comments"))

    db.session.commit()
