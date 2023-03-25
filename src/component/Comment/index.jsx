// import React, { useState } from 'react';

// function CommentComponent() {
//   const [comments, setComments] = useState([]);

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     const comment = event.target.comment.value;
//     setComments([...comments, comment]);
//     event.target.comment.value = '';
//   };

//   return (
//     <div>
//       <form onSubmit={handleSubmit}>
//         <input type="text" name="comment" placeholder="Add a comment" />
//         <button type="submit">Submit</button>
//       </form>
//       <ul>
//         {comments.map((comment, index) => (
//           <li key={index}>{comment}</li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default CommentComponent;
import React, { useState } from "react";
import "./Comment.css";

const Comment = ({ avatarUrl, author, time, content, replies }) => {
  const [reply, setReply] = useState("");
  const [showReply, setShowReply] = useState(false);

  const handleReplyChange = (event) => {
    setReply(event.target.value);
  };

  const handleReplySubmit = (event) => {
    event.preventDefault();
    console.log(`Reply submitted: ${reply}`);
    setReply("");
    setShowReply(false);
  };

  return (
    <div className="comment">
      <div className="comment-avatar">
        <img src={avatarUrl} alt={`${author}'s avatar`} />
      </div>
      <div className="comment-body">
        <div className="comment-header">
          <div className="comment-author">{author}</div>
          <div className="comment-time">{time}</div>
        </div>
        <div className="comment-content">{content}</div>
        {replies &&
          replies.map((reply) => (
            <div key={reply.id} className="comment-reply">
              <Comment
                avatarUrl={reply.avatarUrl}
                author={reply.author}
                time={reply.time}
                content={reply.content}
              />
            </div>
          ))}
        {!showReply && (
          <button onClick={() => setShowReply(true)}>Reply</button>
        )}
        {showReply && (
          <form onSubmit={handleReplySubmit}>
            <textarea value={reply} onChange={handleReplyChange}></textarea>
            <button type="submit">Submit</button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Comment;
