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
    user_results = [{'username': user.username, 'profile_img': user.profile_img} for user in users]
    video_results = [{'video_title': video.title, 'username': video.user.username, 'thumbnail': video.thumbnail,} for video in videos]

    # Combine the results into a single response
    results = {
        'users': user_results,
        'videos': video_results,
    }

    return jsonify(results)


# Inside search_routes.py

@search_routes.route('/suggestions', methods=['GET'])
def search_suggestions():
    partial_query = request.args.get('query', '')

    # Perform a case-insensitive search for video titles and usernames
    video_titles = Video.query.filter(Video.title.ilike(f'%{partial_query}%')).limit(5).all()
    usernames = User.query.filter(User.username.ilike(f'%{partial_query}%')).limit(5).all()

    # Extract relevant information for suggestions
    video_suggestions = [{'title': video.title} for video in video_titles]
    username_suggestions = [{'username': user.username} for user in usernames]

    suggestions = {
        'video_titles': video_suggestions,
        'usernames': username_suggestions,
    }

    return jsonify(suggestions)
