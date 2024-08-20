from app.models import db, Video, environment, SCHEMA
from sqlalchemy.sql import text

def seed_videos():
    video1 = Video(
        title="EPIC GRAND FINAL ! Sentinels vs Fnatic - HIGHLIGHTS | VCT Stage 2 Masters - Reykjavík",
        description="VCT Stage 2 Masters - Reykjavík | sentinels vs fnatic ALL MAPS HIGHLIGHTS",
        category='Valorant',
        url='https://utube-bucket.s3.us-west-1.amazonaws.com/mastersGrandFinal.mp4',
        thumbnail="https://utube-bucket.s3.us-west-1.amazonaws.com/newvalthumbnail.jpeg",
        user_id=8
    )
    video2 = Video(
        title="Best Duelist Player in the World!? - LEV Aspas [NA] # MatchMVP",
        description="Only MATCH MVP games at the highest rank!",
        category='Valorant',
        url='https://utube-bucket.s3.us-west-1.amazonaws.com/aspasvid.mp4',
        thumbnail="https://utube-bucket.s3.us-west-1.amazonaws.com/aspasthumbnail.jpeg",
        user_id=8
    )
    video3 = Video(
        title="Pharrell's Skincare Routine for a Youthful Look | GQ",
        description="Pharrell is a man who understands the importance of skincare.",
        category='Interview',
        url='https://utube-bucket.s3.us-west-1.amazonaws.com/8ccbf386a6e1446ba492f72a2e9e04ad.jpeg',
        thumbnail="https://utube-bucket.s3.us-west-1.amazonaws.com/pharellthumbnail.jpeg",
        user_id=2
    )
    video4 = Video(
        title="A$AP Rocky - L$D (Explicit - Official Video)",
        description='Official Video for ”L$D (Explicit)” by A$AP Rocky',
        category='Music',
        url='https://utube-bucket.s3.us-west-1.amazonaws.com/5a510561b9434aa598b61d8f06d474d2.jpeg',
        thumbnail="https://utube-bucket.s3.us-west-1.amazonaws.com/lsdthumbnail.jpeg",
        user_id=3
    )

    video5 = Video(
        title='Juice WRLD - Robbery (Directed by Cole Bennett)',
        description='Lyrical Lemonade Presents',
        category='Music',
        url="https://utube-bucket.s3.amazonaws.com/43fcea07723c497aa65c157d07ebf9d6.jpeg",
        thumbnail="https://utube-bucket.s3.amazonaws.com/robberythumbnail.jpeg",
        user_id=3
    )

    video6 = Video(
        title='Playboi Carti - wokeuplikethis* ft. Lil Uzi Vert (Official Video)',
        description='self titled * + very first * + carti season *',
        category='Music',
        url="https://utube-bucket.s3.amazonaws.com/0b25a26ae16744c2920db07ae539f576.jpeg",
        thumbnail="https://utube-bucket.s3.amazonaws.com/wokeupthumbnail.jpeg",
        user_id=3
    )

    video7 = Video(
        title="Creepin' (Remix) (Official Video)",
        description='Music video by Metro Boomin, The Weeknd, 21 Savage, Diddy performing Creepin',
        category='Music',
        url="https://utube-bucket.s3.amazonaws.com/f5e19c4b6d124a2cb0c268c53c375cd1.jpeg",
        thumbnail="https://utube-bucket.s3.amazonaws.com/creepinthumbnail.jpeg",
        user_id=3
    )

    video8 = Video(
        title='Post Malone - Congratulations ft. Quavo',
        description='Congratulations ft. Quavo (Official Video)',
        category='Music',
        url="https://utube-bucket.s3.amazonaws.com/a1657c9bde464d139bdcecd5cd737160.jpeg",
        thumbnail="https://utube-bucket.s3.amazonaws.com/congrthumbnail.jpeg",
        user_id=3
    )

    video9 = Video(
        title='Travis Scott - goosebumps ft. Kendrick Lamar',
        description='Official music video for The Weeknd “Die For You”, from Starboy available everywhere now: http://theweeknd.co/Starboy',
        category='Music',
        url="https://utube-bucket.s3.us-west-1.amazonaws.com/98e011ea37ed4b3ab9224f60e43c9a74.jpeg",
        thumbnail="https://utube-bucket.s3.amazonaws.com/goosethumbnail.jpeg",
        user_id=3
    )

    video10 = Video(
        title='Lil Baby - Woah (Official Music Video)',
        description='www.qualitycontrolmusic.com',
        category='Music',
        url="https://utube-bucket.s3.amazonaws.com/515b24caa22442eb9e81fa2d2ede64d4.jpeg",
        thumbnail="https://utube-bucket.s3.amazonaws.com/woahthumbnail.jpeg",
        user_id=3
    )

    video11 = Video(
        title="BLACKPINK - 'Kill This Love' M/Vs",
        description='BLACKPINK - Kill This Love',
        category='Music',
        url="https://utube-bucket.s3.amazonaws.com/061a0b19066948dc93db0fdf99c7f55f.jpeg",
        thumbnail="https://utube-bucket.s3.amazonaws.com/kill.jpeg",
        user_id=7
    )

    video12 = Video(
        title="BLACKPINK - 'How You Like That' DANCE PERFORMANCE VIDEO",
        description='MORE INFO ABOUT DANCE COVER CONTEST',
        category='Music',
        url="https://utube-bucket.s3.amazonaws.com/3f2e168b4f0d48349de1fa7f8eb1f882.jpeg",
        thumbnail="https://utube-bucket.s3.amazonaws.com/bp1thumbnail.jpeg",
        user_id=7
    )

    video13 = Video(
        title="BLACKPINK - '마지막처럼 (AS IF IT'S YOUR LAST)' M/V",
        description="BLACKPINK - 마지막처럼 (AS IF IT'S YOUR LAST)",
        category='Music',
        url="https://utube-bucket.s3.amazonaws.com/2daef46262ce4ca9a845be0dfe2702bf.jpeg",
        thumbnail="https://utube-bucket.s3.amazonaws.com/mvthumbnail.jpeg",
        user_id=7
    )

    video14 = Video(
        title='Ice Spice, Lil Tjay - Gangsta Boo (Music Video)',
        description='Fan-made video for Gangsta Boo by Ice Spice and Lil Tjay ',
        category='Music',
        url="https://utube-bucket.s3.amazonaws.com/52261106cbf54e878f83eea198021a53.jpeg",
        thumbnail="https://utube-bucket.s3.amazonaws.com/icethumbnail.jpeg",
        user_id=3
    )

    video15 = Video(
        title='99 Magic Fire Surge Pking',
        description='New surge spells came out with the dragon slayer 2 quest. So I went pure pking with level 99 magic and 99 strength, very overpowered! DMM pking also',
        category='Music',
        url="https://utube-bucket.s3.amazonaws.com/1e0213355fa14e2296d25f1a83787f9f.jpeg",
        thumbnail="https://utube-bucket.s3.amazonaws.com/99thumbnail.jpeg",
        user_id=1
    )

    video16 = Video(
        title='OSRS Pking Guide (In Depth) Tips/Tricks',
        description='Most highly requested video, hope it helps you out.',
        category='Runescape',
        url="https://utube-bucket.s3.amazonaws.com/3d5edb9ffcda45f38af7b55291a005e5.jpeg",
        thumbnail="https://utube-bucket.s3.amazonaws.com/pkguidethumbnail.jpeg",
        user_id=1
    )

    video17 = Video(
        title='Cloud9 vs FaZe at ELEAGUE Major 2018 Grand Finals Map 3',
        description='I do not take credit for the game play I post, uploaded VODs are for archiving and educational purposes, all credits go to the respective players.',
        category='Counter-Strike',
        url="https://utube-bucket.s3.amazonaws.com/3ff4af4b24a144dda156e4e7c341d701.jpeg",
        thumbnail="https://utube-bucket.s3.amazonaws.com/c9thumbnail.jpeg",
        user_id=1
    )

    db.session.add_all([video1, video2, video3, video4, video5, video6, video7, video8, video9, video10, video11, video12, video13, video14, video15, video16, video17])
    db.session.commit()


def undo_videos():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.videos RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM videos"))

    db.session.commit()
