from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime


class Video(db.Model):
    __tablename__ = 'videos'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(60))
    description = db.Column(db.String(255))
    category = db.Column(db.String(60))
    url = db.Column(db.String())
    thumbnail = db.Column(db.String())
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')))
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime)

    user = db.relationship('User', back_populates='videos')
    comments = db.relationship('Comment', back_populates='video')

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'title': self.title,
            'description': self.description,
            'category': self.category,
            'url': self.url,
            'thumbnail': self.thumbnail,
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }
