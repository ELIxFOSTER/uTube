from flask import Blueprint
from app.models import Video, db


video_routes = Blueprint("video", __name__)



#* Get all Videos *#
@video_routes.route('/')
def get_all_videos():
    all_videos = Video.query.all()
    return [video.to_dict() for video in all_videos]
