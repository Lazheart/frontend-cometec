import React from 'react';
import type { CommentResponseDto } from '../../interfaces/Comment/CommentResponseDto';
import '../../styles/CommentCard.css';

interface CommentCardProps {
  comment: CommentResponseDto;
}

const CommentCard: React.FC<CommentCardProps> = ({ comment }) => {
  const displayUserName = comment.userName;

  return (
    <div className="comments-card comments-card-animate">
      <div className="comments-card-title">{displayUserName}</div>
      <div className="comments-card-content">{comment.content}</div>
      <div className="comments-card-date">
        {new Date(comment.createdAt).toLocaleDateString()}
      </div>
    </div>
  );
};

export default CommentCard;
