import { useSelector } from "react-redux/es/hooks/useSelector";
import React from "react";
import { fetchComments } from "../../API/CommentsSlice";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

const Comments = ({subreddit}) => {   
    const comments = useSelector((state) => state.redditComments.comments)
    const loading = useSelector((state) => state.redditComments.loading);
    const error = useSelector((state) => state.redditComments.error);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchComments({subreddit}));
      }, [dispatch, subreddit]);

      if(loading) {
        return <div>
            Loading....
        </div>
    }

    if(error) {
        return <div>
            Error: {error.message}
        </div>
    }

    return (
          
         <div >
             {comments.map((comment) => (
                 <div key={comment.id}>
                 <p>{comment.body}</p>
                 </div>
             ))}
         </div>
    );
};

export default Comments;

