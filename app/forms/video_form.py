from flask_wtf import FlaskForm
from flask_wtf.file import FileField, FileAllowed, FileRequired
from wtforms import StringField, TextAreaField
from wtforms.validators import DataRequired, Length
from app.api.aws_helpers import ALLOWED_EXTENSIONS

class VideoForm(FlaskForm):
    title = StringField('title', validators=[DataRequired(), Length(min=3, max=60)])
    description = TextAreaField('description', validators=[DataRequired(), Length(min=3, max=255)])
    category = StringField('category', validators=[DataRequired(), Length(min=3, max=60)])
    url = FileField('url', validators=[FileAllowed(list(ALLOWED_EXTENSIONS))])
    thumbnail = FileField('thumbnail', validators=[
        FileRequired(),
        FileAllowed(['jpg', 'jpeg', 'png', 'gif'], 'Only image files are allowed!')
    ])
    user_id = StringField('user_id', validators=[DataRequired()])
