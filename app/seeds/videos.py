from app.models import db, Video, environment, SCHEMA
from sqlalchemy.sql import text

def seed_videos():
    video1 = Video(
        title='Tarik is the 1st Player to get an ACE in CS:GO 2',
        description='SEN Tarik is the 1st one to get an ace in counter strike 2 beta. He shows his insane one tap skill and no one can stop him. POG ',
        category='Counter-Strike',
        url='https://www.youtube.com/watch?v=mvfMfuKymek',
        thumbnail='https://i.pinimg.com/564x/29/d8/23/29d82377df2655df17b4fbab048675c8.jpg',
        user_id=1
    )

    video2 = Video(
        title='Tarik is the 1st Player to get an ACE in CS:GO 2',
        description='SEN Tarik is the 1st one to get an ace in counter strike 2 beta. He shows his insane one tap skill and no one can stop him. POG ',
        category='Counter-Strike',
        url='https://www.youtube.com/watch?v=mvfMfuKymek',
        thumbnail='https://i.pinimg.com/564x/29/d8/23/29d82377df2655df17b4fbab048675c8.jpg',
        user_id=1
    )

    video3 = Video(
        title='Tarik is the 1st Player to get an ACE in CS:GO 2',
        description='SEN Tarik is the 1st one to get an ace in counter strike 2 beta. He shows his insane one tap skill and no one can stop him. POG ',
        category='Counter-Strike',
        url='https://www.youtube.com/watch?v=mvfMfuKymek',
        thumbnail='https://i.pinimg.com/564x/29/d8/23/29d82377df2655df17b4fbab048675c8.jpg',
        user_id=1
    )

    video4 = Video(
        title='Tarik is the 1st Player to get an ACE in CS:GO 2',
        description='SEN Tarik is the 1st one to get an ace in counter strike 2 beta. He shows his insane one tap skill and no one can stop him. POG ',
        category='Counter-Strike',
        url='https://www.youtube.com/watch?v=mvfMfuKymek',
        thumbnail='https://i.pinimg.com/564x/29/d8/23/29d82377df2655df17b4fbab048675c8.jpg',
        user_id=1
    )

    video5 = Video(
        title='Tarik is the 1st Player to get an ACE in CS:GO 2',
        description='SEN Tarik is the 1st one to get an ace in counter strike 2 beta. He shows his insane one tap skill and no one can stop him. POG ',
        category='Counter-Strike',
        url='https://www.youtube.com/watch?v=mvfMfuKymek',
        thumbnail='https://i.pinimg.com/564x/29/d8/23/29d82377df2655df17b4fbab048675c8.jpg',
        user_id=1
    )

    video6 = Video(
        title='The Weeknd - Die For You (Official Music Video)',
        description='Official music video for The Weeknd “Die For You”, from Starboy available everywhere now: http://theweeknd.co/Starboy',
        category='Music',
        url='https://www.youtube.com/watch?v=uPD0QOGTmMI&list=OLAK5uy_lIh621OMo4dgezJVXJ1d_zVHeClb6RYRU&index=17',
        thumbnail='https://i.pinimg.com/236x/07/38/7e/07387e74024f620b6a7cc76087585fe3.jpg',
        user_id=2
    )

    video7 = Video(
        title='The Weeknd - Die For You (Official Music Video)',
        description='Official music video for The Weeknd “Die For You”, from Starboy available everywhere now: http://theweeknd.co/Starboy',
        category='Music',
        url='https://www.youtube.com/watch?v=uPD0QOGTmMI&list=OLAK5uy_lIh621OMo4dgezJVXJ1d_zVHeClb6RYRU&index=17',
        thumbnail='https://i.pinimg.com/236x/07/38/7e/07387e74024f620b6a7cc76087585fe3.jpg',
        user_id=2
    )

    video8 = Video(
        title='The Weeknd - Die For You (Official Music Video)',
        description='Official music video for The Weeknd “Die For You”, from Starboy available everywhere now: http://theweeknd.co/Starboy',
        category='Music',
        url='https://www.youtube.com/watch?v=uPD0QOGTmMI&list=OLAK5uy_lIh621OMo4dgezJVXJ1d_zVHeClb6RYRU&index=17',
        thumbnail='https://i.pinimg.com/236x/07/38/7e/07387e74024f620b6a7cc76087585fe3.jpg',
        user_id=2
    )

    video9 = Video(
        title='The Weeknd - Die For You (Official Music Video)',
        description='Official music video for The Weeknd “Die For You”, from Starboy available everywhere now: http://theweeknd.co/Starboy',
        category='Music',
        url='https://www.youtube.com/watch?v=uPD0QOGTmMI&list=OLAK5uy_lIh621OMo4dgezJVXJ1d_zVHeClb6RYRU&index=17',
        thumbnail='https://i.pinimg.com/236x/07/38/7e/07387e74024f620b6a7cc76087585fe3.jpg',
        user_id=2
    )

    video10 = Video(
        title='The Weeknd - Die For You (Official Music Video)',
        description='Official music video for The Weeknd “Die For You”, from Starboy available everywhere now: http://theweeknd.co/Starboy',
        category='Music',
        url='https://www.youtube.com/watch?v=uPD0QOGTmMI&list=OLAK5uy_lIh621OMo4dgezJVXJ1d_zVHeClb6RYRU&index=17',
        thumbnail='https://i.pinimg.com/236x/07/38/7e/07387e74024f620b6a7cc76087585fe3.jpg',
        user_id=2
    )

    video11 = Video(
        title='36 Times Aceu "Apex God" Takes Over Radiant Ranked Lobbies',
        description='36 Times Aceu or Brandon Has Taken Over In Radiant Ranked Lobbies, Best Moments for Aceu. 36 Times He Has Shook the Entire Lobby With His Superior Knowledge In Movement and Quick Thinking Coming From Apex Legends. ',
        category='Valorant',
        url='https://www.youtube.com/watch?v=LZUB-lRXKBM',
        thumbnail='https://i.pinimg.com/236x/bb/03/1b/bb031bdb63f0fde57debe688ce7d6338.jpg',
        user_id=3
    )

    video12 = Video(
        title='36 Times Aceu "Apex God" Takes Over Radiant Ranked Lobbies',
        description='36 Times Aceu or Brandon Has Taken Over In Radiant Ranked Lobbies, Best Moments for Aceu. 36 Times He Has Shook the Entire Lobby With His Superior Knowledge In Movement and Quick Thinking Coming From Apex Legends. ',
        category='Valorant',
        url='https://www.youtube.com/watch?v=LZUB-lRXKBM',
        thumbnail='https://i.pinimg.com/236x/bb/03/1b/bb031bdb63f0fde57debe688ce7d6338.jpg',
        user_id=3
    )

    video13 = Video(
        title='36 Times Aceu "Apex God" Takes Over Radiant Ranked Lobbies',
        description='36 Times Aceu or Brandon Has Taken Over In Radiant Ranked Lobbies, Best Moments for Aceu. 36 Times He Has Shook the Entire Lobby With His Superior Knowledge In Movement and Quick Thinking Coming From Apex Legends. ',
        category='Valorant',
        url='https://www.youtube.com/watch?v=LZUB-lRXKBM',
        thumbnail='https://i.pinimg.com/236x/bb/03/1b/bb031bdb63f0fde57debe688ce7d6338.jpg',
        user_id=3
    )

    video14 = Video(
        title='36 Times Aceu "Apex God" Takes Over Radiant Ranked Lobbies',
        description='36 Times Aceu or Brandon Has Taken Over In Radiant Ranked Lobbies, Best Moments for Aceu. 36 Times He Has Shook the Entire Lobby With His Superior Knowledge In Movement and Quick Thinking Coming From Apex Legends. ',
        category='Valorant',
        url='https://www.youtube.com/watch?v=LZUB-lRXKBM',
        thumbnail='https://i.pinimg.com/236x/bb/03/1b/bb031bdb63f0fde57debe688ce7d6338.jpg',
        user_id=3
    )

    video15 = Video(
        title='36 Times Aceu "Apex God" Takes Over Radiant Ranked Lobbies',
        description='36 Times Aceu or Brandon Has Taken Over In Radiant Ranked Lobbies, Best Moments for Aceu. 36 Times He Has Shook the Entire Lobby With His Superior Knowledge In Movement and Quick Thinking Coming From Apex Legends. ',
        category='Valorant',
        url='https://www.youtube.com/watch?v=LZUB-lRXKBM',
        thumbnail='https://i.pinimg.com/236x/bb/03/1b/bb031bdb63f0fde57debe688ce7d6338.jpg',
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
