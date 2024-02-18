from flask import Blueprint, request, jsonify
from app.models import Video, User, db
from .aws_helpers import upload_url_file_to_s3, upload_thumbnail_file_to_s3, get_unique_filename
from flask_login import current_user, login_required
from app.forms import VideoForm

# Assuming you have a Flask route or controller function for handling searches
search_routes = Blueprint("search", __name__)
@search_routes.route('/', methods=['GET'])
def search():
    print("hello")
    search_query = request.args.get('query', '')  # Assuming the search query is passed as a query parameter

    # Use SQLAlchemy's `ilike` for case-insensitive search
    users = User.query.filter(User.username.ilike(f'%{search_query}%')).all()
    videos = Video.query.filter(Video.title.ilike(f'%{search_query}%')).all()

    # Convert the results to a list of dictionaries
    user_results = [{'username': user.username} for user in users]
    video_results = [{'video_title': video.title, 'username': video.user.username} for video in videos]

    # Combine the results into a single response
    results = {
        'users': user_results,
        'videos': video_results,
    }

    return jsonify(results)
