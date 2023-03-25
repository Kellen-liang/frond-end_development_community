import React, { useState } from 'react';

function CommentComponent() {
  const [comments, setComments] = useState([]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const comment = event.target.comment.value;
    setComments([...comments, comment]);
    event.target.comment.value = '';
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" name="comment" placeholder="Add a comment" />
        <button type="submit">Submit</button>
      </form>
      <ul>
        {comments.map((comment, index) => (
          <li key={index}>{comment}</li>
        ))}
      </ul>
    </div>
  );
}

export default CommentComponent;
