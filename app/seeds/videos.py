from app.models import db, Video, environment, SCHEMA
from sqlalchemy.sql import text

def seed_videos():
    video1 = Video(
        title='Stewie2K - The Smoke Criminal (CS:GO)',
        description='SEN Tarik is the 1st one to get an ace in counter strike 2 beta. He shows his insane one tap skill and no one can stop him. POG ',
        category='Counter-Strike',
        url="https://utube-bucket.s3.amazonaws.com/37c557b75b22494a8d7895e5d4beb46e.jpeg",
        thumbnail="https://utube-bucket.s3.amazonaws.com/stewie-thumbnail.jpeg",
        user_id=1
    )

    video2 = Video(
        title='Stewie2K - The Smoke Criminal (CS:GO)',
        description='SEN Tarik is the 1st one to get an ace in counter strike 2 beta. He shows his insane one tap skill and no one can stop him. POG ',
        category='Counter-Strike',
        url="https://utube-bucket.s3.amazonaws.com/37c557b75b22494a8d7895e5d4beb46e.jpeg",
        thumbnail="https://utube-bucket.s3.amazonaws.com/stewie-thumbnail.jpeg",
        user_id=1
    )

    video3 = Video(
        title='Stewie2K - The Smoke Criminal (CS:GO)',
        description='SEN Tarik is the 1st one to get an ace in counter strike 2 beta. He shows his insane one tap skill and no one can stop him. POG ',
        category='Counter-Strike',
        url="https://utube-bucket.s3.amazonaws.com/37c557b75b22494a8d7895e5d4beb46e.jpeg",
        thumbnail="https://utube-bucket.s3.amazonaws.com/stewie-thumbnail.jpeg",
        user_id=1
    )

    video4 = Video(
        title='Stewie2K - The Smoke Criminal (CS:GO)',
        description='SEN Tarik is the 1st one to get an ace in counter strike 2 beta. He shows his insane one tap skill and no one can stop him. POG ',
        category='Counter-Strike',
        url="https://utube-bucket.s3.amazonaws.com/37c557b75b22494a8d7895e5d4beb46e.jpeg",
        thumbnail="https://utube-bucket.s3.amazonaws.com/stewie-thumbnail.jpeg",
        user_id=1
    )

    video5 = Video(
        title='Stewie2K - The Smoke Criminal (CS:GO)',
        description='SEN Tarik is the 1st one to get an ace in counter strike 2 beta. He shows his insane one tap skill and no one can stop him. POG ',
        category='Counter-Strike',
        url="https://utube-bucket.s3.amazonaws.com/37c557b75b22494a8d7895e5d4beb46e.jpeg",
        thumbnail="https://utube-bucket.s3.amazonaws.com/stewie-thumbnail.jpeg",
        user_id=1
    )

    video6 = Video(
        title='CS:GO vs VALORANT',
        description='Official music video for The Weeknd “Die For You”, from Starboy available everywhere now: http://theweeknd.co/Starboy',
        category='Counter-Strike',
        url="https://utube-bucket.s3.amazonaws.com/69edaf4268f04b4fab77800ca1b386d5.jpeg",
        thumbnail="https://utube-bucket.s3.amazonaws.com/csgovsval-thumbnail.jpeg",
        user_id=2
    )

    video7 = Video(
        title='CS:GO vs VALORANT',
        description='Official music video for The Weeknd “Die For You”, from Starboy available everywhere now: http://theweeknd.co/Starboy',
        category='Counter-Strike',
        url="https://utube-bucket.s3.amazonaws.com/69edaf4268f04b4fab77800ca1b386d5.jpeg",
        thumbnail="https://utube-bucket.s3.amazonaws.com/csgovsval-thumbnail.jpeg",
        user_id=2
    )

    video8 = Video(
        title='CS:GO vs VALORANT',
        description='Official music video for The Weeknd “Die For You”, from Starboy available everywhere now: http://theweeknd.co/Starboy',
        category='Counter-Strike',
        url="https://utube-bucket.s3.amazonaws.com/69edaf4268f04b4fab77800ca1b386d5.jpeg",
        thumbnail="https://utube-bucket.s3.amazonaws.com/csgovsval-thumbnail.jpeg",
        user_id=2
    )

    video9 = Video(
        title='CS:GO vs VALORANT',
        description='Official music video for The Weeknd “Die For You”, from Starboy available everywhere now: http://theweeknd.co/Starboy',
        category='Counter-Strike',
        url="https://utube-bucket.s3.amazonaws.com/69edaf4268f04b4fab77800ca1b386d5.jpeg",
        thumbnail="https://utube-bucket.s3.amazonaws.com/csgovsval-thumbnail.jpeg",
        user_id=2
    )

    video10 = Video(
        title='CS:GO vs VALORANT',
        description='Official music video for The Weeknd “Die For You”, from Starboy available everywhere now: http://theweeknd.co/Starboy',
        category='Counter-Strike',
        url="https://utube-bucket.s3.amazonaws.com/69edaf4268f04b4fab77800ca1b386d5.jpeg",
        thumbnail="https://utube-bucket.s3.amazonaws.com/csgovsval-thumbnail.jpeg",
        user_id=2
    )

    video11 = Video(
        title='CS:GO | Adil "ScreaM" Benrlitom - Headshot Machine Movie',
        description='36 Times Aceu or Brandon Has Taken Over In Radiant Ranked Lobbies, Best Moments for Aceu. 36 Times He Has Shook the Entire Lobby With His Superior Knowledge In Movement and Quick Thinking Coming From Apex Legends. ',
        category='Counter-Strike',
        url="https://utube-bucket.s3.amazonaws.com/1bfe95f602994788aa20b3b832ab641f.jpeg",
        thumbnail="https://utube-bucket.s3.amazonaws.com/scream-thumbnail.jpeg",
        user_id=3
    )

    video12 = Video(
        title='CS:GO | Adil "ScreaM" Benrlitom - Headshot Machine Movie',
        description='36 Times Aceu or Brandon Has Taken Over In Radiant Ranked Lobbies, Best Moments for Aceu. 36 Times He Has Shook the Entire Lobby With His Superior Knowledge In Movement and Quick Thinking Coming From Apex Legends. ',
        category='Counter-Strike',
        url="https://utube-bucket.s3.amazonaws.com/1bfe95f602994788aa20b3b832ab641f.jpeg",
        thumbnail="https://utube-bucket.s3.amazonaws.com/scream-thumbnail.jpeg",
        user_id=3
    )

    video13 = Video(
        title='CS:GO | Adil "ScreaM" Benrlitom - Headshot Machine Movie',
        description='36 Times Aceu or Brandon Has Taken Over In Radiant Ranked Lobbies, Best Moments for Aceu. 36 Times He Has Shook the Entire Lobby With His Superior Knowledge In Movement and Quick Thinking Coming From Apex Legends. ',
        category='Counter-Strike',
        url="https://utube-bucket.s3.amazonaws.com/1bfe95f602994788aa20b3b832ab641f.jpeg",
        thumbnail="https://utube-bucket.s3.amazonaws.com/scream-thumbnail.jpeg",
        user_id=3
    )

    video14 = Video(
        title='CS:GO | Adil "ScreaM" Benrlitom - Headshot Machine Movie',
        description='36 Times Aceu or Brandon Has Taken Over In Radiant Ranked Lobbies, Best Moments for Aceu. 36 Times He Has Shook the Entire Lobby With His Superior Knowledge In Movement and Quick Thinking Coming From Apex Legends. ',
        category='Counter-Strike',
        url="https://utube-bucket.s3.amazonaws.com/1bfe95f602994788aa20b3b832ab641f.jpeg",
        thumbnail="https://utube-bucket.s3.amazonaws.com/scream-thumbnail.jpeg",
        user_id=3
    )

    video15 = Video(
        title='CS:GO | Adil "ScreaM" Benrlitom - Headshot Machine Movie',
        description='36 Times Aceu or Brandon Has Taken Over In Radiant Ranked Lobbies, Best Moments for Aceu. 36 Times He Has Shook the Entire Lobby With His Superior Knowledge In Movement and Quick Thinking Coming From Apex Legends. ',
        category='Counter-Strike',
        url="https://utube-bucket.s3.amazonaws.com/1bfe95f602994788aa20b3b832ab641f.jpeg",
        thumbnail="https://utube-bucket.s3.amazonaws.com/scream-thumbnail.jpeg",
        user_id=3
    )

    db.session.add_all([video1, video2, video3, video4, video5, video6, video7, video8, video9, video10, video11, video12, video13, video14, video15])
    db.session.commit()


def undo_videos():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.videos RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM videos"))

    db.session.commit()
