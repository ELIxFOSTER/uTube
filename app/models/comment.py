from .db import db, environment, SCHEMA, add_prefix_for_prod

class Comment(db.Model):
    __tablename__ = 'comments'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    video_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('videos.id')))
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')))
    comment_text = db.Column(db.String(500))
    created_at = db.Column(db.DateTime)
    updated_at = db.Column(db.DateTime)

    user = db.relationship('User', back_populates='comments')
    video = db.relationship('Video', back_populates='comments')

    def to_dict(self):
        return {
            'id': self.id,
            'video_id': self.video_id,
            'user_id': self.user_id,
            'comment_text': self.comment_text,
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }
